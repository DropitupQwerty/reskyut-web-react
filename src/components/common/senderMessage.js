import React from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';
import global from '../../styles/global';

const SenderMessage = ({ message }) => {
  const time = message?.timestamp?.toDate().toLocaleTimeString('en-US');
  return (
    <Box aria-label="Message right" sx={{ ...global.messageRight }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}
      >
        <Paper sx={{ ...global.paperMsg }}>
          <Typography sx={{ ...global.msgStyle }}>{message.message}</Typography>
        </Paper>
        <Typography variant={'caption'} sx={{ textAlign: 'right' }}>
          {time}
        </Typography>
      </Box>

      <Avatar
        src={message.photoURL}
        alt={message.photoURL}
        sx={{ margin: '10px' }}
      ></Avatar>
    </Box>
  );
};

export default SenderMessage;
