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
  FormHelperText,
} from '@mui/material';

//firebase
import IsLoggedIn, { getUser, login, logout } from './firebase/auth';
import { auth, db } from './firebase/firebase-config';
import Loader from './components/common/loader';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState();

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
    setIsLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      const log = async () => {
        if (currentUser) {
          await getUser().then((userDoc) => {
            if (userDoc.isAdmin) {
              navigate('/admin/dashboard');
            } else if (!userDoc.isAdmin && !userDoc.isDisable) {
              navigate('/dashboard');
            } else if (userDoc.isDisable) {
              setStatus('Disabled Account Please Contact the Admin');
              logout();
            }
          });
        }
      };
      log();
    });
  }, [isLoading]);

  const showLoad = () => {
    if (isLoading) {
      return (
        <Box sx={{ marginTop: '100px' }}>
          <Loader isLoading={isLoading} />
        </Box>
      );
    } else {
      return (
        <FormGroup>
          {status && (
            <FormHelperText
              id="component-error-text"
              sx={{ color: 'red', textAlign: 'center', fontSize: '10px' }}
            >
              {status}
            </FormHelperText>
          )}
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
              type="password"
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
