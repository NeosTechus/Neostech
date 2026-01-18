import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { connectToDatabase } from './lib/mongodb.js';
import { handleCors, jsonResponse, errorResponse } from './lib/cors.js';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    return errorResponse(res, 'Method not allowed', 405);
  }

  try {
    const { email }: { email: string } = req.body;

    if (!email) {
      return errorResponse(res, 'Email is required');
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Check if user exists
    const user = await usersCollection.findOne({ email: email.toLowerCase() });

    // Always return success to prevent email enumeration
    if (!user) {
      console.log('Password reset requested for non-existent email:', email);
      return jsonResponse(res, { 
        success: true, 
        message: 'If an account exists with this email, you will receive a password reset link.' 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store token in database
    await usersCollection.updateOne(
      { _id: user._id },
      { 
        $set: { 
          resetToken,
          resetTokenExpiry 
        } 
      }
    );

    // Get the base URL for the reset link
    const baseUrl = process.env.APP_URL || 'https://neostechus.com';
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;

    // Send reset email
    const { error: emailError } = await resend.emails.send({
      from: 'NeoStechUS <onboarding@resend.dev>',
      to: [email],
      subject: 'Reset Your Password - NeoStechUS',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; padding: 40px 20px;">
            <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h1 style="color: #18181b; font-size: 24px; font-weight: 600; margin: 0 0 16px;">Reset Your Password</h1>
              <p style="color: #52525b; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                We received a request to reset your password. Click the button below to create a new password:
              </p>
              <a href="${resetLink}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; font-size: 16px; font-weight: 500; text-decoration: none; padding: 12px 32px; border-radius: 8px; margin: 0 0 24px;">
                Reset Password
              </a>
              <p style="color: #71717a; font-size: 14px; line-height: 1.5; margin: 24px 0 0;">
                This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
              </p>
              <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 32px 0;">
              <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
                NeoStechUS - Technology Solutions
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (emailError) {
      console.error('Failed to send reset email:', emailError);
      return errorResponse(res, 'Failed to send reset email', 500);
    }

    console.log('Password reset email sent to:', email);
    return jsonResponse(res, { 
      success: true, 
      message: 'If an account exists with this email, you will receive a password reset link.' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return errorResponse(res, 'Something went wrong', 500);
  }
}
