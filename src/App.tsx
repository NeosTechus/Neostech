import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminEmployees from "./pages/admin/Employees";
import AdminProjectsManage from "./pages/admin/AdminProjectsManage";
import AdminTicketsManage from "./pages/admin/AdminTicketsManage";
import Leads from "./pages/admin/Leads";
import Blog from "./pages/admin/Blog";
import Settings from "./pages/admin/Settings";

// Employee pages
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeProjects from "./pages/employee/EmployeeProjects";
import EmployeeTickets from "./pages/employee/EmployeeTickets";
import EmployeeProfile from "./pages/employee/EmployeeProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<AdminEmployees />} />
            <Route path="projects" element={<AdminProjectsManage />} />
            <Route path="tickets" element={<AdminTicketsManage />} />
            <Route path="leads" element={<Leads />} />
            <Route path="blog" element={<Blog />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Employee routes */}
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="projects" element={<EmployeeProjects />} />
            <Route path="tickets" element={<EmployeeTickets />} />
            <Route path="profile" element={<EmployeeProfile />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
