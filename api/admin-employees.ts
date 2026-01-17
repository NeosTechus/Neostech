import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './lib/mongodb';
import { handleCors, jsonResponse, errorResponse } from './lib/cors';

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
  const users = db.collection('users');
  const user = await users.findOne({ _id: new ObjectId(userId) });
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
    
    // Verify admin status
    if (!await isAdmin(db, user.userId)) {
      return errorResponse(res, 'Admin access required', 403);
    }

    const users = db.collection('users');
    const employees = db.collection('employees');
    const projects = db.collection('projects');
    const tickets = db.collection('tickets');

    const { action } = req.query;

    // GET operations
    if (req.method === 'GET') {
      // List all employees
      if (action === 'list') {
        const employeeList = await employees.find({}).sort({ createdAt: -1 }).toArray();
        
        // Get user details for each employee
        const employeesWithDetails = await Promise.all(
          employeeList.map(async (emp) => {
            const userDetails = await users.findOne({ _id: emp.userId });
            const assignedProjects = await projects.countDocuments({ assignedEmployees: emp._id });
            const assignedTickets = await tickets.countDocuments({ assignedTo: emp._id });
            
            return {
              id: emp._id,
              userId: emp.userId,
              email: userDetails?.email || emp.email,
              name: emp.name,
              position: emp.position,
              department: emp.department,
              hireDate: emp.hireDate,
              assignedProjects,
              assignedTickets,
              createdAt: emp.createdAt,
            };
          })
        );

        return jsonResponse(res, { employees: employeesWithDetails });
      }

      // List all projects (for assignment)
      if (action === 'projects') {
        const projectList = await projects.find({}).sort({ createdAt: -1 }).toArray();
        
        const projectsWithEmployees = await Promise.all(
          projectList.map(async (proj) => {
            const assignedEmployeeDetails = await Promise.all(
              (proj.assignedEmployees || []).map(async (empId: ObjectId) => {
                const emp = await employees.findOne({ _id: empId });
                return emp ? { id: emp._id, name: emp.name } : null;
              })
            );
            
            return {
              id: proj._id,
              name: proj.name,
              description: proj.description,
              status: proj.status,
              deadline: proj.deadline,
              assignedEmployees: assignedEmployeeDetails.filter(Boolean),
              createdAt: proj.createdAt,
            };
          })
        );

        return jsonResponse(res, { projects: projectsWithEmployees });
      }

      // List all tickets (for assignment)
      if (action === 'tickets') {
        const ticketList = await tickets.find({}).sort({ createdAt: -1 }).toArray();
        
        const ticketsWithDetails = await Promise.all(
          ticketList.map(async (ticket) => {
            let assignedEmployee = null;
            if (ticket.assignedTo) {
              const emp = await employees.findOne({ _id: ticket.assignedTo });
              assignedEmployee = emp ? { id: emp._id, name: emp.name } : null;
            }
            
            let projectName = null;
            if (ticket.projectId) {
              const proj = await projects.findOne({ _id: ticket.projectId });
              projectName = proj?.name;
            }
            
            return {
              id: ticket._id,
              title: ticket.title,
              description: ticket.description,
              priority: ticket.priority,
              status: ticket.status,
              assignedTo: assignedEmployee,
              projectId: ticket.projectId,
              projectName,
              createdAt: ticket.createdAt,
              updatedAt: ticket.updatedAt,
            };
          })
        );

        return jsonResponse(res, { tickets: ticketsWithDetails });
      }

      return errorResponse(res, 'Invalid action');
    }

    // POST - Create new employee, project, or ticket
    if (req.method === 'POST') {
      if (action === 'employee') {
        const { email, password, name, position, department } = req.body;

        if (!email || !password || !name || !position || !department) {
          return errorResponse(res, 'All fields are required');
        }

        // Check if user already exists
        const existingUser = await users.findOne({ email: email.toLowerCase() });
        
        let userId;
        if (existingUser) {
          // Check if already an employee
          const existingEmployee = await employees.findOne({ userId: existingUser._id });
          if (existingEmployee) {
            return errorResponse(res, 'User is already an employee');
          }
          userId = existingUser._id;
        } else {
          // Create new user
          const hashedPassword = await bcrypt.hash(password, 12);
          const result = await users.insertOne({
            email: email.toLowerCase(),
            password: hashedPassword,
            name,
            role: 'employee',
            createdAt: new Date(),
          });
          userId = result.insertedId;
        }

        // Create employee record
        const employeeResult = await employees.insertOne({
          userId,
          email: email.toLowerCase(),
          name,
          position,
          department,
          hireDate: new Date(),
          createdAt: new Date(),
        });

        return jsonResponse(res, {
          id: employeeResult.insertedId,
          message: 'Employee created successfully',
        }, 201);
      }

      if (action === 'project') {
        const { name, description, status, deadline } = req.body;

        if (!name || !description) {
          return errorResponse(res, 'Name and description are required');
        }

        const result = await projects.insertOne({
          name,
          description,
          status: status || 'planning',
          deadline: deadline ? new Date(deadline) : null,
          assignedEmployees: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return jsonResponse(res, {
          id: result.insertedId,
          message: 'Project created successfully',
        }, 201);
      }

      if (action === 'ticket') {
        const { title, description, priority, projectId } = req.body;

        if (!title || !description) {
          return errorResponse(res, 'Title and description are required');
        }

        const result = await tickets.insertOne({
          title,
          description,
          priority: priority || 'medium',
          status: 'open',
          assignedTo: null,
          projectId: projectId ? new ObjectId(projectId) : null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return jsonResponse(res, {
          id: result.insertedId,
          message: 'Ticket created successfully',
        }, 201);
      }

      return errorResponse(res, 'Invalid action');
    }

    // PUT - Update/assign
    if (req.method === 'PUT') {
      if (action === 'assign-project') {
        const { projectId, employeeIds } = req.body;

        if (!projectId || !Array.isArray(employeeIds)) {
          return errorResponse(res, 'Project ID and employee IDs are required');
        }

        await projects.updateOne(
          { _id: new ObjectId(projectId) },
          { 
            $set: { 
              assignedEmployees: employeeIds.map((id: string) => new ObjectId(id)),
              updatedAt: new Date(),
            } 
          }
        );

        return jsonResponse(res, { message: 'Project assignments updated' });
      }

      if (action === 'assign-ticket') {
        const { ticketId, employeeId } = req.body;

        if (!ticketId) {
          return errorResponse(res, 'Ticket ID is required');
        }

        await tickets.updateOne(
          { _id: new ObjectId(ticketId) },
          { 
            $set: { 
              assignedTo: employeeId ? new ObjectId(employeeId) : null,
              updatedAt: new Date(),
            } 
          }
        );

        return jsonResponse(res, { message: 'Ticket assignment updated' });
      }

      if (action === 'update-employee') {
        const { employeeId, name, position, department } = req.body;

        if (!employeeId) {
          return errorResponse(res, 'Employee ID is required');
        }

        const updateData: any = { updatedAt: new Date() };
        if (name) updateData.name = name;
        if (position) updateData.position = position;
        if (department) updateData.department = department;

        await employees.updateOne(
          { _id: new ObjectId(employeeId) },
          { $set: updateData }
        );

        return jsonResponse(res, { message: 'Employee updated' });
      }

      if (action === 'update-project') {
        const { projectId, name, description, status, deadline } = req.body;

        if (!projectId) {
          return errorResponse(res, 'Project ID is required');
        }

        const updateData: any = { updatedAt: new Date() };
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (status) updateData.status = status;
        if (deadline) updateData.deadline = new Date(deadline);

        await projects.updateOne(
          { _id: new ObjectId(projectId) },
          { $set: updateData }
        );

        return jsonResponse(res, { message: 'Project updated' });
      }

      if (action === 'update-ticket') {
        const { ticketId, title, description, priority, status } = req.body;

        if (!ticketId) {
          return errorResponse(res, 'Ticket ID is required');
        }

        const updateData: any = { updatedAt: new Date() };
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (priority) updateData.priority = priority;
        if (status) updateData.status = status;

        await tickets.updateOne(
          { _id: new ObjectId(ticketId) },
          { $set: updateData }
        );

        return jsonResponse(res, { message: 'Ticket updated' });
      }

      return errorResponse(res, 'Invalid action');
    }

    // DELETE
    if (req.method === 'DELETE') {
      if (action === 'employee') {
        const { employeeId } = req.body;

        if (!employeeId) {
          return errorResponse(res, 'Employee ID is required');
        }

        // Remove from projects
        await projects.updateMany(
          { assignedEmployees: new ObjectId(employeeId) },
          { $pull: { assignedEmployees: new ObjectId(employeeId) } }
        );

        // Unassign tickets
        await tickets.updateMany(
          { assignedTo: new ObjectId(employeeId) },
          { $set: { assignedTo: null } }
        );

        // Delete employee record
        await employees.deleteOne({ _id: new ObjectId(employeeId) });

        return jsonResponse(res, { message: 'Employee deleted' });
      }

      if (action === 'project') {
        const { projectId } = req.body;

        if (!projectId) {
          return errorResponse(res, 'Project ID is required');
        }

        await projects.deleteOne({ _id: new ObjectId(projectId) });
        return jsonResponse(res, { message: 'Project deleted' });
      }

      if (action === 'ticket') {
        const { ticketId } = req.body;

        if (!ticketId) {
          return errorResponse(res, 'Ticket ID is required');
        }

        await tickets.deleteOne({ _id: new ObjectId(ticketId) });
        return jsonResponse(res, { message: 'Ticket deleted' });
      }

      return errorResponse(res, 'Invalid action');
    }

    return errorResponse(res, 'Method not allowed', 405);
  } catch (error) {
    console.error('Admin employees API error:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
}
