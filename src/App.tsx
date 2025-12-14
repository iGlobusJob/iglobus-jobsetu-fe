import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import { DashboardLayout } from './components/layout/dashboard';
import { AdminLoginPage } from './features/admin/pages/login';
import { Login } from './features/auth/pages/vendor/login';
import Register from './features/auth/pages/vendor/register';
import { AdminRoutes } from './routes/admin';
import { CandidateRoutes } from './routes/candidate';
import { GuestRoute, ProtectedRoute } from './routes/guards';
import { PublicRoutes } from './routes/public';
import { VendorRoutes } from './routes/vendor';
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
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Candidate Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/candidate/*" element={<CandidateRoutes />} />

            {/* Vendor Routes */}
            <Route path="/vendor/*" element={<VendorRoutes />} />

            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
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
    vendor: '/vendor/dashboard',
    admin: '/admin/dashboard',
  };

  return <Navigate to={dashboardMap[userRole!]} replace />;
};

export default App;
