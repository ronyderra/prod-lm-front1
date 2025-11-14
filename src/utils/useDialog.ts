import { useState, useCallback } from 'react';

export const useDialog = () => {
  const [open, setOpen] = useState(false);
  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);

  return { open, openDialog, closeDialog };
};

