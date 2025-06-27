"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  SmartphoneNfc,
  Send,
  CalendarClock,
  Webhook,
  Settings,
  PanelLeft,
  History,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar, // if needed for custom logic
} from "@/components/ui/sidebar" // Assuming shadcn sidebar components are in this path
import { Button } from "@/components/ui/button"

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/connect-device", label: "Connect Device", icon: SmartphoneNfc },
  { href: "/dashboard/send-message", label: "Send Message", icon: Send },
  { href: "/dashboard/scheduled-messages", label: "Scheduled Messages", icon: CalendarClock },
  { href: "/dashboard/message-history", label: "Message History", icon: History },
  { href: "/dashboard/webhook-settings", label: "Webhook Settings", icon: Webhook },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state, toggleSidebar, isMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" className="border-r bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="p-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          {/* Optional: Logo can be here if not in Navbar or if sidebar is always expanded */}
          {/* <img src="/logo.svg" alt="WA Gateway" className="h-8 w-auto" /> */}
          <span
            className={cn(
              "font-semibold text-xl text-sidebar-foreground",
              state === "collapsed" && !isMobile && "hidden",
            )}
          >
            WA Gateway
          </span>
        </Link>
        {/* Trigger to collapse/expand sidebar, visible on desktop when collapsible="icon" */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            state === "collapsed" && !isMobile && "hidden", // Hide when collapsed on desktop
            isMobile && "hidden", // Hide on mobile as mobile uses sheet trigger
          )}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                className={cn("justify-start", state === "collapsed" && !isMobile && "justify-center")}
                tooltip={state === "collapsed" && !isMobile ? item.label : undefined}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className={cn(state === "collapsed" && !isMobile && "sr-only")}>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {/* Example Footer Item */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn("justify-start", state === "collapsed" && !isMobile && "justify-center")}
              tooltip={state === "collapsed" && !isMobile ? "Settings" : undefined}
            >
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5" />
                <span className={cn(state === "collapsed" && !isMobile && "sr-only")}>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
