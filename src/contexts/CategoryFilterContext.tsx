import React, { createContext, useContext, useState, ReactNode } from 'react';

type CategoryFilterContextType = {
  category: string;
  setCategory: (category: string) => void;
};

const CategoryFilterContext = createContext<CategoryFilterContextType | undefined>(undefined);

export const CategoryFilterProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState('');

  return (
    <CategoryFilterContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryFilterContext.Provider>
  );
};

export const useCategoryFilter = () => {
  const context = useContext(CategoryFilterContext);
  if (context === undefined) {
    throw new Error('useCategoryFilter must be used within a CategoryFilterProvider');
  }

  return context;
};

