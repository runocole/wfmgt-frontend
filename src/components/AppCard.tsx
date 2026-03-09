import { useState } from "react";
import { Lock, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppAuthModal from "@/components/AppAuthModal";

interface AppCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  isPopular?: boolean;
  iconColor?: string;
  iconBgColor?: string;
}

const AppCard = ({ 
  icon: Icon, 
  name, 
  description, 
  isPopular, 
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10"
}: AppCardProps) => {
  const [authOpen, setAuthOpen] = useState(false);

  // Map icon colors to matching background colors
  const getBgColor = () => {
    if (iconBgColor !== "bg-primary/10") return iconBgColor;
    
    // Default mapping based on iconColor
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

  return (
    <>
      <div
        className={`relative bg-card rounded-xl p-8 transition-all duration-300 ease-out group cursor-pointer ${
          isPopular
            ? "ring-2 ring-accent shadow-[var(--card-shadow-hover)]"
            : "shadow-[var(--card-shadow)]"
        } hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] hover:bg-[#1e3a8a] hover:text-white hover:z-10`}
        onClick={() => setAuthOpen(true)}
      >
        {isPopular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-white group-hover:text-[#1e3a8a] transition-colors duration-300">
            Most Popular
          </span>
        )}
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`w-16 h-16 rounded-lg ${getBgColor()} flex items-center justify-center mb-2 group-hover:bg-white/20 transition-all duration-300`}>
            <Icon className={`h-8 w-8 ${iconColor} group-hover:text-white transition-colors duration-300`} />
          </div>
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-white transition-colors duration-300">{name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed px-2 group-hover:text-white/90 transition-colors duration-300">{description}</p>
          <div className="flex items-center gap-1.5 text-muted-foreground/60 text-xs group-hover:text-white/80 transition-colors duration-300 mt-2">
            <Lock className="h-3.5 w-3.5 group-hover:text-white/80 transition-colors duration-300" />
            <span>Locked</span>
          </div>
          <div className="flex gap-3 w-full mt-4">
            <Button
              variant="cardPrimary"
              size="default"
              className="flex-1 transition-all duration-300 group-hover:bg-white group-hover:text-[#1e3a8a] group-hover:border-white group-hover:shadow-lg group-hover:scale-105 py-5"
              onClick={(e) => {
                e.stopPropagation();
                setAuthOpen(true);
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
                setAuthOpen(true);
              }}
            >
              Preview
            </Button>
          </div>
        </div>
      </div>

      <AppAuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        appName={name}
        appIcon={Icon}
      />
    </>
  );
};

export default AppCard;