//fake api
import { getAnimals } from '../../../fakeApi/fakeAnimalAccount';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import global from '../../../styles/global';
import ShelterAdminLayout from '../../../components/shelterAdminLayout';

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
import { listUpdate } from '../../../firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import IsLoggedIn from './../../../firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function AnimalListing() {
  const [animalData, setAnimalData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPostList = async () => {
      const list = await listUpdate();
      setAnimalData(list);
    };
    getPostList();
  }, [IsLoggedIn().loggedIn]);
  console.log(animalData);

  const showDataTable = () => {
    if (animalData.length === 0) {
      return (
        <TableRow>
          <TableCell> No data </TableCell>
        </TableRow>
      );
    }
    return animalData.map((animal) => (
      <TableRow key={animal.id}>
        <TableCell>{animal.name}</TableCell>
        <TableCell>{animal.age}</TableCell>
        <TableCell>{animal.gender}</TableCell>
        <TableCell>{animal.pet_category}</TableCell>
        <TableCell>{animal.desc}</TableCell>

        <TableCell align="right">
          <Button
            variant="contained"
            color={animal.status}
            sx={{ ...global.badgeStatus }}
          >
            {animal.status}
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button
            sx={{ ...global.button2xs }}
            component={Link}
            to={`/animallisting/editanimal/${animal.id}`}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  if (IsLoggedIn().loggedIn) {
    return (
      <ShelterAdminLayout>
        <Grid item xs>
          <Typography variant="h4" align="center">
            <ReceiptLongIcon color="primary" /> <b>Animal Listing</b>
          </Typography>
        </Grid>
        <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              ...global.button2Small,
            }}
            component={Link}
            to="/animallisting/addanimal"
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
            <TableBody>{showDataTable()}</TableBody>
          </Table>
        </TableContainer>
      </ShelterAdminLayout>
    );
  } else {
    navigate('/');
  }
}
