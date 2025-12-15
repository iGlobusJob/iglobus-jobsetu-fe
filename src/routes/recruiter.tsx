import { Navigate, Route, Routes } from 'react-router-dom';

import JobDetailPage from '@/features/recruiter/pages/jobDetails';
import { JobListingsSection } from '@/features/recruiter/pages/jobs';

import { RoleRoute } from './guards';

export const RecruiterRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleRoute allowedRoles={['recruiter']} />}>
        <Route path="jobs" element={<JobListingsSection />} />
        <Route path=":jobId/job-details" element={<JobDetailPage />} />

        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
