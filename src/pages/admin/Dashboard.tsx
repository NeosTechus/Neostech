import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FolderKanban, 
  TrendingUp, 
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Users
} from "lucide-react";

interface Stats {
  totalProjects: number;
  activeProjects: number;
  totalLeads: number;
  newLeads: number;
  openTickets: number;
  resolvedTickets: number;
  publishedPosts: number;
  draftPosts: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 12,
    activeProjects: 5,
    totalLeads: 48,
    newLeads: 8,
    openTickets: 3,
    resolvedTickets: 27,
    publishedPosts: 15,
    draftPosts: 4,
  });

  const statCards = [
    {
      title: "Active Projects",
      value: stats.activeProjects,
      subtitle: `${stats.totalProjects} total projects`,
      icon: FolderKanban,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      subtitle: `${stats.totalLeads} total leads`,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
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
      title: "Published Posts",
      value: stats.publishedPosts,
      subtitle: `${stats.draftPosts} drafts`,
      icon: FileText,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your business.
        </p>
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
                <p className="text-sm font-medium">New lead received</p>
                <p className="text-xs text-muted-foreground">John from TechCorp - 2 hours ago</p>
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
                <p className="text-sm font-medium">Support ticket opened</p>
                <p className="text-xs text-muted-foreground">API Integration issue - 1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Use the sidebar to manage your projects, respond to leads, handle support tickets, and publish content.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
