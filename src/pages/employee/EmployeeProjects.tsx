import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FolderOpen, Calendar, Users } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  deadline?: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  'planning': 'bg-blue-500/10 text-blue-500',
  'in-progress': 'bg-yellow-500/10 text-yellow-500',
  'review': 'bg-purple-500/10 text-purple-500',
  'completed': 'bg-green-500/10 text-green-500',
};

export default function EmployeeProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await apiClient.getEmployeeDashboard();
      
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      setProjects((result.data as any)?.projects || []);
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

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
        <h2 className="text-2xl font-bold">My Projects</h2>
        <p className="text-muted-foreground">
          View and track all projects assigned to you
        </p>
      </div>

      {projects.length === 0 ? (
        <Card className="glass">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No projects assigned yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="glass card-hover">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={statusColors[project.status]}>
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {project.deadline && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FolderOpen className="w-4 h-4" />
                    <span>Started: {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
