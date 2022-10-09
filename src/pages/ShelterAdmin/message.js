import { Box } from '@mui/material';
import MessageList from '../../components/messageList';

import React from 'react';
import SenderInfo from '../../components/senderInfo';
import MessageArea from './../../components/messageArea';

import { UseBoth } from './../../firebase/auth';

export default function Message() {
  const acc = UseBoth();
  console.log(acc);
  return (
    <Box sx={{ display: 'flex' }}>
      <MessageList acc={acc} />
      <Box component="main" sx={{ flexGrow: '2' }}>
        <MessageArea />
      </Box>
      <SenderInfo />
    </Box>
  );
}
