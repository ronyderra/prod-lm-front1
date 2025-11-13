import React, { useState, ChangeEvent, useMemo } from 'react';
import { Table, TableContainer, TablePagination, Paper } from '@mui/material';
import { Location } from '../../types/location.types';
import { useLocations } from '../../hooks/useLocations';
import { useDialog } from './DeleteDialog';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
import TableHead from './TableHead';
import TableBody from './TableBody';
import './LocationTable.css';

const LocationTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const deleteDialog = useDialog();
  const editDialog = useDialog();
  const [selectedRow, setSelectedRow] = useState<Location | null>(null);
  const { data, isLoading, error } = useLocations();
  const locations = useMemo(() => data?.data || [], [data]);

  const paginatedLocations = useMemo(
    () => locations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [locations, page, rowsPerPage]
  );

  const changePage = (_event: unknown, newPage: number) => setPage(newPage);
  const changeRows = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editClick = (location: Location) => {
    setSelectedRow(location);
    editDialog.openDialog();
  };

  const editClose = () => {
    setSelectedRow(null);
    editDialog.closeDialog();
  };

  const deleteClick = (location: Location) => {
    setSelectedRow(location);
    deleteDialog.openDialog();
  };

  const deleteClose = () => {
    setSelectedRow(null);
    deleteDialog.closeDialog();
  };

  if (isLoading) {
    return (
      <Paper className="location-table-container" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
        Loading...
      </Paper>
    );
  }

  if (error) {
    return <Paper className="location-table-container">Error loading locations</Paper>;
  }

  return (
    <Paper className="location-table-container">
      <TableContainer>
        <Table size="small">
          <TableHead />
          <TableBody
            locations={paginatedLocations}
            onEditClick={editClick}
            onDeleteClick={deleteClick}
          />
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={locations.length}
        page={page}
        onPageChange={changePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={changeRows}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <DeleteDialog
        open={deleteDialog.open}
        onClose={deleteClose}
        location={selectedRow}
        title="Delete Location"
        message="Are you sure you want to delete this location? This action cannot be undone."
        confirmText="Delete"
        confirmColor="error"
      />
      <EditDialog open={editDialog.open} onClose={editClose} location={selectedRow} />
    </Paper>
  );
};

export default React.memo(LocationTable);
