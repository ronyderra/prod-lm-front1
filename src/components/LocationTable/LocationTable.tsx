import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Table, TableContainer, TablePagination, Paper } from '@mui/material';
import { Location } from '../../types/types';
import { useGetLocations } from '../../hooks/useGetLocations';
import { useTablePagination } from '../../hooks/useTablePagination';
import { useCategoryFilter } from '../../hooks/useCategoryFilter';
import { useDialog, convertPageToApi, calculateMaxPage, extractLocations, extractTotalCount } from '../../utils';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
import TableHead from './TableHead';
import TableBody from './TableBody';
import './LocationTable.css';

const LocationTable = () => {
  const { page, setPage } = useTablePagination();
  const { category } = useCategoryFilter();
  const deleteDialog = useDialog();
  const editDialog = useDialog();
  const { openDialog: openEditDialog, closeDialog: closeEditDialog } = editDialog;
  const { openDialog: openDeleteDialog, closeDialog: closeDeleteDialog } = deleteDialog;
  const [selectedRow, setSelectedRow] = useState<Location | null>(null);
  const apiPage = convertPageToApi(page);
  const { data, isLoading, error } = useGetLocations(apiPage, category);
  const locations = useMemo(() => extractLocations(data), [data]);
  const totalCount = useMemo(() => extractTotalCount(data), [data]);

  useEffect(() => {
    if (page > 0 && totalCount > 0) {
      const maxPage = calculateMaxPage(totalCount);
      if (page > maxPage) {
        setPage(0);
      }
    } else if (category && page > 0) {
      setPage(0);
    }
  }, [category, totalCount, page, setPage]);

  const changePage = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    [setPage]
  );

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
    return (
      <Paper className="location-table-container" sx={{ p: 2 }}>
        Error loading locations: {error instanceof Error ? error.message : 'Unknown error'}
      </Paper>
    );
  }

  return (
    <Paper className="location-table-container">
      <TableContainer>
        <Table size="small">
          <TableHead />
          <TableBody
            locations={locations}
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
        rowsPerPage={10}
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
