import { Lock, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  isPopular?: boolean;
}

const AppCard = ({ icon: Icon, name, description, isPopular }: AppCardProps) => {
  return (
    <div
      className={`relative bg-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group ${
        isPopular
          ? "ring-2 ring-accent shadow-[var(--card-shadow-hover)]"
          : "shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)]"
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-1">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-card-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="flex items-center gap-1.5 text-muted-foreground/60 text-xs">
          <Lock className="h-3.5 w-3.5" />
          <span>Locked</span>
        </div>
        <div className="flex gap-3 w-full mt-2">
          <Button variant="cardPrimary" size="sm" className="flex-1">Subscribe</Button>
          <Button variant="cardSecondary" size="sm" className="flex-1">Preview</Button>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
