import { Navigate, Outlet } from 'react-router-dom';

import type { UserRole } from '@/store/userDetails';
import { useAuthStore } from '@/store/userDetails';

interface RoleRouteProps {
  allowedRoles: UserRole[];
}

/**
 * Protects routes based on user role
 * Redirects to appropriate dashboard if wrong role
 */
export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { isLoggedIn, userRole } = useAuthStore();

  // Not logged in - redirect to login
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  // Wrong role - redirect to their dashboard
  if (!userRole || !allowedRoles.includes(userRole)) {
    const dashboardMap: Record<NonNullable<UserRole>, string> = {
      candidate: '/candidate/dashboard',
      client: '/client/dashboard',
      admin: '/admin/dashboard',
      recruiter: '/recruiter/jobs',
    };

    return <Navigate to={dashboardMap[userRole!]} replace />;
  }

  // Correct role - render child routes
  return <Outlet />;
};
