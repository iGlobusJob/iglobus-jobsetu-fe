export const RECRUITER_PATHS = {
  BASE: '/recruiter',
  JOBS: '/recruiter/jobs',
  CLIENTS: '/recruiter/clients',
  CLIENT_DETAILS: (id: string) => `/recruiter/clients/${id}`,
  JOB_DETAILS: (id: string) => `/recruiter/${id}/job-details`,
  CANDIDATE_DETAILS: (id: string) => `/recruiter/${id}/candidate`,
} as const;
