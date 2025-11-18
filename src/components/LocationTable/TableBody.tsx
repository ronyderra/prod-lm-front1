import React, { useCallback, useState } from 'react';
import { TableBody as MuiTableBody, TableRow, TableCell, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableProps, Location } from '../../types/types';
import { useSelectedLocation } from '../../hooks/useSelectedLocation';

type RowProps = {
  location: Location;
  onEditClick: (location: Location) => void;
  onDeleteClick: (location: Location) => void;
};

const TableRowComponent = React.memo(({ location, onEditClick, onDeleteClick }: RowProps) => {
  const { selected, setSelected } = useSelectedLocation();

  const handleRowClick = useCallback(() => {
    const details = `Name: ${location.name}\nCategory: ${location.category}\nLongitude: ${location.coordinates.lon}\nLatitude: ${location.coordinates.lat}\nAddress: ${location.address || '-'}\nNotes: ${location.notes || '-'}`;
    alert(details);
  }, [location]);

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onEditClick(location);
  }, [location, onEditClick]);

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick(location);
  }, [location, onDeleteClick]);

  return (
    <TableRow
      onClick={handleRowClick}
      sx={{
        backgroundColor: location._id === selected ? 'lightgreen' : 'transparent',
        cursor: 'pointer',
      }}
    >
      <TableCell>{location.name}</TableCell>
      <TableCell>{location.category}</TableCell>
      <TableCell>{location.coordinates.lon}</TableCell>
      <TableCell>{location.coordinates.lat}</TableCell>
      <TableCell>{location.address || '-'}</TableCell>
      <TableCell>{location.notes || '-'}</TableCell>
      <TableCell align="right">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
          <IconButton size="small" onClick={handleEditClick} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={handleDeleteClick} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
});

TableRowComponent.displayName = 'TableRowComponent';

const TableBody = ({ locations, onEditClick, onDeleteClick }: TableProps) => {
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
        <TableRowComponent
          key={location._id}
          location={location}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </MuiTableBody>
  );
};

export default React.memo(TableBody);
