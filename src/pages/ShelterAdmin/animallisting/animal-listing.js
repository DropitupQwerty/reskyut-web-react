//fake api
import { getAnimals } from '../../../fakeApi/fakeAnimalAccount';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import global from '../../../styles/global';
import ShelterAdminLayout from '../../../components/shelterAdminLayout';
import Listed from '../../../components/common/listed';
import {
  Paper,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { auth } from '../../../firebase/firebase-config';

class AnimalListing extends Component {
  state = { animalData: getAnimals() };

  render() {
    return (
      <ShelterAdminLayout>
        <Grid item xs>
          <Typography variant="h4" align="center">
            <ReceiptLongIcon color="primary" /> <b>Animal Listing</b>
          </Typography>
        </Grid>
        <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {' '}
          <Button
            variant="contained"
            color="primary"
            sx={{
              ...global.button2Small,
            }}
            component={Link}
            to={`/${auth.currentUser?.uid}/animallisting/addanimal`}
          >
            <Typography>
              <b> + New Animal</b>
            </Typography>
          </Button>
        </Grid>

        <Grid item xs>
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
                  <b>Age</b>
                </TableCell>
                <TableCell>
                  <b>Gender</b>
                </TableCell>
                <TableCell>
                  <b>Pet Category</b>
                </TableCell>
                <TableCell>
                  <b>Description</b>
                </TableCell>
                <TableCell align="center">
                  <b>Status</b>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.showDataTable()}</TableBody>
          </Table>
        </TableContainer>
      </ShelterAdminLayout>
    );
  }

  handleListed = (animal) => {
    const animalData = [...this.state.animalData];
    const index = animalData.indexOf(animal);
    animalData[index] = { ...animalData[index] };
    animalData[index].listed = !animalData[index].listed;
    this.setState({ animalData });
  };

  showDataTable() {
    if (this.state.animalData.length === 0) {
      return (
        <TableRow>
          <TableCell> No data </TableCell>
        </TableRow>
      );
    }

    return this.state.animalData.slice(0, 4).map((animal) => (
      <TableRow key={animal.id}>
        <TableCell>{animal.name}</TableCell>
        <TableCell>{animal.age}</TableCell>
        <TableCell>{animal.gender}</TableCell>
        <TableCell>{animal.petCategory}</TableCell>
        <TableCell>{animal.description}</TableCell>

        <TableCell align="right">
          <Listed
            listed={animal.listed}
            onToggleListed={() => this.handleListed(animal)}
          />
        </TableCell>
        <TableCell align="right">
          <Button
            sx={{ ...global.button2xs }}
            component={Link}
            to={`${auth.currentUser?.uid}/animallisting/editanimal/${animal.id}`}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    ));
  }
}

export default AnimalListing;
