import React from 'react';
import { Box } from '@mui/material';

type LayoutProps = {
  FormComponent: React.ComponentType;
  TableComponent: React.ComponentType;
  MapComponent: React.ComponentType;
};

const Layout = ({ FormComponent, TableComponent, MapComponent }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: { xs: 'auto', md: '100vh' },
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          padding: { xs: 2, md: 3 },
          paddingBottom: { xs: 2, md: 5 },
          gap: 2,
          overflow: 'hidden',
          height: { xs: 'auto', md: '100%' },
        }}
      >
        <Box
          sx={{
            flex: { xs: '0 0 auto', md: '0 0 45%' },
            minHeight: 0,
            overflow: 'auto',
            marginTop: 2,
          }}
        >
          <FormComponent />
        </Box>
        <Box
          sx={{
            flex: { xs: '0 0 auto', md: '0 0 55%' },
            minHeight: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: { xs: 2, md: 4 },
          }}
        >
          <TableComponent />
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          height: { xs: '400px', md: '100%' },
          padding: { xs: 2, md: 3 },
          paddingBottom: { xs: 2, md: 5 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MapComponent />
      </Box>
    </Box>
  );
};

export default Layout;
