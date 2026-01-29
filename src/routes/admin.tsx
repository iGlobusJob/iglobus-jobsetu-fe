import { Navigate, Route, Routes } from 'react-router-dom';

import AddAdminPage from '@/features/admin/pages/AddAdminPage';
import AnalyticsDashboard from '@/features/admin/pages/AnalyticsDashboard';
import ClientDetailsPage from '@/features/admin/pages/ClientDetailsPage';
import RecruiterDashboard from '@/features/admin/pages/RecruiterDashboard';
import ClientDashboard from '@/features/admin/pages/dashboard';
import AllJobs from '@/features/admin/pages/jobs';
import CandidateDetailPage from '@/features/recruiter/pages/candidateDetail';
import CandidatesPage from '@/features/recruiter/pages/candidates';
import JobDetailPage from '@/features/recruiter/pages/jobDetails';

import { RoleRoute } from './guards';

// Admin Pages

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleRoute allowedRoles={['admin']} />}>
        <Route path="dashboard" element={<AnalyticsDashboard />} />
        <Route path="clients" element={<ClientDashboard />} />
        <Route path="clients/:clientId" element={<ClientDetailsPage />} />
        <Route path="candidates" element={<CandidatesPage />} />
        <Route path="recruiters" element={<RecruiterDashboard />} />
        <Route path=":jobId/job-details" element={<JobDetailPage />} />
        {/* Add more admin routes here */}
        <Route path="add-admin" element={<AddAdminPage />} />
        <Route path="all-jobs" element={<AllJobs />} />

        <Route
          path="/:candidateId/candidate"
          element={<CandidateDetailPage />}
        />
        {/* Default redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
