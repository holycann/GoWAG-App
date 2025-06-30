/**
 * Role-based Access Control (RBAC) for gowag-app
 * This file defines roles, permissions, and utility functions to check permissions
 */

// Role definitions
export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

// Feature-based permissions
export type Permission =
  | 'dashboard.view'
  | 'sessions.view'
  | 'sessions.manage'
  | 'messages.view'
  | 'messages.send'
  | 'messages.delete'
  | 'contacts.view'
  | 'contacts.manage'
  | 'analytics.view'
  | 'users.view'
  | 'users.edit'
  | 'users.create'
  | 'users.delete'
  | 'webhooks.view'
  | 'webhooks.edit'
  | 'settings.view'
  | 'settings.edit'
  | 'api.access'
  | 'system.health';

// Subscription plans
export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise';

// Map roles to permissions
export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    'dashboard.view',
    'sessions.view',
    'sessions.manage',
    'messages.view',
    'messages.send',
    'messages.delete',
    'contacts.view',
    'contacts.manage',
    'analytics.view',
    'users.view',
    'users.edit',
    'users.create',
    'users.delete',
    'webhooks.view',
    'webhooks.edit',
    'settings.view',
    'settings.edit',
    'api.access',
    'system.health'
  ],
  moderator: [
    'dashboard.view',
    'sessions.view',
    'sessions.manage',
    'messages.view',
    'messages.send',
    'messages.delete',
    'contacts.view',
    'contacts.manage',
    'analytics.view',
    'users.view',
    'webhooks.view',
    'settings.view'
  ],
  user: [
    'dashboard.view',
    'sessions.view',
    'messages.view',
    'messages.send',
    'contacts.view',
    'contacts.manage',
    'webhooks.view'
  ],
  guest: [
    'dashboard.view',
    'sessions.view',
    'messages.view'
  ]
};

// Features available for each subscription tier
export const subscriptionFeatures: Record<SubscriptionTier, string[]> = {
  free: [
    'sessions.basic',
    'messages.basic',
    'contacts.limited'
  ],
  basic: [
    'sessions.basic',
    'messages.standard',
    'contacts.standard',
    'analytics.basic',
    'webhooks.basic'
  ],
  pro: [
    'sessions.advanced',
    'messages.advanced',
    'contacts.advanced',
    'analytics.advanced',
    'webhooks.advanced',
    'api.standard',
    'autoReply.basic'
  ],
  enterprise: [
    'sessions.enterprise',
    'messages.enterprise',
    'contacts.enterprise',
    'analytics.enterprise',
    'webhooks.enterprise',
    'api.advanced',
    'autoReply.advanced',
    'whiteLabel',
    'customIntegrations'
  ]
};

// Check if a user has a specific permission
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  return rolePermissions[userRole]?.includes(permission) || false;
}

// Check if a user has access to a feature based on their subscription tier
export function hasSubscriptionAccess(tier: SubscriptionTier, feature: string): boolean {
  return subscriptionFeatures[tier]?.some(f => f.startsWith(feature)) || false;
}

// Check if a user has access to a feature based on both role and subscription
export function hasAccess(
  userRole: UserRole,
  tier: SubscriptionTier,
  permission: Permission, 
  feature: string
): boolean {
  return hasPermission(userRole, permission) && hasSubscriptionAccess(tier, feature);
} 