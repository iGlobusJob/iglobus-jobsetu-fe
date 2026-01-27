export const ADMIN_PATHS = {
  BASE: '/admin',
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/users',
  CLIENTS: '/admin/clients',
  CANDIDATES: '/admin/candidates',
  JOBS: '/admin/jobs',
  CANDIDATE_DETAILS: (id: string) => `/admin/${id}/candidate`,
} as const;
