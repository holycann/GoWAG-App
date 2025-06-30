"use client"
import { LogOut, Menu, ShieldAlert, Bell, Search } from "lucide-react"
import { useRouter } from "next/navigation" // For App Router
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NetworkStatus } from "@/components/ui/network-status"
import { NetworkHealthIndicator } from "@/components/ui/network-health-indicator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar" // shadcn sidebar trigger
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { PageAlert } from "./page-alert"
import { useAuth } from "@/context/auth-context"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function Navbar() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [alertInfo, setAlertInfo] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null)

  const handleLogout = async () => {
    try {
      await logout()
      setAlertInfo({ type: "success", title: "Logged Out", message: "You have been successfully logged out." })
    } catch (error) {
      setAlertInfo({ type: "error", title: "Logout Failed", message: "There was a problem logging you out." })
    } finally {
      setShowLogoutConfirm(false)
    }
  }
  
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.username) return 'U';
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <>
      {alertInfo && (
        <PageAlert
          type={alertInfo.type}
          title={alertInfo.title}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 sm:px-6 shadow-sm">
        <SidebarTrigger className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </SidebarTrigger>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-primary">GoWAG</h1>
          <div className="hidden md:flex items-center h-6 px-2 text-xs font-medium rounded-full bg-primary/10 text-primary">
            WhatsApp Gateway
          </div>
        </div>

        <div className="hidden md:flex relative max-w-md flex-1 mx-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 bg-background/50 border-muted focus-visible:ring-primary h-9 rounded-full"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:flex">
            <NetworkStatus variant="badge" />
          </div>
          <div className="hidden lg:flex">
            <NetworkHealthIndicator size="sm" showLatency={true} />
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="sr-only">Notifications</span>
          </Button>

          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-primary/10 p-0">
                <Avatar className="h-9 w-9 border border-primary/20">
                  <AvatarImage src={user?.profilePicture || "/placeholder-user.jpg"} alt={user?.username || "User"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-1" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.username || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => router.push('/dashboard/settings')}>
                Account settings
              </DropdownMenuItem>
              <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center">
                      <ShieldAlert className="mr-2 h-5 w-5 text-red-500" /> Are you sure you want to log out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be returned to the login page. Any unsaved changes might be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white">
                      Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  )
}
