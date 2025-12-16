import axios from 'axios';

import type { CandidateProfileFormData } from '@/features/candidate/pages/candidateprofile';
import type { CandidateJob } from '@/features/dashboard/types/candidatejobs';
import type { ApiJob } from '@/features/dashboard/types/job';
import { useOtpModalStore } from '@/store/otpModalStore';
import { useAuthStore } from '@/store/userDetails';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const candidateJoin = async (data: { email: string }) => {
  await apiClient.post('/join', data);
  return true;
};

export const validateOtp = async (credentials: {
  email: string;
  otp: string;
}) => {
  try {
    const res = await apiClient.post('/validateOTP', credentials);

    const token = res.data?.data?.token;
    const candidate = res.data?.data?.candidate;
    if (!token || !candidate?.id) {
      throw new Error('Invalid OTP response');
    }

    // Update auth state
    useAuthStore.getState().setAuth({
      userRole: 'candidate',
      token: token,
      firstName: candidate?.firstName || '',
      lastName: candidate?.lastName || '',
      email: candidate?.email || '',
    });

    // Close OTP modal AFTER successfully verify
    useOtpModalStore.getState().closeModal();

    return res.data;
  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown } };
    throw error.response?.data ?? error;
  }
};

export const getCandidateProfile = async () => {
  const response = await apiClient.get(`/getcandidateprofile`);

  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to fetch candidate');
  }

  return response.data.data;
};

export const getAllJobs = async (): Promise<ApiJob[]> => {
  const response = await apiClient.get('/getalljobs');

  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to fetch candidate');
  }

  return response.data.jobs;
};

export const updateCandidateProfile = async (data: {
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  category?: string;
  resumeFile?: File | null;
  profilePictureFile?: File | null;
}): Promise<CandidateProfileFormData> => {
  try {
    const formData = new FormData();
    formData.append('firstName', data.firstName || '');
    formData.append('lastName', data.lastName || '');
    formData.append('mobileNumber', data.mobileNumber || '');
    formData.append('address', data.address || '');
    formData.append('dateOfBirth', data.dateOfBirth || '');
    formData.append('gender', data.gender || '');
    formData.append('category', data.category || '');
    formData.append('profilepicture', data.profilePictureFile || '');

    if (data.resumeFile instanceof File) {
      formData.append('profile', data.resumeFile);
    }

    const response = await apiClient.put('/updatecandidateprofile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to update candidate');
    }

    return response.data.data;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Unable to update candidate'
    );
  }
};

export const getJobDetailsById = async (jobId: string) => {
  try {
    const response = await apiClient.get(`/getjobdetailsbyid/${jobId}`);

    if (!response.data?.success) {
      throw new Error('Failed to fetch job details');
    }

    return response.data.data;
  } catch {
    throw new Error('Unable to fetch job details');
  }
};

export const applyToJob = async ({ jobId }: { jobId: string }) => {
  try {
    const response = await apiClient.post('/applytojob', { jobId });
    return response.data.data;
  } catch {
    throw new Error('Unable to apply ');
  }
};

export const saveToJob = async ({ jobId }: { jobId: string }) => {
  try {
    const response = await apiClient.post('/savejob', { jobId });
    return response.data.data;
  } catch {
    throw new Error('Unable to save ');
  }
};

export const unSaveToJob = async ({ jobId }: { jobId: string }) => {
  try {
    const response = await apiClient.put('/unsavejob', { jobId });
    return response.data.data;
  } catch {
    throw new Error('Unable to unsave ');
  }
};

export const getMyJobs = async (): Promise<CandidateJob[]> => {
  try {
    const response = await apiClient.get('/getmyjobs');
    return response.data.data;
  } catch {
    throw new Error('failed to get my jobs ');
  }
};

export const getAllJobsByCandidate = async (): Promise<ApiJob[]> => {
  try {
    const response = await apiClient.get('/getalljobsbycandidate');
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch candidate');
    }
    return response.data.data.jobs;
  } catch {
    throw new Error('failed to get all jobs by candidate ');
  }
};
