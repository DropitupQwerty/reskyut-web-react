import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function AppBarLayout({ children }) {
  return (
    <Box>
      <AppBar position="fixed">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Toolbar>
            <Typography variant="h4" sx={{ fontWeight: '600' }}>
              {'Stray Worth Saving'}
            </Typography>
          </Toolbar>
        </Box>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '100px' }}>
        {children}
      </Box>
    </Box>
  );
}
