import { axiosClient } from '../client/axiosClient';
import { LocationFormData, Location } from '../../types/types';
import { LocationsResponse } from '../types/api.types';
import { AxiosError } from 'axios';

export const getLocations = async (
  page: number = 1,
  category?: string
): Promise<LocationsResponse> => {
  try {
    const params: { page?: number; category?: string } = {};
    
    if (page > 1) {
      params.page = page;
    }
    
    if (category && category !== '') {
      params.category = category;
    }

    const response = await axiosClient.get<LocationsResponse>('/locations', { params });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to fetch locations: ${error.message}`);
    }

    throw error;
  }
};

export const createLocation = async (data: LocationFormData): Promise<Location> => {
  try {
    const response = await axiosClient.post<Location>('/locations', data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to create location: ${error.message}`);
    }

    throw error;
  }
};

export const updateLocation = async (id: string, data: LocationFormData): Promise<Location> => {
  try {
    const response = await axiosClient.put<Location>(`/locations/${id}`, data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to update location: ${error.message}`);
    }

    throw error;
  }
};

export const deleteLocation = async (id: string): Promise<void> => {
  try {
    await axiosClient.delete(`/locations/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to delete location: ${error.message}`);
    }

    throw error;
  }
};

