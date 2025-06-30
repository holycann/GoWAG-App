/**
 * Subscription management utilities for gowag-app
 * This file defines subscription feature limits and utility functions to check access
 */

import { SubscriptionTier, subscriptionFeatures } from './roles';

// Define feature limits for each subscription tier
export const subscriptionLimits: Record<SubscriptionTier, Record<string, number>> = {
  free: {
    'sessions.max': 1,
    'messages.perDay': 50,
    'contacts.max': 100,
    'groups.max': 5,
    'templates.max': 3,
    'webhooks.max': 1
  },
  basic: {
    'sessions.max': 2,
    'messages.perDay': 500,
    'contacts.max': 1000,
    'groups.max': 20,
    'templates.max': 10,
    'webhooks.max': 3,
    'autoReply.rules': 5
  },
  pro: {
    'sessions.max': 5,
    'messages.perDay': 5000,
    'contacts.max': 10000,
    'groups.max': 50,
    'templates.max': 50,
    'webhooks.max': 10,
    'autoReply.rules': 20,
    'api.rateLimit': 100
  },
  enterprise: {
    'sessions.max': -1, // Unlimited
    'messages.perDay': -1, // Unlimited
    'contacts.max': -1, // Unlimited
    'groups.max': -1, // Unlimited
    'templates.max': -1, // Unlimited
    'webhooks.max': -1, // Unlimited
    'autoReply.rules': -1, // Unlimited
    'api.rateLimit': 1000
  }
};

// Features available by subscription tier (more detailed than in roles.ts)
export const tierFeatures: Record<string, SubscriptionTier[]> = {
  'analytics.advanced': ['pro', 'enterprise'],
  'analytics.basic': ['basic', 'pro', 'enterprise'],
  'api.access': ['pro', 'enterprise'],
  'bulk.messaging': ['basic', 'pro', 'enterprise'],
  'campaigns': ['pro', 'enterprise'],
  'scheduled.messages': ['basic', 'pro', 'enterprise'],
  'media.messages': ['basic', 'pro', 'enterprise'],
  'autoReply': ['pro', 'enterprise'],
  'whiteLabel': ['enterprise'],
  'customIntegrations': ['enterprise'],
  'priority.support': ['enterprise'],
  'dedicated.server': ['enterprise']
};

/**
 * Check if the subscription tier has access to a specific feature
 * @param tier Subscription tier to check
 * @param feature Feature name to check access for
 */
export function hasFeatureAccess(tier: SubscriptionTier, feature: string): boolean {
  // Get list of tiers that have access to this feature
  const allowedTiers = tierFeatures[feature];
  if (!allowedTiers) {
    return false;
  }
  
  // Check if the user's tier is in the list of allowed tiers
  return allowedTiers.includes(tier);
}

/**
 * Check if a usage amount is within the subscription limits
 * @param tier Subscription tier to check
 * @param limitType Type of limit to check (e.g., 'messages.perDay')
 * @param currentUsage Current usage amount
 */
export function checkUsageLimit(tier: SubscriptionTier, limitType: string, currentUsage: number): boolean {
  const limit = subscriptionLimits[tier]?.[limitType];
  
  // If limit is undefined, assume no access
  if (limit === undefined) {
    return false;
  }
  
  // If limit is -1, it means unlimited
  if (limit === -1) {
    return true;
  }
  
  // Check if the current usage is below the limit
  return currentUsage < limit;
}

/**
 * Get the limit for a specific feature based on subscription tier
 * @param tier Subscription tier
 * @param limitType Type of limit to get (e.g., 'messages.perDay')
 * @param defaultValue Default value if limit is not defined
 */
export function getLimit(tier: SubscriptionTier, limitType: string, defaultValue: number = 0): number {
  const limit = subscriptionLimits[tier]?.[limitType];
  
  // If limit is undefined, return default
  if (limit === undefined) {
    return defaultValue;
  }
  
  // Return the limit (including -1 for unlimited)
  return limit;
}

/**
 * Get a user-friendly label for a subscription tier
 * @param tier Subscription tier
 */
export function getTierLabel(tier: SubscriptionTier): string {
  const labels: Record<SubscriptionTier, string> = {
    'free': 'Free',
    'basic': 'Basic',
    'pro': 'Professional',
    'enterprise': 'Enterprise'
  };
  
  return labels[tier] || tier;
}

/**
 * Calculate usage percentage for a specific feature
 * @param tier Subscription tier
 * @param limitType Type of limit to check (e.g., 'messages.perDay')
 * @param currentUsage Current usage amount
 */
export function calculateUsagePercentage(tier: SubscriptionTier, limitType: string, currentUsage: number): number {
  const limit = subscriptionLimits[tier]?.[limitType];
  
  // If limit is undefined or unlimited (-1), return 0%
  if (limit === undefined || limit === -1) {
    return 0;
  }
  
  // Calculate percentage (cap at 100%)
  const percentage = (currentUsage / limit) * 100;
  return Math.min(percentage, 100);
} 