import SuperAdminLayout from '../../components/superAdminLayout';
import ShelterAdminLayout from '../../components/shelterAdminLayout';

import React, { useState, useEffect } from 'react';

import { Paper, Typography, Box } from '@mui/material';
import global from '../../styles/global';
import { Oval } from 'react-loader-spinner';

import { db } from '../../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import IsLoggedIn, { GetAccounts } from './../../firebase/auth';

export default function SaDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([1, 1]);
  useEffect(() => {
    const allAccounts = async () => {
      const acc = await GetAccounts();
      setAccounts(acc);
      setIsLoading(false);
    };
    allAccounts();
  }, []);

  const dataLoad = () => {
    if (isLoading === false) {
      return accounts.length;
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
          <Paper
            elevation={3}
            sx={{
              ...global.paperDashboard,
              width: '25vw',
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                <b>Total Number of NGO</b>
              </Typography>

              <Typography
                variant="h2"
                sx={{ textAlign: 'center', marginTop: '30px' }}
              >
                {dataLoad()}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </SuperAdminLayout>
    </div>
  );
}
