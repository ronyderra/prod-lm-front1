import React, { createContext, useContext, useState, ReactNode } from 'react';

type LocationPageContextType = {
  page: number;
  setPage: (page: number) => void;
};

const LocationPageContext = createContext<LocationPageContextType | undefined>(undefined);

export const LocationPageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(0);

  return <LocationPageContext.Provider value={{ page, setPage }}>{children}</LocationPageContext.Provider>;
};

export const useLocationPage = () => {
  const context = useContext(LocationPageContext);
  if (context === undefined) {
    throw new Error('useLocationPage must be used within a LocationPageProvider');
  }

  return context;
};

