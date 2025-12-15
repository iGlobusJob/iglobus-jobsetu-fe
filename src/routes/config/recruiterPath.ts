export const RECRUITER_PATHS = {
  BASE: '/recruiter',
  JOBS: '/recruiter/jobs',
  JOB_DETAILS: (id: string) => `/recruiter/${id}/job-details`,
} as const;
