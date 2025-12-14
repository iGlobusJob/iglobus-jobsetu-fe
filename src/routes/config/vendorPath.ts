export const VENDOR_PATHS = {
  BASE: '/vendor',
  DASHBOARD: '/vendor/dashboard',
  POST_JOB: '/vendor/jobs/new',
  MANAGE_JOBS: '/vendor/jobs/manage-jobs',
  EDIT_JOB_WITH_ID: (id: string) => `/vendor/jobs/${id}/edit`,
  APPLICANTS: '/vendor/applicants',
  PROFILE: '/vendor/profile',
  COMPANY: '/vendor/company',
} as const;
