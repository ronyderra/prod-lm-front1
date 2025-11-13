import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useCategoryFilter } from '../../contexts/CategoryFilterContext';

const CategoryFilter = () => {
  const { category, setCategory } = useCategoryFilter();

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth>
        <InputLabel>Filter by Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Filter by Category">
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="office">Office</MenuItem>
          <MenuItem value="store">Store</MenuItem>
          <MenuItem value="landmark">Landmark</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategoryFilter;

