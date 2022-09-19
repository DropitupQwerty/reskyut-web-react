import SuperAdminLayout from '../../components/superAdminLayout';

import React, { useState, useEffect } from 'react';

import { Paper, Typography, Box } from '@mui/material';
import global from '../../styles/global';

import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function SaDashboard() {
  const [accounts, setAccounts] = useState([]);
  const ngoAdminCollectionRef = collection(db, 'ngoshelters');

  useEffect(() => {
    const getAccounts = async () => {
      const data = await getDocs(ngoAdminCollectionRef);
      setAccounts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAccounts();
  }, []);

  console.log(accounts);

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
                sx={{ textAlign: 'center', marginTop: '20px' }}
              >
                {accounts.length}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </SuperAdminLayout>
    </div>
  );
}
