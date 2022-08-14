import React from 'react';
import { FormControl, OutlinedInput } from '@mui/material';

const Input = ({ name, label, onChange, value, type, style }) => {
  return (
    <FormControl>
      <OutlinedInput
        sx={style}
        placeholder={label}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
      />
    </FormControl>
  );
};

export default Input;
