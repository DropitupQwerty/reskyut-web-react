import React from 'react';
import { Avatar, Typography, Paper } from '@mui/material';
import global from '../../styles/global';
import { Box } from '@mui/system';

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
        <Paper
          sx={{
            maxWidth: '600px',
            whiteSpace: 'normal',
            overflow: 'hidden',
          }}
        >
          <Typography
            sx={{
              ...global.msgStyle,
              bgcolor: '#FDF1F3',
              overflowWrap: 'break-word',
            }}
          >
            {message.message}
          </Typography>
        </Paper>
        <Typography variant={'caption'} sx={{ textAlign: 'right' }}>
          {time}
        </Typography>
      </Box>

      <Avatar
        src={message.photoURL}
        alt={message.photoURL}
        sx={{ margin: '10px' }}
      />
    </Box>
  );
};

export default SenderMessage;
