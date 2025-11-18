// src/components/SearchInput.tsx
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { useSearch } from '../../hooks/useSearch';

export const SearchInput = () => {
  const { search, setSearch } = useSearch();
  const [searchValue, setSearchValue] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchValue as string);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const clearSearch = () => {
    setSearchValue('');
    setSearch('');
  };

  return (
    <TextField
      variant="outlined"
      label="Search Name (Non-case sensitive)"
      value={searchValue}
      fullWidth
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search by name…"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton onClick={clearSearch} size="small">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{ mb: 2 }}
    />
  );
};
