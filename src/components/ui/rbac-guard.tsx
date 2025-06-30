"use client";

import React from "react";
import { useRBAC } from "@/hooks/use-rbac";
import { Permission, UserRole } from "@/lib/roles";
import { motion } from "framer-motion";
import { animationPresets } from "@/hooks/use-animation";

interface RBACGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiredPermissions?: Permission[];
  requiredRoles?: UserRole[];
  requiredFeature?: string;
  showFallback?: boolean;
  animate?: boolean;
}

export function RBACGuard({
  children,
  fallback,
  requiredPermissions,
  requiredRoles,
  requiredFeature,
  showFallback = true,
  animate = true
}: RBACGuardProps) {
  const { hasAccess } = useRBAC({
    requiredPermissions,
    requiredRoles,
    requiredFeature
  });
  
  // If user has access, render children
  if (hasAccess) {
    if (animate) {
      return (
        <motion.div
          {...animationPresets.fadeIn}
        >
          {children}
        </motion.div>
      );
    }
    
    return <>{children}</>;
  }
  
  // If user doesn't have access and fallback is provided, render fallback
  if (showFallback && fallback) {
    if (animate) {
      return (
        <motion.div
          {...animationPresets.fadeIn}
        >
          {fallback}
        </motion.div>
      );
    }
    
    return <>{fallback}</>;
  }
  
  // If user doesn't have access and no fallback is provided, render nothing
  return null;
}

// Higher-order component version for wrapping components
export function withRBAC<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    requiredPermissions?: Permission[];
    requiredRoles?: UserRole[];
    requiredFeature?: string;
    fallback?: React.ComponentType<P>;
  }
) {
  const {
    requiredPermissions,
    requiredRoles,
    requiredFeature,
    fallback: FallbackComponent
  } = options;
  
  return function WithRBAC(props: P) {
    return (
      <RBACGuard
        requiredPermissions={requiredPermissions}
        requiredRoles={requiredRoles}
        requiredFeature={requiredFeature}
        showFallback={!!FallbackComponent}
        fallback={FallbackComponent ? <FallbackComponent {...props} /> : undefined}
      >
        <Component {...props} />
      </RBACGuard>
    );
  };
} 