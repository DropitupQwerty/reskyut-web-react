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
import { db } from '../../firebase/firebase-config';
import DeleteDialog from '../../components/common/deleteDialog';
import { disableAccount, enableAccount } from './../../firebase/auth';

export default function ViewNgo() {
  const { id } = useParams();
  const [account, setAccount] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const docRef = doc(db, 'ngoshelters', id);
      const docSnap = await getDoc(docRef);
      setAccount(docSnap.data());
    };
    getUsers();
  }, []);

  const {
    photoURL,
    firstName,
    middleName,
    lastName,
    email,
    username,
    display_name,
    desc,
  } = account || {};

  const handleDialog = () => {
    setOpen(true);
    setMessage('Disable Account?');
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    const acc = account;
    acc.isDisable = !account.isDisable;
    setAccount(acc);

    setOpen(false);
    disableAccount(account.id);
  };
  const handleEnable = () => {
    const disAcc = !account.isDisable;
    setAccount(disAcc);
    enableAccount(account.id);
  };

  return (
    <div>
      <AppBarAdminLayout>
        <DeleteDialog
          open={open}
          message={message}
          cancel={handleCancel}
          confirm={handleConfirm}
        />
        <Box>
          <Button
            elevation={3}
            variant="outlined"
            color="primary"
            sx={style.button}
            component={Link}
            to="/admin/listofngo"
          >
            <ArrowBackIosIcon />
          </Button>
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ marginTop: '20px' }}
          >
            <Avatar
              src={photoURL}
              alt={photoURL}
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
                  value={firstName}
                  id="firstname"
                  readOnly={true}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}> Middlename</Typography>
                <Input
                  sx={style.textfield}
                  value={middleName}
                  id="middlename"
                  readOnly={true}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}> Lastname</Typography>
                <Input
                  sx={style.textfield}
                  value={lastName}
                  id="lastname"
                  readOnly={true}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}> Username</Typography>
                <Input
                  sx={style.textfield}
                  value={username}
                  id="username"
                  readOnly={true}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}> Email</Typography>
                <Input
                  sx={style.textfield}
                  value={email}
                  id="email"
                  readOnly={true}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Display Name
                </Typography>
                <Input
                  sx={style.textfield}
                  value={display_name}
                  id="displayName"
                  readOnly={true}
                />
              </Grid>
              <Grid item xs>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Description of Shelter
                </Typography>
                <TextField
                  multiline
                  value={desc}
                  rows={5}
                  fullWidth
                  inputProps={{ readOnly: true }}
                />
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
                {!account.isDisable ? (
                  <Button
                    sx={{
                      ...global.button2,
                      fontWeight: 'bold',
                    }}
                    onClick={handleDialog}
                  >
                    Disable
                  </Button>
                ) : (
                  <Button
                    sx={{
                      ...global.button1,
                      fontWeight: 'bold',
                    }}
                    onClick={handleEnable}
                  >
                    Enable
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </AppBarAdminLayout>
    </div>
  );
}

const style = {
  textfield: {
    height: '49px',
  },
};
