import React from 'react';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import { LayoutProps } from '../../types/types';
import './Layout.css';

const Layout = ({ FormComponent, TableComponent, MapComponent }: LayoutProps) => {
  return (
    <div className="layout-container">
      <div className="layout-left-panel">
        <div className="layout-form-container">
          <FormComponent />
        </div>
        <div className="layout-filter-container">
          <CategoryFilter />
        </div>
        <div className="layout-table-container">
          <TableComponent />
        </div>
      </div>
      <div className="layout-map-panel">
        <MapComponent />
      </div>
    </div>
  );
};

export default React.memo(Layout);
