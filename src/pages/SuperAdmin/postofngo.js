import SuperAdminLayout from '../../components/superAdminLayout';
import global from '../../styles/global';
import React, { Component } from 'react';

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

import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import LayersIcon from '@mui/icons-material/Layers';
import ListOfNGO from './listofngo';

const animalData = [];

export default function PostOfNgo() {
  function showDataTable() {
    //Show no data if table is empty
    if (animalData.length === 0) {
      return (
        <TableRow>
          <TableCell> No data </TableCell>
        </TableRow>
      );
    } else {
      return animalData.map((animal) => (
        <TableRow key={animal.id}>
          <TableCell>{animal.ngo}</TableCell>
          <TableCell>{animal.name}</TableCell>
          <TableCell>{animal.age}</TableCell>
          <TableCell>{animal.gender}</TableCell>
          <TableCell>{animal.description}</TableCell>
          <TableCell align="right">
            <Button sx={{ ...global.button1xs }}>View</Button>
          </TableCell>
        </TableRow>
      ));
    }
  }

  return (
    <SuperAdminLayout>
      <Grid item xs>
        <Typography variant="h4" align="center">
          <LayersIcon color="primary" /> <b>Post of NGO</b>
        </Typography>
      </Grid>
      <Grid item xs>
        <Checkbox {...ListOfNGO} />
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
                <b>NGO Name</b>
              </TableCell>
              <TableCell sx={{ marginLeft: '10vw' }}>
                <b>Pet Name</b>
              </TableCell>
              <TableCell>
                <b>Age</b>
              </TableCell>
              <TableCell>
                <b>Gender</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{showDataTable()}</TableBody>
        </Table>
      </TableContainer>
    </SuperAdminLayout>
  );
}
