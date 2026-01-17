import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { 
  Briefcase, 
  Ticket, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  FolderOpen,
  Calendar
} from "lucide-react";

interface DashboardData {
  employee: {
    id: string;
    name: string;
    email: string;
    position: string;
    department: string;
  };
  stats: {
    totalProjects: number;
    activeProjects: number;
    totalTickets: number;
    openTickets: number;
    inProgressTickets: number;
  };
  projects: Array<{
    id: string;
    name: string;
    description: string;
    status: string;
    deadline?: string;
    createdAt: string;
  }>;
  tickets: Array<{
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    projectId?: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

const statusColors: Record<string, string> = {
  'planning': 'bg-blue-500/10 text-blue-500',
  'in-progress': 'bg-yellow-500/10 text-yellow-500',
  'review': 'bg-purple-500/10 text-purple-500',
  'completed': 'bg-green-500/10 text-green-500',
  'open': 'bg-blue-500/10 text-blue-500',
  'resolved': 'bg-green-500/10 text-green-500',
  'closed': 'bg-muted text-muted-foreground',
};

const priorityColors: Record<string, string> = {
  'low': 'bg-muted text-muted-foreground',
  'medium': 'bg-yellow-500/10 text-yellow-500',
  'high': 'bg-orange-500/10 text-orange-500',
  'urgent': 'bg-red-500/10 text-red-500',
};

export default function EmployeeDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingTicket, setUpdatingTicket] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchDashboard = async () => {
    const result = await apiClient.getEmployeeDashboard();
    
    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    setData(result.data as DashboardData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleTicketStatusChange = async (ticketId: string, newStatus: string) => {
    setUpdatingTicket(ticketId);
    
    const result = await apiClient.updateEmployeeTicketStatus(ticketId, newStatus);
    
    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Ticket status updated",
      });
      fetchDashboard();
    }
    
    setUpdatingTicket(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold">Welcome back, {data.employee.name}!</h2>
        <p className="text-muted-foreground">
          {data.employee.position} • {data.employee.department}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              of {data.stats.totalProjects} total
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.openTickets}</div>
            <p className="text-xs text-muted-foreground">
              needs attention
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.inProgressTickets}</div>
            <p className="text-xs text-muted-foreground">
              tickets being worked on
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalTickets}</div>
            <p className="text-xs text-muted-foreground">
              assigned to you
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects & Tickets */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Projects */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Your Projects
            </CardTitle>
            <CardDescription>Projects you're currently assigned to</CardDescription>
          </CardHeader>
          <CardContent>
            {data.projects.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No projects assigned yet
              </p>
            ) : (
              <div className="space-y-4">
                {data.projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="p-4 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{project.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {project.description}
                        </p>
                      </div>
                      <Badge className={statusColors[project.status]}>
                        {project.status}
                      </Badge>
                    </div>
                    {project.deadline && (
                      <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        Due: {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tickets */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              Your Tickets
            </CardTitle>
            <CardDescription>Tasks and issues assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            {data.tickets.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No tickets assigned yet
              </p>
            ) : (
              <div className="space-y-4">
                {data.tickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="p-4 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{ticket.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {ticket.description}
                        </p>
                      </div>
                      <Badge className={priorityColors[ticket.priority]}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Select
                        value={ticket.status}
                        onValueChange={(value) => handleTicketStatusChange(ticket.id, value)}
                        disabled={updatingTicket === ticket.id}
                      >
                        <SelectTrigger className="w-[140px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-xs text-muted-foreground">
                        {new Date(ticket.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
