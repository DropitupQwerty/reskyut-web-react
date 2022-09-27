//fake api's

import React, { Component } from 'react';
import ShelterAdminLayout from '../../components/shelterAdminLayout';

import { Paper, Box, Typography, Grid } from '@mui/material';
import global from '../../styles/global';
import IsLoggedIn, { GetData, listUpdate } from './../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDoc } from 'firebase/firestore';
import { auth } from '../../firebase/firebase-config';
import { db } from './../../firebase/firebase-config';
import { doc } from 'firebase/firestore';

export default function Dashboard() {
  const navigate = useNavigate();
  const [animalData, setAnimalData] = useState([]);

  useEffect(() => {
    const getPostList = async () => {
      const list = await listUpdate();
      setAnimalData(list);
    };
    getPostList();
  }, [IsLoggedIn().loggedIn]);
  console.log(animalData);

  if (IsLoggedIn().loggedIn) {
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
const paperText = {
  textAlign: 'center',
  marginTop: '30px',
};
