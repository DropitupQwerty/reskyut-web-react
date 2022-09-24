import React, { useEffect, useState } from 'react';
import global from './styles/global';
import logoReskyut from '../src/assets/logoReskyut.png';
import {
  Box,
  Paper,
  Typography,
  Button,
  FormGroup,
  FormControl,
  OutlinedInput,
  Snackbar,
} from '@mui/material';
import IsLoggedIn, { login, NavUser } from './firebase/auth';

import { useNavigate } from 'react-router-dom';
import { auth } from './firebase/firebase-config';

export default function SignIn() {
  const navigate = useNavigate();
  const user = IsLoggedIn();
  const [input, setInputs] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    login(input.loginEmail, input.loginPassword);
  };

  console.log(user.loggedIn);

  if (user.loggedIn) {
    navigate(`${auth.currentUser?.uid}/dashboard`);
  } else {
    return (
      <Box sx={{ ...global.boxContainer }}>
        <Paper elevation={3} sx={{ ...global.signInPaper }}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '20px 20px',
              }}
            >
              <img src={logoReskyut} alt="logo" />
              <Typography variant="h2" fontWeight="bold">
                Reskyut
              </Typography>
            </Box>
            <FormGroup>
              <FormControl fullWidth>
                <OutlinedInput
                  sx={{ margin: '10px 20px' }}
                  placeholder="Email"
                  name="loginEmail"
                  value={input.loginEmail}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <OutlinedInput
                  sx={{ margin: '10px 20px' }}
                  placeholder="Password"
                  name="loginPassword"
                  vlaue={input.loginPassword}
                  onChange={handleChange}
                />
              </FormControl>
              <Button onClick={handleLogin} sx={{ margin: '10px 20px' }}>
                Login
              </Button>
            </FormGroup>
          </Box>
        </Paper>
      </Box>
    );
  }
}
