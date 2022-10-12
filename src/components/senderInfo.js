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
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export default function SenderInfo() {
  const [form, setForm] = useState();
  const [info, setInfo] = useState();
  const { id } = useParams();

  const { text1, text2, text3 } = style;
  const { BestWayToContact, FullAddress } = form || {};
  const { displayName, About, photoURL } = info || {};

  useEffect(() => {
    const getInfo = async () => {
      //Get User Info
      const docRef = doc(db, `users/${id}`);
      const docSnap = await getDoc(docRef);
      setInfo(docSnap.data());
      //Get Fulladdress and Fb URL
      const formSnap = await getDoc(doc(docRef, '/form/form'));
      setForm(formSnap.data());
    };
    getInfo();
  }, [id]);

  return (
    <div>
      <Drawer
        sx={{
          width: 400,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 400,
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
            <Avatar
              sx={{ height: '150px', width: '150px' }}
              src={photoURL || 'No Phot Uploaded'}
            />
          </Box>
          <Box noWrap sx={{ p: 1 }}>
            <Typography sx={text1}>{displayName}</Typography>
            <Link href={BestWayToContact} target="_blank">
              <Typography sx={text3}>{BestWayToContact || ''}</Typography>
            </Link>
            <Box>
              <Typography sx={({ paddingTop: '20px' }, text2)}>
                Location
              </Typography>
              <Typography variant="caption">
                {FullAddress || 'Unknown Location'}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography sx={text2}>About</Typography>
          <Typography variant="caption">{About || 'No Information'}</Typography>
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
                    <Typography sx={text2} paddingRight={1}>
                      Name:
                    </Typography>
                  }
                  secondary={<Typography sx={text3}>{'saipa'} </Typography>}
                />
                <ListItemText
                  sx={{ display: 'flex', alignItems: 'center' }}
                  primary={
                    <Typography sx={text2} paddingRight={1}>
                      Age:
                    </Typography>
                  }
                  secondary={<Typography sx={text3}>{'Adult'} </Typography>}
                />
                <ListItemText
                  sx={{ display: 'flex', alignItems: 'center' }}
                  primary={
                    <Typography sx={text2} paddingRight={1}>
                      Gender:
                    </Typography>
                  }
                  secondary={<Typography sx={text3}>{'Male'} </Typography>}
                />
                <ListItemText
                  sx={{ display: 'flex', alignItems: 'center' }}
                  primary={
                    <Typography sx={text2} paddingRight={1}>
                      Pet Category:
                    </Typography>
                  }
                  secondary={<Typography sx={text3}>{'Dogs'} </Typography>}
                />
                <ListItemText
                  primary={
                    <Typography sx={text2} paddingRight={1}>
                      Description:
                    </Typography>
                  }
                  secondary={
                    <Typography sx={text3}>
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
