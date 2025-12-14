import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/store/userDetails';

/**
 * Protects routes that require authentication
 * Redirects to login if not authenticated
 */
export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn()) {
    // Save the attempted URL to redirect after login
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};
