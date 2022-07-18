import {
  Avatar,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import global from '../styles/global';
import ShelterAdminLayout from '../components/shelterAdminLayout';
import { deepOrange } from '@mui/material/colors';
import { Box } from '@mui/system';

export default function Profile() {
  const style = {
    textfield: {
      width: '348px',
      height: '49px',
    },
    textfield1: {
      width: '830px',
    },
  };

  return (
    <ShelterAdminLayout>
      <Box>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginTop: '20px' }}
        >
          <Avatar
            sx={{ bgcolor: deepOrange[500], height: '200px', width: '200px' }}
          ></Avatar>
        </Stack>

        <Box
          display="flex"
          justifyContent="center"
          sx={{ marginLeft: '100px' }}
        >
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
              <TextField inputProps={{ readOnly: true }} sx={style.textfield} />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Middlename</Typography>
              <TextField inputProps={{ readOnly: true }} sx={style.textfield} />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Lastname</Typography>
              <TextField inputProps={{ readOnly: true }} sx={style.textfield} />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Username</Typography>
              <TextField inputProps={{ readOnly: true }} sx={style.textfield} />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}>Email</Typography>
              <TextField inputProps={{ readOnly: true }} sx={style.textfield} />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Display Name</Typography>
              <TextField inputProps={{ readOnly: true }} sx={style.textfield} />
            </Grid>
            <Grid item xs>
              <Typography sx={{ fontWeight: 'bold' }}>
                {' '}
                Description of Shelter
              </Typography>
              <TextField
                multiline
                rows={5}
                sx={style.textfield1}
                inputProps={{ readOnly: true }}
                defaultValue=" This page is dedicated to rescuing and helping stray dogs and
                cats,especially those in pain. We are hoping those who will
                follow this page can extend prayers and help to these poor abused
                animals."
              />
            </Grid>
            <Grid item container xs={4}>
              <Grid item>
                <Button sx={{ ...global.button1, fontWeight: 'bold' }}>
                  Change Password
                </Button>
              </Grid>
              <Grid item>
                <Button sx={{ ...global.button2, fontWeight: 'bold' }}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ShelterAdminLayout>
  );
}
