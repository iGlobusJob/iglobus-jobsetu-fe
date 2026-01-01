import { Navigate, Route, Routes } from 'react-router-dom';

// Public Pages
import { UserDashboard } from '@/features/dashboard';
import { AboutData } from '@/features/dashboard/components/common/aboutdata';
import { ServicesData } from '@/features/dashboard/components/common/services';
import { useAuthStore } from '@/store/userDetails';

export const PublicRoutes = () => {
  const { isLoggedIn, userRole } = useAuthStore();
  if (isLoggedIn() && userRole === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return (
    <Routes>
      {/* Public pages - accessible to everyone */}
      <Route path="/" element={<UserDashboard />} />
      <Route path="/aboutus" element={<AboutData />} />
      <Route path="/services" element={<ServicesData />} />
    </Routes>
  );
};
