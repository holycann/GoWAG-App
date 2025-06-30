"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";
import subscriptionService, { SubscriptionDetails, UsageMetrics } from "@/services/subscription-service";
import { SubscriptionTier } from "@/lib/roles";
import logger from "@/lib/logger";

interface SubscriptionContextType {
  subscription: SubscriptionDetails | null;
  usageMetrics: UsageMetrics | null;
  loading: boolean;
  error: string | null;
  hasAccess: (feature: string) => boolean;
  checkLimit: (limitType: string, currentUsage: number) => boolean;
  getLimit: (limitType: string, defaultValue?: number) => number;
  getUsagePercentage: (limitType: string, currentUsage: number) => number;
  upgradeSubscription: (newTier: SubscriptionTier, paymentDetails: any) => Promise<void>;
  cancelSubscription: (reason?: string) => Promise<void>;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [usageMetrics, setUsageMetrics] = useState<UsageMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Fetch subscription data when user changes or on manual refresh
  const fetchSubscriptionData = async () => {
    if (!isAuthenticated()) {
      setSubscription(null);
      setUsageMetrics(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Fetch subscription details and usage metrics in parallel
      const [subscriptionData, usageData] = await Promise.all([
        subscriptionService.getCurrentSubscription(),
        subscriptionService.getUsageMetrics()
      ]);
      
      setSubscription(subscriptionData);
      setUsageMetrics(usageData);
      
      logger.info(
        `Subscription data loaded: ${subscriptionData.tier}`, 
        'subscription-context'
      );
    } catch (err: any) {
      logger.error('Failed to load subscription data', 'subscription-context', err);
      setError(err.message || 'Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  // Initialize subscription data when user changes
  useEffect(() => {
    fetchSubscriptionData();
  }, [user, isAuthenticated]);

  // Check if user has access to a specific feature
  const hasAccess = (feature: string): boolean => {
    if (!subscription) return false;
    
    // Use the hasFeatureAccess function from subscription.ts
    const { hasFeatureAccess } = require('@/lib/subscription');
    return hasFeatureAccess(subscription.tier, feature);
  };

  // Check if usage is within limits
  const checkLimit = (limitType: string, currentUsage: number): boolean => {
    if (!subscription) return false;
    
    // Use the checkUsageLimit function from subscription.ts
    const { checkUsageLimit } = require('@/lib/subscription');
    return checkUsageLimit(subscription.tier, limitType, currentUsage);
  };

  // Get the limit for a specific feature
  const getLimit = (limitType: string, defaultValue: number = 0): number => {
    if (!subscription) return defaultValue;
    
    // Use the getLimit function from subscription.ts
    const { getLimit } = require('@/lib/subscription');
    return getLimit(subscription.tier, limitType, defaultValue);
  };

  // Calculate usage percentage
  const getUsagePercentage = (limitType: string, currentUsage: number): number => {
    if (!subscription) return 0;
    
    // Use the calculateUsagePercentage function from subscription.ts
    const { calculateUsagePercentage } = require('@/lib/subscription');
    return calculateUsagePercentage(subscription.tier, limitType, currentUsage);
  };

  // Upgrade subscription
  const upgradeSubscription = async (newTier: SubscriptionTier, paymentDetails: any): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const updatedSubscription = await subscriptionService.upgradeSubscription(newTier, paymentDetails);
      setSubscription(updatedSubscription);
      logger.info(`Subscription upgraded to ${newTier}`, 'subscription-context');
    } catch (err: any) {
      logger.error('Failed to upgrade subscription', 'subscription-context', err);
      setError(err.message || 'Failed to upgrade subscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cancel subscription
  const cancelSubscription = async (reason?: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await subscriptionService.cancelSubscription(reason);
      // Refresh subscription data after cancellation
      await fetchSubscriptionData();
      logger.info('Subscription cancelled', 'subscription-context');
    } catch (err: any) {
      logger.error('Failed to cancel subscription', 'subscription-context', err);
      setError(err.message || 'Failed to cancel subscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Manual refresh of subscription data
  const refreshSubscription = async (): Promise<void> => {
    await fetchSubscriptionData();
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        usageMetrics,
        loading,
        error,
        hasAccess,
        checkLimit,
        getLimit,
        getUsagePercentage,
        upgradeSubscription,
        cancelSubscription,
        refreshSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};

export default SubscriptionContext; 