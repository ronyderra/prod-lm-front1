import React, { useState } from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { Location } from '../../types/location.types';
import { useDeleteLocation } from '../../hooks/useDeleteLocation';

export const useDialog = () => {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return { open, openDialog, closeDialog };
};

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  location: Location | null;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'error' | 'primary' | 'secondary' | 'warning' | 'info' | 'success';
};

const DeleteDialog = ({
  open,
  onClose,
  location,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
}: DeleteDialogProps) => {
  const deleteLocation = useDeleteLocation();

  const handleConfirm = () => {
    if (location?._id) {
      deleteLocation.mutate(location._id, {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error('Failed to delete location:', error);
          alert('Could not delete location');
        },
      });
    }
  };

  return (
    <MuiDialog open={open} onClose={onClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          color={confirmColor}
          variant="contained"
          disabled={deleteLocation.isPending}
        >
          {deleteLocation.isPending ? 'Deleting...' : confirmText}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default React.memo(DeleteDialog);
