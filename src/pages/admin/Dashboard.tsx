import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FolderKanban, 
  TrendingUp, 
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  CreditCard,
  DollarSign,
  Link2,
  StickyNote,
  Plus,
  Pin
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface Stats {
  totalProjects: number;
  activeProjects: number;
  totalLeads: number;
  newLeads: number;
  openTickets: number;
  resolvedTickets: number;
  publishedPosts: number;
  draftPosts: number;
  totalEmployees: number;
}

interface PaymentStats {
  totalRevenue: number;
  paymentLinksRevenue: number;
  invoicesRevenue: number;
  totalPaymentLinks: number;
  activePaymentLinks: number;
  paidPaymentLinks: number;
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
}

interface RecentNote {
  id: string;
  title: string;
  content: string;
  color: string;
  isPinned: boolean;
  updatedAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalProjects: 12,
    activeProjects: 5,
    totalLeads: 48,
    newLeads: 8,
    openTickets: 3,
    resolvedTickets: 27,
    publishedPosts: 15,
    draftPosts: 4,
    totalEmployees: 6,
  });

  const [paymentStats, setPaymentStats] = useState<PaymentStats | null>(null);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [recentNotes, setRecentNotes] = useState<RecentNote[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);

  const isDemoMode = localStorage.getItem("demo_mode") === "true";

  useEffect(() => {
    const fetchData = async () => {
      if (!isDemoMode) {
        // Fetch payment stats
        try {
          const paymentResult = await apiClient.getPaymentStats();
          if (paymentResult.data) {
            setPaymentStats(paymentResult.data);
          }
        } catch (error) {
          console.error("Failed to fetch payment stats:", error);
        }
        setLoadingPayments(false);

        // Fetch recent notes
        try {
          const notesResult = await apiClient.getRecentNotes();
          if (notesResult.data) {
            setRecentNotes(notesResult.data);
          }
        } catch (error) {
          console.error("Failed to fetch notes:", error);
        }
        setLoadingNotes(false);
      } else {
        setLoadingPayments(false);
        setLoadingNotes(false);
      }
    };

    fetchData();
  }, [isDemoMode]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statCards = [
    {
      title: "Team Members",
      value: stats.totalEmployees,
      subtitle: "Active employees",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      subtitle: `${stats.totalProjects} total projects`,
      icon: FolderKanban,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Open Tickets",
      value: stats.openTickets,
      subtitle: `${stats.resolvedTickets} resolved`,
      icon: MessageSquare,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      subtitle: `${stats.totalLeads} total leads`,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your business.
          </p>
        </div>
        {isDemoMode && (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
            Demo Mode
          </Badge>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Stats Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingPayments ? (
            <div className="text-sm text-muted-foreground">Loading payment data...</div>
          ) : paymentStats ? (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(paymentStats.totalRevenue)}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Revenue</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Payment Links</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(paymentStats.paymentLinksRevenue)}</p>
                    <p className="text-xs text-muted-foreground">
                      {paymentStats.paidPaymentLinks} paid / {paymentStats.activePaymentLinks} active
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Invoices</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(paymentStats.invoicesRevenue)}</p>
                    <p className="text-xs text-muted-foreground">
                      {paymentStats.paidInvoices} paid / {paymentStats.pendingInvoices} pending
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              No payment data available. Create payment links or invoices to see stats here.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/10 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">New employee added</p>
                <p className="text-xs text-muted-foreground">Sarah Johnson - Developer - 1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <FolderKanban className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Project milestone completed</p>
                <p className="text-xs text-muted-foreground">E-commerce Platform - 5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-full">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Ticket assigned</p>
                <p className="text-xs text-muted-foreground">API Integration issue → Mike Chen - 1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">New lead received</p>
                <p className="text-xs text-muted-foreground">John from TechCorp - 2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <StickyNote className="h-5 w-5 text-primary" />
              Quick Notes
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/notes')}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            {loadingNotes ? (
              <p className="text-sm text-muted-foreground">Loading notes...</p>
            ) : recentNotes.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-2">No notes yet</p>
                <Button variant="outline" size="sm" onClick={() => navigate('/admin/notes')}>
                  Create your first note
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentNotes.slice(0, 3).map((note) => (
                  <div 
                    key={note.id}
                    className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => navigate('/admin/notes')}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {note.title && (
                          <p className="text-sm font-medium truncate">{note.title}</p>
                        )}
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {note.content || <span className="italic">No content</span>}
                        </p>
                      </div>
                      {note.isPinned && (
                        <Pin className="h-3 w-3 text-primary shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
                {recentNotes.length > 3 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full" 
                    onClick={() => navigate('/admin/notes')}
                  >
                    View all notes ({recentNotes.length})
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
