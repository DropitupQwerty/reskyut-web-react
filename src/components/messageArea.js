import React, { useRef } from 'react';
import {
  Toolbar,
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  OutlinedInput,
} from '@mui/material';

import SenderMessage from './common/senderMessage';
import { useEffect, useState } from 'react';
import {
  getDoc,
  collection,
  doc,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';
import { useParams } from 'react-router-dom';
import ReceiveMessage from './common/receiveMessage';

const drawerWidth = 260;

export default function MessageArea() {
  const { id, rid } = useParams();
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState();
  const docRef = collection(db, `matches/${id}${rid}/messages`);
  const messagesEndRef = useRef(null);
  const [isDeclined, setIsDeclined] = useState();

  const handleSend = async (e) => {
    e.preventDefault();
    setValue('');
    if (value !== '') {
      await addDoc(docRef, {
        message: value,
        displayName: auth.currentUser?.displayName,
        photoURL: auth.currentUser.photoURL,
        timestamp: serverTimestamp(),
        userId: auth.currentUser.uid,
      });
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const q = query(docRef, orderBy('timestamp'));
    onSnapshot(q, (querySnapshot) => {
      const message = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        uid: detail.id,
      }));
      setMessages(message);
    });

    const getIfDisable = async () => {
      await getDoc(doc(db, `matches/${id}${rid}`)).then((res) => {
        setIsDeclined(res.data().isDeclined);
      });
    };
    getIfDisable();
  }, [id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Toolbar />
      <Box
        sx={{
          flexGrow: '2',

          overflow: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {messages.map((message) => {
          return message.userId === auth.currentUser.uid ? (
            <SenderMessage key={message.id} message={message} />
          ) : (
            <ReceiveMessage key={message.id} message={message} />
          );
        })}
        <Box ref={messagesEndRef} />
      </Box>

      {/* TextField for message Sending */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          right: '400px',
          left: drawerWidth,
          display: 'fixed',
        }}
      >
        {!isDeclined ? (
          <form
            onSubmit={handleSend}
            style={{ width: '100%', display: 'flex', alignItems: 'center' }}
          >
            <FormControl fullWidth>
              <OutlinedInput
                autoFocus
                fullWidth
                placeholder="Send Message"
                value={value}
                onChange={handleChange}
              />
            </FormControl>
            <Box>
              <Button type="submit">Send</Button>
            </Box>
          </form>
        ) : (
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Typography color="primary">Declined Adoptor</Typography>
            <Typography color="">
              You cannot message the adoptor you can delete this message in
              history tab from the dashboard
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
