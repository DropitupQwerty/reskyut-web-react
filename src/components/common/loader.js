import React from 'react';
import { Oval } from 'react-loader-spinner';
import { Box } from '@mui/material';

const Loader = ({ isLoading, height, width }) => {
  console.log(isLoading);
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Oval
        height={height}
        width={width}
        color="#E94057"
        visible={isLoading}
        ariaLabel="oval-loading"
        secondaryColor="primary"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </Box>
  );
};

export default Loader;
