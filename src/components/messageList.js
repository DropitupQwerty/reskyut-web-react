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
import { useNavigate } from 'react-router-dom';
import updateSenderInfo from './senderInfo';
import { auth } from '../firebase/firebase-config';

const drawerWidth = 240;

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
          {acc.map((user) => {
            return (
              <ListItem
                key={user.uid}
                alignItems="flex-start"
                disablePadding
                onClick={() =>
                  navigate(`/message/${user.id}/${auth.currentUser?.uid}`)
                }
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={user.photoURL} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '300px',
                    }}
                    primary={user.displayName}
                    secondary={
                      <React.Fragment>
                        <Typography variant="caption" noWrap></Typography>
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}
