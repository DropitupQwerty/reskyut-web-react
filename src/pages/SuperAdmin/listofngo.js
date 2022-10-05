import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import global from '../../styles/global';
import SuperAdminLayout from '../../components/superAdminLayout';
import { Firestore, query, where } from 'firebase/firestore';
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
} from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { deleteAccount } from '../../firebase/auth';
import { GetAccounts } from './../../firebase/auth';
import { async } from '@firebase/util';
import axios from 'axios';

export default function ListOfNgo() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const allAccounts = async () => {
      const acc = await GetAccounts();
      setAccounts(acc);
    };
    allAccounts();
  }, []);

  console.log(accounts);

  const handleDelete = (account) => {
    console.log(account.uid);
    setAccounts(accounts.filter((a) => a.id !== account.id));
    axios.post(`http://localhost:5000/api/admin/${account.uid}`);
    deleteAccount(account.uid);
  };

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
                {console.log(account.id)}
                <TableCell>{account.firstName}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.display_name}</TableCell>
                <TableCell align="right">
                  <Button
                    sx={{ ...global.button2xs }}
                    onClick={() => handleDelete(account)}
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
