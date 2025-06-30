"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import logger from "@/lib/logger";

// Define UI context types
interface UIContextType {
  // Sidebar state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  
  // Theme
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  
  // Global loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Notifications
  showNotification: (title: string, description: string, type?: "default" | "success" | "error" | "warning") => void;
  
  // Confirmation dialog
  showConfirmation: (title: string, message: string, onConfirm: () => void, onCancel?: () => void) => void;
  confirmationState: {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  };
  closeConfirmation: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  
  // Global loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Confirmation dialog state
  const [confirmationState, setConfirmationState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
  });
  
  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);
  
  // Show notification
  const showNotification = useCallback((title: string, description: string, type: "default" | "success" | "error" | "warning" = "default") => {
    // Create toast options based on the type
    const toastOptions: any = {
      title,
      description,
    };
    
    // Set variant based on type
    if (type === "error") {
      toastOptions.variant = "destructive";
    } else {
      toastOptions.variant = "default";
    }
    
    // Add custom styling for success and warning
    if (type === "success") {
      toastOptions.className = "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-300";
    } else if (type === "warning") {
      toastOptions.className = "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-300";
    }
    
    // Show toast notification
    toast(toastOptions);
    
    // Log notification
    const logLevel = type === "error" ? "error" : "info";
    logger[logLevel](`Notification: ${title} - ${description}`, "ui-context");
  }, []);
  
  // Show confirmation dialog
  const showConfirmation = useCallback((title: string, message: string, onConfirm: () => void, onCancel: () => void = () => {}) => {
    setConfirmationState({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmationState(prev => ({ ...prev, isOpen: false }));
      },
      onCancel: () => {
        onCancel();
        setConfirmationState(prev => ({ ...prev, isOpen: false }));
      },
    });
  }, []);
  
  // Close confirmation dialog
  const closeConfirmation = useCallback(() => {
    setConfirmationState(prev => ({ ...prev, isOpen: false }));
  }, []);
  
  return (
    <UIContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        theme,
        setTheme,
        isLoading,
        setIsLoading,
        showNotification,
        showConfirmation,
        confirmationState,
        closeConfirmation,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};

export default UIContext; 