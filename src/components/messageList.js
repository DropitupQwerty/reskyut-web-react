import React, { useEffect, useState } from 'react';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MessageListRow from './messageListRow';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from './../firebase/firebase-config';
import { approveAdoption } from '../firebase/auth';

const drawerWidth = 260;

export default function MessageList({ acc }) {
  const navigate = useNavigate();
  const { id, rid } = useParams();
  const [adoptionStatus, setAdoptionStatus] = useState();
  const location = useLocation();

  console.log(location.pathname);

  useEffect(() => {
    const getDecline = async () => {
      await getDoc(doc(db, `matches/${id}${rid}`)).then((res) => {
        setAdoptionStatus(res.data());
      });
    };
    getDecline();
  }, []);

  const prevPage = () => {
    console.log(!!adoptionStatus);

    adoptionStatus
      ? adoptionStatus.isDeclined === true || approveAdoption === true
        ? navigate(-1)
        : navigate('/adoptionpage')
      : navigate('/adoptionhistory');
  };

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
            <ListItemButton onClick={prevPage}>
              <ListItemIcon>
                <ArrowBackIosIcon color="primary" />
              </ListItemIcon>
              <ListItemText fontWeight="bold" primary={'PREVIOUS PAGE'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />

        <List>
          {!adoptionStatus?.isDeclined || adoptionStatus?.isApproveAdoptor
            ? acc
                .sort(
                  (a, b) =>
                    b?.timestamp?.toDate().valueOf() -
                    a?.timestamp?.toDate().valueOf()
                )
                .map((a) => {
                  return (
                    <MessageListRow key={a.lastTimeMessage} lastMessage={a} />
                  );
                })
            : null}
        </List>
      </Drawer>
    </div>
  );
}
