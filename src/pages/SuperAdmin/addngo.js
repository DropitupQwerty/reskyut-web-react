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
  FormGroup,
} from '@mui/material';

import React, { useState } from 'react';
import global from '../../styles/global';
import SuperAdminLayout from '../../components/superAdminLayout';
import { createAccount } from '../../firestore';

export default function AddNgo() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserame] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [desc, setDesc] = useState('');

  const handleCreateAccount = () => {
    createAccount(
      firstName,
      middleName,
      lastName,
      username,
      password,
      email,
      displayName,
      desc
    );
  };

  return (
    <SuperAdminLayout>
      <Box>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginTop: '20px' }}
        >
          <Avatar sx={{ height: '200px', width: '200px' }}></Avatar>
        </Stack>

        <Box display="flex" justifyContent="center">
          <form>
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
                <FormGroup>
                  <FormControl fullWidth>
                    <OutlinedInput
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}> Middlename</Typography>
                <FormGroup>
                  <FormControl fullWidth>
                    <OutlinedInput
                      onChange={(event) => {
                        setMiddleName(event.target.value);
                      }}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}> Lastname</Typography>
                <FormGroup>
                  <FormControl fullWidth>
                    <OutlinedInput
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}> Username</Typography>
                <FormGroup>
                  <FormControl fullWidth>
                    <OutlinedInput
                      onChange={(event) => {
                        setUserame(event.target.value);
                      }}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}> Email</Typography>
                <FormGroup>
                  <FormControl fullWidth>
                    <OutlinedInput
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Display Name
                </Typography>
                <FormGroup>
                  <FormControl fullWidth>
                    <OutlinedInput
                      onChange={(event) => {
                        setDisplayName(event.target.value);
                      }}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>

              <Grid item xs={8}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Description of Shelter
                </Typography>
                <TextField
                  multiline
                  onChange={(event) => {
                    setDesc(event.target.value);
                  }}
                  rows={5}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 'bold' }}>Password</Typography>
                <FormGroup>
                  <FormControl fullWidth>
                    <OutlinedInput
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      type="password"
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs sx={{ marginTop: '50px' }}>
                <Button
                  sx={{
                    ...global.button2,
                    fontWeight: 'bold',
                  }}
                  onClick={handleCreateAccount}
                  type="submit"
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </SuperAdminLayout>
  );
}
