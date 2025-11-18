import { axiosClient } from '../client/axiosClient';
import { LocationData, Location } from '../../types/types';
import { LocationsResponse } from '../types/api.types';
import { AxiosError } from 'axios';

export const getLocations = async (
  page: number = 1,
  category?: string,
  search?: string
): Promise<LocationsResponse> => {
  try {
    console.log({search});
    const params: { page?: number; category?: string; name?: string } = {};
    
    if (page > 1) {
      params.page = page;
    }
    
    if (category && category !== '') {
      params.category = category;
    }

    if (search && search !== '') {
      params.name = search as string;
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

export const createLocation = async (data: LocationData) => {
  try {
    const response = await axiosClient.post('/locations', data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to create location: ${error.message}`);
    }

    throw error;
  }
};

export const updateLocation = async (id: string, data: LocationData) => {
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

export const deleteLocation = async (id: string) => {
  try {
    await axiosClient.delete(`/locations/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to delete location: ${error.message}`);
    }

    throw error;
  }
};

