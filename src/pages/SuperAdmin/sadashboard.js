import SuperAdminLayout from '../../components/superAdminLayout';
import ShelterAdminLayout from '../../components/shelterAdminLayout';

import React, { useState, useEffect } from 'react';

import { Paper, Typography, Box, Grid } from '@mui/material';
import global from '../../styles/global';
import { Oval } from 'react-loader-spinner';
import {
  getNgoCount,
  getPetsCollection,
  getTrashCollection,
} from './../../firebase/auth';

export default function SaDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState();
  const [pets, setPets] = useState();
  const [trash, setTrash] = useState();

  useEffect(() => {
    const allAccounts = async () => {
      const acc = await getNgoCount();
      setAccounts(acc);
      setIsLoading(false);

      const pets = await getPetsCollection();
      setPets(pets.length);

      const trash = await getTrashCollection();
      setTrash(trash.length);
    };
    allAccounts();
  }, []);

  const dataLoad = () => {
    if (isLoading === false) {
      return { accounts, pets, trash };
    }

    return (
      <Box sx={{ diplay: 'flex', justifyContent: 'center' }} fullWidth>
        <Oval
          height={40}
          width={40}
          color="#E94057"
          wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          visible={isLoading}
          secondaryColor="primary"
        />
      </Box>
    );
  };

  return (
    <div>
      <SuperAdminLayout>
        <Box>
          <Grid container spacing={2}>
            <Grid item>
              <Paper
                elevation={3}
                sx={{
                  ...global.paperDashboard,
                  width: '25vw',
                }}
              >
                <Box>
                  <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    <b>Total Animal Rescue Shelters</b>
                  </Typography>

                  <Typography
                    variant="h2"
                    sx={{ textAlign: 'center', marginTop: '30px' }}
                  >
                    {dataLoad()?.accounts}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                elevation={3}
                sx={{
                  ...global.paperDashboard,
                  width: '25vw',
                }}
              >
                <Box>
                  <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    <b>Total post of Animal Shelters</b>
                  </Typography>

                  <Typography
                    variant="h2"
                    sx={{ textAlign: 'center', marginTop: '30px' }}
                  >
                    {dataLoad()?.pets}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                elevation={3}
                sx={{
                  ...global.paperDashboard,
                  width: '25vw',
                }}
              >
                <Box>
                  <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    <b>Total post of trash</b>
                  </Typography>

                  <Typography
                    variant="h2"
                    sx={{ textAlign: 'center', marginTop: '30px' }}
                  >
                    {dataLoad()?.trash}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </SuperAdminLayout>
    </div>
  );
}
