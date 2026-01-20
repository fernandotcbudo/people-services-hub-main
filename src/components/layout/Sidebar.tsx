import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Phone,
  Mail,
  AlertTriangle,
  DollarSign,
  Database,
  Shield,
  FileText,
  Clipboard,
  HelpCircle,
  Flag,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarLink {
  to: string;
  label: string;
  icon: React.ElementType;
  count?: number;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
  defaultOpen?: boolean;
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Main Categories",
    defaultOpen: true,
    links: [
      { to: "/", label: "Dashboard", icon: Home },
      { to: "/phone-scripts", label: "Phone Scripts", icon: Phone, count: 24 },
      { to: "/email-templates", label: "Email Templates", icon: Mail, count: 18 },
      { to: "/jira-responses", label: "JIRA Responses", icon: AlertTriangle, count: 32 },
      { to: "/payroll-scripts", label: "Payroll Scripts", icon: DollarSign, count: 15 },
      { to: "/ec-sf-workflows", label: "EC-SF Workflows", icon: Database, count: 21 },
      { to: "/security", label: "Security & Verification", icon: Shield, count: 12 },
    ],
  },
  {
    title: "Quick Links",
    defaultOpen: true,
    links: [
      { to: "/glossary", label: "HR Glossary", icon: FileText },
      { to: "/call-flow", label: "Call Flow Diagram", icon: FileText },
      { to: "/security-protocol", label: "Security Protocol", icon: Clipboard },
      { to: "/decision-tree", label: "Decision Tree", icon: HelpCircle },
    ],
  },
  {
    title: "Country Filters",
    defaultOpen: false,
    links: [
      { to: "/country/colombia", label: "Colombia", icon: Flag },
      { to: "/country/ecuador", label: "Ecuador", icon: Flag },
      { to: "/country/brazil", label: "Brazil", icon: Flag },
      { to: "/country/usa", label: "USA", icon: Flag },
      { to: "/country/canada", label: "Canada", icon: Flag },
    ],
  },
];

function SidebarSectionComponent({ section }: { section: SidebarSection }) {
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? true);
  const location = useLocation();

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-2 hover:text-foreground transition-colors"
      >
        {section.title}
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="space-y-1 animate-fade-in">
          {section.links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all",
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1">{link.label}</span>
                {link.count !== undefined && (
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-[57px] md:top-[57px] left-0 h-[calc(100vh-57px)] w-72 bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-300 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 md:hidden border-b border-sidebar-border">
          <span className="font-semibold">Menu</span>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {sidebarSections.map((section) => (
            <SidebarSectionComponent key={section.title} section={section} />
          ))}
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-4 left-4 md:hidden z-30 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
}
