import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ClipboardList,
  ScanSearch,
  Calendar,
  Users,
  FileText,
  MessageSquare,
  ChevronDown,
  MonitorCheck,
} from "lucide-react";
import companyLogo from "@/assets/otic-logo.png"; 

const apps = [
  { icon: ClipboardList, name: "Work Log System", iconColor: "text-green-500", bgColor: "bg-green-50", hoverBg: "hover:bg-green-100" },
  { icon: ScanSearch, name: "CV Scanner", iconColor: "text-blue-500", bgColor: "bg-blue-50", hoverBg: "hover:bg-blue-100" },
  { icon: MonitorCheck, name: "Proctored Assessment", iconColor: "text-purple-500", bgColor: "bg-purple-50", hoverBg: "hover:bg-purple-100" },
  { icon: Users, name: "Team Manager", iconColor: "text-orange-500", bgColor: "bg-orange-50", hoverBg: "hover:bg-orange-100" },
  { icon: FileText, name: "Document Hub", iconColor: "text-red-500", bgColor: "bg-red-50", hoverBg: "hover:bg-red-100" },
  { icon: MessageSquare, name: "Team Chat", iconColor: "text-yellow-500", bgColor: "bg-yellow-50", hoverBg: "hover:bg-yellow-100" },
];

const Navbar = () => {
  return (
    <nav className="h-20 bg-nav flex items-center px-8 justify-between">
      <div className="flex items-center gap-3">
        <img src={companyLogo} alt="OTIC" className="h-8 w-auto" />
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        {/* Apps Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-nav-foreground/70 hover:text-nav-foreground transition-colors text-sm font-medium focus:outline-none">
            Apps <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-[400px] bg-white border border-gray-200 p-4 mt-2 shadow-lg"
            align="center"
          >
            <div className="grid grid-cols-2 gap-2">
              {apps.map((app) => {
                const Icon = app.icon;
                return (
                  <DropdownMenuItem 
                    key={app.name}
                    className={`p-3 cursor-pointer text-gray-900 ${app.hoverBg} focus:${app.hoverBg} rounded-lg transition-all duration-200`}
                    onClick={() => console.log(`Navigate to ${app.name}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${app.bgColor} flex items-center justify-center`}>
                        <Icon className={`h-4 w-4 ${app.iconColor}`} />
                      </div>
                      <span className="text-sm font-medium">{app.name}</span>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Pricing Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-nav-foreground/70 hover:text-nav-foreground transition-colors text-sm font-medium focus:outline-none">
            Pricing <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-64 bg-white border border-gray-200 p-2 mt-2 shadow-lg"
            align="center"
          >
            <DropdownMenuItem className="p-3 cursor-pointer text-gray-900 hover:bg-gray-100 focus:bg-gray-100 rounded-lg transition-colors">
              <div className="flex flex-col">
                <span className="font-medium">Individual</span>
                <span className="text-xs text-gray-600">For freelancers</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer text-gray-900 hover:bg-gray-100 focus:bg-gray-100 rounded-lg transition-colors">
              <div className="flex flex-col">
                <span className="font-medium">Team</span>
                <span className="text-xs text-gray-600">For small teams</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer text-gray-900 hover:bg-gray-100 focus:bg-gray-100 rounded-lg transition-colors">
              <div className="flex flex-col">
                <span className="font-medium">Enterprise</span>
                <span className="text-xs text-gray-600">For large orgs</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Contact Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-nav-foreground/70 hover:text-nav-foreground transition-colors text-sm font-medium focus:outline-none">
            Contact <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-64 bg-white border border-gray-200 p-2 mt-2 shadow-lg"
            align="center"
          >
            <DropdownMenuItem className="p-3 cursor-pointer text-gray-900 hover:bg-gray-100 focus:bg-gray-100 rounded-lg transition-colors">
              <div className="flex flex-col">
                <span className="font-medium">Email Us</span>
                <span className="text-xs text-gray-600">support@otic.com</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer text-gray-900 hover:bg-gray-100 focus:bg-gray-100 rounded-lg transition-colors">
              <div className="flex flex-col">
                <span className="font-medium">Live Chat</span>
                <span className="text-xs text-gray-600">24/7 support</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer text-gray-900 hover:bg-gray-100 focus:bg-gray-100 rounded-lg transition-colors">
              <div className="flex flex-col">
                <span className="font-medium">FAQ</span>
                <span className="text-xs text-gray-600">Common questions</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="navOutline" size="sm">Login</Button>
        <Button variant="navSolid" size="sm">Sign Up</Button>
      </div>
    </nav>
  );
};

export default Navbar;