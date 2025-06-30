import { NextRequest, NextResponse } from 'next/server';
import { tokenManager } from './api/api';

// Define public paths that don't require authentication
const publicPaths = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/'
];

// Define path patterns for role-based access
const rolePathPatterns: Record<string, RegExp[]> = {
  admin: [
    /^\/dashboard\/access-management.*/,
    /^\/dashboard\/system-health.*/,
    /^\/dashboard\/rate-limiting.*/,
    /^\/dashboard\/api-keys.*/
  ],
  moderator: [
    /^\/dashboard\/analytics.*/,
    /^\/dashboard\/auto-reply.*/
  ]
};

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow access to public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Check for authentication token in cookies
  const authCookie = request.cookies.get('auth_token');
  const token = authCookie?.value;
  
  // If no token found and not a public path, redirect to login
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  // If we have a token, we need to verify role-based access
  // This is a simplified implementation as middleware can't do complex token validation
  // For a real implementation, you would need a lightweight JWT verification
  try {
    // For demo purposes, assume we can extract the role from the token
    // In a real implementation, you would verify and decode the JWT
    const userRole = getUserRoleFromToken(token);
    
    // Check if the path requires a specific role
    if (!hasAccessToPath(pathname, userRole)) {
      // Redirect to dashboard if no access
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
    
    // Continue to the requested page if authorized
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }
}

// Configure paths that should be handled by middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// Helper function to determine if a user has access to a path based on their role
// In a real implementation, this would involve more sophisticated logic
function hasAccessToPath(pathname: string, role: string): boolean {
  // Admin has access to everything
  if (role === 'admin') {
    return true;
  }
  
  // Check role-specific path patterns
  const restrictedPaths = rolePathPatterns[role] || [];
  if (restrictedPaths.some(pattern => pattern.test(pathname))) {
    return true;
  }
  
  // For non-admin users, check if path is restricted to admin only
  const adminOnlyPaths = rolePathPatterns['admin'] || [];
  if (adminOnlyPaths.some(pattern => pattern.test(pathname))) {
    return false;
  }
  
  // For non-specific paths (general dashboard features), most authenticated users have access
  return pathname.startsWith('/dashboard');
}

// Simplified function to extract user role from token
// In a real implementation, this would involve JWT decoding and verification
function getUserRoleFromToken(token: string): string {
  // This is a placeholder. In a real app, you would decode the JWT
  // and extract the role from the payload.
  
  // For demo purposes, assuming all tokens are valid and 
  // returning a default role of 'user'
  return 'user';
} 