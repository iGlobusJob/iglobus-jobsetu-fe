import { Navigate, Outlet } from 'react-router-dom';

import type { UserRole } from '@/store/userDetails';
import { useAuthStore } from '@/store/userDetails';

/**
 * Protects routes that should only be accessible to guests
 * (login, register pages)
 * Redirects to dashboard if already logged in
 */
export const GuestRoute = () => {
  const { isLoggedIn, userRole } = useAuthStore();

  if (isLoggedIn() && userRole) {
    const dashboardMap: Record<NonNullable<UserRole>, string> = {
      candidate: '/candidate/dashboard',
      vendor: '/vendor/dashboard',
      admin: '/admin/dashboard',
    };

    return <Navigate to={dashboardMap[userRole]} replace />;
  }

  return <Outlet />;
};
