import { Navigate, Route, Routes } from 'react-router-dom';

import AddAdminPage from '@/features/admin/pages/AddAdminPage';
import AnalyticsDashboard from '@/features/admin/pages/AnalyticsDashboard';
import CandidateDashboard from '@/features/admin/pages/CandidateDashboard';
import VendorDashboard from '@/features/admin/pages/dashboard';
import AllJobs from '@/features/admin/pages/jobs';
import RecruiterDashboard from '@/features/admin/pages/RecruiterDashboard';

import { RoleRoute } from './guards';

// Admin Pages

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleRoute allowedRoles={['admin']} />}>
        <Route path="dashboard" element={<AnalyticsDashboard />} />
        <Route path="vendors" element={<VendorDashboard />} />
        <Route path="candidates" element={<CandidateDashboard />} />
        <Route path="recruiters" element={<RecruiterDashboard />} />
        {/* Add more admin routes here */}
        <Route path="add-admin" element={<AddAdminPage />} />
        <Route path="all-jobs" element={<AllJobs />} />
        {/* Default redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
