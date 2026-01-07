export interface CandidateProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  experience: string;
  designation: string;
  createdAt: string;
  updatedAt: string;
  profilePicture: string;
  profileUrl?: string;
}

export interface CandidateJobs {
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
