import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import ShelterAdminLayout from '../../components/shelterAdminLayout';
import { Paper, Box, Typography, Grid } from '@mui/material';
import global from '../../styles/global';
import { ListUpdate } from './../../firebase/auth';
import { auth } from '../../firebase/firebase-config';

export default function Dashboard() {
  const [animalData, setAnimalData] = useState([]);

  useEffect(() => {
    const getPostList = async () => {
      const list = await ListUpdate();
      setAnimalData(list);
    };
    getPostList();
  }, []);

  return (
    <ShelterAdminLayout>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper sx={{ ...global.paperDashboard }}>
              <Typography variant="h5">
                <b>Want to adopt TODAY</b>
              </Typography>
              <Box>
                <Typography variant="h2" sx={paperText}>
                  9999
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper sx={{ ...global.paperDashboard }}>
              <Typography variant="h5">
                <b>Total Animals Posted</b>
              </Typography>
              <Box>
                <Typography variant="h2" sx={paperText}>
                  {animalData.length}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper sx={{ ...global.paperDashboard }}>
              <Typography variant="h5">
                <b>Total Animals Adopted</b>
              </Typography>
              <Box>
                <Typography variant="h2" sx={paperText}></Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={8}>
            <Paper sx={{ ...global.paperDashboard }}>
              <Grid container spacing={10}>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                      <b>Adoptor Name</b>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      marginTop: '10px',
                    }}
                  ></Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                      <b>Want to Adopt</b>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      marginTop: '10px',
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ShelterAdminLayout>
  );
}
const paperText = {
  textAlign: 'center',
  marginTop: '30px',
};
