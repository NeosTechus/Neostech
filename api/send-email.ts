import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { connectToDatabase } from './lib/mongodb.js';
import { handleCors, jsonResponse, errorResponse } from './lib/cors.js';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    return errorResponse(res, 'Method not allowed', 405);
  }

  try {
    const { name, email, company, service, budget, message } = req.body as ContactFormData;

    // Validate required fields
    if (!name || !email || !message) {
      return errorResponse(res, 'Name, email, and message are required');
    }

    const { db } = await connectToDatabase();
    const submissions = db.collection('contact_submissions');

    await submissions.insertOne({
      name,
      email,
      company: company || null,
      service: service || null,
      budget: budget || null,
      message,
      createdAt: new Date(),
    });

    // Send notification email to your business email
    const { error: notificationError } = await resend.emails.send({
      from: 'NeoStechUS Contact <info@neostechus.com>',
      to: ['harshakolla@neostechus.com'],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${service ? `<p><strong>Service Interested In:</strong> ${service}</p>` : ''}
        ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (notificationError) {
      console.error('Failed to send notification email:', notificationError);
      return errorResponse(res, 'Failed to send email', 500);
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'NeoStechUS <info@neostechus.com>',
      to: [email],
      subject: 'Thank you for contacting NeoStechUS!',
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p>Here's a summary of your inquiry:</p>
        <hr>
        ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>The NeoStechUS Team</p>
      `,
    });

    return jsonResponse(res, { success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return errorResponse(res, 'Failed to send email', 500);
  }
}
