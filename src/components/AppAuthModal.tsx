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
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Send,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

type Step = "auth" | "contact" | "success";

interface AppAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appName: string;
  appIcon: LucideIcon;
}

const AppAuthModal = ({ open, onOpenChange, appName, appIcon: AppIcon }: AppAuthModalProps) => {
  const [step, setStep] = useState<Step>("auth");
  const [showPassword, setShowPassword] = useState(false);
  const [authData, setAuthData] = useState({ username: "", password: "" });
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to your backend to verify credentials + subscription
    console.log("App auth submitted:", { appName, ...authData });
    // Simulate: user not subscribed → go to contact form
    setStep("contact");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to your backend to process payment/contact
    console.log("Contact form submitted:", { appName, ...contactData });
    setStep("success");
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset state on close
      setTimeout(() => {
        setStep("auth");
        setAuthData({ username: "", password: "" });
        setContactData({ fullName: "", email: "", phone: "", message: "" });
      }, 200);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] bg-card border-none p-0 overflow-hidden rounded-2xl shadow-2xl">
        {/* Header with app icon */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary p-8 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center">
              <AppIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <DialogHeader className="space-y-0">
                <DialogTitle className="text-xl font-extrabold text-primary-foreground">
                  {step === "auth" && appName}
                  {step === "contact" && "Subscribe to Continue"}
                  {step === "success" && "Request Sent!"}
                </DialogTitle>
                <DialogDescription className="text-primary-foreground/70 text-sm mt-0.5">
                  {step === "auth" && "Enter your credentials to access this tool"}
                  {step === "contact" && `You need an active subscription for ${appName}`}
                  {step === "success" && "We'll get back to you shortly"}
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          {/* Step indicator */}
          {step !== "success" && (
            <div className="flex gap-2 mt-4">
              <div className={`h-1 flex-1 rounded-full transition-colors ${step === "auth" ? "bg-primary-foreground" : "bg-primary-foreground/30"}`} />
              <div className={`h-1 flex-1 rounded-full transition-colors ${step === "contact" ? "bg-primary-foreground" : "bg-primary-foreground/30"}`} />
            </div>
          )}
        </div>

        {/* Step: Auth */}
        {step === "auth" && (
          <form onSubmit={handleAuthSubmit} className="p-8 pt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="app-username" className="text-card-foreground text-sm font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <Input
                  id="app-username"
                  placeholder="Enter your username"
                  value={authData.username}
                  onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
                  className="pl-10 h-11 bg-muted/5 border-border/50 text-card-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="app-password" className="text-card-foreground text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <Input
                  id="app-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={authData.password}
                  onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
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

            <Button type="submit" className="w-full h-11 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg shadow-primary/25 group">
              Continue
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </form>
        )}

        {/* Step: Contact / Payment */}
        {step === "contact" && (
          <form onSubmit={handleContactSubmit} className="p-8 pt-6 space-y-5">
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <p className="text-sm text-card-foreground/80 leading-relaxed">
                You don't have an active subscription for <span className="font-semibold text-card-foreground">{appName}</span>. Fill out the form below and our team will help you get started.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-card-foreground text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="contact-name"
                  placeholder="John Doe"
                  value={contactData.fullName}
                  onChange={(e) => setContactData({ ...contactData, fullName: e.target.value })}
                  className="h-11 bg-muted/5 border-border/50 text-card-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone" className="text-card-foreground text-sm font-medium">
                  Phone
                </Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className="h-11 bg-muted/5 border-border/50 text-card-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email" className="text-card-foreground text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="you@company.com"
                value={contactData.email}
                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                className="h-11 bg-muted/5 border-border/50 text-card-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message" className="text-card-foreground text-sm font-medium">
                Message <span className="text-muted-foreground/50 font-normal">(optional)</span>
              </Label>
              <Textarea
                id="contact-message"
                placeholder="Tell us about your team size and needs..."
                rows={3}
                value={contactData.message}
                onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                className="bg-muted/5 border-border/50 text-card-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-primary/20 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="cardSecondary"
                onClick={() => setStep("auth")}
                className="h-11 px-5"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Button type="submit" className="flex-1 h-11 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg shadow-primary/25 group">
                Submit Request
                <Send className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </form>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="p-8 pt-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-card-foreground">Request Received!</h3>
              <p className="text-sm text-muted-foreground/70 mt-1 leading-relaxed">
                Our team will review your request for <span className="font-medium text-card-foreground">{appName}</span> and get back to you within 24 hours.
              </p>
            </div>
            <Button
              onClick={() => handleClose(false)}
              variant="cardSecondary"
              className="h-10 px-8 mt-2"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppAuthModal;
