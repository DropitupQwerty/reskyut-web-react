import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import global from '../../styles/global';

const ReceiveMessage = ({ message }) => {
  return (
    <Box aria-label="Message Left" sx={{ ...global.messageLeft }}>
      <Avatar
        alt={message.photoURL}
        src={message.photoURL}
        sx={{ margin: '10px' }}
      />
      <Paper sx={{ ...global.paperMsg }}>
        <Typography sx={{ ...global.msgStyle }}>{message.message}</Typography>
      </Paper>
    </Box>
  );
};

export default ReceiveMessage;
