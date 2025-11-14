import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { LocationFormData, Location, EditDialogProps } from '../../types/types';
import { locationSchema } from '../../types/schemas';
import { useUpdateLocation } from '../../hooks/useUpdateLocation';
const EditDialog = ({ open, onClose, location }: EditDialogProps) => {
  const updateLocation = useUpdateLocation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: '',
      category: 'office',
      coordinates: {
        lon: 0,
        lat: 0,
      },
      address: '',
      notes: '',
    },
  });
  useEffect(() => {
    if (location && open) {
      reset({
        name: location.name,
        category: location.category,
        coordinates: {
          lon: location.coordinates.lon,
          lat: location.coordinates.lat,
        },
        address: location.address || '',
        notes: location.notes || '',
      });
    }
  }, [location, open, reset]);

  const submit = (data: LocationFormData) => {
    if (location?._id) {
      updateLocation.mutate(
        { id: location._id, data },
        {
          onSuccess: () => {
            onClose();
            setSnackbarOpen(true);
          },
          onError: (error) => {
            console.error('Failed to update location:', error);
            alert('Could not update location');
          },
        },
      );
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <MuiDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Location</DialogTitle>
      <form onSubmit={handleSubmit(submit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  required
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth required error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select {...field} label="Category">
                    <MenuItem value="office">Office</MenuItem>
                    <MenuItem value="store">Store</MenuItem>
                    <MenuItem value="landmark">Landmark</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="coordinates.lon"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Longitude"
                  type="number"
                  required
                  fullWidth
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                  error={!!errors.coordinates?.lon}
                  helperText={errors.coordinates?.lon?.message}
                />
              )}
            />
            <Controller
              name="coordinates.lat"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Latitude"
                  type="number"
                  required
                  fullWidth
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                  error={!!errors.coordinates?.lat}
                  helperText={errors.coordinates?.lat?.message}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address (optional)"
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Notes (optional)"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.notes}
                  helperText={errors.notes?.message}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </MuiDialog>
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
        Location updated successfully!
      </Alert>
    </Snackbar>
  </>
  );
};

export default React.memo(EditDialog);
