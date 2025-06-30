"use client";

import React from "react";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { SubscriptionProvider } from "@/context/subscription-context";
import { UIProvider } from "@/context/ui-context";
import { SocketProvider } from "@/context/socket-context";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <UIProvider>
          <SubscriptionProvider>
            <SocketProvider>
              {children}
              <Toaster />
              <SonnerToaster />
            </SocketProvider>
          </SubscriptionProvider>
        </UIProvider>
      </AuthProvider>
    </ThemeProvider>
  );
} 