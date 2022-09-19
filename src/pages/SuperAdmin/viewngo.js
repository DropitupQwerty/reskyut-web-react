import {
  Box,
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import React, { useState, useEffect } from 'react';
import global from '../../styles/global';
import { deepOrange } from '@mui/material/colors';
import AppBarAdminLayout from '../../components/appBarAdminLayout';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useParams } from 'react-router-dom';
import Input from '../../components/common/input';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function ViewNgo() {
  const { id } = useParams();
  const [account, setAccount] = useState([]);

  // const read = async () => {
  //   const docRef = doc(db, 'ngoshelters', id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     setAccount(docSnap.data());
  //   } else {
  //     console.log('No such document!');
  //   }
  // };
  const getUsers = async () => {
    const docRef = doc(db, 'ngoshelters', id);
    const docSnap = await getDoc(docRef);
    setAccount(docSnap.data());
  };
  getUsers();

  const style = {
    textfield: {
      height: '49px',
    },
  };
  return (
    <div>
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
                  value={account.username}
                  id="username"
                  readOnly={true}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}> Email</Typography>
                <Input
                  sx={style.textfield}
                  value={account.email}
                  id="email"
                  readOnly={true}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {' '}
                  Display Name
                </Typography>
                <Input
                  sx={style.textfield}
                  value={account.display_name}
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
    </div>
  );
}
