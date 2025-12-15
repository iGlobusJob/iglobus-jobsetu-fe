export interface JobSummary {
  id: string;
  jobTitle: string;
  organizationName: string;
  jobLocation: string;
  minimumSalary: number;
  maximumSalary: number;
}
export interface CandidateJob {
  id: string;
  candidateId: string;
  jobId: JobSummary;

  isJobSaved: boolean;
  isJobApplied: boolean;

  savedAt: string;
  appliedAt: string | null;

  createdAt: string;
  updatedAt: string;
}
