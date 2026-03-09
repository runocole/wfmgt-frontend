import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "login" | "signup";
  onToggleMode: () => void;
}

const AuthModal = ({ open, onOpenChange, mode, onToggleMode }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to your backend
    console.log(`${mode} submitted:`, formData);
  };

  const isLogin = mode === "login";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-card border-none p-0 overflow-hidden rounded-2xl shadow-2xl">
        {/* Gradient header */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-8 pb-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-primary-foreground">
              {isLogin ? "Welcome back" : "Create your account"}
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/70 text-sm mt-1">
              {isLogin
                ? "Sign in to access your productivity tools"
                : "Join thousands of teams boosting their productivity"}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="auth-name" className="text-card-foreground text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <Input
                  id="auth-name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 h-11 bg-muted/5 border-border/50 text-card-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="auth-email" className="text-card-foreground text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <Input
                id="auth-email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 h-11 bg-muted/5 border-border/50 text-card-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="auth-password" className="text-card-foreground text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <Input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10 h-11 bg-muted/5 border-border/50 text-card-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="auth-confirm" className="text-card-foreground text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <Input
                  id="auth-confirm"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 h-11 bg-muted/5 border-border/50 text-card-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-xs text-primary hover:text-accent transition-colors font-medium">
                Forgot password?
              </button>
            </div>
          )}

          <Button type="submit" className="w-full h-11 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg shadow-primary/25 group">
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground/60">or</span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground/70">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-primary hover:text-accent font-semibold transition-colors"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
