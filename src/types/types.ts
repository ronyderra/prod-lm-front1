import { z } from 'zod';
import { locationSchema } from './schemas';
import React from 'react';

export type LocationFormData = z.infer<typeof locationSchema>;

export interface Location extends LocationFormData {
  _id: string;
}

export type LayoutProps = {
  FormComponent: React.ComponentType;
  TableComponent: React.ComponentType;
  MapComponent: React.ComponentType;
};

export type TableBodyProps = {
  locations: Location[];
  onEditClick: (location: Location) => void;
  onDeleteClick: (location: Location) => void;
};

export type EditDialogProps = {
  open: boolean;
  onClose: () => void;
  location: Location | null;
};

export type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  location: Location | null;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'error' | 'primary' | 'secondary' | 'warning' | 'info' | 'success';
};

