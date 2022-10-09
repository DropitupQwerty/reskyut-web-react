import React from 'react';
import {
  Toolbar,
  Box,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  FormGroup,
} from '@mui/material';

import SenderMessage from './common/senderMessage';
import { useEffect, useState } from 'react';
import {
  getDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
  arrayUnion,
  orderBy,
  setDoc,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import { async } from '@firebase/util';
import { auth, db } from '../firebase/firebase-config';
import SenderInfo from './senderInfo';
import { useParams } from 'react-router-dom';
import ReceiveMessage from './common/receiveMessage';

const drawerWidth = 240;

export default function MessageArea() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState();
  const docRef = collection(db, `matches/${id}/messages`);
  const [senderInfo, setSenderInfo] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSend = async () => {
    await addDoc(docRef, {
      message: value,
      displayName: auth.currentUser?.displayName,
      photoURL: '',
      timestamp: serverTimestamp(),
      userID: auth.currentUser.uid,
    });
  };

  useEffect(() => {
    const q = query(docRef, orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const message = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        uid: detail.id,
      }));
      setMessages(message);
    });
  }, [id]);

  console.log(messages);
  return (
    <Box>
      <Box>
        <Toolbar />
        {/* MESSAGE AREA */}
        {messages.map((message) => {
          return message.userID === auth.currentUser.uid ? (
            <SenderMessage message={message} />
          ) : (
            <ReceiveMessage message={message} />
          );
        })}
        {/* TextField for message Sending */}
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: '0',
            p: 2,
            right: '450px',
            left: drawerWidth,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              fullWidth
              placeholder="Send Message"
              multiline
              maxRows={2}
              onChange={handleChange}
            />
            <Box>
              <Button type="submit" onClick={handleSend}>
                send
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
