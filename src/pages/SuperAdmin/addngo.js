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
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import React, { useEffect, useState } from 'react';
import global from '../../styles/global';
import SuperAdminLayout from '../../components/superAdminLayout';
import { register } from '../../firebase/auth';
import Loader from './../../components/common/loader';
import { serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';

export default function AddNgo() {
  const [isLoading, setIsLoading] = useState(false);
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
    isDisable: false,
    isDelete: false,
    dateCreated: serverTimestamp(),
    shelterLocLatitude: '',
    shelterLocLongitude: '',
  });

  const {
    firstName,
    middleName,
    lastName,
    username,
    email,
    password,
    display_name,
    desc,
    shelterLocLongitude,
    shelterLocLatitude,
  } = inputs;

  const [image, setImage] = useState([]);
  const [previewImage, setPreviewImage] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = async () => {
    setIsLoading(true);

    firstName &&
    middleName &&
    lastName &&
    username &&
    email &&
    password &&
    display_name &&
    desc &&
    shelterLocLatitude &&
    shelterLocLongitude
      ? image.length === 1
        ? await register(inputs, image).then((r) => {
            if (r) {
              toast.warn(r);
            }
            setIsLoading(false);
          })
        : toast.warn('Photo required')
      : toast.warn('Please Fill up all Fields');

    setIsLoading(false);
  };

  const handleImage = (e) => {
    setImage([...e.target.files]);
  };

  useEffect(() => {
    const handlePreview = () => {
      const selectedFIles = [];

      image.map((file) => {
        console.log('file', file);
        return selectedFIles.push(URL.createObjectURL(file));
      });
      setPreviewImage(selectedFIles);
    };
    handlePreview();
  }, [image]);
  console.log(inputs);

  return (
    <SuperAdminLayout>
      <Box>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginTop: '20px' }}
        >
          <Box sx={{ position: 'relative' }}>
            {image.length === 0 ? (
              <Avatar sx={{ height: '200px', width: '200px' }} />
            ) : (
              <Avatar
                src={previewImage}
                alt={previewImage}
                sx={{ height: '200px', width: '200px' }}
              />
            )}

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
              <input
                hidden
                name="photoUrl"
                accept="image/*"
                type="file"
                onChange={handleImage}
              />
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
            <Grid item xs={12}>
              <Typography
                sx={{ fontWeight: 'bold' }}
                variant="h5"
                color="primary"
              >
                Shelter Admin Info :
              </Typography>
            </Grid>

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
              <Typography
                sx={{ fontWeight: 'bold' }}
                variant="h5"
                color="primary"
              >
                Shelter Info :
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontWeight: 'bold' }}
                variant="h5"
                color="primary"
              >
                Location :
              </Typography>
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

            <Grid item container xs={4}>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 'bold' }}>Latitude</Typography>
                <TextField
                  fullWidth
                  name="shelterLocLatitude"
                  value={shelterLocLatitude}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 'bold' }}>Longitude</Typography>
                <TextField
                  fullWidth
                  name="shelterLocLongitude"
                  value={shelterLocLongitude}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid item xs={8}>
              {isLoading ? (
                <Loader isLoading={isLoading} height={30} width={30} />
              ) : (
                <Button
                  sx={{
                    ...global.button2,
                    marginTop: '25px',
                    fontWeight: 'bold',
                    width: '100%',
                    height: '50px',
                  }}
                  onClick={handleCreateAccount}
                >
                  Create Account
                </Button>
              )}
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
          </Grid>
        </Box>
      </Box>
    </SuperAdminLayout>
  );
}
