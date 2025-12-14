import { Navigate, Route, Routes } from 'react-router-dom';

import AllJobsComponent from '@/features/vendor/components/job/allJobs';
import CandidateDashboardByVendor from '@/features/vendor/pages/VendorCandidates';
import { PostJobPage } from '@/features/vendor/pages/addJob';
import EditJobPage from '@/features/vendor/pages/editJob';
import VendorProfile from '@/features/vendor/pages/vendorProfile';
import VendorDashboard from '@/features/vendor/pages/vendordashboard';

import { RoleRoute } from './guards';

// Vendor Pages

export const VendorRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleRoute allowedRoles={['vendor']} />}>
        <Route path="dashboard" element={<VendorDashboard />} />
        <Route path="profile" element={<VendorProfile />} />
        <Route path="jobs">
          <Route path="new" element={<PostJobPage />} />
          <Route path=":jobId/edit" element={<EditJobPage />} />
          <Route path="manage-jobs" element={<AllJobsComponent />} />
        </Route>
        <Route path="candidates" element={<CandidateDashboardByVendor />} />
        {/* Add more vendor routes here */}

        {/* Default redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
