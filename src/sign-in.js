import React from 'react';
//import Image
import signInBg from '../src/assets/signInBg.png';
import logoReskyut from '../src/assets/logoReskyut.png';

import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import Form from './components/common/form';
import Joi from 'joi-browser';

class SignIn extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label('email'),
    password: Joi.string().required().min(6).label('password'),
  };

  doSubmit = () => {
    // Call the server
    console.log('Submitted');
  };

  render() {
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
        margin: '0px 20px',
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
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={2} direction="column">
                <Grid item xs={2}>
                  {/* <Input
                    style={style.TextField}
                    name="email"
                    label="Email"
                    value={account.email}
                    onChange={this.handleChange}
                  /> */}
                  {this.renderInput(
                    'email',
                    'Email',
                    'email',
                    style.TextField,
                    false
                  )}
                </Grid>
                <Grid item>
                  {/* <Input
                    style={style.TextField}
                    name="password"
                    label="Password"
                    type="password"
                    value={account.password}
                    onChange={this.handleChange}
                  /> */}
                  {this.renderInput(
                    'password',
                    'Password',
                    'password',
                    style.TextField,
                    false
                  )}
                </Grid>
                <Grid item>
                  {/* <Button sx={style.TextField}>LOGIN</Button> */}
                  {this.renderButton('Login', style.TextField)}
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Box>
    );
  }
}

export default SignIn;
