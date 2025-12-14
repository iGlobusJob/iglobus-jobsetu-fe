export const CANDIDATE_PATHS = {
  BASE: '/candidate',
  DASHBOARD: '/candidate/dashboard',
  PROFILE: '/candidate/profile',
  APPLICATIONS: '/candidate/applications',
  JOBS: '/candidate/jobs',
  JOB_DETAILS: (id: string) => `/candidate/${id}/job-details`,
} as const;
