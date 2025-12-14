import { Navigate, Route, Routes } from 'react-router-dom';

// Candidate Pages
import JobDetailPage from '@/common/pages/jobDetails';
import CandidateDashboard from '@/features/candidate/pages/candidatedashboard';
import { JobListingsSection } from '@/features/candidate/pages/candidatejobs';
import CandidateProfilePage from '@/features/candidate/pages/candidateprofile';

import { RoleRoute } from './guards';

export const CandidateRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleRoute allowedRoles={['candidate']} />}>
        <Route path="dashboard" element={<CandidateDashboard />} />
        <Route path="profile" element={<CandidateProfilePage />} />
        <Route path="search" element={<JobListingsSection />} />
        <Route path=":jobId/job-details" element={<JobDetailPage />} />
        {/* Add more candidate routes here */}

        {/* Default redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
