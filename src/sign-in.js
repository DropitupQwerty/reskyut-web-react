import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import global from './styles/global';
import logoReskyut from '../src/assets/logoReskyut.webp';
import {
  Box,
  Paper,
  Typography,
  Button,
  FormGroup,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import IsLoggedIn, { login } from './firebase/auth';

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

  if (user.loggedIn) {
    navigate(`/dashboard`);
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
