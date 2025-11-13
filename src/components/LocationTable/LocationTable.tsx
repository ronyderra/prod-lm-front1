import React, { useState, ChangeEvent, useMemo, useCallback, useEffect } from 'react';
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
  const { openDialog: openEditDialog, closeDialog: closeEditDialog } = editDialog;
  const { openDialog: openDeleteDialog, closeDialog: closeDeleteDialog } = deleteDialog;
  const [selectedRow, setSelectedRow] = useState<Location | null>(null);
  const { data, isLoading, error } = useLocations();
  const locations = useMemo(() => data?.data || [], [data]);
  const totalCount = useMemo(() => data?.total ?? locations.length, [data, locations.length]);

  const paginatedLocations = useMemo(
    () => locations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [locations, page, rowsPerPage]
  );

  // Reset page if current page is out of bounds after locations change
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(totalCount / rowsPerPage) - 1);
    if (page > maxPage) {
      setPage(0);
    }
  }, [totalCount, rowsPerPage, page]);

  const changePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const changeRows = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const editClick = useCallback(
    (location: Location) => {
      setSelectedRow(location);
      openEditDialog();
    },
    [openEditDialog]
  );

  const editClose = useCallback(() => {
    setSelectedRow(null);
    closeEditDialog();
  }, [closeEditDialog]);

  const deleteClick = useCallback(
    (location: Location) => {
      setSelectedRow(location);
      openDeleteDialog();
    },
    [openDeleteDialog]
  );

  const deleteClose = useCallback(() => {
    setSelectedRow(null);
    closeDeleteDialog();
  }, [closeDeleteDialog]);

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
        count={totalCount}
        page={page}
        onPageChange={changePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={changeRows}
        rowsPerPageOptions={[]}
        labelRowsPerPage=""
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
