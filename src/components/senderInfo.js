import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Toolbar,
  Box,
  Avatar,
  Typography,
  Paper,
  List,
  ListItemText,
  Button,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';

export default function SenderInfo({ acc }) {
  const { id } = useParams();

  // const [acc, setAcc] = useState([]);
  // useEffect(() => {
  //   setAcc(getMessages(userInf));
  // }, [userInfo]);

  const style = {
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
    <div>
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
    </div>
  );
}
