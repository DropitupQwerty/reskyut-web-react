import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import global from '../../styles/global';

const DeclineDialog = ({ open, cancel, confirm, onChange, value, user }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          borderRadius: 30,
          width: '600px',
          height: '480px',
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
        <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>
          Send Message
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          multiline
          rows={6}
          sx={{ margin: '10px 0 20px 0' }}
        ></TextField>
        <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
          <InputLabel>Send Default Message</InputLabel>
          <Select onChange={(e) => onChange(e.target.value)}>
            <MenuItem
              value={
                'The prospective adopter does not believe that pet ownership should be a life-long commitment'
              }
            >
              The prospective adopter does not believe that pet ownership should
              be a life-long commitment
            </MenuItem>
            <MenuItem
              value={`Adoption is closed. We have already found ${user?.petToAdopt} 's New Parents`}
            >
              Adoption is closed. We have already found {user?.petToAdopt}'s New
              Parents
            </MenuItem>
            <MenuItem value={`Abuso Ka ${user?.name}`}>
              Abuso Ka ${user?.name}
            </MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{
            ...global.button3,
            padding: '20px',
            width: '348px',
            height: '79px',
          }}
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button sx={{ ...global.button2 }} onClick={confirm}>
          Send Declined Message
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeclineDialog;
