import React from 'react';
import { TableBody as MuiTableBody, TableRow, TableCell, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Location } from '../../types/location.types';
type TableBodyProps = {
  locations: Location[];
  onEditClick: (location: Location) => void;
  onDeleteClick: (location: Location) => void;
};
const TableBody = ({ locations, onEditClick, onDeleteClick }: TableBodyProps) => {
  if (locations?.length === 0) {
    return (
      <MuiTableBody>
        <TableRow>
          <TableCell colSpan={7} align="center">
            No locations found
          </TableCell>
        </TableRow>
      </MuiTableBody>
    );
  }

  return (
    <MuiTableBody>
      {locations?.map((location) => (
        <TableRow key={location._id}>
          <TableCell>{location.name}</TableCell>
          <TableCell>{location.category}</TableCell>
          <TableCell>{location.coordinates.lon}</TableCell>
          <TableCell>{location.coordinates.lat}</TableCell>
          <TableCell>{location.address || '-'}</TableCell>
          <TableCell>{location.notes || '-'}</TableCell>
          <TableCell align="right">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
              <IconButton size="small" onClick={() => onEditClick(location)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton size="small" onClick={() => onDeleteClick(location)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </MuiTableBody>
  );
};

export default React.memo(TableBody);
