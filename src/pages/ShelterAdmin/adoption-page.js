//fake api
import { getUserAccounts } from '../../fakeApi/fakeUserAccountApi';
import { getAnimal } from '../../fakeApi/fakeAnimalAccount';

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
    userAccounts: getUserAccounts(),
    userAnimal: getAnimal(),
  };

  handleDecline = (userAccount) => {
    const userAccounts = this.state.userAccounts.filter(
      (a) => a.id !== userAccount.id
    );
    this.setState({ userAccounts });
  };
  handleGetAnimal = (userAccountsId) => {
    const animal = getAnimal(userAccountsId);
    console.log(animal.name);
    return animal.name;
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
                    <Link href={userAccount.fbLink} target="_blank">
                      {userAccount.fbLink}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {this.handleGetAnimal(userAccount.petAdopt)}
                  </TableCell>
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
