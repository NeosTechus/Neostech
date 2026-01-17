import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api-client";
import { Loader2, Plus, Ticket, Trash2, Edit, User } from "lucide-react";

interface Employee {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
}

interface TicketData {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  assignedTo: Employee | null;
  projectId?: string;
  projectName?: string;
  createdAt: string;
  updatedAt: string;
}

const priorityOptions = [
  { value: "low", label: "Low", color: "bg-muted text-muted-foreground" },
  { value: "medium", label: "Medium", color: "bg-yellow-500/10 text-yellow-500" },
  { value: "high", label: "High", color: "bg-orange-500/10 text-orange-500" },
  { value: "urgent", label: "Urgent", color: "bg-red-500/10 text-red-500" },
];

const statusOptions = [
  { value: "open", label: "Open", color: "bg-blue-500/10 text-blue-500" },
  { value: "in-progress", label: "In Progress", color: "bg-yellow-500/10 text-yellow-500" },
  { value: "resolved", label: "Resolved", color: "bg-green-500/10 text-green-500" },
  { value: "closed", label: "Closed", color: "bg-muted text-muted-foreground" },
];

export default function AdminTicketsManage() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "open",
    projectId: "",
  });

  const fetchData = async () => {
    const [ticketsResult, employeesResult, projectsResult] = await Promise.all([
      apiClient.getAdminTickets(),
      apiClient.getAdminEmployees(),
      apiClient.getAdminProjects(),
    ]);

    if (!ticketsResult.error) {
      setTickets((ticketsResult.data as any)?.tickets || []);
    }
    if (!employeesResult.error) {
      setEmployees((employeesResult.data as any)?.employees || []);
    }
    if (!projectsResult.error) {
      setProjects((projectsResult.data as any)?.projects || []);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (selectedTicket) {
      const result = await apiClient.updateAdminTicket(selectedTicket.id, formData);
      if (result.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Ticket updated" });
        fetchData();
        setIsDialogOpen(false);
      }
    } else {
      const result = await apiClient.createAdminTicket(formData);
      if (result.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Ticket created" });
        fetchData();
        setIsDialogOpen(false);
      }
    }

    setIsSubmitting(false);
    resetForm();
  };

  const handleAssign = async (ticketId: string, employeeId: string | null) => {
    const result = await apiClient.assignTicketEmployee(ticketId, employeeId);
    if (result.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Ticket assigned" });
      fetchData();
    }
  };

  const handleDelete = async (ticketId: string) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    const result = await apiClient.deleteAdminTicket(ticketId);
    if (result.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Ticket deleted" });
      fetchData();
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", priority: "medium", status: "open", projectId: "" });
    setSelectedTicket(null);
  };

  const openEditDialog = (ticket: TicketData) => {
    setSelectedTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      projectId: ticket.projectId || "",
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
          <p className="text-muted-foreground">
            Create tickets and assign them to team members
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedTicket ? "Edit Ticket" : "Create New Ticket"}
              </DialogTitle>
              <DialogDescription>
                {selectedTicket ? "Update ticket details" : "Create a new ticket to assign"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Project (Optional)</Label>
                <Select
                  value={formData.projectId}
                  onValueChange={(value) => setFormData({ ...formData, projectId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No project</SelectItem>
                    {projects.map((proj) => (
                      <SelectItem key={proj.id} value={proj.id}>
                        {proj.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {selectedTicket ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            All Tickets ({tickets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No tickets yet. Create your first one!
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => {
                  const priorityConfig = priorityOptions.find((p) => p.value === ticket.priority);
                  const statusConfig = statusOptions.find((s) => s.value === ticket.status);
                  return (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ticket.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {ticket.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={priorityConfig?.color}>{priorityConfig?.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig?.color}>{statusConfig?.label}</Badge>
                      </TableCell>
                      <TableCell>
                        {ticket.projectName || <span className="text-muted-foreground">—</span>}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={ticket.assignedTo?.id || "unassigned"}
                          onValueChange={(value) => 
                            handleAssign(ticket.id, value === "unassigned" ? null : value)
                          }
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Assign" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unassigned">Unassigned</SelectItem>
                            {employees.map((emp) => (
                              <SelectItem key={emp.id} value={emp.id}>
                                {emp.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(ticket)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDelete(ticket.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
