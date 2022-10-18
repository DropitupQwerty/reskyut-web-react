import { Box, Toolbar } from '@mui/material';
import MessageList from '../../components/messageList';

import React, { useEffect, useState } from 'react';
import SenderInfo from '../../components/senderInfo';
import MessageArea from './../../components/messageArea';

import { getUsersInfo } from './../../firebase/auth';
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

export default function Message() {
  const [acc, setAcc] = useState([]);

  // useEffect(() => {
  //   const getRow = async () => {

  //     const q = query(
  //       docRef,
  //       orderBy('lastMessageTime', 'desc')
  //       // where('isDeclined', '==', false)
  //     );

  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {

  //     });
  //     setAcc(acc);
  //   };
  //   getRow();
  // }, []);

  useEffect(() => {
    const docRef = collection(
      db,
      `ngoshelters/${auth.currentUser?.uid}/adoptionlist`
    );
    const q = query(docRef, orderBy('lastMessageTime', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      const message = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setAcc(message);
    });
  }, []);
  console.log('Row', acc);
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
