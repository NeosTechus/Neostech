import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageLoader } from "@/components/ui/PageLoader";

// Lazy-loaded public pages
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const Team = lazy(() => import("./pages/Team"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Projects = lazy(() => import("./pages/Projects"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const BrandGuidelines = lazy(() => import("./pages/BrandGuidelines"));

// Lazy-loaded admin pages
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminEmployees = lazy(() => import("./pages/admin/Employees"));
const AdminProjectsManage = lazy(() => import("./pages/admin/AdminProjectsManage"));
const AdminTicketsManage = lazy(() => import("./pages/admin/AdminTicketsManage"));
const Leads = lazy(() => import("./pages/admin/Leads"));
const Blog = lazy(() => import("./pages/admin/Blog"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const Notes = lazy(() => import("./pages/admin/Notes"));
const Finance = lazy(() => import("./pages/admin/Finance"));

// Lazy-loaded employee pages
const EmployeeLayout = lazy(() => import("./pages/employee/EmployeeLayout"));
const EmployeeLogin = lazy(() => import("./pages/employee/EmployeeLogin"));
const EmployeeDashboard = lazy(() => import("./pages/employee/EmployeeDashboard"));
const EmployeeProjects = lazy(() => import("./pages/employee/EmployeeProjects"));
const EmployeeTickets = lazy(() => import("./pages/employee/EmployeeTickets"));
const EmployeeProfile = lazy(() => import("./pages/employee/EmployeeProfile"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/brand" element={<BrandGuidelines />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<AdminEmployees />} />
            <Route path="projects" element={<AdminProjectsManage />} />
            <Route path="tickets" element={<AdminTicketsManage />} />
            <Route path="leads" element={<Leads />} />
            <Route path="finance" element={<Finance />} />
            <Route path="notes" element={<Notes />} />
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <CookieConsent />
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
