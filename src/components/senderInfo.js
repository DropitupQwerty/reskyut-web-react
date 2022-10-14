import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Toolbar,
  Avatar,
  Typography,
  List,
  ListItemText,
  Button,
  Card,
  CardMedia,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import Loader from '../components/common/loader';
import Box from '@mui/material/Box';

export default function SenderInfo() {
  const [form, setForm] = useState();
  const [info, setInfo] = useState();
  const [petInfo, setPetInfo] = useState();
  const [isLoading, setIsLoading] = useState();
  const { id, rid } = useParams();

  const { text1, text2, text3 } = style;
  const { BestWayToContact, FullAddress } = form || {};
  const { displayName, About, photoURL } = info || {};
  const { name, pet_category, desc, gender, imageURL, age } = petInfo || {};

  useEffect(() => {
    const getInfo = async () => {
      setIsLoading(true);
      //Get User Info
      const docRef = doc(db, `users/${id}`);
      const docSnap = await getDoc(docRef);
      setInfo(docSnap.data());
      //Get Fulladdress and Fb URL
      const formSnap = await getDoc(doc(docRef, '/form/form'));
      setForm(formSnap.data());

      //Get pet Info
      const petRef = doc(db, `matches/${id}${rid}`);
      await getDoc(petRef).then((petSnap) => {
        const getPetInfo = async () => {
          console.log(petSnap.data());
          const petInfo = doc(db, `pets/${petSnap.data().petToAdopt}`);
          const petInfoSnap = await getDoc(petInfo);
          setPetInfo(petInfoSnap.data());
          setIsLoading(false);
        };
        getPetInfo();
      });
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
          {isLoading ? (
            <Loader isLoading={isLoading} height={50} width={50} />
          ) : (
            <Box sx={{ paddingTop: '20px', display: 'flex' }}>
              <Box>
                <Card sx={{ width: '194px', height: '252px' }}>
                  <CardMedia
                    sx={{ height: 550, width: '100%', objectFit: 'cover' }}
                  >
                    <img
                      src={imageURL?.[0]}
                      alt={imageURL?.[0]}
                      style={{ height: '252px', width: '100%' }}
                    ></img>
                  </CardMedia>
                </Card>
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
                    secondary={<Typography sx={text3}>{name} </Typography>}
                  />
                  <ListItemText
                    sx={{ display: 'flex', alignItems: 'center' }}
                    primary={
                      <Typography sx={text2} paddingRight={1}>
                        Age:
                      </Typography>
                    }
                    secondary={<Typography sx={text3}>{age} </Typography>}
                  />
                  <ListItemText
                    sx={{ display: 'flex', alignItems: 'center' }}
                    primary={
                      <Typography sx={text2} paddingRight={1}>
                        Gender:
                      </Typography>
                    }
                    secondary={<Typography sx={text3}>{gender} </Typography>}
                  />
                  <ListItemText
                    sx={{ display: 'flex', alignItems: 'center' }}
                    primary={<Typography sx={text2}>Pet Category:</Typography>}
                    secondary={
                      <Typography sx={text3}>{pet_category} </Typography>
                    }
                  />
                  <Typography sx={(desc, text2)} paddingRight={1}>
                    Description:
                  </Typography>

                  <Box
                    sx={{
                      width: '100%',
                      height: '60px',
                    }}
                  >
                    <Typography sx={text3}>{desc}</Typography>
                  </Box>
                </List>
              </Box>
            </Box>
          )}

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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '4',
    WebkitBoxOrient: 'vertical',
  },
  desc: {
    height: '25px',
  },
};
