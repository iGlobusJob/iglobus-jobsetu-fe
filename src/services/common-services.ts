import axios from 'axios';

import type { ContactFormData } from '@/features/dashboard/forms/contactSchema';
import { useAuthStore } from '@/store/userDetails';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers['auth_token'] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const sendContactUsMail = async (data: ContactFormData) => {
  try {
    const response = await apiClient.post('/contactus', data);
    return response.data;
  } catch (error) {
    console.error('Error in sendContactUsMail:', error);
    throw error;
  }
};
