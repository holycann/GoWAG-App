import { useAuth } from "@/context/auth-context";
import { useSubscription } from "@/context/subscription-context";
import { Permission, UserRole, hasPermission, hasAccess as checkAccess } from "@/lib/roles";
import { SubscriptionTier } from "@/lib/roles";

interface UseRBACOptions {
  requiredPermissions?: Permission[];
  requiredRoles?: UserRole[];
  requiredFeature?: string;
}

export function useRBAC(options: UseRBACOptions = {}) {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  
  const { requiredPermissions = [], requiredRoles = [], requiredFeature } = options;
  
  // Extract user role from the user object (defaulting to 'guest')
  const userRole = (user?.role as UserRole) || 'guest';
  
  // Extract subscription tier from subscription object (defaulting to 'free')
  const subscriptionTier = subscription?.tier || 'free';
  
  // Check if the user has one of the required roles (if specified)
  const hasRequiredRole = requiredRoles.length === 0 || requiredRoles.includes(userRole);
  
  // Check if the user has all required permissions (if specified)
  const hasRequiredPermissions = requiredPermissions.length === 0 || 
    requiredPermissions.every(permission => hasPermission(userRole, permission));
  
  // Check if the user's subscription has access to the required feature (if specified)
  const hasFeatureAccess = !requiredFeature || 
    (subscription && useSubscription().hasAccess(requiredFeature));
  
  // Combined check for role, permissions, and feature access
  const hasAccess = hasRequiredRole && hasRequiredPermissions && hasFeatureAccess;
  
  // Function to check if user has a specific permission
  const checkPermission = (permission: Permission): boolean => {
    return hasPermission(userRole, permission);
  };
  
  // Function to check if user has access to a specific feature based on both role and subscription
  const checkFeatureAccess = (permission: Permission, feature: string): boolean => {
    return checkAccess(userRole, subscriptionTier as SubscriptionTier, permission, feature);
  };
  
  return {
    hasAccess,
    hasRequiredRole,
    hasRequiredPermissions,
    hasFeatureAccess,
    userRole,
    subscriptionTier,
    checkPermission,
    checkFeatureAccess
  };
} 