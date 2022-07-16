//import Image
import signInBg from '../src/assets/signInBg.png';
import logoReskyut from '../src/assets/logoReskyut.png';

import { Box, Paper, Typography, TextField, Grid, Button } from '@mui/material';
import React from 'react';

export default function SignIn() {
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
          <Grid container spacing={2} direction="column">
            <Grid item xs={2}>
              <TextField sx={style.TextField} label="Email" type="Email" />
            </Grid>
            <Grid item>
              <TextField
                sx={style.TextField}
                label="Password"
                type="Password"
              />
            </Grid>
            <Grid item>
              <Button sx={style.TextField}>LOGIN</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
