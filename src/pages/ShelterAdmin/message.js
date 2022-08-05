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
} from '@mui/material';

import React from 'react';

const drawerWidth = 300;

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
        <Box sx={{ display: 'flex', alignSelf: 'flex-end', p: 2 }}>
          <Typography>text</Typography>
        </Box>
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
            <Typography variant="h6" fontWeight="bold">
              Jeffrey Sanchez Tabao
            </Typography>
            <Link href="#">{'www.facebook.com'}</Link>
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ paddingTop: '20px' }}
              >
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
          <Typography variant="h6" fontWeight="bold">
            About
          </Typography>
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
                    <Typography fontWeight="bold" paddingRight={1}>
                      Name:
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption">{'saipa'} </Typography>
                  }
                />
                <ListItemText
                  sx={{ display: 'flex', alignItems: 'center' }}
                  primary={
                    <Typography fontWeight="bold" paddingRight={1}>
                      Age:
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption">{'Adult'} </Typography>
                  }
                />
                <ListItemText
                  sx={{ display: 'flex', alignItems: 'center' }}
                  primary={
                    <Typography fontWeight="bold" paddingRight={1}>
                      Gender:
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption">{'Male'} </Typography>
                  }
                />
                <ListItemText
                  sx={{ display: 'flex', alignItems: 'center' }}
                  primary={
                    <Typography fontWeight="bold" paddingRight={1}>
                      Pet Category:
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption">{'Dogs'} </Typography>
                  }
                />
                <ListItemText
                  primary={
                    <Typography fontWeight="bold" paddingRight={1}>
                      Description:
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption">
                      {
                        'his ears and tail were chopped off by some stupid Person.'
                      }
                    </Typography>
                  }
                />
              </List>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
