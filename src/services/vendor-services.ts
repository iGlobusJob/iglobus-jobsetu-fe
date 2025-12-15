import axios from 'axios';

import type {
  JobPostFormData,
  JobPostResponse,
  JobsResponse,
} from '@/features/dashboard/types/job';
import type {
  RegisterVendorPayload,
  VendorRegisterResponse,
} from '@/features/dashboard/types/register';
import type { VendorProfileFormData } from '@/features/vendor/interface/updateProfileForm';
import { useAuthStore } from '@/store/userDetails';

import { removeEmptyValues } from './helper';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const apiClientPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const logoutVendor = async () => {
  const { clearAuth } = useAuthStore.getState();

  clearAuth();

  window.location.href = '/';
};

apiClient.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;

    config.headers['auth_token'] = token;
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerVendor = async (
  data: RegisterVendorPayload
): Promise<{ data: VendorRegisterResponse }> => {
  const cleanedData = removeEmptyValues(data);

  return apiClientPublic.post('/registerclient', cleanedData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const loginVendor = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await apiClientPublic.post('/loginvendor', credentials);

    const { token, vendor } = res.data.data;

    // Save everything in Zustand
    useAuthStore.getState().setAuth({
      userRole: 'vendor',
      token,
      firstName: vendor.primaryContact.firstName,
      lastName: vendor.primaryContact.lastName,
      email: vendor.email,
    });

    return vendor;
  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown } };
    throw error.response?.data ?? error;
  }
};

export const createJob = async (
  data: JobPostFormData
): Promise<JobPostResponse> => {
  const response = await apiClient.post('/createjobbyvendor', data);
  return response.data;
};

export const getAllJobs = async (): Promise<JobsResponse> => {
  const response = await apiClient.get('/getalljobsbyclient');
  return response.data;
};

export const deleteJob = async (
  jobId: string
): Promise<{ message: string; success: boolean }> => {
  const response = await apiClient.delete(`/deletejob/${jobId}`);
  return response.data;
};

export const getCandidateDetailsByVendor = async () => {
  const response = await apiClient.get(`/getcandidateprofile`);

  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to fetch candidate');
  }

  return response.data.data;
};

export const getVendorProfile = async () => {
  try {
    const response = await apiClient.get(`/getclientprofile`);
    if (!response.data?.success) {
      throw new Error('Failed to fetch vendor details');
    }

    return response.data.data;
  } catch {
    throw new Error('Unable to fetch vendor details');
  }
};

export const updateVendorProfile = async (data: VendorProfileFormData) => {
  try {
    const response = await apiClient.put(`/updatevendorprofile`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data?.success) {
      throw new Error('Failed to update vendor profile');
    }

    return response.data.data;
  } catch {
    throw new Error('Unable to update vendor profile');
  }
};

export const getJobDetailsById = async (jobId: string) => {
  try {
    const response = await apiClient.get(`/getjobbyvendor/${jobId}`);

    if (!response.data?.success) {
      throw new Error('Failed to fetch job details');
    }

    return response.data.data;
  } catch {
    throw new Error('Unable to fetch job details');
  }
};

export const getCandidateDetailsById = async (candidateId: string) => {
  const response = await apiClient.get(
    `/getcandidatedetailsbyid/${candidateId}`
  );

  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to fetch candidate');
  }
  return response.data.data;
};

export const updateJobById = async (
  jobId: string,
  data: JobPostFormData
): Promise<JobPostResponse> => {
  const response = await apiClient.put(`/updatejobbyvendor`, {
    ...data,
    jobId,
  });
  return response.data;
};
