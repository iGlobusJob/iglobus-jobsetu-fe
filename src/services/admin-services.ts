import axios from 'axios';

import type { ApiError } from '@/common';
import type {
  AdminUpdateVendor,
  CreateAdminInput,
} from '@/features/dashboard/types/admin';
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

export const adminLogin = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post('/admin', credentials);

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Invalid login');
    }
    const { token, username } = response.data;
    // Save everything in Zustand
    useAuthStore.getState().setAuth({
      userRole: 'admin',
      token,
      firstName: '',
      lastName: '',
      email: username,
    });
    return response.data;
  } catch (error) {
    const err = error as ApiError;
    throw new Error(err?.response?.data?.message || err?.message);
  }
};

export const getAllClients = async () => {
  try {
    const response = await apiClient.get('/getallclients');

    if (!response.data?.success) {
      throw new Error('Failed to fetch clients');
    }

    return response.data.clients;
  } catch {
    throw new Error('Unable to fetch client list');
  }
};

export const getClientById = async (clientId: string) => {
  try {
    const response = await apiClient.get(
      `/getclientdetailsbyadmin/${clientId}`
    );
    if (!response.data?.success) {
      throw new Error('Failed to fetch client details');
    }

    return response.data.data;
  } catch {
    throw new Error('Unable to fetch client details');
  }
};

export const updateClientByAdmin = async (vendorData: AdminUpdateVendor) => {
  try {
    const response = await apiClient.put('/updateclientbyadmin', vendorData);

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to update client');
    }
    return response.data.data;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Unable to update vendor'
    );
  }
};

export const getAllCandidatesByAdmin = async () => {
  try {
    const response = await apiClient.get('/getallcandidates');
    if (!response.data?.success) {
      throw new Error('Failed to fetch vendors');
    }
    return response.data.candidates;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Error fetching candidate details'
    );
  }
};

export const getCandidateDetailsByAdmin = async (candidateId: string) => {
  const response = await apiClient.get(
    `/getcandidatedetailsbyadmin/${candidateId}`
  );

  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to fetch candidate');
  }

  return response.data.data;
};

export const getAllJobsByAdmin = async () => {
  const response = await apiClient.get(`/getalljobs`);

  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to fetch jobs');
  }
  return response.data.jobs;
};

export const createAdmin = async (data: CreateAdminInput) => {
  try {
    const response = await apiClient.post('/createadmin', data);

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to create admin');
    }

    return response.data.admin;
  } catch (error) {
    const err = error as ApiError;
    throw new Error(err?.response?.data?.message || err?.message);
  }
};
