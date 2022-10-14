//fake api
import React from 'react';
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
import { ListUpdate } from '../../../firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';

export default function AnimalListing() {
  const [animalData, setAnimalData] = useState([]);

  useEffect(() => {
    const getPostList = async () => {
      const list = await ListUpdate();
      setAnimalData(list);
    };
    getPostList();
  }, []);
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
        <TableCell>
          <Typography
            sx={{
              ...global.noWrapEllip,
              width: 200,
            }}
          >
            {animal.desc}
          </Typography>
        </TableCell>

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
}
