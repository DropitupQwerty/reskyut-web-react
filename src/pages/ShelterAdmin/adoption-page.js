import {
  Paper,
  Typography,
  Grid,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from '@mui/material';
import global from '../../styles/global';
import React, { Component, useEffect, useState } from 'react';
import ShelterAdminLayout from '../../components/shelterAdminLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import PetsIcon from '@mui/icons-material/Pets';
import { auth } from '../../firebase/firebase-config';
// import { GetSubCollection } from '../../firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../../firebase/firebase-config';
import { GetSubCollection } from '../../firebase/auth';
import { getMessages, getUserInfo, UseBoth } from './../../firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function AdoptionPage() {
  const userAccounts = UseBoth();
  const navigate = useNavigate();

  const handleDecline = (userAccount) => {
    const userAccounts = userAccounts.filter((a) => a.id !== userAccount.id);
  };
  const handleGetAnimal = (userAccountsId) => {};

  return (
    <ShelterAdminLayout>
      <Grid item xs>
        <Typography variant="h4" align="center">
          <PetsIcon color="primary" /> <b>Adoption Page</b>
        </Typography>
      </Grid>
      <Grid item xs>
        <Checkbox />
        <Button>
          <RefreshIcon color="primary" />
        </Button>
        <Button>
          <DeleteIcon color="primary" />
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell sx={{ marginLeft: '10vw' }}>
                <b>Facebook</b>
              </TableCell>
              <TableCell>
                <b>Want to Adopt</b>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userAccounts.map((userAccount) => (
              <TableRow key={userAccount.id}>
                <TableCell>{userAccount.displayName}</TableCell>
                <TableCell>
                  <Link href={userAccount.fbLink} target="_blank">
                    {userAccount.fbLink}
                  </Link>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button
                    sx={{ ...global.button2xs }}
                    onClick={() => this.handleDecline(userAccount)}
                  >
                    Decline
                  </Button>
                </TableCell>
                <TableCell>
                  <Button sx={{ ...global.button1xs }}>Approve</Button>
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ ...global.button3xs }}
                    onClick={() =>
                      navigate(
                        `/message/${userAccount.id}${auth.currentUser?.uid}`
                      )
                    }
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ShelterAdminLayout>
  );
}
