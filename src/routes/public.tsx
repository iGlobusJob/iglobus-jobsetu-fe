import { Route, Routes } from 'react-router-dom';

// Public Pages
import { UserDashboard } from '@/features/dashboard';
import { AboutData } from '@/features/dashboard/components/common/aboutdata';

export const PublicRoutes = () => {
  return (
    <Routes>
      {/* Public pages - accessible to everyone */}
      <Route path="/" element={<UserDashboard />} />
      <Route path="/aboutus" element={<AboutData />} />
    </Routes>
  );
};
