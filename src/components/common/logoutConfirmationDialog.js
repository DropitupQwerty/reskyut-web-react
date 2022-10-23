import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import global from '../../styles/global';

const LogoutDialog = ({ open, cancel, confirm, message }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          borderRadius: 30,
          width: '400px',
          padding: '10px',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          color: '#E94057',
          marginTop: '20px',
        }}
      >
        <Typography sx={{ textAlign: 'center' }}>{message}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Are you sure you want to logout?
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '12px',
        }}
      >
        <Button sx={{ ...global.button2xs }} onClick={cancel}>
          Cancel
        </Button>
        <Button sx={{ ...global.button1xs }} onClick={confirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
