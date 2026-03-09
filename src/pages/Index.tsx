import Navbar from "@/components/Navbar";
import AppCard from "@/components/AppCard";
import Footer from "@/components/Footer";
import {
  ClipboardList,
  ScanSearch,
  Calendar,
  Users,
  FileText,
  MessageSquare,
} from "lucide-react";

const apps = [
  { icon: ClipboardList, name: "Work Log System", description: "Track daily tasks, hours, and project progress with detailed reporting.", isPopular: true },
  { icon: ScanSearch, name: "CV Scanner", description: "Automatically parse and analyze resumes with AI-powered extraction." },
  { icon: Calendar, name: "Smart Scheduler", description: "AI-powered calendar management and meeting coordination." },
  { icon: Users, name: "Team Manager", description: "Organize teams, assign roles, and streamline collaboration." },
  { icon: FileText, name: "Document Hub", description: "Create, share, and manage documents with version control." },
  { icon: MessageSquare, name: "Team Chat", description: "Instant messaging with channels, threads, and file sharing." },
];

const Index = () => {
  return (
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight max-w-2xl mx-auto">
          WORKFORCE MANAGEMENT 
        </h1>
        <p className="mt-4 text-base md:text-lg max-w-xl mx-auto" style={{ color: "hsl(var(--hero-subtitle))" }}>
          Powerful tools to help you manage work, boost productivity, and keep your team aligned — all in one place.
        </p>
      </section>

      {/* App Grid */}
      <section className="relative z-10 container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {apps.map((app) => (
            <AppCard key={app.name} {...app} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;