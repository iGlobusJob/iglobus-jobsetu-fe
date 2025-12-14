import type { Job, JobCard } from './job';

export const jobsData = (job: Job): JobCard => {
  return {
    id: job._id,
    title: job.jobTitle,
    companyName: job.organizationName || job.companyName || 'Unknown Company',
    jobLocation: job.jobLocation,
    companyLocation: '',
    salaryRange: `₹ ${job.minimumSalary} - ₹ ${job.maximumSalary}`,
    experienceLevel: `${job.minimumExperience} - ${job.maximumExperience} years`,
    jobDescription: job.jobDescription,
    importantNotes: [],
    jobType: job.jobType.toLowerCase(),
    jobImage: '',
    urgentHiring: false,
    bookmarked: false,
  };
};
