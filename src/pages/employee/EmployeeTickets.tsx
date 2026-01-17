import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Ticket, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface TicketData {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  projectId?: string;
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<string, string> = {
  'open': 'bg-blue-500/10 text-blue-500',
  'in-progress': 'bg-yellow-500/10 text-yellow-500',
  'resolved': 'bg-green-500/10 text-green-500',
  'closed': 'bg-muted text-muted-foreground',
};

const priorityColors: Record<string, string> = {
  'low': 'bg-muted text-muted-foreground',
  'medium': 'bg-yellow-500/10 text-yellow-500',
  'high': 'bg-orange-500/10 text-orange-500',
  'urgent': 'bg-red-500/10 text-red-500',
};

export default function EmployeeTickets() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingTicket, setUpdatingTicket] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const fetchTickets = async () => {
    const result = await apiClient.getEmployeeDashboard();
    
    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    setTickets((result.data as any)?.tickets || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
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
      fetchTickets();
    }
    
    setUpdatingTicket(null);
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === "all") return true;
    if (activeTab === "open") return ticket.status === "open";
    if (activeTab === "in-progress") return ticket.status === "in-progress";
    if (activeTab === "resolved") return ["resolved", "closed"].includes(ticket.status);
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Tickets</h2>
        <p className="text-muted-foreground">
          Manage and update your assigned tickets
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            <Ticket className="w-4 h-4" />
            All ({tickets.length})
          </TabsTrigger>
          <TabsTrigger value="open" className="gap-2">
            <AlertCircle className="w-4 h-4" />
            Open ({tickets.filter(t => t.status === 'open').length})
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="gap-2">
            <Clock className="w-4 h-4" />
            In Progress ({tickets.filter(t => t.status === 'in-progress').length})
          </TabsTrigger>
          <TabsTrigger value="resolved" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Resolved ({tickets.filter(t => ['resolved', 'closed'].includes(t.status)).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredTickets.length === 0 ? (
            <Card className="glass">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Ticket className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No tickets in this category</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <Card key={ticket.id} className="glass">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{ticket.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {ticket.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={priorityColors[ticket.priority]}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={statusColors[ticket.status]}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                        <span>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <Select
                        value={ticket.status}
                        onValueChange={(value) => handleStatusChange(ticket.id, value)}
                        disabled={updatingTicket === ticket.id}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
