import {
  Box,
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import React, { useState, useEffect } from 'react';
import global from '../../styles/global';
import ShelterAdminLayout from '../../components/shelterAdminLayout';
import IsLoggedIn, { GetData } from './../../firebase/auth';
import { auth } from '../../firebase/firebase-config';

export default function Profile() {
  const [open, setOpen] = useState(false);
  const data = IsLoggedIn().userData;
  const [values, setValues] = useState({
    amount: '',
    password: '',
    oldPassword: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  // console.log('called', user);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // style

  return (
    <ShelterAdminLayout>
      <Box>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginTop: '20px' }}
        >
          <Avatar sx={{ height: '200px', width: '200px' }}></Avatar>
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
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                value={data?.firstName}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Middlename</Typography>
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                value={data?.middleName}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Lastname</Typography>
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                value={data?.lastName}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Username</Typography>
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                value={data?.username}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}>Email</Typography>
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                value={data?.email}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Display Name</Typography>
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                value={data?.display_name}
              />
            </Grid>
            <Grid item xs>
              <Typography sx={{ fontWeight: 'bold' }}>
                {' '}
                Description of Shelter
              </Typography>
              <TextField
                multiline
                rows={5}
                sx={{ width: '830px' }}
                inputProps={{ readOnly: true }}
                defaultValue={data?.desc}
              />
            </Grid>
            <Grid item container xs={4} spacing={2}>
              <Grid item>
                <Box>
                  <Button
                    sx={{ ...global.button1, fontWeight: 'bold' }}
                    onClick={handleClickOpen}
                  >
                    ChangePassword
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        borderRadius: 30,
                        width: '500px',
                        padding: '20px',
                      },
                    }}
                  >
                    <DialogTitle sx={{ fontWeight: 'bold', color: '#E94057' }}>
                      {'CHANGE PASSWORD'}
                    </DialogTitle>
                    <DialogContent>
                      {/* password Old Password */}
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Old Password
                      </Typography>
                      <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <OutlinedInput
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange('password')}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      {/* password Old Password */}

                      {/* password Old Password */}
                      <Typography sx={{ fontWeight: 'bold' }}>
                        New Password
                      </Typography>
                      <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                        <OutlinedInput
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange('password')}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      {/* password Old Password */}
                      {/* password Old Password */}
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Confirm Password
                      </Typography>
                      <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                        <OutlinedInput
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange('password')}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      {/* password Old Password */}
                    </DialogContent>

                    <DialogActions
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        marginBottom: '12px',
                      }}
                    >
                      <Button onClick={handleClose} sx={{ ...global.button3 }}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleClose}
                        autoFocus
                        sx={{ ...global.button2Small }}
                      >
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
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
