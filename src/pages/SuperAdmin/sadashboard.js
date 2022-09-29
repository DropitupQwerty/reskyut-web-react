import SuperAdminLayout from '../../components/superAdminLayout';

import React, { useState, useEffect } from 'react';

import { Paper, Typography, Box } from '@mui/material';
import global from '../../styles/global';
import { Oval } from 'react-loader-spinner';

import { auth, db } from '../../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function SaDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const ngoAdminCollectionRef = collection(db, 'ngoshelters');

  useEffect(() => {
    const getAccounts = async () => {
      const data = await getDocs(ngoAdminCollectionRef);
      setAccounts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };
    getAccounts();
  }, []);

  console.log(accounts);

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
