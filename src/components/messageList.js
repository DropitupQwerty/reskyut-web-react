import React from 'react';
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

export default function MessageList() {
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
            <ListItemButton>
              <ListItemIcon>
                <ArrowBackIosIcon color="primary" />
              </ListItemIcon>
              <ListItemText fontWeight="bold" primary={'PREVIOUS PAGE'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem alignItems="flex-start" disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar {...stringAvatar('Jeffrey Sanchez')} />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '300px',
                }}
                primary={'Jeffrey Sanchez'}
                secondary={
                  <React.Fragment>
                    <Typography variant="caption" noWrap>
                      {'Ok Sige po '}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem alignItems="flex-start" disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar {...stringAvatar('Jacob Allen Valderama')} />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '300px',
                }}
                primary={'Jacob Allen Valderama'}
                secondary={
                  <React.Fragment>
                    <Typography variant="caption" noWrap>
                      {'Ok Sige po '}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem alignItems="flex-start" disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar {...stringAvatar('Jacob Allen Valderama')} />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '300px',
                }}
                primary={'Lj Korikong'}
                secondary={
                  <React.Fragment>
                    <Typography variant="caption" noWrap>
                      {'Hello po I Just Want to adopt kukuriko '}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
