import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './lib/mongodb';
import { handleCors, jsonResponse, errorResponse } from './lib/cors';

const JWT_SECRET = process.env.JWT_SECRET!;

// Admin user IDs or emails - configure as needed
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
  
  // Check if user is in admin list or has admin role
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
    
    // Verify admin access
    const adminAccess = await isAdmin(db, user.userId);
    if (!adminAccess) {
      return errorResponse(res, 'Admin access required', 403);
    }

    const { action } = req.query;

    // GET stats
    if (req.method === 'GET' && action === 'stats') {
      const orders = db.collection('orders');
      const users = db.collection('users');

      const [
        totalOrders,
        totalCustomers,
        orderStats,
        revenueResult
      ] = await Promise.all([
        orders.countDocuments(),
        users.countDocuments({ isGuest: { $ne: true } }),
        orders.aggregate([
          { $group: { _id: '$status', count: { $sum: 1 } } }
        ]).toArray(),
        orders.aggregate([
          { $match: { status: { $ne: 'cancelled' } } },
          { $group: { _id: null, total: { $sum: '$total' } } }
        ]).toArray()
      ]);

      const statusCounts = orderStats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {} as Record<string, number>);

      return jsonResponse(res, {
        totalOrders,
        totalRevenue: revenueResult[0]?.total || 0,
        totalCustomers,
        pendingOrders: statusCounts.pending || 0,
        completedOrders: statusCounts.delivered || 0,
        cancelledOrders: statusCounts.cancelled || 0,
      });
    }

    // GET orders (all orders for admin)
    if (req.method === 'GET' && action === 'orders') {
      const allOrders = await db.collection('orders')
        .find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();

      return jsonResponse(res, allOrders.map((order: any) => ({
        id: order._id,
        status: order.status,
        items: order.items,
        total: order.total,
        customerEmail: order.customerEmail,
        createdAt: order.createdAt,
      })));
    }

    // PUT update order status
    if (req.method === 'PUT' && action === 'orders') {
      const { orderId, status } = req.body;

      if (!orderId || !status) {
        return errorResponse(res, 'Order ID and status required');
      }

      const result = await db.collection('orders').findOneAndUpdate(
        { _id: new ObjectId(orderId) },
        { $set: { status, updatedAt: new Date() } },
        { returnDocument: 'after' }
      );

      if (!result) {
        return errorResponse(res, 'Order not found', 404);
      }

      return jsonResponse(res, { id: result._id, status: result.status });
    }

    // GET customers
    if (req.method === 'GET' && action === 'customers') {
      const customers = await db.collection('users')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      // Get order stats for each customer
      const customerData = await Promise.all(
        customers.map(async (customer: any) => {
          const orderStats = await db.collection('orders').aggregate([
            { $match: { userId: customer._id.toString() } },
            { $group: { _id: null, count: { $sum: 1 }, total: { $sum: '$total' } } }
          ]).toArray();

          return {
            id: customer._id,
            email: customer.email,
            name: customer.name,
            isGuest: customer.isGuest || false,
            totalOrders: orderStats[0]?.count || 0,
            totalSpent: orderStats[0]?.total || 0,
            createdAt: customer.createdAt,
          };
        })
      );

      return jsonResponse(res, customerData);
    }

    return errorResponse(res, 'Invalid action', 400);
  } catch (error) {
    console.error('Admin API error:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
}
