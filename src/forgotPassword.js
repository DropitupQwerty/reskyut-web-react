import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

//styles
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
  InputAdornment,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import logoReskyut from '../src/assets/logoReskyut.webp';

//firebase

import Loader from './components/common/loader';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase/firebase-config';
import { useCallback } from 'react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sendStatus, setSendStatus] = useState('Send');
  const [input, setInputs] = useState({
    loginEmail: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const [timer, setTimer] = useState(60);
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  console.log(timer);

  const resetTimer = function () {
    if (!timer) {
      setTimer(60);
    }
  };

  const handleResend = () => {};

  const handleSend = (e) => {
    setSendStatus('Resend');

    // var actionCodeSettings = {
    //   // After password reset, the user will be give the ability to go back
    //   // to this page.
    //   url: 'reskyut.vercel.app',
    //   handleCodeInApp: false,
    // };
    // sendPasswordResetEmail(auth, input.loginEmail, actionCodeSettings)
    //   .then(() => {
    //     console.log('send');
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //     // ..
    //   });
  };

  const showLoad = () => {
    if (isLoading) {
      return (
        <Box sx={{ marginTop: '100px' }}>
          <Loader isLoading={isLoading} />
        </Box>
      );
    } else {
      return (
        <Box>
          <Button onClick={resetTimer}>Resend OTP ({timer})</Button>
          <FormGroup validate>
            <Typography
              color="primary"
              sx={{ textAlign: 'center', margin: '40px 0 10px 0' }}
            >
              Reset your password
            </Typography>
            <FormControl fullWidth>
              <Typography variant="caption" sx={{ margin: ' 0 20px' }}>
                Enter the email address associated with your account and we'll
                you a link to reset your password
              </Typography>
              <OutlinedInput
                sx={{ margin: '10px 20px' }}
                name="loginEmail"
                placeholder="Email"
                value={input.loginEmail}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="end" sx={{ marginRight: '20px' }}>
                    <EmailIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth>
              {sendStatus === 'Send' ? (
                <Button
                  type="submit"
                  sx={{
                    margin: '10px 20px',
                  }}
                  onClick={() => handleSend()}
                >
                  Send
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={() => handleResend()}
                  sx={{
                    margin: '10px 20px',
                  }}
                >
                  Resend
                </Button>
              )}
              <Typography
                sx={{
                  padding: '10px 10px',
                  margin: 'auto',
                  fontSize: '12px',
                }}
                color="primary"
                component={Link}
                to={'/'}
              >
                Back to Sign in?
              </Typography>
            </FormControl>
          </FormGroup>
        </Box>
      );
    }
  };

  return (
    <Box sx={{ ...global.boxContainer }}>
      {/* <div className="App">
        <div>Countdown: {counter === 0 ? 'Time over' : counter}</div>
      </div> */}
      <Paper elevation={3} sx={{ ...global.signInPaper, position: 'relative' }}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '20px 20px 0 20px',
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
