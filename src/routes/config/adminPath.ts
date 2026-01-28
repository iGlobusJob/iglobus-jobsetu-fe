export const ADMIN_PATHS = {
  BASE: '/admin',
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/users',
  CLIENTS: '/admin/clients',
  CLIENT_DETAILS: (id: string) => `/admin/clients/${id}`,
  CANDIDATES: '/admin/candidates',
  JOBS: '/admin/jobs',
  JOB_DETAILS: (id: string) => `/admin/${id}/job-details`,
  CANDIDATE_DETAILS: (id: string) => `/admin/${id}/candidate`,
} as const;
