import React from 'react';
import {
  FormControl,
  OutlinedInput,
  Snackbar,
  Alert,
  FormGroup,
} from '@mui/material';

const Input = ({ name, label, error, style, ...rest }) => {
  return (
    <FormGroup>
      <FormControl sx={style} fullWidth>
        <OutlinedInput error={error} {...rest} name={name} id={name} />
      </FormControl>
      <Snackbar open={error} autoHideDuration={100}>
        <Alert severity="warning" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </FormGroup>
  );
};

export default Input;
