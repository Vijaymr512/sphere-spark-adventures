
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Calendar, BookOpen, Pencil, Lightbulb, Gamepad,
  Star, Award, Edit, Home, Menu, LogIn, X
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, to, isActive, onClick }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
        isActive
          ? "bg-kidz-primary text-white"
          : "hover:bg-kidz-light hover:text-kidz-dark text-gray-600"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const DashboardSidebar = () => {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", to: "/dashboard" },
    { icon: <Calendar size={20} />, label: "Daily Activities", to: "/dashboard/daily-activities" },
    { icon: <Pencil size={20} />, label: "Drawing Prompts", to: "/dashboard/drawing-prompts" },
    { icon: <BookOpen size={20} />, label: "Story Time", to: "/dashboard/stories" },
    { icon: <Lightbulb size={20} />, label: "Brain Games", to: "/dashboard/games" },
    { icon: <Gamepad size={20} />, label: "Offline Games", to: "/dashboard/offline-games" },
    { icon: <Star size={20} />, label: "Roleplay Adventures", to: "/dashboard/adventures" },
    { icon: <Award size={20} />, label: "DIY Projects", to: "/dashboard/projects" },
    { icon: <Edit size={20} />, label: "ABC & 123", to: "/dashboard/early-learning" },
  ];

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <Button
          variant="outline"
          size="icon"
          className="bg-white border-kidz-primary"
          onClick={toggleMobileSidebar}
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-kidz-light h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="bg-gradient-to-r from-kidz-primary to-kidz-dark rounded-lg p-2">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-2xl font-bold gradient-text">KidzSphere</span>
          </Link>

          <div className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                to={item.to}
                isActive={location.pathname === item.to}
              />
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-kidz-light mt-4">
          <Button asChild variant="outline" className="w-full border-kidz-primary hover:bg-kidz-light">
            <Link to="/">
              <LogIn className="mr-2 h-4 w-4" />
              Sign Out
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-gray-800/50 backdrop-blur-sm" onClick={closeMobileSidebar}></div>
          
          {/* Sidebar */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
            <div className="absolute top-0 right-0 p-4">
              <Button variant="ghost" size="icon" onClick={closeMobileSidebar}>
                <X size={20} />
              </Button>
            </div>
            
            <div className="p-6">
              <Link to="/" className="flex items-center gap-2 mb-8" onClick={closeMobileSidebar}>
                <div className="bg-gradient-to-r from-kidz-primary to-kidz-dark rounded-lg p-2">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <span className="text-2xl font-bold gradient-text">KidzSphere</span>
              </Link>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    isActive={location.pathname === item.to}
                    onClick={closeMobileSidebar}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-kidz-light mt-auto">
              <Button asChild variant="outline" className="w-full border-kidz-primary hover:bg-kidz-light" onClick={closeMobileSidebar}>
                <Link to="/">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign Out
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
