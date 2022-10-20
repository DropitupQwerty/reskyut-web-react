import { Box } from '@mui/material';
import MessageList from '../../components/messageList';

import React, { useEffect, useState } from 'react';
import SenderInfo from '../../components/senderInfo';
import MessageArea from './../../components/messageArea';

import { listAdoptor } from './../../firebase/auth';
import { query, collection, onSnapshot, where } from 'firebase/firestore';
import { auth } from '../../firebase/firebase-config';
import { db } from './../../firebase/firebase-config';
import getMatchedUserInfo from './../../lib/getMatchedUserInfo';

export default function Message() {
  const [acc, setAcc] = useState([]);

  useEffect(() => {
    const docRef = collection(db, 'matches');
    const q = query(
      docRef,
      where('usersMatched', 'array-contains', auth.currentUser?.uid),
      where('isDeclined', '==', false)
    );

    onSnapshot(q, (querySnapshot) => {
      const userInfos = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
      }));

      const users = [];
      userInfos.map(async (a) => {
        users.push(
          await listAdoptor(getMatchedUserInfo(a.users, auth.currentUser?.uid))
        );
        const n = [...users];
        setAcc(n);
      });
    });
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <MessageList acc={acc} />
      <Box component="main" sx={{ width: '100%' }}>
        <MessageArea />
      </Box>
      <SenderInfo />
    </Box>
  );
}
