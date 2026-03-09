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
} from "lucide-react";

const apps = [
  { 
    icon: ClipboardList, 
    name: "Work Log System", 
    description: "Track daily tasks, hours, and project progress with detailed reporting.", 
    isPopular: true,
    iconColor: "text-green-500",
    iconBgColor: "bg-green-100"
  },
  { 
    icon: ScanSearch, 
    name: "CV Scanner", 
    description: "Automatically parse and analyze resumes with AI-powered extraction.",
    iconColor: "text-blue-500",
    iconBgColor: "bg-blue-100"
  },
  { 
    icon: MonitorCheck, 
    name: "Proctored Assessment", 
    description: "Secure online exams with AI proctoring and plagiarism detection.",
    iconColor: "text-purple-500",
    iconBgColor: "bg-purple-100"
  },
  { 
    icon: Users, 
    name: "Team Manager", 
    description: "Organize teams, assign roles, and streamline collaboration.",
    iconColor: "text-orange-500",
    iconBgColor: "bg-orange-100"
  },
  { 
    icon: FileText, 
    name: "Document Hub", 
    description: "Create, share, and manage documents with version control.",
    iconColor: "text-red-500",
    iconBgColor: "bg-red-100"
  },
  { 
    icon: MessageSquare, 
    name: "Team Chat", 
    description: "Instant messaging with channels, threads, and file sharing.",
    iconColor: "text-yellow-500",
    iconBgColor: "bg-yellow-100"
  },
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight max-w-5xl mx-auto whitespace-nowrap">
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
            <AppCard 
              key={app.name} 
              icon={app.icon}
              name={app.name}
              description={app.description}
              isPopular={app.isPopular}
              iconColor={app.iconColor}
              iconBgColor={app.iconBgColor}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;