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
          minHeight: '290px',
          padding: '10px',
        },
      }}
    >
      {/* <DialogTitle></DialogTitle> */}
      <DialogContent
        sx={{
          fontWeight: 'bold',
          display: 'flex',
          whiteSpace: 'normal',
        }}
      >
        <Typography sx={{ fontSize: '25px', textAlign: 'center' }}>
          {` Are you sure you want to approve `}
          <span style={{ color: '#E94057', fontStyle: 'italic' }}>
            "{user}"
          </span>
          {` as a adoptor of this pet?`}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{
            ...global.button2xs,
            padding: '20px',
            height: '70px',
            width: '100%',
            fontSize: '20px',
          }}
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button
          sx={{
            ...global.button1xs,
            width: '100%',
            height: '70px',
            fontSize: '20px',
          }}
          onClick={confirm}
        >
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApproveDialog;
