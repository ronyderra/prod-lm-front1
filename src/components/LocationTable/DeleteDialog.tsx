import React, { useState } from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { DeleteDialogProps } from '../../types/types';
import { useDeleteLocation } from '../../hooks/useDeleteLocation';

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleConfirm = () => {
    if (location?._id) {
      deleteLocation.mutate(location._id, {
        onSuccess: () => {
          onClose();
          setSnackbarOpen(true);
        },
        onError: (error) => {
          console.error('Failed to delete location:', error);
          alert('Could not delete location');
        },
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Location deleted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default React.memo(DeleteDialog);
