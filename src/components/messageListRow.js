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
import { db } from '../firebase/firebase-config';
import global from '../styles/global';

const MessagesLists = ({ lastMessage }) => {
  const navigate = useNavigate();
  const [lastMessages, setlastMessages] = useState();
  const docRef = collection(
    db,
    `matches/${lastMessage.id}${auth.currentUser?.uid}/messages`
  );

  useEffect(() => {
    const q = query(docRef, orderBy('timestamp'));
    onSnapshot(q, (querySnapshot) => {
      const message = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        uid: detail.id,
      }));
      setlastMessages(message[0]);
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
