import React, { createContext, useContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

interface LoadingContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  open: false,
  setOpen: () => {},
});

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider(props: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <LoadingContext.Provider value={{ open, setOpen }}>
      {props.children}
      <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff' }}>
        <CircularProgress size={100} color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
}
