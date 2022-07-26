import { Box, Typography } from '@mui/material';
import React from 'react';
import AppBarLayout from './components/appBarLayout';

export default function PagenotFound() {
  return (
    <AppBarLayout>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">OOPS!! PAGE NOT FOUND HEHE</Typography>
      </Box>
    </AppBarLayout>
  );
}
