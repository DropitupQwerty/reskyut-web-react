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
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { doc, getDoc, query, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';
import Loader from '../components/common/loader';
import Box from '@mui/material/Box';
import global from '../styles/global';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { async } from '@firebase/util';
import ApproveDialog from './common/approveDialog';
import DeclineDialog from './common/declineDialog';
import { declineAdoption, listAdoptor } from '../firebase/auth';
import getMatchedUserInfo from './../lib/getMatchedUserInfo';
import { approveAdoption } from './../firebase/auth';

export default function SenderInfo() {
  const [form, setForm] = useState();
  const [info, setInfo] = useState();
  const [petInfo, setPetInfo] = useState();
  const [isLoading, setIsLoading] = useState();
  const { id, rid } = useParams();
  const [adoptionStatus, setAdoptionStatus] = useState();
  const [adoptedPet, setAdoptedPet] = useState([]);
  const [openDecline, setOpenDecline] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');
  const [user, setUser] = useState();

  const { text1, text2, text3 } = style;
  const { BestWayToContact, FullAddress } = form || {};
  const { displayName, About, photoURL, email } = info || {};
  const { name, pet_category, desc, gender, imageURL, age } = petInfo || {};

  useEffect(() => {
    const getInfo = async () => {
      setIsLoading(true);
      //Get User Info
      const docRef = doc(db, `users/${id}`);
      const docSnap = await getDoc(docRef);

      const q = query(collection(db, `users/${id}/adopted`));
      await getDocs(q).then((r) => {
        let adopted = [];
        r.docs.map(async (r) => {
          const petInfo = doc(db, `pets/${r.data().petID}`);
          const petInfoSnap = await getDoc(petInfo);
          console.log(petInfoSnap.data());
          adopted.push(petInfoSnap.data());
          setAdoptedPet(adopted);
        });
      });
      console.log(adoptedPet);

      setInfo(docSnap.data());
      //Get Fulladdress and Fb URL
      const formSnap = await getDoc(doc(docRef, '/form/form'));
      setForm(formSnap.data());

      //Get pet Info
      const petRef = doc(db, `matches/${id}${rid}`);
      await getDoc(petRef).then(async (petSnap) => {
        setAdoptionStatus(petSnap.data());

        const userInfos = await listAdoptor(
          getMatchedUserInfo(petSnap.data()?.users, auth.currentUser.uid)
        );
        setUser(userInfos);

        const getPetInfo = async () => {
          console.log(petSnap.data());

          const petInfo = doc(db, `pets/${petSnap.data().petToAdopt}`);
          const petInfoSnap = await getDoc(petInfo);
          if (!petInfoSnap.exists()) {
            setPetInfo('Deleted');
          } else {
            setPetInfo(petInfoSnap.data());
            setIsLoading(false);
          }
        };

        getPetInfo();
      });
      console.log('Get Info Sender Info');
    };
    getInfo();
  }, [id]);

  useEffect(() => {}, []);

  const handleApproveDialog = () => {
    setNotifMessage(
      `Congratulation you are the chosen adoptor for this pet ${user.petToAdopt} please proceed to the ngo shelter `
    );
    setOpenApprove(true);
  };
  const handleDeclineDialog = () => {
    setNotifMessage(
      `Adoption is closed. Sorry this pet is no longer available`
    );
    setOpenDecline(true);
  };

  const handleCancel = () => {
    setOpenDecline(false);
    setOpenApprove(false);
  };
  const handleChange = (e) => {
    setNotifMessage(e);
  };

  const at = adoptionStatus;
  const handleApproveAdoption = () => {
    setOpenApprove(false);
    approveAdoption(user, notifMessage);
    at.isApprovedAdoptor = !at.isApprovedAdoptor;
    setAdoptionStatus(at);
  };

  const handleSendDecline = async (e) => {
    e.preventDefault();
    declineAdoption(user, notifMessage);
    setNotifMessage('');
    at.isDeclined = !at.isDeclined;
    setAdoptionStatus(at);
  };

  return (
    <div>
      <ApproveDialog
        user={user?.name}
        open={openApprove}
        cancel={handleCancel}
        confirm={handleApproveAdoption}
      />
      <DeclineDialog
        confirm={handleSendDecline}
        open={openDecline}
        cancel={handleCancel}
        onChange={handleChange}
        value={notifMessage}
        user={user}
      />
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
              sx={{ height: '120px', width: '120px' }}
              src={photoURL || 'No Photo Uploaded'}
            />
          </Box>
          <Box noWrap sx={{ p: 1 }}>
            <Typography sx={text1}>{displayName}</Typography>
            <Typography variant="caption">{email || ''}</Typography>
            <Link href={BestWayToContact} target="_blank">
              <Typography
                sx={
                  (text3,
                  { ...global.noWrapEllip, width: 150, display: 'block' })
                }
              >
                {BestWayToContact || ''}
              </Typography>
            </Link>
            <Box>
              <Typography
                sx={({ paddingTop: '20px', marginTop: '20px' }, text2)}
              >
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
        <Box>
          <Typography
            color="primary"
            variant="h6"
            fontWeight="bold"
            sx={{ textAlign: 'center' }}
          >
            Pets Adopted
          </Typography>
          <Box
            sx={{
              maxHeight: '200px',
              overflow: 'scroll',
              overflowX: 'hidden',
              padding: '20px',
              margin: 'auto',
            }}
          >
            {adoptedPet.map((pet) => {
              return (
                <Accordion>
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>{pet?.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography fontWeight={'bold'}>
                      Ngo: {pet?.shelterName}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
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
            <Box
              sx={{
                paddingTop: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box>
                <Card sx={{ width: '250px', height: '252px' }}>
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
            </Box>
          )}
          <Box sx={{ p: 2 }}>
            <List
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <ListItemText
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '50%',
                }}
                primary={
                  <Typography sx={text2} paddingRight={1}>
                    Name:
                  </Typography>
                }
                secondary={<Typography sx={text3}>{name} </Typography>}
              />
              <ListItemText
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '30%',
                }}
                primary={
                  <Typography sx={text2} paddingRight={1}>
                    Age:
                  </Typography>
                }
                secondary={<Typography sx={text3}>{age} </Typography>}
              />

              <ListItemText
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '50%',
                }}
                primary={<Typography sx={text2}>Pet Category : </Typography>}
                secondary={<Typography sx={text3}>{pet_category} </Typography>}
              />
              <ListItemText
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '30%',
                }}
                primary={
                  <Typography sx={text2} paddingRight={1}>
                    Gender:
                  </Typography>
                }
                secondary={<Typography sx={text3}>{gender} </Typography>}
              />
              <Typography sx={(desc, text2)} paddingRight={1}>
                Description:
              </Typography>

              <Box sx={text3}>
                <Typography sx={text3}>{desc}</Typography>
              </Box>
            </List>
          </Box>
          {adoptionStatus?.isApprovedAdoptor ? (
            <Typography color="#749F82" textAlign="center">
              Approve Adoptor
            </Typography>
          ) : !adoptionStatus?.isDeclined ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                sx={{ ...global.button2xs }}
                onClick={handleDeclineDialog}
              >
                Decline
              </Button>
              <Button
                sx={{ ...global.button1xs }}
                onClick={handleApproveDialog}
              >
                Approve
              </Button>
            </Box>
          ) : (
            <Typography color="primary" textAlign="center">
              Declined
            </Typography>
          )}
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
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  desc: {
    height: '25px',
  },
};
