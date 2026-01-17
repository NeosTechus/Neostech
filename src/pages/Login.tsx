import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, User, Eye, ArrowLeft } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import logo from "@/assets/logo.png";

// Demo credentials
const DEMO_ADMIN = { email: "admin@demo.com", password: "demo123" };
const DEMO_EMPLOYEE = { email: "employee@demo.com", password: "demo123" };

export default function Login() {
  const [activeTab, setActiveTab] = useState<"employee" | "admin">("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isAdmin = activeTab === "admin";
    const demoCredentials = isAdmin ? DEMO_ADMIN : DEMO_EMPLOYEE;

    // Demo mode check
    if (email === demoCredentials.email && password === demoCredentials.password) {
      if (isAdmin) {
        localStorage.setItem("is_admin", "true");
        localStorage.setItem("demo_mode", "true");
        toast({
          title: "Demo Mode Active",
          description: "Logged in as demo admin.",
        });
        navigate("/admin");
      } else {
        localStorage.setItem("is_employee", "true");
        localStorage.setItem("demo_mode", "true");
        toast({
          title: "Demo Mode Active",
          description: "Logged in as demo employee.",
        });
        navigate("/employee");
      }
      setLoading(false);
      return;
    }

    try {
      const result = isAdmin
        ? await apiClient.adminLogin(email, password)
        : await apiClient.employeeLogin(email, password);

      if (result.error) {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      if (isAdmin && result.data && 'isAdmin' in result.data && result.data.isAdmin) {
        localStorage.setItem("is_admin", "true");
        localStorage.removeItem("demo_mode");
        toast({
          title: "Welcome back!",
          description: "Successfully logged in as admin.",
        });
        navigate("/admin");
      } else if (!isAdmin && result.data) {
        localStorage.setItem("is_employee", "true");
        localStorage.removeItem("demo_mode");
        toast({
          title: "Welcome back!",
          description: "Successfully logged in.",
        });
        navigate("/employee");
      } else {
        toast({
          title: "Access denied",
          description: "Invalid credentials or insufficient privileges.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    const demo = activeTab === "admin" ? DEMO_ADMIN : DEMO_EMPLOYEE;
    setEmail(demo.email);
    setPassword(demo.password);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img 
          src={logo} 
          alt="" 
          className="w-[600px] h-[600px] object-contain opacity-[0.03]"
        />
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Back to home */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-6 left-6 text-muted-foreground hover:text-foreground"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => {
              setActiveTab("employee");
              resetForm();
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === "employee"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            <User className="h-4 w-4" />
            Employee
          </button>
          <button
            onClick={() => {
              setActiveTab("admin");
              resetForm();
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === "admin"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            <Shield className="h-4 w-4" />
            Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={activeTab === "admin" ? "admin@company.com" : "you@company.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="h-12 bg-muted/30 border-border/50 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="h-12 bg-muted/30 border-border/50 focus:border-primary"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              `Sign In as ${activeTab === "admin" ? "Admin" : "Employee"}`
            )}
          </Button>
        </form>

        {/* Demo credentials */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 bg-muted/30"
            onClick={fillDemoCredentials}
          >
            <Eye className="w-4 h-4 mr-2" />
            Use Demo Credentials
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            {activeTab === "admin" 
              ? "Demo: admin@demo.com / demo123"
              : "Demo: employee@demo.com / demo123"
            }
          </p>
        </div>
      </div>
    </div>
  );
}