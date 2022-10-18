import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import global from '../../styles/global';

const ReceiveMessage = ({ message }) => {
  const time = message?.timestamp?.toDate().toLocaleTimeString('en-US');
  return (
    <Box aria-label="Message Left" sx={{ ...global.messageLeft }}>
      <Avatar
        alt={message.photoURL}
        src={message.photoURL}
        sx={{ margin: '10px' }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Paper sx={{ maxWidth: '600px' }}>
          <Typography sx={{ ...global.msgStyle, overflowWrap: 'break-word' }}>
            {message.message}
          </Typography>
        </Paper>
        <Typography variant="caption">{time}</Typography>
      </Box>
    </Box>
  );
};

export default ReceiveMessage;
