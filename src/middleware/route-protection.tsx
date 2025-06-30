import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { UserRole, Permission, hasPermission } from '@/lib/roles';
import logger from '@/lib/logger';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: Permission[];
  requiredRoles?: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  redirectTo = '/auth/login'
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Don't check while auth state is loading
    if (loading) return;

    // Check if the user is authenticated
    if (!isAuthenticated()) {
      logger.info('User not authenticated, redirecting to login', 'route-protection');
      router.push(redirectTo);
      return;
    }

    // Extract user role from the user object (defaulting to 'guest')
    const userRole = (user?.role as UserRole) || 'guest';

    // Check if the user has one of the required roles (if specified)
    const hasRequiredRole = requiredRoles.length === 0 || requiredRoles.includes(userRole);

    // Check if the user has all required permissions (if specified)
    const hasRequiredPermissions = requiredPermissions.length === 0 || 
      requiredPermissions.every(permission => hasPermission(userRole, permission));

    // Set authorized state based on role and permission checks
    const isAuthorized = hasRequiredRole && hasRequiredPermissions;
    setAuthorized(isAuthorized);

    // If not authorized, redirect to specified path
    if (!isAuthorized) {
      logger.warn(`Access denied for user ${user?.id} with role ${userRole}`, 'route-protection', {
        requiredRoles,
        requiredPermissions,
        path: window.location.pathname
      });
      router.push(redirectTo);
    } else {
      logger.debug(`Access granted for user ${user?.id} with role ${userRole}`, 'route-protection', {
        path: window.location.pathname
      });
    }
  }, [user, loading, isAuthenticated, requiredRoles, requiredPermissions, redirectTo, router]);

  // Show loading state or null while checking authorization
  if (loading || !authorized) {
    return null;
  }

  // Return children if authorized
  return <>{children}</>;
};

export default ProtectedRoute; 