import { useAuthStore } from '@/store/userDetails';
import type { PERMISSIONS } from '@/utils/permission/permission';
import { hasPermission } from '@/utils/permission/permission';

/**
 * Hook to check user permissions
 */
export const usePermission = () => {
  const { userRole } = useAuthStore();

  const checkPermission = (
    permission: keyof typeof PERMISSIONS.candidate
  ): boolean => {
    return hasPermission(userRole, permission);
  };

  return {
    canViewJobs: checkPermission('canViewJobs'),
    canApplyToJobs: checkPermission('canApplyToJobs'),
    canEditProfile: checkPermission('canEditProfile'),
    canViewApplications: checkPermission('canViewApplications'),
    canPostJobs: checkPermission('canPostJobs'),
    canManageUsers: checkPermission('canManageUsers'),
    canViewReports: checkPermission('canViewReports'),
    checkPermission,
  };
};
