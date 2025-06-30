"use client"

import React from "react"
import { AppSidebar } from "./components/app-sidebar"
import { Navbar } from "./components/navbar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { RBACGuard } from "@/components/ui/rbac-guard"
import { PageTransition } from "@/components/ui/animated-transition"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Add a gradient background to the main dashboard page
  const isMainDashboard = pathname === "/dashboard"

  return (
    <RBACGuard
      requiredPermissions={["dashboard.view"]}
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground mt-2">
              You don't have permission to access the dashboard.
            </p>
          </div>
        </div>
      }
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden bg-slate-100 dark:bg-slate-900">
          <Navbar />
          <main
            className={cn(
              "flex-1 overflow-auto p-4 sm:p-6 transition-all",
              isMainDashboard &&
                "bg-gradient-to-br from-background to-secondary/30"
            )}
          >
            <PageTransition className="mx-auto max-w-7xl">
              {children}
            </PageTransition>
          </main>
          <footer className="border-t py-3 px-6 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} GoWAG - WhatsApp Gateway. All
              rights reserved.
            </p>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </RBACGuard>
  )
}
