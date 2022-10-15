import { Box } from '@mui/material';
import MessageList from '../../components/messageList';

import React, { useEffect, useState } from 'react';
import SenderInfo from '../../components/senderInfo';
import MessageArea from './../../components/messageArea';

import { getUsersInfo } from './../../firebase/auth';

export default function Message() {
  const [acc, setAcc] = useState([]);

  useEffect(() => {
    const getAcc = async () => {
      const accounts = await getUsersInfo();
      setAcc(accounts);
    };
    getAcc();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <MessageList acc={acc} />
      <Box
        component="main"
        sx={{
          flexGrow: '2',
          height: '90vh',
          overflow: 'scroll',
          overflowX: 'hidden',
        }}
      >
        <MessageArea />
      </Box>
      <SenderInfo />
    </Box>
  );
}
