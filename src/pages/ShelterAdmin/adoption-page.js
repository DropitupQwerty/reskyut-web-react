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
  Box,
} from '@mui/material';

import ShelterAdminLayout from '../../components/shelterAdminLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import PetsIcon from '@mui/icons-material/Pets';
import { getUsersInfo } from './../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/common/loader';
import AdoptionRow from './../../components/adoptionRow';

export default function AdoptionPage() {
  const [userAccounts, setUserAccounts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const getAcc = async () => {
      setIsLoading(true);
      const accounts = await getUsersInfo();
      setUserAccounts(accounts);
      console.log('minfo', accounts);
      setIsLoading(false);
    };
    getAcc();
  }, []);

  const handleDecline = (userAccount) => {
    const deleteAccount = userAccounts.filter((u) => u.id !== userAccount.id);
    setUserAccounts(deleteAccount);
  };
  const handleApprove = (userAccountsId) => {};

  const showDataTable = () => {
    if (userAccounts.length === 0) {
      return (
        <TableRow>
          <TableCell> No data </TableCell>
        </TableRow>
      );
    } else {
      return userAccounts.map((userAccount) => (
        <AdoptionRow
          userAccount={userAccount}
          key={userAccount.id}
          decline={handleDecline}
        />
      ));
    }
  };

  return (
    <ShelterAdminLayout>
      <Grid item xs>
        <Typography variant="h4" align="center">
          <PetsIcon color="primary" /> <b>Adoption Page</b>
        </Typography>
      </Grid>
      <Grid item xs>
        <Checkbox />
        <Button onClick={() => navigate('/adoptionpage')}>
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
                <Checkbox />
              </TableCell>
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
            {isLoading ? (
              <TableRow>
                <TableCell>
                  <Loader isLoading={isLoading} height={30} width={30} />
                </TableCell>
              </TableRow>
            ) : (
              showDataTable()
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ShelterAdminLayout>
  );
}
