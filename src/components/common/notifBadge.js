import { Badge } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase-config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { listAdoptor } from './../../firebase/auth';
import getMatchedUserInfo from './../../lib/getMatchedUserInfo';

const NotifBadge = () => {
  const [invisible, setInvisible] = useState();

  useEffect(() => {
    const docRef = collection(db, 'matches');
    const q = query(
      docRef,
      where('usersMatched', 'array-contains', auth.currentUser?.uid),
      where('isNotifRead', '==', false)
    );

    onSnapshot(q, (querySnapshot) => {
      const userInfos = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
      }));

      sessionStorage.setItem('notifcount', userInfos.length);
    });
  }, []);

  const a = sessionStorage.getItem('notifcount');

  return <Badge badgeContent={a} invisible={a == 0} color="primary"></Badge>;
};

export default NotifBadge;
