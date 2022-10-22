import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import MessageListRow from './messageListRow';
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { auth, db } from './../firebase/firebase-config';
import { listAdoptor } from '../firebase/auth';
import getMatchedUserInfo from './../lib/getMatchedUserInfo';

const drawerWidth = 260;

export default function MessageList({ acc }) {
  const navigate = useNavigate();
  const { id, rid } = useParams();
  const [adoptionStatus, setAdoptionStatus] = useState();
  const [lastMessages, setLastMessages] = useState();

  useEffect(() => {
    const getDecline = async () => {
      await getDoc(doc(db, `matches/${id}${rid}`)).then((res) => {
        setAdoptionStatus(res.data());
      });
    };
    getDecline();
  }, [acc]);

  useEffect(() => {
    let messages = [];
    acc.map((a) => {
      const docRef = collection(
        db,
        `matches/${a.id}${auth.currentUser.uid}/messages`
      );
      const mq = query(docRef, orderBy('timestamp', 'desc'));

      const q = query(docRef, orderBy('timestamp'));
      onSnapshot(q, (querySnapshot) => {
        const message = querySnapshot.docs.map((detail) => ({
          ...detail.data(),
          uid: detail.id,
        }));
        messages.push(message[0]);
      });
      setLastMessages(messages);
    });
  }, []);

  console.log('last MEssage', lastMessages);

  //   const docRef = collection(db, 'matches');
  //   const q = query(
  //     docRef,
  //     where('usersMatched', 'array-contains', auth.currentUser?.uid),
  //     where('isDeclined', '==', false),
  //     where('isApprovedAdoptor', '==', false)
  //   );

  //   onSnapshot(q, (querySnapshot) => {
  //     const userInfos = querySnapshot.docs.map((detail) => ({
  //       ...detail.data(),
  //       id: detail.id,
  //     }));
  //     let users = [];
  //     userInfos.map(async (a) => {
  //       const u = await listAdoptor(
  //         getMatchedUserInfo(a?.users, auth.currentUser?.uid)
  //       );
  //       users.push(u);
  //       const asd = [...users];
  //       setAdoptionRow(asd);
  //     });
  //     // const n = [...users];
  //   });

  // const [lastMessages, setLastMessages] = useState();

  // const docRef = collection(
  //   db,
  //   `matches/${lastMessage.id}${auth.currentUser.uid}/messages`
  // );
  // useEffect(() => {
  //   const mq = query(docRef, orderBy('timestamp', 'desc'));
  //   onSnapshot(mq, async (querySnapshot) => {
  //     const message = querySnapshot.docs.map((detail) => ({
  //       ...detail.data(),
  //       uid: detail.id,
  //     }));
  //     setLastMessages(message[0]);
  //   });
  // }, []);

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Toolbar>
            <Typography variant="h4" sx={{ fontWeight: '600' }}>
              {'Message'}
            </Typography>
          </Toolbar>
        </Box>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />

        <List sx={{ padding: '12px' }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/adoptionpage')}>
              <ListItemIcon>
                <ArrowBackIosIcon color="primary" />
              </ListItemIcon>
              <ListItemText fontWeight="bold" primary={'PREVIOUS PAGE'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {console.log(adoptionStatus)}

        <List>
          {!adoptionStatus?.isDeclined || adoptionStatus?.isApproveAdoptor
            ? acc
                .sort(
                  (a, b) =>
                    a.timestamp.toDate().valueOf() -
                    b.timestamp.toDate().valueOf()
                )
                .map((a) => {
                  console.log(a.timestamp.toDate().valueOf());
                  return (
                    <MessageListRow key={a.lastTimeMessage} lastMessage={a} />
                  );
                })
            : null}
        </List>
      </Drawer>
    </div>
  );
}
