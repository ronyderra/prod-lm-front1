import React from 'react';
import { TableHead as MuiTableHead, TableRow, TableCell } from '@mui/material';
const TableHead = () => {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Longitude</TableCell>
        <TableCell>Latitude</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Notes</TableCell>
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </MuiTableHead>
  );
};

export default React.memo(TableHead);