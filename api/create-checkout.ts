import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import { handleCors, jsonResponse, errorResponse } from './lib/cors.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const JWT_SECRET = process.env.JWT_SECRET!;
const APP_URL = process.env.VITE_APP_URL || 'http://localhost:5173';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    return errorResponse(res, 'Method not allowed', 405);
  }

  try {
    const { items } = req.body as { items: CartItem[] };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return errorResponse(res, 'Cart items required');
    }

    // Get user ID from token if authenticated
    let userId = 'guest';
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        userId = decoded.userId;
      } catch {
        // Continue as guest
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${APP_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/cart`,
      metadata: {
        userId,
        items: JSON.stringify(items),
      },
    });

    return jsonResponse(res, { 
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return errorResponse(res, 'Failed to create checkout session', 500);
  }
}
