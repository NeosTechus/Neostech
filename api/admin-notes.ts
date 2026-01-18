import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './lib/mongodb.js';
import { handleCors, jsonResponse, errorResponse } from './lib/cors.js';

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

    const notes = db.collection('admin_notes');
    const { action } = req.query;

    // GET ALL NOTES
    if (req.method === 'GET' && action === 'list') {
      const allNotes = await notes
        .find({ userId: user.userId })
        .sort({ isPinned: -1, updatedAt: -1 })
        .toArray();

      return jsonResponse(res, allNotes.map((note: any) => ({
        id: note._id.toString(),
        title: note.title,
        content: note.content,
        color: note.color,
        isPinned: note.isPinned || false,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      })));
    }

    // GET RECENT NOTES (for dashboard widget)
    if (req.method === 'GET' && action === 'recent') {
      const recentNotes = await notes
        .find({ userId: user.userId })
        .sort({ isPinned: -1, updatedAt: -1 })
        .limit(5)
        .toArray();

      return jsonResponse(res, recentNotes.map((note: any) => ({
        id: note._id.toString(),
        title: note.title,
        content: note.content,
        color: note.color,
        isPinned: note.isPinned || false,
        updatedAt: note.updatedAt,
      })));
    }

    // CREATE NOTE
    if (req.method === 'POST') {
      const { title, content, color } = req.body;

      if (!title && !content) {
        return errorResponse(res, 'Title or content required');
      }

      const newNote = {
        userId: user.userId,
        title: title || '',
        content: content || '',
        color: color || 'default',
        isPinned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await notes.insertOne(newNote);

      return jsonResponse(res, {
        id: result.insertedId.toString(),
        ...newNote,
      }, 201);
    }

    // UPDATE NOTE
    if (req.method === 'PUT') {
      const { noteId, title, content, color, isPinned } = req.body;

      if (!noteId) {
        return errorResponse(res, 'Note ID required');
      }

      const updateData: any = { updatedAt: new Date() };
      if (title !== undefined) updateData.title = title;
      if (content !== undefined) updateData.content = content;
      if (color !== undefined) updateData.color = color;
      if (isPinned !== undefined) updateData.isPinned = isPinned;

      const result = await notes.findOneAndUpdate(
        { _id: new ObjectId(noteId), userId: user.userId },
        { $set: updateData },
        { returnDocument: 'after' }
      );

      if (!result) {
        return errorResponse(res, 'Note not found', 404);
      }

      return jsonResponse(res, {
        id: result._id.toString(),
        title: result.title,
        content: result.content,
        color: result.color,
        isPinned: result.isPinned,
        updatedAt: result.updatedAt,
      });
    }

    // DELETE NOTE
    if (req.method === 'DELETE') {
      const { noteId } = req.query;

      if (!noteId) {
        return errorResponse(res, 'Note ID required');
      }

      const result = await notes.deleteOne({
        _id: new ObjectId(noteId as string),
        userId: user.userId,
      });

      if (result.deletedCount === 0) {
        return errorResponse(res, 'Note not found', 404);
      }

      return jsonResponse(res, { success: true });
    }

    return errorResponse(res, 'Invalid action', 400);
  } catch (error) {
    console.error('Admin notes API error:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
}
