import type { Job, JobCard } from './job';

export const jobsData = (job: Job): JobCard => {
  return {
    id: job._id,
    jobTitle: job.jobTitle,
    organizationName:
      job.organizationName || job.companyName || 'Unknown Company',
    jobLocation: job.jobLocation,
    salaryRange: `₹ ${job.minimumSalary} - ₹ ${job.maximumSalary}`,
    salaryMin: job.minimumSalary,
    salaryMax: job.maximumSalary,
    experienceLevel: `${job.minimumExperience} - ${job.maximumExperience} years`,
    jobDescription: job.jobDescription,
    jobType: job.jobType.toLowerCase(),
    bookmarked: false,
    category: '',
    logo: job.logo || null,
    status: job.status,
  };
};
