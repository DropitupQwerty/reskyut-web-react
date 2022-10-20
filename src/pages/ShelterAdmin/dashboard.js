import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import ShelterAdminLayout from '../../components/shelterAdminLayout';
import {
  Paper,
  Box,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import global from '../../styles/global';
import { ListUpdate, listAdoptor, ListAdoptedPet } from './../../firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from './../../firebase/firebase-config';
import getMatchedUserInfo from './../../lib/getMatchedUserInfo';

export default function Dashboard() {
  const [animalData, setAnimalData] = useState([]);
  const [adoptToday, setAdoptToday] = useState([]);
  const [adoptedPet, setAdoptedPet] = useState([]);

  useEffect(() => {
    const getPostList = async () => {
      const list = await ListUpdate();
      setAnimalData(list);

      const adoptedlist = await ListAdoptedPet();
      setAdoptedPet(adoptedlist);

      const docRef = collection(db, 'matches');
      const q = query(
        docRef,
        where('usersMatched', 'array-contains', auth.currentUser?.uid),
        where('isDeclined', '==', false),
        where('isApprovedAdoptor', '==', false)
      );
      onSnapshot(q, (querySnapshot) => {
        const userInfos = querySnapshot.docs.map((detail) => ({
          ...detail.data(),
          id: detail.id,
        }));

        const users = [];
        userInfos.map(async (a) => {
          users.push(
            await listAdoptor(
              getMatchedUserInfo(a.users, auth.currentUser?.uid)
            )
          );
          const n = [...users];
          setAdoptToday(n);
        });
      });
    };
    getPostList();
  }, [auth.currentUser.uid]);

  return (
    <ShelterAdminLayout>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper sx={{ ...global.paperDashboard }}>
              <Typography variant="h5">
                <b>Want to adopt TODAY</b>
              </Typography>
              <Box>
                <Typography variant="h2" sx={paperText}>
                  {adoptToday.length}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper sx={{ ...global.paperDashboard }}>
              <Typography variant="h5">
                <b>Total Animals Posted</b>
              </Typography>
              <Box>
                <Typography variant="h2" sx={paperText}>
                  {animalData.length}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper sx={{ ...global.paperDashboard }}>
              <Typography variant="h5">
                <b>Total Animals Adopted</b>
              </Typography>
              <Box>
                <Typography variant="h2" sx={paperText}>
                  {adoptedPet.length}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Adoptor Name</b>
                    </TableCell>
                    <TableCell>
                      <b>Wants to Adopt</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {adoptToday.slice(0, 5).map((at) => {
                  return (
                    <TableRow>
                      <TableCell>{at.name}</TableCell>
                      <TableCell>{at.petToAdopt}</TableCell>
                    </TableRow>
                  );
                })}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </ShelterAdminLayout>
  );
}
const paperText = {
  textAlign: 'center',
  marginTop: '30px',
};
