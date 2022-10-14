import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import logoReskyut from '../src/assets/logoReskyut.webp';
import global from './styles/global';
import {
  Box,
  Paper,
  Typography,
  Button,
  FormGroup,
  FormControl,
  OutlinedInput,
} from '@mui/material';

//firebase
import IsLoggedIn, { getUser, login } from './firebase/auth';
import { auth, db } from './firebase/firebase-config';
import Loader from './components/common/loader';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInputs] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    await login(input.loginEmail, input.loginPassword);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      const log = async () => {
        await getUser().then((userDoc) => {
          setIsLoading(false);
          if (userDoc.isAdmin) {
            navigate('/admin/dashboard');
          } else {
            navigate('/dashboard');
          }
        });
      };
      log();
    });
  }, [isLoading]);

  const showLoad = () => {
    if (isLoading) {
      return (
        <Box sx={{ marginTop: '100px' }}>
          {' '}
          <Loader isLoading={isLoading} />
        </Box>
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <Box sx={{ ...global.boxContainer }}>
      <Paper elevation={3} sx={{ ...global.signInPaper, position: 'relative' }}>
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
          {showLoad()}
        </Box>
      </Paper>
    </Box>
  );
}
