import SuperAdminLayout from '../../components/superAdminLayout';
import { getAccounts } from '../../fakeApi/fakeShelterAccountApi';

import React, { Component } from 'react';
import { Box } from '@mui/system';
import { Paper, Typography } from '@mui/material';
import global from '../../styles/global';

class SaDashboard extends Component {
  state = {
    accounts: getAccounts(),
  };
  render() {
    const { length: dataCount } = this.state.accounts;

    return (
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
