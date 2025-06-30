"use client";

import React from "react";
import { useSubscription } from "@/context/subscription-context";
import { SubscriptionTier } from "@/lib/roles";
import { motion } from "framer-motion";
import { animationPresets } from "@/hooks/use-animation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface SubscriptionGateProps {
  children: React.ReactNode;
  requiredFeature: string;
  title?: string;
  description?: string;
  showUpgradeButton?: boolean;
  onUpgrade?: () => void;
  animate?: boolean;
}

export function SubscriptionGate({
  children,
  requiredFeature,
  title = "Feature Locked",
  description = "This feature requires a higher subscription tier.",
  showUpgradeButton = true,
  onUpgrade,
  animate = true
}: SubscriptionGateProps) {
  const { subscription, hasAccess } = useSubscription();
  
  // If user has access to the feature, render children
  if (hasAccess(requiredFeature)) {
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
  
  // If user doesn't have access, render upgrade prompt
  const UpgradePrompt = (
    <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/50">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-amber-500" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Your current plan: <span className="font-medium">{subscription?.tier || "Free"}</span>
        </p>
      </CardContent>
      {showUpgradeButton && (
        <CardFooter>
          <Button
            onClick={onUpgrade}
            className="w-full group"
          >
            Upgrade Subscription
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
  
  if (animate) {
    return (
      <motion.div
        {...animationPresets.fadeIn}
      >
        {UpgradePrompt}
      </motion.div>
    );
  }
  
  return UpgradePrompt;
}

// Higher-order component version for wrapping components
export function withSubscriptionGate<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    requiredFeature: string;
    title?: string;
    description?: string;
    showUpgradeButton?: boolean;
    onUpgrade?: () => void;
  }
) {
  const {
    requiredFeature,
    title,
    description,
    showUpgradeButton,
    onUpgrade
  } = options;
  
  return function WithSubscriptionGate(props: P) {
    return (
      <SubscriptionGate
        requiredFeature={requiredFeature}
        title={title}
        description={description}
        showUpgradeButton={showUpgradeButton}
        onUpgrade={onUpgrade}
      >
        <Component {...props} />
      </SubscriptionGate>
    );
  };
} 