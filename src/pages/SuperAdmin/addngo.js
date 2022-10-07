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
  IconButton,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import React, { useState } from 'react';
import global from '../../styles/global';
import SuperAdminLayout from '../../components/superAdminLayout';

import { register } from '../../firebase/auth';

export default function AddNgo() {
  const [inputs, setInputs] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    display_name: '',
    desc: '',
    isAdmin: false,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = async () => {
    register(inputs);
  };

  return (
    <SuperAdminLayout>
      <Box>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginTop: '20px' }}
        >
          <Box sx={{ position: 'relative' }}>
            <Avatar sx={{ height: '200px', width: '200px' }}></Avatar>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{
                position: 'absolute',
                right: '0px',
                bottom: '0px',
                background: '#D8DADF',
                padding: '20px',
              }}
            >
              <input hidden accept="image/*" type="file" />
              <AddAPhotoIcon sx={{ height: '30px', width: 'auto' }} />
            </IconButton>
          </Box>
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
              <FormGroup>
                <FormControl fullWidth>
                  <OutlinedInput
                    name="firstName"
                    value={inputs.firstName}
                    onChange={handleChange}
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Middlename</Typography>
              <FormGroup>
                <FormControl fullWidth>
                  <OutlinedInput
                    name="middleName"
                    value={inputs.middleName}
                    onChange={handleChange}
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Lastname</Typography>
              <FormGroup>
                <FormControl fullWidth>
                  <OutlinedInput
                    name="lastName"
                    value={inputs.lastName}
                    onChange={handleChange}
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Username</Typography>
              <FormGroup>
                <FormControl fullWidth>
                  <OutlinedInput
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}> Email</Typography>
              <FormGroup>
                <FormControl fullWidth>
                  <OutlinedInput
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}>Display Name</Typography>
              <FormGroup>
                <FormControl fullWidth>
                  <OutlinedInput
                    name="display_name"
                    value={inputs.display_name}
                    onChange={handleChange}
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
                name="desc"
                value={inputs.desc}
                onChange={handleChange}
                rows={5}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: 'bold' }}>Password</Typography>
              <FormGroup>
                <FormControl fullWidth>
                  <OutlinedInput
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
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
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </SuperAdminLayout>
  );
}
