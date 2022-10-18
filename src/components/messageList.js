import React from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import MessageListRow from './messageListRow';

const drawerWidth = 260;

export default function MessageList({ acc }) {
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
            return <MessageListRow key={a.lastTimeMessage} lastMessage={a} />;
          })}
        </List>
      </Drawer>
    </div>
  );
}
