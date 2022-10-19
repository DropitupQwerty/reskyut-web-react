import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import global from '../styles/global';
import { db } from './../firebase/firebase-config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const MessagesLists = ({ lastMessage }) => {
  const navigate = useNavigate();

  const [lastMessages, setLastMessages] = useState();

  const docRef = collection(
    db,
    `matches/${lastMessage.id}${auth.currentUser.uid}/messages`
  );
  useEffect(() => {
    const mq = query(docRef, orderBy('timestamp', 'desc'));
    onSnapshot(mq, async (querySnapshot) => {
      const message = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        uid: detail.id,
      }));
      setLastMessages(message[0]);
      console.log(message[0].message);
    });
  }, []);

  return (
    <Box>
      <ListItem
        key={lastMessage?.id}
        alignItems="flex-start"
        disablePadding
        onClick={() =>
          navigate(`/message/${lastMessage.id}/${auth.currentUser?.uid}`)
        }
        selected={window.location.pathname.includes(
          `/message/${lastMessage.id}/${auth.currentUser?.uid}`
        )}
      >
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={lastMessage?.photoURL} />
          </ListItemAvatar>
          <ListItemText
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '300px',
            }}
            primary={lastMessage?.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ ...global.noWrapEllip, width: 100 }}
                  variant="caption"
                  noWrap
                >
                  {lastMessages?.message}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export default MessagesLists;
