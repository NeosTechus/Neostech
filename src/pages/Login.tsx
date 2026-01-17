import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, User, Eye } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-3 group">
            <img 
              src={logo} 
              alt="Neos Tech" 
              className="h-16 w-auto transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-bold tracking-tight">
              Neos <span className="text-gradient">Tech</span>
            </span>
          </Link>
          <p className="text-muted-foreground mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        <Card className="border-border/50 shadow-xl shadow-primary/5">
          <CardContent className="pt-6">
          <Tabs 
            value={activeTab} 
            onValueChange={(v) => {
              setActiveTab(v as "employee" | "admin");
              resetForm();
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="employee" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Employee
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="employee">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-email">Email</Label>
                  <Input
                    id="employee-email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee-password">Password</Label>
                  <Input
                    id="employee-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In as Employee"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In as Admin"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={fillDemoCredentials}
            >
              <Eye className="w-4 h-4 mr-2" />
              Use Demo Credentials
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              {activeTab === "admin" 
                ? "Demo: admin@demo.com / demo123"
                : "Demo: employee@demo.com / demo123"
              }
            </p>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}