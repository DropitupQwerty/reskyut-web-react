import {
  AppBar,
  Box,
  Drawer,
  List,
  Toolbar,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  ListItemAvatar,
  TextField,
  Button,
  Paper,
  Link,
  Divider,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MessageList from '../../components/messageList';

import React from 'react';
import global from '../../styles/global';
import SenderInfo from '../../components/senderInfo';
import MessageArea from './../../components/messageArea';

const drawerWidth = 240;

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function Message() {
  const style = {
    messageRight: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '20px',
      marginBottom: '10px',
    },
    messageLeft: {
      display: 'flex',
      padding: '20px',
      marginBottom: '10px',
      justifyContent: 'flex-start',
    },
    avatar: {
      padding: '20px',
    },
    paperMsg: {
      margin: '0 10px',
    },
    msgStyle: {
      padding: '20px',
      fontSize: '14px',
      lineHeight: '150%',
      bgcolor: '#FDF1F3',
    },
    text1: {
      fontSize: '20px',
      fontWeight: 'bold',
    },

    text2: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
    text3: {
      fontSize: '14px',
    },
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <MessageList />
      <Box component="main" sx={{ flexGrow: '2' }}>
        <MessageArea />
      </Box>
      <SenderInfo />
    </Box>
  );
}
