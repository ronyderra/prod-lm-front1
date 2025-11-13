import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { locationSchema, LocationFormData } from '../../types/location.types';
import { useCreateLocation } from '../../hooks/useCreateLocation';
import './LocationForm.css';

const LocationForm = () => {
  const createLocation = useCreateLocation();
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

  const submit = (data: LocationFormData) => {
    createLocation.mutate(data, {
      onSuccess: () => {
        reset();
        setSnackbarOpen(true);
      },
      onError: (error) => {
        console.error('Failed to create location:', error);
        alert('Could not save location');
      },
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box className="location-form-container">
      <form onSubmit={handleSubmit(submit)}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
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
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required error={!!errors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select {...field} label="Category">
                      <MenuItem value="">
                        <em>Select Category</em>
                      </MenuItem>
                      <MenuItem value="office">Office</MenuItem>
                      <MenuItem value="store">Store</MenuItem>
                      <MenuItem value="landmark">Landmark</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
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
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
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
            </Box>
          </Box>
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
          <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Location'}
          </Button>
        </Stack>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Location added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default React.memo(LocationForm);
