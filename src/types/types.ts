import { z } from 'zod';
import { locationSchema } from './schemas';
import React from 'react';

export type LocationData = z.infer<typeof locationSchema>;

export type Location = {
  _id: string;
  name: string;
  category: string;
  coordinates: {
    lon: number;
    lat: number;
  };
  address?: string;
  notes?: string;
};

export type LayoutProps = {
  FormComponent: React.ComponentType;
  TableComponent: React.ComponentType;
  MapComponent: React.ComponentType;
};

export type TableProps = {
  locations: Location[];
  onEditClick: (location: Location) => void;
  onDeleteClick: (location: Location) => void;
};

export type EditProps = {
  open: boolean;
  onClose: () => void;
  location: Location | null;
};

export type DeleteProps = {
  open: boolean;
  onClose: () => void;
  location: Location | null;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'error' | 'primary' | 'secondary' | 'warning' | 'info' | 'success';
};

