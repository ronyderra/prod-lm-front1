import React from 'react';
import { TableHead as MuiTableHead, TableRow, TableCell } from '@mui/material';
const TableHead = () => {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Longitude</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Latitude</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Notes</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
      </TableRow>
    </MuiTableHead>
  );
};

export default React.memo(TableHead);