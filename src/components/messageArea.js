import React, { useRef } from 'react';
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

const drawerWidth = 260;

export default function MessageArea() {
  const { id, rid } = useParams();
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const docRef = collection(db, `matches/${id}${rid}/messages`);
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

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box>
      <Toolbar />
      <Box>
        {' '}
        {messages.map((message) => {
          return message.userID === auth.currentUser.uid ? (
            <SenderMessage message={message} />
          ) : (
            <ReceiveMessage message={message} />
          );
        })}
        <Box ref={messagesEndRef} />
      </Box>

      {/* TextField for message Sending */}
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: '0',
          p: 2,
          right: '400px',
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
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
