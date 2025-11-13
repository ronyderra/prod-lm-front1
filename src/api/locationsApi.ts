import { axiosClient } from './axiosClient';
import { LocationFormData, Location } from '../types/location.types';

export const getLocations = (page: number = 1) => {
  if (page === 1) {
    return axiosClient.get('/locations').then((res) => res.data);
  }

  return axiosClient.get('/locations', { params: { page } }).then((res) => res.data);
};

export const getAllLocations = () => axiosClient.get('/locations').then((res) => res.data);

export const createLocation = (data: LocationFormData): Promise<Location> =>
  axiosClient.post('/locations', data).then((res) => res.data);

export const updateLocation = (id: string, data: LocationFormData): Promise<Location> =>
  axiosClient.put(`/locations/${id}`, data).then((res) => res.data);

export const deleteLocation = (id: string): Promise<void> =>
  axiosClient.delete(`/locations/${id}`).then((res) => res.data);
