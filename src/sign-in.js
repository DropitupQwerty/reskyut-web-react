import React, { useEffect, useState } from 'react';
import signInBg from '../src/assets/signInBg.png';
import logoReskyut from '../src/assets/logoReskyut.png';
import { onAuthStateChanged } from 'firebase/auth';
import { isAuth, CurrentUser, login } from './firebase/auth';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  FormGroup,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import { auth } from './firebase/firebase-config';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ uid: '' });

  const [input, setInputs] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleSignIn = () => {
    login(input.loginEmail, input.loginPassword);

    console.log(isAuth());
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const style = {
    paper1: {
      height: '450px',
      width: '450px',
      borderRadius: '20px',
    },
    boxContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundImage: `url(${signInBg})`,
      backgroundPosition: 'center',
    },
    text1: {
      fontWeight: '700',
    },
    TextField: {
      margin: '10px 20px',
      width: '410px',
    },
  };
  return (
    <Box sx={style.boxContainer}>
      <Paper elevation={3} sx={style.paper1}>
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
            <Typography variant="h2" sx={style.text1}>
              Reskyut
            </Typography>
          </Box>
          <FormGroup>
            <FormControl fullWidth>
              <OutlinedInput
                sx={style.TextField}
                placeholder="Email"
                name="loginEmail"
                value={input.loginEmail}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <OutlinedInput
                sx={style.TextField}
                placeholder="Password"
                name="loginPassword"
                vlaue={input.loginPassword}
                onChange={handleChange}
              />
            </FormControl>
            <Button onClick={handleSignIn} sx={style.TextField}>
              Login
            </Button>
          </FormGroup>
        </Box>
      </Paper>
    </Box>
  );
}
