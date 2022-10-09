import React from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';
import global from '../../styles/global';

const SenderMessage = ({ message }) => {
  return (
    <Box aria-label="Message right" sx={{ ...global.messageRight }}>
      <Paper sx={{ ...global.paperMsg }}>
        <Typography sx={{ ...global.msgStyle }}>{message.message}</Typography>
      </Paper>
      <Avatar
        src={message.photoURL}
        alt={message.photoURL}
        sx={{ margin: '10px' }}
      ></Avatar>
    </Box>
  );
};

export default SenderMessage;
