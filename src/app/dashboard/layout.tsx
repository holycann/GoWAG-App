"use client"

import React from "react"
import { AppSidebar } from "./components/app-sidebar"
import { Navbar } from "./components/navbar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import ProtectedRoute from "@/middleware/route-protection"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Default sidebar state - client-side
  const defaultOpen = localStorage.getItem("sidebar:state") !== "collapsed" // true if expanded or not set

  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="flex min-h-screen w-full bg-muted/40">
          <AppSidebar />
          <SidebarInset className="flex flex-col flex-1 overflow-hidden bg-slate-100">
            <Navbar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
