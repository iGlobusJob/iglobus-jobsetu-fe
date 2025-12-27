import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import { DashboardLayout } from './components/layout/dashboard';
import { AdminLoginPage } from './features/admin/pages/login';
import { Login } from './features/auth/pages/client/login';
import Register from './features/auth/pages/client/register';
import RecruiterLoginPage from './features/recruiter/pages/login';
import { AdminRoutes } from './routes/admin';
import { CandidateRoutes } from './routes/candidate';
import { ClientRoutes } from './routes/client';
import { GuestRoute, ProtectedRoute } from './routes/guards';
import { PublicRoutes } from './routes/public';
import { RecruiterRoutes } from './routes/recruiter';
import { useAuthStore } from './store/userDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<PublicRoutes />} />

        <Route element={<GuestRoute />}>
          <Route path="/client/login" element={<Login />} />
          <Route path="/client/register" element={<Register />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/recruiter" element={<RecruiterLoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Candidate Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/candidate/*" element={<CandidateRoutes />} />

            {/* Client Routes */}
            <Route path="/client/*" element={<ClientRoutes />} />

            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* Recruiter Routes */}
            <Route path="/recruiter/*" element={<RecruiterRoutes />} />
          </Route>
        </Route>

        {/* Fallback - Redirect based on role */}
        <Route path="*" element={<RoleBasedRedirect />} />
      </Routes>
    </Router>
  );
}

// Helper component for role-based redirects
const RoleBasedRedirect = () => {
  const { isLoggedIn, userRole } = useAuthStore();

  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  const dashboardMap: Record<NonNullable<typeof userRole>, string> = {
    candidate: '/candidate/dashboard',
    client: '/client/dashboard',
    admin: '/admin/dashboard',
    recruiter: '/recruiter/jobs',
  };

  return <Navigate to={dashboardMap[userRole!]} replace />;
};

export default App;
