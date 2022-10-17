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
  FormControl,
  OutlinedInput,
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (value !== null) {
      await addDoc(docRef, {
        message: value,
        displayName: auth.currentUser?.displayName,
        photoURL: auth.currentUser.photoURL,
        timestamp: serverTimestamp(),
        userID: auth.currentUser.uid,
      });
    } else {
      return;
    }
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
        {messages.map((message) => {
          return message.userID === auth.currentUser.uid ? (
            <SenderMessage key={message.id} message={message} />
          ) : (
            <ReceiveMessage key={message.id} message={message} />
          );
        })}
        <Box ref={messagesEndRef} />
      </Box>

      <form onSubmit={handleSend}>
        {/* TextField for message Sending */}
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: '0',
            p: 2,
            right: '400px',
            left: drawerWidth,
            display: 'flex',
          }}
        >
          <FormControl fullWidth sx={{ display: 'flex' }}>
            <OutlinedInput
              fullWidth
              placeholder="Send Message"
              maxRows={7}
              onChange={handleChange}
            />
          </FormControl>
          <Box>
            <Button type="submit" sx={{ alignSelf: 'center' }}>
              Send
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
}
