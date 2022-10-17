import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  TextField,
} from '@mui/material';

const DeclineDialog = ({ open, cancel, message, confirm }) => {
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
      <DialogContent>
        <TextField
          fullWidth
          defaultValue={'Sorry you got decline by the ngo'}
          multiline
          maxRows={5}
        ></TextField>
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
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeclineDialog;
