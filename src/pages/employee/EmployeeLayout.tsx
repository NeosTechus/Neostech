import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";
import { EmployeeSidebar } from "@/components/employee/EmployeeSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";

export default function EmployeeLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = apiClient.getToken();
      
      if (!token) {
        navigate("/employee/login");
        return;
      }

      // Verify token is valid
      const result = await apiClient.getProfile();
      
      if (result.error) {
        apiClient.logout();
        navigate("/employee/login");
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <EmployeeSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border/50 flex items-center px-4 bg-card/50">
            <SidebarTrigger className="mr-4" />
            <h1 className="font-semibold">Employee Portal</h1>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
