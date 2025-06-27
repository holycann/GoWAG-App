"use client"
import { LogOut, Menu, ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation" // For App Router
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    return user.username
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
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </SidebarTrigger>

        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-brandDarkBlue">WA Gateway</h1>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.photoURL || "/placeholder-user.jpg"} alt={user?.displayName || "User"} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.displayName || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
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
