import React from 'react';
import ShelterAdminLayout from '../../components/shelterAdminLayout';
import { Paper, Box, Typography, Grid } from '@mui/material';

export default function dashboard() {
  return (
    <ShelterAdminLayout>
      <Box>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item xs>
            <Paper elevation={3} sx={{ height: '250px', borderRadius: '20px' }}>
              <Typography variant="h5" sx={{ marginLeft: '5vh' }}>
                <b>Wants to adopt TODAY</b>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper
              elevation={3}
              sx={{
                height: '250px',

                borderRadius: '20px',
                marginLeft: '3vw',
              }}
            >
              <Typography variant="h5" sx={{ marginLeft: '5vh' }}>
                <b>Total Animals Posted</b>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper
              elevation={3}
              sx={{
                height: '250px',
                borderRadius: '20px',
                marginLeft: '3vw',
              }}
            >
              <Typography variant="h5" sx={{ marginLeft: '5vh' }}>
                <b>Total Animals Adopted</b>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Paper
          elevation={3}
          sx={{
            height: '650px',
            width: '750px',
            borderRadius: '20px',
            marginTop: '5vh',
          }}
        >
          <Grid container justify="flex-end">
            <Typography variant="h5" sx={{ marginLeft: '5vh' }}>
              <b>Animal Name</b>
            </Typography>
            <Typography variant="h5" sx={{ marginLeft: '30vh' }}>
              <b>Wants to Adopt</b>
            </Typography>
          </Grid>
        </Paper>
        
      </Box>
    </ShelterAdminLayout>
  );
}
