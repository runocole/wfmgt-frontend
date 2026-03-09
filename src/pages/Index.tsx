import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AppCard from "@/components/AppCard";
import Footer from "@/components/Footer";
import {
  ClipboardList,
  ScanSearch,
  Users,
  FileText,
  MessageSquare,
  MonitorCheck,
  Loader2,
} from "lucide-react";
import { AuthProvider } from "@/contexts/AuthContext";

// Map icon names from backend to actual Lucide components
const iconMap: Record<string, any> = {
  ClipboardList: ClipboardList,
  ScanSearch: ScanSearch,
  MonitorCheck: MonitorCheck,
  Users: Users,
  FileText: FileText,
  MessageSquare: MessageSquare,
};

interface App {
  id: number;
  name: string;
  description: string;
  icon_name: string;
  is_popular: boolean;
  icon_color: string;
  icon_bg_color: string;
  order: number;
  individual_price: number;
  team_price: number;
  enterprise_price: number;
  individual_features: string[];
  team_features: string[];
  enterprise_features: string[];
}

const Index = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/apps/');
      if (!response.ok) {
        throw new Error('Failed to fetch apps');
      }
      const data = await response.json();
      setApps(data);
    } catch (err) {
      setError('Failed to load apps. Please try again later.');
      console.error('Error fetching apps:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format features for the AppCard
  const formatFeatures = (app: App) => ({
    individual: app.individual_features || [],
    team: app.team_features || [],
    enterprise: app.enterprise_features || []
  });

  // Format prices for the AppCard
  const formatPrices = (app: App) => ({
    individual: app.individual_price,
    team: app.team_price,
    enterprise: app.enterprise_price
  });

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-accent/3 blur-3xl" />
        </div>

        <Navbar />

        {/* Hero */}
        <section className="relative z-10 text-center py-16 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight max-w-5xl mx-auto whitespace-nowrap">
            WORKFORCE MANAGEMENT
          </h1>
          <p className="mt-4 text-base md:text-lg max-w-xl mx-auto" style={{ color: "hsl(var(--hero-subtitle))" }}>
            Powerful tools to help you manage work, boost productivity, and keep your team aligned — all in one place.
          </p>
        </section>

        {/* App Grid */}
        <section className="relative z-10 container mx-auto px-4 pb-20">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading apps...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">
              <p>{error}</p>
              <button 
                onClick={fetchApps}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
              {apps.map((app) => (
                <AppCard 
                  key={app.id}
                  appId={app.id}
                  icon={iconMap[app.icon_name] || ClipboardList} // Fallback icon
                  name={app.name}
                  description={app.description}
                  isPopular={app.is_popular}
                  iconColor={app.icon_color}
                  iconBgColor={app.icon_bg_color}
                  prices={formatPrices(app)}
                  features={formatFeatures(app)}
                />
              ))}
            </div>
          )}
        </section>

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Index;