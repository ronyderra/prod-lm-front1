import axios, { AxiosInstance, AxiosError } from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://lm-back-f1ed4b6fed3f.herokuapp.com';

export const axiosClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

