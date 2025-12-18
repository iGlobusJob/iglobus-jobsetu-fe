import axios from 'axios';

import type {
  JobPostFormData,
  JobPostResponse,
  JobsResponse,
} from '@/features/dashboard/types/job';
import type {
  RegisterClientPayload,
  ClientRegisterResponse,
} from '@/features/dashboard/types/register';
import type { ClientProfileFormData } from '@/features/client/interface/updateProfileForm';
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

export const logoutClient = async () => {
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

export const registerClient = async (
  data: RegisterClientPayload
): Promise<{ data: ClientRegisterResponse }> => {
  const cleanedData = removeEmptyValues(data);

  return apiClientPublic.post('/registerclient', cleanedData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const loginClient = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await apiClientPublic.post('/loginclient', credentials);

    const { token, client } = res.data.data;

    // Save everything in Zustand
    useAuthStore.getState().setAuth({
      userRole: 'client',
      token,
      firstName: client.primaryContact.firstName,
      lastName: client.primaryContact.lastName,
      email: client.email,
      profileImage: client.logo,
    });

    return client;
  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown } };
    throw error.response?.data ?? error;
  }
};

export const createJob = async (
  data: JobPostFormData
): Promise<JobPostResponse> => {
  const response = await apiClient.post('/createjobbyclient', data);
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

export const getCandidateDetailsByClient = async () => {
  const response = await apiClient.get(`/getcandidateprofile`);

  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to fetch candidate');
  }

  return response.data.data;
};

export const getClientProfile = async () => {
  try {
    const response = await apiClient.get(`/getclientprofile`);
    if (!response.data?.success) {
      throw new Error('Failed to fetch client details');
    }

    return response.data.data;
  } catch {
    throw new Error('Unable to fetch client details');
  }
};

export const updateClientProfile = async (data: ClientProfileFormData) => {
  try {
    const response = await apiClient.put(`/updateclientprofile`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data?.success) {
      throw new Error('Failed to update client profile');
    }

    const updatedClient = response.data.data;

    const authState = useAuthStore.getState();

    useAuthStore.getState().setAuth({
      userRole: authState.userRole,
      token: authState.token as string,
      email: updatedClient.email,
      firstName: updatedClient.primaryContact.firstName,
      lastName: updatedClient.primaryContact.lastName,
      profileImage: updatedClient.logo,
    });

    return updatedClient;
  } catch {
    throw new Error('Unable to update client profile');
  }
};

export const getJobDetailsById = async (jobId: string) => {
  try {
    const response = await apiClient.get(`/getjobbyclient/${jobId}`);

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
  const response = await apiClient.put(`/updatejobbyclient`, {
    ...data,
    jobId,
  });
  return response.data;
};
