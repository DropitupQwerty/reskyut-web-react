import React, { Component } from 'react';
import ShelterAdminLayout from '../../components/shelterAdminLayout';
import { Paper, Box, Typography, Grid } from '@mui/material';
import global from '../../styles/global';
import { getUserAccount } from '../../fakeApi/fakeUserAccountApi';
import { getAnimal } from '../../fakeApi/fakeAnimalAccount';

class Dashboard extends Component {
  state = {
    userAccounts: getUserAccount(),
    animalData: getAnimal(),
    animalAdopted: 0,
  };

  render() {
    const paperText = {
      textAlign: 'center',
      marginTop: '30px',
    };
    return (
      <ShelterAdminLayout>
        <Box>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item xs={4}>
              <Paper elevation={3} sx={{ ...global.paperDashboard }}>
                <Typography variant="h5">
                  <b>Wants to adopt TODAY</b>
                </Typography>
                <Box>
                  <Typography variant="h2" sx={paperText}>
                    {this.state.userAccounts.length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                sx={{
                  ...global.paperDashboard,
                }}
                elevation={3}
              >
                <Typography variant="h5">
                  <b>Total Animals Posted</b>
                </Typography>
                <Box>
                  <Typography variant="h2" sx={paperText}>
                    {this.state.animalData.length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                elevation={3}
                sx={{
                  ...global.paperDashboard,
                }}
              >
                <Typography variant="h5">
                  <b>Total Animals Adopted</b>
                </Typography>
                <Box>
                  <Typography variant="h2" sx={paperText}>
                    {this.state.animalAdopted}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{ ...global.paperDashboard }} elevation={3}>
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
                    >
                      {this.state.userAccounts
                        .slice(0, 4)
                        .map((userAccount) => (
                          <Typography
                            key={userAccount.id}
                            sx={{ padding: '2px' }}
                          >
                            {userAccount.petAdopt}
                          </Typography>
                        ))}
                    </Box>
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
                    >
                      {this.state.userAccounts
                        .slice(0, 4)
                        .map((userAccount) => (
                          <Typography
                            key={userAccount.id}
                            sx={{ padding: '2px', alignText: 'center' }}
                          >
                            {userAccount.firstName}
                          </Typography>
                        ))}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </ShelterAdminLayout>
    );
  }
}

export default Dashboard;
