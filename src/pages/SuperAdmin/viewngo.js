import {
  Box,
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  FormControl,
  OutlinedInput,
} from '@mui/material';

import React from 'react';
import global from '../../styles/global';
import { deepOrange } from '@mui/material/colors';
import AppBarAdminLayout from '../../components/appBarAdminLayout';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

export default function ViewNgo() {
  // style
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
    <AppBarAdminLayout>
      <Box>
        <Button
          elevation={3}
          variant="outlined"
          color="primary"
          sx={style.button}
          component={Link}
          to="/admin/listofngo "
          selected={window.location.pathname.includes('/admin/listofngo')}
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
              <FormControl sx={style.textfield}>
                <OutlinedInput />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Middlename</Typography>
              <FormControl sx={style.textfield}>
                <OutlinedInput />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Lastname</Typography>
              <FormControl sx={style.textfield}>
                <OutlinedInput />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Username</Typography>
              <FormControl sx={style.textfield}>
                <OutlinedInput />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Email</Typography>
              <FormControl sx={style.textfield}>
                <OutlinedInput />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Display Name</Typography>
              <FormControl sx={style.textfield}>
                <OutlinedInput />
              </FormControl>
            </Grid>
            <Grid item xs>
              <Typography sx={{ fontWeight: 'bold' }}>
                Description of Shelter
              </Typography>
              <TextField multiline rows={5} sx={style.textfield1} />
            </Grid>
            <Grid item xs={4} sx={{ marginTop: '50px' }}>
              <Button
                sx={{
                  ...global.button2,
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
}
