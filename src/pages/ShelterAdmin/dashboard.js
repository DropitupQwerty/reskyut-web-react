//fake api's
import { getAnimals, getAnimal } from '../../fakeApi/fakeAnimalAccount';
import { getUserAccounts } from '../../fakeApi/fakeUserAccountApi';

import React, { Component } from 'react';
import ShelterAdminLayout from '../../components/shelterAdminLayout';

import { Paper, Box, Typography, Grid } from '@mui/material';
import global from '../../styles/global';
import IsLoggedIn from './../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  const paperText = {
    textAlign: 'center',
    marginTop: '30px',
  };

  if (IsLoggedIn()) {
    return (
      <ShelterAdminLayout>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper sx={{ ...global.paperDashboard }}>
                <Typography variant="h5">
                  <b>Wants to adopt TODAY</b>
                </Typography>
                <Box>
                  <Typography variant="h2" sx={paperText}></Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper sx={{ ...global.paperDashboard }}>
                <Typography variant="h5">
                  <b>Total Animals Posted</b>
                </Typography>
                <Box>
                  <Typography variant="h2" sx={paperText}></Typography>
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
                        <b>Animal Name</b>
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
                        <b>Wants to Adopt</b>
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
  } else {
    navigate(`/`);
  }
}
