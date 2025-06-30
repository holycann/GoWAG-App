"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Gauge,
  Webhook,
  Settings,
  PanelLeft,
  History,
  Reply,
  KeyRound,
  Shield,
  Users,
  Activity,
  BellRing,
  HandCoins,
  UserCircle2,
  UsersRound,
  Calendar,
  Megaphone,
  Image as ImageIcon,
  BarChart3,
  Puzzle,
  Receipt,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Main statistics and overview",
  },
  {
    href: "/dashboard/contacts",
    label: "Contacts",
    icon: UserCircle2,
    description: "Manage contacts and groups",
  },
  {
    href: "/dashboard/groups",
    label: "Groups",
    icon: UsersRound,
    description: "Manage WhatsApp groups",
  },
  {
    href: "/dashboard/messages",
    label: "Messages",
    icon: MessageSquare,
    description: "Send manual/bulk messages",
  },
  {
    href: "/dashboard/scheduled-messages",
    label: "Scheduled",
    icon: Calendar,
    description: "Schedule messages for later",
  },
  {
    href: "/dashboard/campaigns",
    label: "Campaigns",
    icon: Megaphone,
    description: "Marketing campaigns & broadcasts",
  },
  {
    href: "/dashboard/media",
    label: "Media Library",
    icon: ImageIcon,
    description: "Manage media files",
  },
];

const featureItems = [
  {
    href: "/dashboard/auto-reply",
    label: "Auto-Reply",
    icon: Reply,
    description: "Manage auto-reply rules",
  },
  {
    href: "/dashboard/sessions",
    label: "Sessions",
    icon: BellRing,
    description: "Manage WhatsApp sessions",
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart3,
    description: "Reports and analytics",
  },
];

const systemItems = [
  {
    href: "/dashboard/system-health",
    label: "System Health",
    icon: Gauge,
    description: "WhatsApp connection status",
  },
  {
    href: "/dashboard/message-logs",
    label: "Message Logs",
    icon: History,
    description: "Complete message history",
  },
  {
    href: "/dashboard/webhook-management",
    label: "Webhook Management",
    icon: Webhook,
    description: "Configure webhook endpoints",
  },
  {
    href: "/dashboard/webhook-logs",
    label: "Webhook Logs",
    icon: Activity,
    description: "View webhook status",
  },
  {
    href: "/dashboard/integrations",
    label: "Integrations",
    icon: Puzzle,
    description: "Connect third-party services",
  },
];

const adminItems = [
  {
    href: "/dashboard/api-keys",
    label: "API Keys",
    icon: KeyRound,
    description: "For external access",
  },
  {
    href: "/dashboard/rate-limiting",
    label: "Rate Limiting",
    icon: HandCoins,
    description: "Configure limits per user",
  },
  {
    href: "/dashboard/access-management",
    label: "Access Management",
    icon: Users,
    description: "Add/edit users and permissions",
  },
];

const generalItems = [
  {
    href: "/dashboard/billing",
    label: "Billing",
    icon: Receipt,
    description: "Subscription and payments",
  },
  {
    href: "/dashboard/feedback",
    label: "Feedback",
    icon: AlertCircle,
    description: "Report issues and suggestions",
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    description: "Application settings",
  },
]

export function AppSidebar() {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r bg-sidebar text-sidebar-foreground shadow-lg"
    >
      <SidebarHeader className="p-4 flex items-center justify-between bg-sidebar-accent/20">
        <Link href="/dashboard" className="flex items-center gap-2">
          <img
            src="/placeholder-logo.svg"
            alt="WA Gateway"
            className="h-8 w-auto"
          />
          {state !== "collapsed" && (
            <span className="font-bold text-xl text-sidebar-foreground">GoWAG</span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-grow">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-center">Main</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/")
                  }
                  className={cn(
                    "justify-start transition-all hover:bg-sidebar-accent/30",
                    state === "collapsed" && !isMobile && "justify-center",
                    (pathname === item.href || pathname.startsWith(item.href + "/")) && 
                    "bg-sidebar-accent/40 font-medium border-l-4 border-sidebar-foreground"
                  )}
                  tooltip={
                    state === "collapsed" && !isMobile ? item.label : undefined
                  }
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>
                      <div
                        className={cn(
                          state === "collapsed" && !isMobile && "sr-only"
                        )}
                      >
                        {item.label}
                      </div>
                      {/* {state !== "collapsed" && (
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      )} */}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-center">Features</SidebarGroupLabel>
          <SidebarMenu>
            {featureItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/")
                  }
                  className={cn(
                    "justify-start",
                    state === "collapsed" && !isMobile && "justify-center"
                  )}
                  tooltip={
                    state === "collapsed" && !isMobile ? item.label : undefined
                  }
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>
                      <div
                        className={cn(
                          state === "collapsed" && !isMobile && "sr-only"
                        )}
                      >
                        {item.label}
                      </div>
                      {/* {state !== "collapsed" && (
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      )} */}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarMenu>
            {systemItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/")
                  }
                  className={cn(
                    "justify-start",
                    state === "collapsed" && !isMobile && "justify-center"
                  )}
                  tooltip={
                    state === "collapsed" && !isMobile ? item.label : undefined
                  }
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>
                      <div
                        className={cn(
                          state === "collapsed" && !isMobile && "sr-only"
                        )}
                      >
                        {item.label}
                      </div>
                      {/* {state !== "collapsed" && (
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      )} */}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarMenu>
            {adminItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/")
                  }
                  className={cn(
                    "justify-start",
                    state === "collapsed" && !isMobile && "justify-center"
                  )}
                  tooltip={
                    state === "collapsed" && !isMobile ? item.label : undefined
                  }
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>
                      <div
                        className={cn(
                          state === "collapsed" && !isMobile && "sr-only"
                        )}
                      >
                        {item.label}
                      </div>
                      {/* {state !== "collapsed" && (
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      )} */}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          {generalItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname === item.href || pathname.startsWith(item.href + "/")
                }
                className={cn(
                  "justify-start",
                  state === "collapsed" && !isMobile && "justify-center"
                )}
                tooltip={
                  state === "collapsed" && !isMobile ? item.label : undefined
                }
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>
                    <div
                      className={cn(
                        state === "collapsed" && !isMobile && "sr-only"
                      )}
                    >
                      {item.label}
                    </div>
                    {/* {state !== "collapsed" && (
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    )} */}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
