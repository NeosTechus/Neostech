import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api-client";
import { Loader2, ArrowLeft, Briefcase, Eye } from "lucide-react";

// Demo credentials for testing (only available in development)
const DEMO_EMPLOYEE_EMAIL = "employee@demo.com";
const DEMO_EMPLOYEE_PASSWORD = "demo123";
const IS_DEV = import.meta.env.DEV;

export default function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo mode - bypass API for testing (only in development)
    if (IS_DEV && email === DEMO_EMPLOYEE_EMAIL && password === DEMO_EMPLOYEE_PASSWORD) {
      localStorage.setItem("is_employee", "true");
      localStorage.setItem("demo_mode", "true");
      toast({
        title: "Demo Mode Active",
        description: "Logged in with demo credentials.",
      });
      navigate("/employee");
      setIsLoading(false);
      return;
    }

    try {
      const result = await apiClient.employeeLogin(email, password);

      if (result.error) {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      if (result.data?.isEmployee) {
        localStorage.removeItem("demo_mode");
        toast({
          title: "Welcome back!",
          description: "Redirecting to your dashboard...",
        });
        navigate("/employee");
      } else {
        toast({
          title: "Access denied",
          description: "You don't have an employee account.",
          variant: "destructive",
        });
        apiClient.logout();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail(DEMO_EMPLOYEE_EMAIL);
    setPassword(DEMO_EMPLOYEE_PASSWORD);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="w-full max-w-md relative">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="glass border-border/50">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Employee Portal</CardTitle>
            <CardDescription>
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@neostechus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-secondary/50"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {IS_DEV && (
              <div className="mt-6 pt-6 border-t border-border/50">
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
                  Demo: employee@demo.com / demo123
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
