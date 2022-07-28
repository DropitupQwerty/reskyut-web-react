import SuperAdminLayout from '../../components/superAdminLayout';

import React from 'react';
import { Box} from '@mui/system';
import { Paper, Typography } from '@mui/material';

export default function SaDashboard() {
  return (
  <SuperAdminLayout>
    <Box>
    <Paper elevation={3} sx={{ height: '250px', borderRadius: '20px', width: "25vw", height: "40vh" }}>
              <Typography variant="h5" sx={{ marginLeft: '5vh' }}>
                <b>Total Number of NGO</b>
              </Typography>
            </Paper>
    </Box>
  </SuperAdminLayout>
  );
}
