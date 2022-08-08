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
  SnackbarContent,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import React from 'react';
import global from '../../styles/global';

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
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Toolbar>
            {' '}
            <Typography variant="h4" sx={{ fontWeight: '600' }}>
              {'Message'}
            </Typography>
          </Toolbar>{' '}
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

        <List>
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
      <Box component="main" sx={{ flexGrow: '2' }}>
        <Toolbar />
        {/* MESSAGE AREA */}
        <Box aria-label="Message right" sx={style.messageRight}>
          <Paper sx={style.paperMsg}>
            <Typography sx={style.msgStyle}>
              Hello, Mr. Tabao. Nag notify po samin na gusto nyo pong i adopt si
              Chops.
            </Typography>
          </Paper>
          <Avatar {...stringAvatar('Jeffrey Sanches')} />
        </Box>
        <Box aria-label="Message Left" sx={style.messageLeft}>
          <Avatar {...stringAvatar('Stray Worth Saving')} />
          <Paper sx={style.paperMsg}>
            <Typography sx={style.msgStyle}>
              Hello, opo gusto ko po sana i adopt si Chops. ano po ba ang mga
              kailangan?
            </Typography>
          </Paper>
        </Box>
        <Box aria-label="Message right" sx={style.messageRight}>
          <Paper sx={style.paperMsg}>
            <Typography sx={style.msgStyle}>Okay Sige po</Typography>
          </Paper>
          <Avatar {...stringAvatar('Jeffrey Sanches')} />
        </Box>

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
            />
            <Box>
              <Button>send</Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Drawer
        sx={{
          width: 450,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 450,
            boxSizing: 'border-box',
            p: 2,
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ p: 2 }}>
            <Avatar sx={{ height: '150px', width: '150px' }} />
          </Box>
          <Box noWrap sx={{ p: 1 }}>
            <Typography sx={style.text1}>Jeffrey Sanchez Tabao</Typography>
            <Link href="#">
              <Typography sx={style.text3}> {'www.facebook.com'}</Typography>
            </Link>
            <Box>
              <Typography sx={({ paddingTop: '20px' }, style.text2)}>
                Location
              </Typography>
              <Typography variant="caption">
                {'105 J. Garcia St. Poblacion, Plaridel, Bulacan'}
              </Typography>
              <Typography variant="caption">{'Plaridel Bulacan'}</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography sx={style.text2}>About</Typography>
          <Typography variant="caption">
            My name is Jeffrey Tabao, and I believe that adopting pets from
            shelters is the same as rescuing them. What we don't realize is that
            the pets we saved will end up rescuing us when we're in trouble.
          </Typography>
        </Box>
        <Box sx={{ paddingTop: '20px' }}>
          <Typography
            color="primary"
            variant="h6"
            fontWeight="bold"
            sx={{ textAlign: 'center' }}
          >
            Wants to adopt
          </Typography>
          <Box sx={{ paddingTop: '20px', display: 'flex' }}>
            <Box>
              <Paper sx={{ width: '194px', height: '252px' }}></Paper>
            </Box>
            <Box sx={{ p: 2 }}>
              <List>
                <ListItemText
                  sx={{ display: 'flex', alignItems: 'center' }}
                  primary={
                    <Typography sx={style.text2} paddingRight={1}>
                      Name:
                    </Typography>
                  }
                  secondary={
                    <Typography sx={style.text3}>{'saipa'} </Typography>
                  }
                />
                <ListItemText
                  sx={{ display: 'flex', alignItems: 'center' }}
                  primary={
                    <Typography sx={style.text2} paddingRight={1}>
                      Age:
                    </Typography>
                  }
                  secondary={
                    <Typography sx={style.text3}>{'Adult'} </Typography>
                  }
                />
                <ListItemText
                  sx={{ display: 'flex', alignItems: 'center' }}
                  primary={
                    <Typography sx={style.text2} paddingRight={1}>
                      Gender:
                    </Typography>
                  }
                  secondary={
                    <Typography sx={style.text3}>{'Male'} </Typography>
                  }
                />
                <ListItemText
                  sx={{ display: 'flex', alignItems: 'center' }}
                  primary={
                    <Typography sx={style.text2} paddingRight={1}>
                      Pet Category:
                    </Typography>
                  }
                  secondary={
                    <Typography sx={style.text3}>{'Dogs'} </Typography>
                  }
                />
                <ListItemText
                  primary={
                    <Typography sx={style.text2} paddingRight={1}>
                      Description:
                    </Typography>
                  }
                  secondary={
                    <Typography sx={style.text3}>
                      {
                        'his ears and tail were chopped off by some stupid Person.'
                      }
                    </Typography>
                  }
                />
              </List>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Button sx={{ ...global.button2xs }}>Decline</Button>
            <Button sx={{ ...global.button1xs }}>Approve</Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
