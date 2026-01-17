import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './lib/mongodb';
import { errorResponse } from './lib/cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

// Disable body parsing - Stripe needs raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return errorResponse(res, 'Method not allowed', 405);
  }

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return errorResponse(res, 'Invalid signature', 400);
    }

    const { db } = await connectToDatabase();
    const orders = db.collection('orders');

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Create order from successful payment
        if (session.metadata?.items) {
          const items = JSON.parse(session.metadata.items);
          
          await orders.insertOne({
            userId: session.metadata.userId || 'guest',
            items,
            total: (session.amount_total || 0) / 100,
            status: 'confirmed',
            stripePaymentId: session.payment_intent as string,
            stripeSessionId: session.id,
            customerEmail: session.customer_email,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Update order status if exists
        await orders.updateOne(
          { stripePaymentId: paymentIntent.id },
          { $set: { status: 'confirmed', updatedAt: new Date() } }
        );
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Mark order as failed
        await orders.updateOne(
          { stripePaymentId: paymentIntent.id },
          { $set: { status: 'cancelled', updatedAt: new Date() } }
        );
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        
        // Update order for refund
        await orders.updateOne(
          { stripePaymentId: charge.payment_intent },
          { $set: { status: 'cancelled', refunded: true, updatedAt: new Date() } }
        );
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return errorResponse(res, 'Webhook handler failed', 500);
  }
}
