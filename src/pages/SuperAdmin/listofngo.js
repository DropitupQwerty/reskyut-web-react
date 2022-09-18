//importing dummy api

//
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import global from '../../styles/global';
import SuperAdminLayout from '../../components/superAdminLayout';

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
  Box,
} from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function ListOfNgo() {
  const [accounts, setAccounts] = useState([]);
  const ngoAdminCollectionRef = collection(db, 'ngoshelters');

  useEffect(() => {
    const getAccounts = async () => {
      const data = await getDocs(ngoAdminCollectionRef);
      setAccounts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAccounts();
  }, []);
  console.log(accounts);

  return (
    <SuperAdminLayout>
      <Grid item xs>
        <Typography variant="h4" align="center">
          <ApartmentIcon color="primary" /> <b>List of NGO</b>
        </Typography>
      </Grid>
      <Grid item xs>
        <Checkbox />
        <Button>
          <RefreshIcon color="primary" />
        </Button>
        <Button>
          <PersonRemoveIcon color="primary" />
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
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Display Name</b>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.firstName}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.display_name}</TableCell>
                <TableCell align="right">
                  <Button
                    sx={{ ...global.button2xs }}
                    onClick={() => this.handleDelete(account)}
                  >
                    Disable
                  </Button>
                  <Button
                    sx={{ ...global.button1xs }}
                    component={Link}
                    to={`/admin/listofngo/viewngo/${account.id}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SuperAdminLayout>
  );
}
