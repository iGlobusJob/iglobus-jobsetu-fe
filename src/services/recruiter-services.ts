import axios from 'axios';

import type { ApiError } from '@/common';
import type { CandidateJobApplication } from '@/features/dashboard/types/admin-candidate-job';
import { useAuthStore } from '@/store/userDetails';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;

    config.headers['auth_token'] = token;
    return config;
  },
  (error) => Promise.reject(error)
);

export const recruiterLogin = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post('/recruiter', credentials);

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Invalid login');
    }
    const { token, firstName, lastName, email } = response.data;
    // Save everything in Zustand
    useAuthStore.getState().setAuth({
      userRole: 'recruiter',
      token,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    return response.data;
  } catch (error) {
    const err = error as ApiError;
    throw new Error(err?.response?.data?.message || err?.message);
  }
};

export const getAllCandidatesByRecruiter = async () => {
  try {
    const response = await apiClient.get('/recruiter/candidates');
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch candidates');
    }
    return response.data.candidates;
  } catch (error) {
    const err = error as ApiError;
    throw new Error(err?.response?.data?.message || err?.message);
  }
};

export const getCandidatesDetailsById = async (candidateId: string) => {
  try {
    const response = await apiClient.get(`/recruiter/candidate/${candidateId}`);
    if (!response.data?.success) {
      throw new Error(
        response.data?.message || 'Failed to fetch candidate details'
      );
    }
    return response.data.data;
  } catch (error) {
    const err = error as ApiError;
    throw new Error(err?.response?.data?.message || err?.message);
  }
};

export const deleterecruiter = async (recruiterId: string) => {
  try {
    const response = await apiClient.delete(`/deleterecruiter/${recruiterId}`);
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to delete recruiter');
    }
    return response.data;
  } catch (error) {
    const err = error as ApiError;
    throw new Error(err?.response?.data?.message || err?.message);
  }
};

export const getallassignedclientsbyrecruiter = async () => {
  try {
    const response = await apiClient.get(
      '/recruiter/getallassignedclientsbyrecruiter'
    );

    if (!response.data?.success) {
      throw new Error('Failed to fetch clients');
    }

    return response.data.clients;
  } catch {
    throw new Error('Unable to fetch client list');
  }
};

export const getJobDetailsAndApplicentDetailsById = async (jobId: string) => {
  try {
    const response = await apiClient.get(
      `/getjobdetailswithapplicants/${jobId}`
    );

    if (!response.data?.success) {
      throw new Error('Failed to fetch job details');
    }

    return response.data.data;
  } catch {
    throw new Error('Unable to fetch job details');
  }
};

export const getcandidatejobs = async (
  candidateId: string
): Promise<CandidateJobApplication[]> => {
  try {
    const response = await apiClient.get(`/getcandidatejobs/${candidateId}`);
    const jobs = response.data.data;
    return jobs.map((job: { jobId: { clientId: { logo: null } } }) => {
      const logo = job.jobId?.clientId?.logo || null;
      return {
        ...job,
        jobId: {
          ...job.jobId,
          logo,
        },
      };
    });
  } catch {
    throw new Error('failed to get my jobs ');
  }
};
