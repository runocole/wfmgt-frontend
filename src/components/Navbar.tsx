import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="h-20 bg-nav flex items-center px-8 justify-between">
      <div className="flex items-center gap-3">
        <Briefcase className="h-7 w-7 text-accent" />
        <span className="text-xl font-bold text-nav-foreground">OTIC Workforce</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-nav-foreground/70 hover:text-nav-foreground transition-colors text-sm font-medium">Apps</a>
        <a href="#" className="text-nav-foreground/70 hover:text-nav-foreground transition-colors text-sm font-medium">Pricing</a>
        <a href="#" className="text-nav-foreground/70 hover:text-nav-foreground transition-colors text-sm font-medium">Docs</a>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="navOutline" size="sm">Login</Button>
        <Button variant="navSolid" size="sm">Sign Up</Button>
      </div>
    </nav>
  );
};

export default Navbar;
