import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function AppBarLayout({ children }) {
  return (
    <Box>
      <AppBar position="fixed">
        <Box>
          <Toolbar>
            <Typography variant="h4" sx={{ fontWeight: '600' }}>
              {'SUPER ADMIN'}
            </Typography>
          </Toolbar>
        </Box>
      </AppBar>
      <Box
        component="main"
        sx={{
          p: 3,
          marginTop: '100px',
          padding: ' 0 100px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
