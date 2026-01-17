import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from './lib/mongodb';
import { handleCors, jsonResponse, errorResponse } from './lib/cors';

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());

interface User {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  role?: string;
  isGuest?: boolean;
  createdAt: Date;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCors(req, res)) return;

  try {
    const { db } = await connectToDatabase();
    const users = db.collection<User>('users');

    // GET - Get current user profile
    if (req.method === 'GET') {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return errorResponse(res, 'No token provided', 401);
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const user = await users.findOne({ _id: decoded.userId as any });
        
        if (!user) {
          return errorResponse(res, 'User not found', 404);
        }

        return jsonResponse(res, {
          id: user._id,
          email: user.email,
          name: user.name,
          isGuest: user.isGuest,
        });
      } catch {
        return errorResponse(res, 'Invalid token', 401);
      }
    }

    // POST - Register, Login, or Guest session
    if (req.method === 'POST') {
      const { action, email, password, name } = req.body;

      // Guest session
      if (action === 'guest') {
        const guestUser = {
          email: `guest_${Date.now()}@guest.local`,
          password: '',
          isGuest: true,
          createdAt: new Date(),
        };

        const result = await users.insertOne(guestUser);
        const token = jwt.sign({ userId: result.insertedId }, JWT_SECRET, { expiresIn: '7d' });

        return jsonResponse(res, {
          token,
          user: {
            id: result.insertedId,
            isGuest: true,
          },
        });
      }

      // Validate email/password
      if (!email || !password) {
        return errorResponse(res, 'Email and password required');
      }

      // Register
      if (action === 'register') {
        const existingUser = await users.findOne({ email: email.toLowerCase() });
        
        if (existingUser) {
          return errorResponse(res, 'Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const newUser = {
          email: email.toLowerCase(),
          password: hashedPassword,
          name: name || undefined,
          createdAt: new Date(),
        };

        const result = await users.insertOne(newUser);
        const token = jwt.sign({ userId: result.insertedId }, JWT_SECRET, { expiresIn: '7d' });

        return jsonResponse(res, {
          token,
          user: {
            id: result.insertedId,
            email: newUser.email,
            name: newUser.name,
          },
        }, 201);
      }

      // Login
      if (action === 'login') {
        const user = await users.findOne({ email: email.toLowerCase() });
        
        if (!user) {
          return errorResponse(res, 'Invalid credentials', 401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
          return errorResponse(res, 'Invalid credentials', 401);
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        return jsonResponse(res, {
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
        });
      }

      // Admin login
      if (action === 'admin-login') {
        const user = await users.findOne({ email: email.toLowerCase() });
        
        if (!user) {
          return errorResponse(res, 'Invalid credentials', 401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
          return errorResponse(res, 'Invalid credentials', 401);
        }

        // Check admin status
        const isAdmin = ADMIN_EMAILS.includes(user.email?.toLowerCase()) || user.role === 'admin';

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        return jsonResponse(res, {
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
          isAdmin,
        });
      }

      // Employee login
      if (action === 'employee-login') {
        const user = await users.findOne({ email: email.toLowerCase() });
        
        if (!user) {
          return errorResponse(res, 'Invalid credentials', 401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
          return errorResponse(res, 'Invalid credentials', 401);
        }

        // Check if user has employee record
        const employees = db.collection('employees');
        const employee = await employees.findOne({ userId: user._id });
        const isEmployee = !!employee || user.role === 'employee';

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        return jsonResponse(res, {
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
          isEmployee,
        });
      }

      return errorResponse(res, 'Invalid action');
    }

    return errorResponse(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Auth error:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
}
