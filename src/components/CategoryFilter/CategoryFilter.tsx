import React, { useCallback } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useCategoryFilter } from '../../hooks/useCategoryFilter';

const CategoryFilter = () => {
  const { category, setCategory } = useCategoryFilter();

  const handleChange = useCallback(
    (e: { target: { value: string } }) => {
      setCategory(e.target.value);
    },
    [setCategory]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth>
        <InputLabel>Filter by Category</InputLabel>
        <Select value={category} onChange={handleChange} label="Filter by Category">
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="office">Office</MenuItem>
          <MenuItem value="store">Store</MenuItem>
          <MenuItem value="landmark">Landmark</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default React.memo(CategoryFilter);

