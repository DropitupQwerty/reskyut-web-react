import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import React from 'react';
import global from '../../styles/global';

const DisableDialog = ({ open, cancel, confirm, message }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          borderRadius: 30,
          width: '300px',
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
      <DialogContent>{/* password Old Password */}</DialogContent>

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

export default DisableDialog;
