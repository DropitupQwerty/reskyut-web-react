import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
} from '@mui/material';
import global from '../../styles/global';

const ApproveDialog = ({ open, cancel, confirm, user }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          borderRadius: 30,
          width: '400px',
          height: '290px',
          padding: '10px',
        },
      }}
    >
      {/* <DialogTitle></DialogTitle> */}
      <DialogContent
        sx={{
          fontWeight: 'bold',
          color: '#E94057',
        }}
      >
        <Typography
          sx={{ fontSize: '25px', textAlign: 'center', marginTop: '20px' }}
        >
          {`Are you sure you want to approve ${user}  as a adoptor of this pet?`}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{
            ...global.button2,
          }}
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button sx={{ ...global.button1 }} onClick={confirm}>
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApproveDialog;
