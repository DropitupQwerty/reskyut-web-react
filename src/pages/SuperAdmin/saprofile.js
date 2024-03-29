import {
  Box,
  Avatar,
  Button,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormGroup,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import React, { useEffect, useState } from 'react';
import global from '../../styles/global';
import SuperAdminLayout from '../../components/superAdminLayout';
import { updateAccountInfo, updateAccountPassword } from '../../firebase/auth';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { auth, db } from '../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import LoaderDialog from '../../components/common/loaderDialog';
import { toast } from 'react-toastify';

export default function SaProfile() {
  const [open, setOpen] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [inputs, setInputs] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    display_name: '',
    desc: '',
    isAdmin: true,
    photoURL: '',
  });
  const [values, setValues] = useState({
    currentPassword: '',
    confirmPassword: '',
    newPassword: '',
    showPassword: false,
  });

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

  useEffect(() => {
    const getUsers = async () => {
      const docRef = doc(db, 'ngoshelters', auth.currentUser?.uid);
      const docSnap = await getDoc(docRef);
      setInputs({ ...docSnap.data() });
    };
    getUsers();
  }, [isLoading]);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
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

  const handleUpdatePassword = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (values.newPassword === values.confirmPassword) {
      if (values.newPassword.length >= 6) {
        await updateAccountPassword({ ...values }, inputs.email).then((r) => {
          setLoaderMessage('Updating');
          if (!r) {
            setOpen(false);
            setValues({
              [values.confirmPassword]: '',
              [values.currentPassword]: '',
              [values.newPassword]: '',
            });
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
      } else {
        toast.warn('The password must contain 6 characters or more');
        setIsLoading(false);
      }
    } else {
      toast.warn('Password not match');
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    setLoaderMessage('Updating');
    await updateAccountInfo({ ...inputs }, image);
    setLoaderMessage('Done');
    setIsLoading(false);
  };

  const inputsComp = [
    {
      label: 'Firstname',
      value: inputs.firstName,
      name: 'firstName',
    },
    {
      label: 'Middlename',
      value: inputs.middleName,
      name: 'middleName',
    },
    {
      label: 'Lastname',
      value: inputs.lastName,
      name: 'lastName',
    },
    {
      label: 'Username',
      value: inputs.username,
      name: 'username',
    },
    {
      readOnly: true,
      label: 'Email',
      value: inputs.email,
      name: 'email',
    },
    {
      label: 'Display Name',
      value: inputs.display_name,
      name: 'display_name',
    },
  ];

  console.log('prev', values);

  return (
    <SuperAdminLayout>
      {/* Same as */}
      <LoaderDialog open={isLoading} message={loaderMessage} />
      <Box>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginTop: '20px' }}
        >
          <Box sx={{ position: 'relative' }}>
            {image.length === 0 ? (
              <Avatar
                src={inputs?.photoURL}
                alt={inputs?.photoURL}
                sx={{ height: '200px', width: '200px' }}
              ></Avatar>
            ) : (
              <Avatar
                src={previewImage}
                alt={previewImage}
                sx={{ height: '200px', width: '200px' }}
              ></Avatar>
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
                onChange={handleImage}
                hidden
                accept="image/*"
                type="file"
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
            {inputsComp.map((input) => {
              return (
                <Grid key={input.name} item xs={4}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {input.label}
                  </Typography>
                  <FormGroup>
                    <FormControl fullWidth>
                      <OutlinedInput
                        name={input.name}
                        value={input.value}
                        onChange={handleChange}
                        readOnly={input?.readOnly}
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              );
            })}

            <Grid item container xs={4} spacing={2}>
              <Grid item>
                <Box>
                  <Button
                    sx={{ ...global.button1, fontWeight: 'bold' }}
                    onClick={handleClickOpen}
                  >
                    Change Password
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
                    <form
                      style={{ width: '100%' }}
                      onSubmit={handleUpdatePassword}
                    >
                      <DialogTitle
                        sx={{ fontWeight: 'bold', color: '#E94057' }}
                      >
                        {'CHANGE PASSWORD'}
                      </DialogTitle>
                      <DialogContent>
                        {/* password Old Password */}
                        <Typography sx={{ fontWeight: 'bold' }}>
                          Current Password
                        </Typography>
                        <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                          <OutlinedInput
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.currentPassword}
                            name="currentPassword"
                            onChange={handlePasswordChange}
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

                        {/* New Password */}
                        <Typography sx={{ fontWeight: 'bold' }}>
                          New Password
                        </Typography>
                        <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                          <OutlinedInput
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.newPassword}
                            name="newPassword"
                            onChange={handlePasswordChange}
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
                            value={values.confirmPassword}
                            name="confirmPassword"
                            onChange={handlePasswordChange}
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
                        <Button
                          onClick={handleClose}
                          sx={{ ...global.button3 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          autoFocus
                          sx={{ ...global.button2Small }}
                        >
                          Save
                        </Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                </Box>
              </Grid>

              <Grid item>
                <Button
                  sx={{ ...global.button2, fontWeight: 'bold' }}
                  type="submit"
                  onClick={handleUpdate}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </SuperAdminLayout>
  );
}
