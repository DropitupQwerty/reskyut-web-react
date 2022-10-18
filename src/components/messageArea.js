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
  updateDoc,
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
  const [value, setValue] = useState();
  const docRef = collection(db, `matches/${id}${rid}/messages`);
  const [lastMessages, setlastMessages] = useState();
  const lastMessRef = collection(
    db,
    `matches/${id}${auth.currentUser?.uid}/messages`
  );

  const handleSend = async (e) => {
    e.preventDefault();
    setValue('');
    if (value !== '') {
      await addDoc(docRef, {
        message: value,
        displayName: auth.currentUser?.displayName,
        photoURL: auth.currentUser.photoURL,
        timestamp: serverTimestamp(),
        userID: auth.currentUser.uid,
      });
    }

    console.log('Last Message', lastMessages);
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

    const mq = query(lastMessRef, orderBy('timestamp', 'desc'));
    onSnapshot(mq, async (querySnapshot) => {
      const message = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        uid: detail.id,
      }));
      setlastMessages(message[0]);

      await updateDoc(
        doc(db, `ngoshelters/${auth.currentUser.uid}/adoptionlist/${id}`),
        {
          lastMessagePreview: message[0].message,
          lastMessageTime: message[0].timestamp,
        }
      );
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
          return message.userID === auth.currentUser.uid ? (
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
        <form
          onSubmit={handleSend}
          style={{ width: '100%', display: 'flex', alignItems: 'center' }}
        >
          <FormControl fullWidth>
            <OutlinedInput
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
      </Paper>
    </Box>
  );
}
