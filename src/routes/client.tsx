import { Navigate, Route, Routes } from 'react-router-dom';

import AllJobsComponent from '@/features/client/components/job/allJobs';
import CandidateDashboardByClient from '@/features/client/pages/ClientCandidates';
import { PostJobPage } from '@/features/client/pages/addJob';
import EditJobPage from '@/features/client/pages/editJob';
import ClientProfile from '@/features/client/pages/clientProfile';
import ClientDashboard from '@/features/client/pages/clientdashboard';

import { RoleRoute } from './guards';

// Client Pages

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleRoute allowedRoles={['client']} />}>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="profile" element={<ClientProfile />} />
        <Route path="jobs">
          <Route path="new" element={<PostJobPage />} />
          <Route path=":jobId/edit" element={<EditJobPage />} />
          <Route path="manage-jobs" element={<AllJobsComponent />} />
        </Route>
        <Route path="candidates" element={<CandidateDashboardByClient />} />
        {/* Add more client routes here */}

        {/* Default redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
