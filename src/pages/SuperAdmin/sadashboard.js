import SuperAdminLayout from '../../components/superAdminLayout';
import { getAccount } from '../../fakeApi/fakeShelterAccountApi';

import React, { Component } from 'react';
import { Box } from '@mui/system';
import { Paper, Typography } from '@mui/material';

class SaDashboard extends Component {
  state = {
    accounts: getAccount(),
  };
  render() {
    const { length: dataCount } = this.state.accounts;

    return (
      <SuperAdminLayout>
        <Box>
          <Paper
            elevation={3}
            sx={{
              height: '250px',
              borderRadius: '20px',
              padding: '20px',
              width: '25vw',
              height: '40vh',
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
                {dataCount}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </SuperAdminLayout>
    );
  }
}

export default SaDashboard;
