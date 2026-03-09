import { useState, useEffect } from "react";
import { Lock, Unlock, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppAuthModal from "@/components/AppAuthModal";
import SubscriptionModal from "./SubscriptionModal";
import LoginModal from "./LoginModal";
import { useAuth } from "@/contexts/AuthContext";

interface AppCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  isPopular?: boolean;
  iconColor?: string;
  iconBgColor?: string;
  appId: number;
  prices?: {
    individual: number;
    team: number;
    enterprise: number;
  };
  features?: {
    individual: string[];
    team: string[];
    enterprise: string[];
  };
}

const AppCard = ({ 
  icon: Icon, 
  name, 
  description, 
  isPopular, 
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
  appId,
  prices = {
    individual: 9.99,
    team: 29.99,
    enterprise: 99.99
  },
  features = {
    individual: ['Basic features', '1 user', 'Email support'],
    team: ['All individual features', 'Up to 5 users', 'Priority support', 'Analytics'],
    enterprise: ['All team features', 'Unlimited users', '24/7 support', 'Custom integrations', 'SLA']
  }
}: AppCardProps) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  
  const { user, checkAppAccess, refreshSubscriptions } = useAuth();

  // Check access when user or subscriptions change
  useEffect(() => {
    if (user) {
      setHasAccess(checkAppAccess(appId));
    } else {
      setHasAccess(false);
    }
  }, [user, checkAppAccess, appId]);

  // Map icon colors to matching background colors
  const getBgColor = () => {
    if (iconBgColor !== "bg-primary/10") return iconBgColor;
    
    switch(iconColor) {
      case "text-green-500": return "bg-green-100";
      case "text-blue-500": return "bg-blue-100";
      case "text-purple-500": return "bg-purple-100";
      case "text-orange-500": return "bg-orange-100";
      case "text-red-500": return "bg-red-100";
      case "text-yellow-500": return "bg-yellow-100";
      default: return "bg-primary/10";
    }
  };

  const handleSubscribe = async (plan: string) => {
    // API call to create subscription
    const response = await fetch('http://localhost:8000/api/subscriptions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({
        app_id: appId,
        plan: plan
      })
    });

    if (response.ok) {
      // In production, you'd redirect to Stripe here
      // For now, simulate payment
      const subscription = await response.json();
      
      // Simulate payment success
      await fetch(`http://localhost:8000/api/subscriptions/${subscription.id}/pay/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      // Refresh subscriptions to update access
      await refreshSubscriptions();
    }
  };

  const handlePreview = () => {
    if (!user) {
      setLoginOpen(true);
    } else {
      // Open preview mode (limited access)
      window.open(`/preview/${appId}`, '_blank');
    }
  };

  const handleAccess = () => {
    if (hasAccess) {
      // Open the full app
      window.open(`/app/${appId}`, '_blank');
    } else {
      setSubscriptionOpen(true);
    }
  };

  return (
    <>
      <div
        className={`relative bg-card rounded-xl p-8 transition-all duration-300 ease-out group cursor-pointer ${
          isPopular
            ? "ring-2 ring-accent shadow-[var(--card-shadow-hover)]"
            : "shadow-[var(--card-shadow)]"
        } hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] ${
          hasAccess ? 'hover:bg-green-600' : 'hover:bg-[#1e3a8a]'
        } hover:text-white hover:z-10 opacity-90 hover:opacity-100`}
        onClick={handleAccess}
      >
        {/* Access badge */}
        <div className={`absolute top-4 right-4 flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${
          hasAccess 
            ? 'bg-green-100 text-green-700 group-hover:bg-white group-hover:text-green-700' 
            : 'bg-muted/60 text-muted-foreground group-hover:bg-white/20 group-hover:text-white/90'
        } transition-colors duration-300`}>
          {hasAccess ? (
            <>
              <Unlock className="h-3.5 w-3.5" />
              <span>Unlocked</span>
            </>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5" />
              <span>Locked</span>
            </>
          )}
        </div>

        {isPopular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-white group-hover:text-[#1e3a8a] transition-colors duration-300 z-20">
            Most Popular
          </span>
        )}
        
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`w-16 h-16 rounded-lg ${getBgColor()} flex items-center justify-center mb-2 group-hover:bg-white/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-white/20`}>
            <Icon className={`h-8 w-8 ${iconColor} group-hover:text-white transition-colors duration-300 group-hover:scale-110`} />
          </div>
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-white transition-colors duration-300">{name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed px-2 group-hover:text-white/90 transition-colors duration-300">{description}</p>
          
          <div className="flex gap-3 w-full mt-4">
            {hasAccess ? (
              <Button
                size="default"
                className="flex-1 transition-all duration-300 bg-green-600 text-white hover:bg-green-700 group-hover:bg-white group-hover:text-green-600 group-hover:border-white group-hover:shadow-lg group-hover:scale-105 py-5"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAccess();
                }}
              >
                Launch App
              </Button>
            ) : (
              <>
                <Button
                  variant="cardPrimary"
                  size="default"
                  className="flex-1 transition-all duration-300 group-hover:bg-white group-hover:text-[#1e3a8a] group-hover:border-white group-hover:shadow-lg group-hover:scale-105 py-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSubscriptionOpen(true);
                  }}
                >
                  Subscribe
                </Button>
                <Button
                  variant="cardSecondary"
                  size="default"
                  className="flex-1 transition-all duration-300 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 group-hover:shadow-lg group-hover:scale-105 py-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview();
                  }}
                >
                  Preview
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <SubscriptionModal
        open={subscriptionOpen}
        onOpenChange={setSubscriptionOpen}
        appName={name}
        appId={appId}
        prices={prices}
        features={features}
        onSubscribe={handleSubscribe}
      />

      <LoginModal
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSuccess={() => {
          // After login, open subscription or preview based on intent
          setLoginOpen(false);
          // User can now try preview or subscribe
        }}
        appName={name}
      />
    </>
  );
};

export default AppCard;