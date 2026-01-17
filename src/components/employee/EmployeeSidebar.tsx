import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { apiClient } from "@/lib/api-client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderOpen,
  Ticket,
  User,
  LogOut,
  Briefcase,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/employee",
    icon: LayoutDashboard,
  },
  {
    title: "My Projects",
    url: "/employee/projects",
    icon: FolderOpen,
  },
  {
    title: "My Tickets",
    url: "/employee/tickets",
    icon: Ticket,
  },
  {
    title: "Profile",
    url: "/employee/profile",
    icon: User,
  },
];

export function EmployeeSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const handleLogout = () => {
    apiClient.logout();
    navigate("/employee/login");
  };

  const isActive = (path: string) => {
    if (path === "/employee") {
      return location.pathname === "/employee";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 px-4 py-3">
            <Briefcase className="w-5 h-5 text-primary" />
            {!collapsed && <span className="font-semibold">Employee Portal</span>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={collapsed ? item.title : undefined}
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/employee"}
                      className="flex items-center gap-3 px-3 py-2"
                      activeClassName="bg-primary/10 text-primary"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
