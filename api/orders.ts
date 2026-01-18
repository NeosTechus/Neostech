import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './lib/mongodb.js';
import { handleCors, jsonResponse, errorResponse } from './lib/cors.js';

const JWT_SECRET = process.env.JWT_SECRET!;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id?: ObjectId;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  stripePaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

function getUserFromToken(req: VercelRequest): { userId: string } | null {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) return null;
  
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCors(req, res)) return;

  const user = getUserFromToken(req);
  
  if (!user) {
    return errorResponse(res, 'Unauthorized', 401);
  }

  try {
    const { db } = await connectToDatabase();
    const orders = db.collection<Order>('orders');

    // GET - List orders or get single order
    if (req.method === 'GET') {
      const { id } = req.query;

      if (id) {
        const order = await orders.findOne({ 
          _id: new ObjectId(id as string),
          userId: user.userId,
        });
        
        if (!order) {
          return errorResponse(res, 'Order not found', 404);
        }

        return jsonResponse(res, {
          id: order._id,
          status: order.status,
          items: order.items,
          total: order.total,
          createdAt: order.createdAt,
        });
      }

      const userOrders = await orders
        .find({ userId: user.userId })
        .sort({ createdAt: -1 })
        .toArray();

      return jsonResponse(res, userOrders.map(order => ({
        id: order._id,
        status: order.status,
        items: order.items,
        total: order.total,
        createdAt: order.createdAt,
      })));
    }

    // POST - Create order
    if (req.method === 'POST') {
      const { items } = req.body as { items: OrderItem[] };

      if (!items || !Array.isArray(items) || items.length === 0) {
        return errorResponse(res, 'Items required');
      }

      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const newOrder: Order = {
        userId: user.userId,
        items,
        total,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await orders.insertOne(newOrder);

      return jsonResponse(res, {
        id: result.insertedId,
        status: newOrder.status,
        total: newOrder.total,
      }, 201);
    }

    // PUT - Update order status
    if (req.method === 'PUT') {
      const { id, status } = req.body;

      if (!id || !status) {
        return errorResponse(res, 'Order ID and status required');
      }

      const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];
      
      if (!validStatuses.includes(status)) {
        return errorResponse(res, 'Invalid status');
      }

      const result = await orders.findOneAndUpdate(
        { _id: new ObjectId(id), userId: user.userId },
        { $set: { status, updatedAt: new Date() } },
        { returnDocument: 'after' }
      );

      if (!result) {
        return errorResponse(res, 'Order not found', 404);
      }

      return jsonResponse(res, {
        id: result._id,
        status: result.status,
      });
    }

    // DELETE - Cancel order
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return errorResponse(res, 'Order ID required');
      }

      const result = await orders.findOneAndUpdate(
        { _id: new ObjectId(id as string), userId: user.userId },
        { $set: { status: 'cancelled', updatedAt: new Date() } },
        { returnDocument: 'after' }
      );

      if (!result) {
        return errorResponse(res, 'Order not found', 404);
      }

      return jsonResponse(res, { success: true });
    }

    return errorResponse(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Orders error:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
}
