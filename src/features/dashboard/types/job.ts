export interface JobCard {
  id: string;
  jobTitle: string;
  jobDescription: string;
  organizationName: string;
  jobLocation: string;
  salaryRange: string;
  salaryMin: number;
  salaryMax: number;
  experienceLevel: string;
  jobType: string;
  bookmarked: boolean;
  category: string;
  logo: string | null;
}

export interface ApiJob {
  id: string;
  jobTitle: string;
  jobDescription: string;
  organizationName: string;
  jobLocation: string;
  minimumSalary: number;
  maximumSalary: number;
  minimumExperience: number;
  maximumExperience: number;
  jobType: string;
  logo: string | null;
}
export interface JobPostResponse {
  success: true;
  message: 'Job created successfully !';
}

export interface JobPostFormData {
  jobTitle: string;
  jobDescription: string;

  postStart: Date | null;
  postEnd: Date | null;

  noOfPositions: number;

  minimumSalary: number;
  maximumSalary: number;

  jobType: string;
  jobLocation?: string;

  minimumExperience: number;
  maximumExperience: number;

  status: string;
}

export interface Job {
  _id: string;
  clientId: string;
  organizationName?: string;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  postStart: string;
  postEnd: string;
  noOfPositions: number;
  minimumSalary: number;
  maximumSalary: number;
  jobType: string;
  jobLocation: string;
  minimumExperience: number;
  maximumExperience: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  logo?: string;
}

export interface JobsResponse {
  success: boolean;
  message: string;
  data: Job[];
}
