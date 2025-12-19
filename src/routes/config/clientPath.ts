export const CLIENT_PATHS = {
  BASE: '/client',
  DASHBOARD: '/client/dashboard',
  POST_JOB: '/client/jobs/new',
  MANAGE_JOBS: '/client/jobs/manage-jobs',
  EDIT_JOB_WITH_ID: (id: string) => `/client/jobs/${id}/edit`,
  APPLICANTS: '/client/applicants',
  PROFILE: '/client/profile',
  COMPANY: '/client/company',
} as const;
