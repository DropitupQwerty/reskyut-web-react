import React, { useEffect, useState } from 'react';
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

import ShelterAdminLayout from '../../components/shelterAdminLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import PetsIcon from '@mui/icons-material/Pets';
import { getUsersInfo } from './../../firebase/auth';
import AdoptionRow from '../../components/adoptionRow';

export default function AdoptionPage() {
  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    const getAcc = async () => {
      const accounts = await getUsersInfo();
      setUserAccounts(accounts);
      console.log(accounts);
    };
    getAcc();
  }, []);

  const handleDecline = (userAccount) => {
    const deleteAccount = userAccounts.filter((u) => u.id !== userAccount.id);
    setUserAccounts(deleteAccount);
  };
  const handleApprove = (userAccountsId) => {};

  return (
    <ShelterAdminLayout>
      <Grid item xs>
        <Typography variant="h4" align="center">
          <PetsIcon color="primary" /> <b>Adoption Page</b>
        </Typography>
      </Grid>
      <Grid item xs>
        <Checkbox />
        <Button onClick={() => window.location.reload(false)}>
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
              <TableCell>
                <b>Score</b>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userAccounts.map((userAccount) => (
              <AdoptionRow
                userAccount={userAccount}
                key={userAccount.id}
                decline={handleDecline}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ShelterAdminLayout>
  );
}
