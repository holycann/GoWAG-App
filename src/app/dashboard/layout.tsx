"use client"

import React from "react"
import { AppSidebar } from "./components/app-sidebar"
import { Navbar } from "./components/navbar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import ProtectedRoute from "@/middleware/route-protection"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Add a gradient background to the main dashboard page
  const isMainDashboard = pathname === "/dashboard"

  return (
    <ProtectedRoute>
      <SidebarProvider>
        {/* <div className="flex min-h-screen"> */}
          <AppSidebar />
          <SidebarInset className="flex flex-col flex-1 overflow-hidden bg-slate-100">
            <Navbar />
            <main
              className={cn(
                "flex-1 overflow-auto p-4 sm:p-6 transition-all",
                isMainDashboard &&
                  "bg-gradient-to-br from-background to-secondary/30"
              )}
            >
              <div className="mx-auto max-w-7xl">{children}</div>
            </main>
            <footer className="border-t py-3 px-6 text-center text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} GoWAG - WhatsApp Gateway. All
                rights reserved.
              </p>
            </footer>
          </SidebarInset>
          <Toaster />
        {/* </div> */}
      </SidebarProvider>
    </ProtectedRoute>
  )
}
