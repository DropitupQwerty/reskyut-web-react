import React from 'react';
import { FormControl, OutlinedInput } from '@mui/material';

const Input = ({
  name,
  label,
  onChange,
  value,
  type,
  style,
  error,
  readOnly = false,
}) => {
  return (
    <FormControl sx={style} fullWidth>
      <OutlinedInput
        placeholder={label}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        readOnly={readOnly}
        error={error}
      />
    </FormControl>
  );
};

export default Input;
