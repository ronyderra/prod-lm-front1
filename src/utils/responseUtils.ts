import { Location } from '../types/types';

type LocationsResponse = {
  data?: Location[];
  total?: number;
};

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

