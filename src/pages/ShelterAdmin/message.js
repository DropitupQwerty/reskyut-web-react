import { Box } from '@mui/material';
import MessageList from '../../components/messageList';

import React, { useEffect, useState } from 'react';
import SenderInfo from '../../components/senderInfo';
import MessageArea from './../../components/messageArea';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase-config';
import getMatchedUserInfo from './../../lib/getMatchedUserInfo';
import { getMessages } from './../../firebase/auth';
import { Route, Routes } from 'react-router-dom';

export default function Message() {
  const [userInfo, setUserInfo] = useState('');
  useEffect(() => {
    const docRef = collection(db, 'matches');
    const getMessages = async () => {
      const q = query(
        docRef,
        where('usersMatched', 'array-contains', auth.currentUser?.uid)
      );
      const querySnapshot = await getDocs(q);
      const userInfos = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        uid: detail.id,
      }));
      setUserInfo(userInfos);
    };

    getMessages();
  }, []);

  const [acc, setAcc] = useState([]);
  useEffect(() => {
    setAcc(getMessages(userInfo));
  }, [userInfo]);

  return (
    <Box sx={{ display: 'flex' }}>
      <MessageList acc={acc} />
      <Box component="main" sx={{ flexGrow: '2' }}>
        <MessageArea />
      </Box>
      <SenderInfo acc={acc} />
    </Box>
  );
}
