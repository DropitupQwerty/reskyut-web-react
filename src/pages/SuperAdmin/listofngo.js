//importing dummy api
import { getAccount } from '../../fakeApi/fakeShelterAccountApi';
//
import React, { Component } from 'react';
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

//

class ListOfNgo extends Component {
  state = { accounts: getAccount() };

  handleDelete = (account) => {
    const accounts = this.state.accounts.filter((a) => a.id !== account.id);
    this.setState({ accounts });
  };

  render() {
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
            <TableBody>{this.showDataTable()}</TableBody>
          </Table>
        </TableContainer>
      </SuperAdminLayout>
    );
  }

  showDataTable() {
    if (this.state.accounts.length === 0) {
      return (
        <TableRow>
          <TableCell> No data </TableCell>
        </TableRow>
      );
    }

    return this.state.accounts.map((account) => (
      <TableRow key={account.id}>
        <TableCell>{account.firstName}</TableCell>
        <TableCell>{account.userEmail}</TableCell>
        <TableCell>{account.displayName}</TableCell>
        <TableCell align="right">
          <Button
            sx={{ ...global.button2xs }}
            onClick={() => this.handleDelete(account)}
          >
            Disable
          </Button>
          <Button sx={{ ...global.button1xs }} component={Link} to={{}}>
            View
          </Button>
        </TableCell>
      </TableRow>
    ));
  }
}

export default ListOfNgo;
