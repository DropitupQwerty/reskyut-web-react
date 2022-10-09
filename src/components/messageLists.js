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
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './../firebase/firebase-config';

const MessagesLists = ({ lastMessage }) => {
  const [lastMessages, setlastMessages] = useState();
  const docRef = collection(
    db,
    `matches/${lastMessage.id}${auth.currentUser?.uid}/messages`
  );

  useEffect(() => {
    const q = query(docRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const message = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        uid: detail.id,
      }));
      setlastMessages(message[1]);
    });
  }, [lastMessage]);

  console.log(lastMessages);

  const navigate = useNavigate();
  return (
    <Box>
      <ListItem
        key={lastMessage?.id}
        alignItems="flex-start"
        disablePadding
        onClick={() =>
          navigate(`/message/${lastMessage.id}/${auth.currentUser?.uid}`)
        }
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
            primary={lastMessage?.displayName}
            secondary={
              <React.Fragment>
                <Typography variant="caption" noWrap>
                  {lastMessages?.message}
                </Typography>

                <Typography variant="caption" noWrap></Typography>
              </React.Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export default MessagesLists;
