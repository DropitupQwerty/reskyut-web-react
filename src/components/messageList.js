import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import { UseBoth } from './../firebase/auth';
import { orderBy, collection, query, onSnapshot } from 'firebase/firestore';
import { db } from './../firebase/firebase-config';
import MessageLists from './messageLists';

const drawerWidth = 260;

export default function MessageList({ acc, children }) {
  const navigate = useNavigate();

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
        <List>
          {acc.map((a) => {
            return <MessageLists lastMessage={a} />;
          })}
        </List>
      </Drawer>
    </div>
  );
}
