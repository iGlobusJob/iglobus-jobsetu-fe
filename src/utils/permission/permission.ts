import type { UserRole } from '@store/userDetails';

/**
 * Define permissions for each role
 */
export const PERMISSIONS = {
  candidate: {
    canViewJobs: true,
    canApplyToJobs: true,
    canEditProfile: true,
    canViewApplications: true,
    canPostJobs: false,
    canManageUsers: false,
    canViewReports: false,
  },
  vendor: {
    canViewJobs: true,
    canApplyToJobs: false,
    canEditProfile: true,
    canViewApplications: true,
    canPostJobs: true,
    canManageUsers: false,
    canViewReports: false,
  },
  admin: {
    canViewJobs: true,
    canApplyToJobs: false,
    canEditProfile: true,
    canViewApplications: true,
    canPostJobs: true,
    canManageUsers: true,
    canViewReports: true,
  },
} as const;

/**
 * Check if user has specific permission
 */
export const hasPermission = (
  userRole: UserRole,
  permission: keyof typeof PERMISSIONS.candidate
): boolean => {
  if (!userRole) return false;
  const roleKey = userRole as keyof typeof PERMISSIONS;
  return PERMISSIONS[roleKey][permission];
};

/**
 * Check if user can access a route
 */
export const canAccessRoute = (
  userRole: UserRole,
  routePath: string
): boolean => {
  if (!userRole) return false;

  // Define route access rules
  const routeAccess: Record<string, UserRole[]> = {
    '/candidate': ['candidate'],
    '/vendor': ['vendor'],
    '/admin': ['admin'],
  };

  // Check if route starts with any protected path
  for (const [path, roles] of Object.entries(routeAccess)) {
    if (routePath.startsWith(path)) {
      return roles.includes(userRole);
    }
  }

  // Public route - everyone can access
  return true;
};
