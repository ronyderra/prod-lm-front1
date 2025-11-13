import { axiosClient } from './axiosClient';
import { LocationFormData, Location } from '../types/location.types';

export const getLocations = (page: number = 1, category?: string) => {
  const params: { page?: number; category?: string } = {};
  
  if (page > 1) {
    params.page = page;
  }
  
  if (category && category !== '') {
    params.category = category;
  }

  return axiosClient.get('/locations', { params }).then((res) => res.data);
};

export const createLocation = (data: LocationFormData): Promise<Location> =>
  axiosClient.post('/locations', data).then((res) => res.data);

export const updateLocation = (id: string, data: LocationFormData): Promise<Location> =>
  axiosClient.put(`/locations/${id}`, data).then((res) => res.data);

export const deleteLocation = (id: string): Promise<void> =>
  axiosClient.delete(`/locations/${id}`).then((res) => res.data);
