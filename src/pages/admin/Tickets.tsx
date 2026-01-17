import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface Ticket {
  id: string;
  subject: string;
  description: string;
  client: string;
  email: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "waiting" | "resolved" | "closed";
  createdAt: string;
  replies: Array<{ message: string; author: string; createdAt: string }>;
}

const statusColors: Record<string, string> = {
  open: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "in-progress": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  waiting: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  resolved: "bg-green-500/10 text-green-600 border-green-500/20",
  closed: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

const priorityColors: Record<string, string> = {
  low: "bg-gray-500/10 text-gray-600",
  medium: "bg-blue-500/10 text-blue-600",
  high: "bg-orange-500/10 text-orange-600",
  urgent: "bg-red-500/10 text-red-600",
};

const initialTickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "API Integration Issue",
    description: "We're experiencing timeout errors when trying to connect to the payment gateway API.",
    client: "RetailMax Inc.",
    email: "support@retailmax.com",
    priority: "high",
    status: "open",
    createdAt: "2024-01-20T08:30:00Z",
    replies: [],
  },
  {
    id: "TKT-002",
    subject: "Dashboard Loading Slowly",
    description: "The analytics dashboard takes over 10 seconds to load. This started after the last update.",
    client: "FinanceFirst Bank",
    email: "tech@financefirst.com",
    priority: "medium",
    status: "in-progress",
    createdAt: "2024-01-19T14:20:00Z",
    replies: [
      { message: "We've identified the issue and are working on a fix.", author: "Support Team", createdAt: "2024-01-19T16:00:00Z" }
    ],
  },
  {
    id: "TKT-003",
    subject: "Feature Request: Export to PDF",
    description: "Would love to have the ability to export reports directly to PDF format.",
    client: "SalesForce Pro",
    email: "admin@salesforcepro.io",
    priority: "low",
    status: "waiting",
    createdAt: "2024-01-18T09:00:00Z",
    replies: [],
  },
];

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const { toast } = useToast();

  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus as Ticket["status"] }
          : ticket
      )
    );
    toast({
      title: "Status updated",
      description: `Ticket status changed to ${newStatus}`,
    });
  };

  const handleReply = () => {
    if (!replyMessage.trim() || !selectedTicket) return;

    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              replies: [
                ...ticket.replies,
                { message: replyMessage, author: "Support Team", createdAt: new Date().toISOString() }
              ],
              status: "in-progress" as const,
            }
          : ticket
      )
    );

    setSelectedTicket(prev => prev ? {
      ...prev,
      replies: [...prev.replies, { message: replyMessage, author: "Support Team", createdAt: new Date().toISOString() }]
    } : null);

    setReplyMessage("");
    toast({
      title: "Reply sent",
      description: "Your response has been sent to the client",
    });
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    open: tickets.filter(t => t.status === "open").length,
    inProgress: tickets.filter(t => t.status === "in-progress").length,
    resolved: tickets.filter(t => ["resolved", "closed"].includes(t.status)).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Support Tickets</h2>
        <p className="text-muted-foreground">
          Manage client support requests and issues
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Tickets
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.open}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTickets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No tickets found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="text-sm text-muted-foreground">{ticket.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>{ticket.client}</TableCell>
                      <TableCell>
                        <Badge className={priorityColors[ticket.priority]}>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={ticket.status}
                          onValueChange={(value) => updateTicketStatus(ticket.id, value)}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <Badge 
                              variant="outline" 
                              className={statusColors[ticket.status]}
                            >
                              {ticket.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="waiting">Waiting</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(ticket.createdAt), "MMM d")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTicket?.subject}</DialogTitle>
            <DialogDescription>
              {selectedTicket?.id} • {selectedTicket?.client}
            </DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">{selectedTicket.description}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {format(new Date(selectedTicket.createdAt), "PPpp")}
                </p>
              </div>

              {selectedTicket.replies.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Replies</h4>
                  {selectedTicket.replies.map((reply, index) => (
                    <div key={index} className="bg-primary/5 p-4 rounded-lg border-l-2 border-primary">
                      <p className="text-sm">{reply.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {reply.author} • {format(new Date(reply.createdAt), "PPpp")}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Reply</h4>
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your response..."
                  rows={3}
                />
                <Button onClick={handleReply} disabled={!replyMessage.trim()}>
                  Send Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
