import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './lib/mongodb';
import { handleCors, jsonResponse, errorResponse } from './lib/cors';

const JWT_SECRET = process.env.JWT_SECRET!;

interface Employee {
  _id?: ObjectId;
  userId: ObjectId;
  email: string;
  name: string;
  position: string;
  department: string;
  hireDate: Date;
  createdAt: Date;
}

interface Project {
  _id?: ObjectId;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  assignedEmployees: ObjectId[];
  deadline?: Date;
  createdAt: Date;
}

interface Ticket {
  _id?: ObjectId;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo: ObjectId;
  projectId?: ObjectId;
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
    const employees = db.collection<Employee>('employees');
    const projects = db.collection<Project>('projects');
    const tickets = db.collection<Ticket>('tickets');

    const { action } = req.query;

    // Check if user is an employee
    const employee = await employees.findOne({ userId: new ObjectId(user.userId) });
    
    if (!employee) {
      return errorResponse(res, 'Employee profile not found', 403);
    }

    // GET employee dashboard data
    if (req.method === 'GET') {
      if (action === 'dashboard') {
        // Get assigned projects
        const assignedProjects = await projects.find({
          assignedEmployees: employee._id
        }).sort({ createdAt: -1 }).toArray();

        // Get assigned tickets
        const assignedTickets = await tickets.find({
          assignedTo: employee._id
        }).sort({ createdAt: -1 }).toArray();

        // Stats
        const openTickets = assignedTickets.filter(t => t.status === 'open').length;
        const inProgressTickets = assignedTickets.filter(t => t.status === 'in-progress').length;
        const activeProjects = assignedProjects.filter(p => p.status === 'in-progress').length;

        return jsonResponse(res, {
          employee: {
            id: employee._id,
            name: employee.name,
            email: employee.email,
            position: employee.position,
            department: employee.department,
          },
          stats: {
            totalProjects: assignedProjects.length,
            activeProjects,
            totalTickets: assignedTickets.length,
            openTickets,
            inProgressTickets,
          },
          projects: assignedProjects.map(p => ({
            id: p._id,
            name: p.name,
            description: p.description,
            status: p.status,
            deadline: p.deadline,
            createdAt: p.createdAt,
          })),
          tickets: assignedTickets.map(t => ({
            id: t._id,
            title: t.title,
            description: t.description,
            priority: t.priority,
            status: t.status,
            projectId: t.projectId,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
          })),
        });
      }

      if (action === 'profile') {
        return jsonResponse(res, {
          id: employee._id,
          name: employee.name,
          email: employee.email,
          position: employee.position,
          department: employee.department,
          hireDate: employee.hireDate,
        });
      }

      return errorResponse(res, 'Invalid action');
    }

    // PUT - Update ticket status
    if (req.method === 'PUT') {
      if (action === 'ticket-status') {
        const { ticketId, status } = req.body;

        if (!ticketId || !status) {
          return errorResponse(res, 'Ticket ID and status required');
        }

        const validStatuses = ['open', 'in-progress', 'resolved', 'closed'];
        if (!validStatuses.includes(status)) {
          return errorResponse(res, 'Invalid status');
        }

        const ticket = await tickets.findOne({ 
          _id: new ObjectId(ticketId),
          assignedTo: employee._id 
        });

        if (!ticket) {
          return errorResponse(res, 'Ticket not found or not assigned to you', 404);
        }

        await tickets.updateOne(
          { _id: new ObjectId(ticketId) },
          { $set: { status, updatedAt: new Date() } }
        );

        return jsonResponse(res, { success: true, ticketId, status });
      }

      return errorResponse(res, 'Invalid action');
    }

    return errorResponse(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Employee API error:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
}
