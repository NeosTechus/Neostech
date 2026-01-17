import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './lib/mongodb';
import { handleCors, jsonResponse, errorResponse } from './lib/cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());

function getUserFromToken(req: VercelRequest): { userId: string } | null {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;
  
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

async function isAdmin(db: any, userId: string): Promise<boolean> {
  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
  if (!user) return false;
  return ADMIN_EMAILS.includes(user.email?.toLowerCase()) || user.role === 'admin';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCors(req, res)) return;

  const user = getUserFromToken(req);
  
  if (!user) {
    return errorResponse(res, 'Unauthorized', 401);
  }

  try {
    const { db } = await connectToDatabase();
    
    const adminAccess = await isAdmin(db, user.userId);
    if (!adminAccess) {
      return errorResponse(res, 'Admin access required', 403);
    }

    const { action } = req.query;

    // GET PAYMENT STATS
    if (req.method === 'GET' && action === 'stats') {
      const [paymentLinks, invoices] = await Promise.all([
        db.collection('payment_links').find({}).toArray(),
        db.collection('invoices').find({}).toArray(),
      ]);

      // Get paid invoices from Stripe
      let paidInvoicesTotal = 0;
      let paidInvoicesCount = 0;
      
      for (const inv of invoices) {
        try {
          const stripeInvoice = await stripe.invoices.retrieve(inv.stripeId);
          if (stripeInvoice.status === 'paid') {
            paidInvoicesTotal += inv.total;
            paidInvoicesCount++;
          }
        } catch {
          // Skip if invoice not found in Stripe
        }
      }

      // Get payment link payments from Stripe
      let paymentLinksTotal = 0;
      let paymentLinksCount = 0;

      const sessions = await stripe.checkout.sessions.list({ limit: 100 });
      for (const session of sessions.data) {
        if (session.payment_link && session.payment_status === 'paid') {
          paymentLinksTotal += (session.amount_total || 0) / 100;
          paymentLinksCount++;
        }
      }

      return jsonResponse(res, {
        totalRevenue: paidInvoicesTotal + paymentLinksTotal,
        paymentLinksRevenue: paymentLinksTotal,
        invoicesRevenue: paidInvoicesTotal,
        totalPaymentLinks: paymentLinks.length,
        activePaymentLinks: paymentLinks.filter((l: any) => l.status === 'active').length,
        paidPaymentLinks: paymentLinksCount,
        totalInvoices: invoices.length,
        paidInvoices: paidInvoicesCount,
        pendingInvoices: invoices.filter((i: any) => i.status === 'open' || i.status === 'sent').length,
      });
    }

    // CREATE PAYMENT LINK
    if (req.method === 'POST' && action === 'payment-link') {
      const { amount, description, customerEmail } = req.body;

      if (!amount || amount <= 0) {
        return errorResponse(res, 'Valid amount required');
      }

      // Create a product and price for this payment link
      const product = await stripe.products.create({
        name: description || 'Custom Payment',
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(amount * 100),
        currency: 'usd',
      });

      const paymentLinkParams: Stripe.PaymentLinkCreateParams = {
        line_items: [{ price: price.id, quantity: 1 }],
      };

      // Add customer email if provided
      if (customerEmail) {
        paymentLinkParams.metadata = { customerEmail };
      }

      const paymentLink = await stripe.paymentLinks.create(paymentLinkParams);

      // Store payment link in database
      await db.collection('payment_links').insertOne({
        stripeId: paymentLink.id,
        url: paymentLink.url,
        amount,
        description,
        customerEmail,
        status: 'active',
        createdBy: user.userId,
        createdAt: new Date(),
      });

      return jsonResponse(res, {
        id: paymentLink.id,
        url: paymentLink.url,
        amount,
        description,
      }, 201);
    }

    // LIST PAYMENT LINKS
    if (req.method === 'GET' && action === 'payment-links') {
      const paymentLinks = await db.collection('payment_links')
        .find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();

      return jsonResponse(res, paymentLinks.map((link: any) => ({
        id: link._id,
        stripeId: link.stripeId,
        url: link.url,
        amount: link.amount,
        description: link.description,
        customerEmail: link.customerEmail,
        status: link.status,
        createdAt: link.createdAt,
      })));
    }

    // DEACTIVATE PAYMENT LINK
    if (req.method === 'DELETE' && action === 'payment-link') {
      const { linkId } = req.query;

      if (!linkId) {
        return errorResponse(res, 'Payment link ID required');
      }

      const link = await db.collection('payment_links').findOne({ _id: new ObjectId(linkId as string) });
      
      if (!link) {
        return errorResponse(res, 'Payment link not found', 404);
      }

      // Deactivate in Stripe
      await stripe.paymentLinks.update(link.stripeId, { active: false });

      // Update in database
      await db.collection('payment_links').updateOne(
        { _id: new ObjectId(linkId as string) },
        { $set: { status: 'inactive', updatedAt: new Date() } }
      );

      return jsonResponse(res, { success: true });
    }

    // CREATE INVOICE
    if (req.method === 'POST' && action === 'invoice') {
      const { customerEmail, customerName, items, dueDate, memo } = req.body;

      if (!customerEmail || !items || !Array.isArray(items) || items.length === 0) {
        return errorResponse(res, 'Customer email and items required');
      }

      // Find or create customer
      let customer = await stripe.customers.list({ email: customerEmail, limit: 1 });
      let customerId: string;

      if (customer.data.length > 0) {
        customerId = customer.data[0].id;
      } else {
        const newCustomer = await stripe.customers.create({
          email: customerEmail,
          name: customerName,
        });
        customerId = newCustomer.id;
      }

      // Create invoice
      const invoice = await stripe.invoices.create({
        customer: customerId,
        collection_method: 'send_invoice',
        days_until_due: dueDate ? Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 30,
        description: memo,
      });

      // Add invoice items
      for (const item of items) {
        await stripe.invoiceItems.create({
          customer: customerId,
          invoice: invoice.id,
          description: item.description,
          unit_amount: Math.round(item.amount * 100),
          quantity: item.quantity || 1,
          currency: 'usd',
        });
      }

      // Finalize and send invoice
      const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
      await stripe.invoices.sendInvoice(invoice.id);

      // Store in database
      const total = items.reduce((sum: number, item: any) => sum + (item.amount * (item.quantity || 1)), 0);
      
      await db.collection('invoices').insertOne({
        stripeId: invoice.id,
        customerId,
        customerEmail,
        customerName,
        items,
        total,
        status: 'sent',
        hostedUrl: finalizedInvoice.hosted_invoice_url,
        pdfUrl: finalizedInvoice.invoice_pdf,
        dueDate: dueDate ? new Date(dueDate) : null,
        memo,
        createdBy: user.userId,
        createdAt: new Date(),
      });

      return jsonResponse(res, {
        id: invoice.id,
        hostedUrl: finalizedInvoice.hosted_invoice_url,
        pdfUrl: finalizedInvoice.invoice_pdf,
        total,
        status: 'sent',
      }, 201);
    }

    // LIST INVOICES
    if (req.method === 'GET' && action === 'invoices') {
      const invoices = await db.collection('invoices')
        .find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();

      // Get updated status from Stripe
      const invoicesWithStatus = await Promise.all(
        invoices.map(async (inv: any) => {
          try {
            const stripeInvoice = await stripe.invoices.retrieve(inv.stripeId);
            return {
              id: inv._id,
              stripeId: inv.stripeId,
              customerEmail: inv.customerEmail,
              customerName: inv.customerName,
              items: inv.items,
              total: inv.total,
              status: stripeInvoice.status,
              hostedUrl: inv.hostedUrl,
              pdfUrl: inv.pdfUrl,
              dueDate: inv.dueDate,
              createdAt: inv.createdAt,
            };
          } catch {
            return {
              id: inv._id,
              stripeId: inv.stripeId,
              customerEmail: inv.customerEmail,
              customerName: inv.customerName,
              items: inv.items,
              total: inv.total,
              status: inv.status,
              hostedUrl: inv.hostedUrl,
              pdfUrl: inv.pdfUrl,
              dueDate: inv.dueDate,
              createdAt: inv.createdAt,
            };
          }
        })
      );

      return jsonResponse(res, invoicesWithStatus);
    }

    // VOID INVOICE
    if (req.method === 'DELETE' && action === 'invoice') {
      const { invoiceId } = req.query;

      if (!invoiceId) {
        return errorResponse(res, 'Invoice ID required');
      }

      const invoice = await db.collection('invoices').findOne({ _id: new ObjectId(invoiceId as string) });
      
      if (!invoice) {
        return errorResponse(res, 'Invoice not found', 404);
      }

      // Void in Stripe
      await stripe.invoices.voidInvoice(invoice.stripeId);

      // Update in database
      await db.collection('invoices').updateOne(
        { _id: new ObjectId(invoiceId as string) },
        { $set: { status: 'void', updatedAt: new Date() } }
      );

      return jsonResponse(res, { success: true });
    }

    return errorResponse(res, 'Invalid action', 400);
  } catch (error) {
    console.error('Admin payments API error:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
}
