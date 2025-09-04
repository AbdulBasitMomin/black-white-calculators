
import { NavLink, useLocation } from "react-router-dom";
import { Calculator, Heart, DollarSign, Calendar, Clock, GraduationCap, Moon, Baby, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { name: 'Home', path: '/', icon: Home, ariaLabel: 'Home' },
  { name: 'Age Calculator', path: '/age', icon: Calculator, ariaLabel: 'Age Calculator' },
  { name: 'BMI Calculator', path: '/bmi', icon: Heart, ariaLabel: 'BMI Calculator' },
  { name: 'Currency Converter', path: '/currency', icon: DollarSign, ariaLabel: 'Currency Converter' },
  { name: 'Days Calculator', path: '/days', icon: Calendar, ariaLabel: 'Days Calculator' },
  { name: 'Countdown Timer', path: '/countdown', icon: Clock, ariaLabel: 'Countdown Timer' },
  { name: 'GPA Calculator', path: '/gpa', icon: GraduationCap, ariaLabel: 'GPA Calculator' },
  { name: 'Calorie Calculator', path: '/calorie', icon: Heart, ariaLabel: 'Calorie Calculator' },
  { name: 'Sleep Calculator', path: '/sleep', icon: Moon, ariaLabel: 'Sleep Calculator' },
  { name: 'Pregnancy Calculator', path: '/pregnancy', icon: Baby, ariaLabel: 'Pregnancy Calculator' },
];

export function AppSidebar() {
  const { state, isMobile } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border backdrop-blur-md bg-background/95">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold mb-4 px-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Calculator Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 w-full group ${
                          navIsActive
                            ? 'bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary font-medium border-r-2 border-primary shadow-md'
                            : 'text-muted-foreground hover:bg-gradient-to-r hover:from-muted hover:to-muted/50 hover:text-foreground hover:shadow-sm hover:scale-105'
                        }`
                      }
                      aria-label={item.ariaLabel}
                    >
                      <item.icon 
                        className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                          isActive(item.path) ? 'text-primary animate-pulse' : 'text-muted-foreground group-hover:text-primary group-hover:scale-110'
                        }`} 
                      />
                      {(!isCollapsed || isMobile) && (
                        <span className="text-sm font-medium truncate">
                          {item.name}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
