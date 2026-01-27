export interface ClientInfo {
  _id: string;
  organizationName: string;
  logo: string;
  id: string;
}

export interface JobDetails {
  _id: string;
  clientId: ClientInfo;
  organizationName: string;
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
  __v: number;
  id: string;
}

export interface CandidateJobApplication {
  _id: string;
  jobId: JobDetails;
  candidateId: string;
  isJobSaved: boolean;
  isJobApplied: boolean;
  savedAt: string | null;
  appliedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface GetCandidateJobsResponse {
  success: boolean;
  message: string;
  data: CandidateJobApplication[];
}
