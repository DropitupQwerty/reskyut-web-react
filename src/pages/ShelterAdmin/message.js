import { Box, Toolbar } from '@mui/material';
import MessageList from '../../components/messageList';

import React, { useEffect, useState } from 'react';
import SenderInfo from '../../components/senderInfo';
import MessageArea from './../../components/messageArea';

import { getUsersInfo, listAdoptor } from './../../firebase/auth';
import {
  orderBy,
  query,
  collection,
  getDocs,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { auth } from '../../firebase/firebase-config';
import { db } from './../../firebase/firebase-config';
import getMatchedUserInfo from './../../lib/getMatchedUserInfo';

export default function Message() {
  const [acc, setAcc] = useState([]);

  useEffect(() => {
    const users = [];
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

      userInfos.map(async (a) => {
        users.push(
          await listAdoptor(getMatchedUserInfo(a.users, auth.currentUser?.uid))
        );
        setAcc(users);
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
