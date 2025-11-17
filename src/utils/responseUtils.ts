import { Location } from '../types/types';
import { LocationsResponse } from '../api/types/api.types';

export const extractLocations = (data: LocationsResponse | Location[] | undefined): Location[] => {
  if (Array.isArray(data)) {
    return data;
  }

  return data?.data || [];
};

export const extractTotalCount = (data: LocationsResponse | Location[] | undefined): number => {
  if (Array.isArray(data)) {
    return data.length;
  }

  return data?.total ?? 0;
};

