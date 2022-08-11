//fake api
import { getUserAccount } from '../../fakeApi/fakeUserAccountApi';

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
import React, { Component } from 'react';
import ShelterAdminLayout from '../../components/shelterAdminLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import PetsIcon from '@mui/icons-material/Pets';

class Adoptionpage extends Component {
  state = {
    userAccounts: getUserAccount(),
  };

  handleDecline = (userAccount) => {
    const userAccounts = this.state.userAccounts.filter(
      (a) => a.id !== userAccount.id
    );
    this.setState({ userAccounts });
  };
  render() {
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
              {this.state.userAccounts.map((userAccount) => (
                <TableRow key={userAccount.id}>
                  <TableCell>
                    {userAccount.firstName + ' '}
                    {userAccount.middleName + ' '}
                    {userAccount.lastName}
                  </TableCell>
                  <TableCell>
                    <Link href={userAccount.fbLink}>{userAccount.fbLink}</Link>
                  </TableCell>
                  <TableCell>{userAccount.petAdopt}</TableCell>
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
                    <Button sx={{ ...global.button3xs }}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ShelterAdminLayout>
    );
  }
}

export default Adoptionpage;
