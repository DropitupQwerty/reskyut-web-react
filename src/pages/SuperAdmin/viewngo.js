import {
  Box,
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import React from 'react';
import global from '../../styles/global';
import { deepOrange } from '@mui/material/colors';
import AppBarAdminLayout from '../../components/appBarAdminLayout';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useParams } from 'react-router-dom';
import { getAccount } from './../../fakeApi/fakeShelterAccountApi';
import Input from '../../components/common/input';

const ViewNgo = () => {
  const { id } = useParams();
  const account = getAccount(id);

  const style = {
    textfield: {
      height: '49px',
    },
  };
  return (
    <AppBarAdminLayout>
      <Box>
        <Button
          elevation={3}
          variant="outlined"
          color="primary"
          sx={style.button}
          component={Link}
          to="/admin/listofngo "
        >
          <ArrowBackIosIcon />
        </Button>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginTop: '20px' }}
        >
          <Avatar
            sx={{ bgcolor: deepOrange[500], height: '200px', width: '200px' }}
            src={account.avatarPhoto}
          ></Avatar>
        </Stack>

        <Box display="flex" justifyContent="center">
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '12px',
            }}
          >
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Firstname</Typography>
              <Input
                sx={style.textfield}
                value={account.firstName}
                id="firstname"
                readOnly={true}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Middlename</Typography>
              <Input
                sx={style.textfield}
                value={account.middleName}
                id="middlename"
                readOnly={true}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Lastname</Typography>
              <Input
                sx={style.textfield}
                value={account.lastName}
                id="lastname"
                readOnly={true}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Username</Typography>
              <Input
                sx={style.textfield}
                value={account.userName}
                id="username"
                readOnly={true}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Email</Typography>
              <Input
                sx={style.textfield}
                value={account.userEmail}
                id="email"
                readOnly={true}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Display Name</Typography>
              <Input
                sx={style.textfield}
                value={account.displayName}
                id="displayName"
                readOnly={true}
              />
            </Grid>
            <Grid item xs>
              <Typography sx={{ fontWeight: 'bold' }}>
                Description of Shelter
              </Typography>
              <TextField multiline value={account.desc} rows={5} fullWidth />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                marginTop: '50px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                sx={{
                  ...global.button2Small,
                  fontWeight: 'bold',
                }}
              >
                Disable
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </AppBarAdminLayout>
  );
};

export default ViewNgo;
