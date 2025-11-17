import { Location } from '../../types/types';

export type LocationsResponse = {
  data: Location[];
  total: number;
  page?: number;
  pageSize?: number;
};

export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
};

