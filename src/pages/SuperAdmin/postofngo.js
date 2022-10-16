import SuperAdminLayout from '../../components/superAdminLayout';
import global from '../../styles/global';
import React, { Component, useEffect, useState } from 'react';

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
import { getPetsCollection } from './../../firebase/auth';
import DataTable from '../../components/tableWithSort';
import { Link } from 'react-router-dom';

export default function PostOfNgo() {
  const [animalData, setAnimalData] = useState([]);

  const handleDelete = (rows) => {};

  const columns = [
    { field: 'shelterName', headerName: 'NGO', minWidth: 150 },
    { field: 'name', headerName: 'Name', minWidth: 150 },
    {
      field: 'age',
      headerName: 'Age',
      minWidth: 150,
    },
    { field: 'gender', headerName: 'gender', minWidth: 150 },
    { field: 'pet_category', headerName: 'Pet Category', minWidth: 150 },
    {
      field: 'Delete',
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button2xs }}
            onClick={(event) => {
              handleDelete(event, rows);
            }}
          >
            Delete
          </Button>
        );
      },
      width: 150,
    },
    {
      field: 'View',
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button1xs }}
            component={Link}
            to={`/admin/postofngo/viewanimal/${rows.id}`}
          >
            View
          </Button>
        );
      },
      width: 150,
    },
  ];

  useEffect(() => {
    const getpCollection = async () => {
      setAnimalData(await getPetsCollection());
    };
    getpCollection();
  }, []);
  console.log(animalData);

  //Show no data if table is empty
  function showDataTable() {
    if (animalData.length === 0) {
      return (
        <TableRow>
          <TableCell> No data </TableCell>
        </TableRow>
      );
    } else {
      return animalData.map((animal) => (
        <TableRow key={animal.id}>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>{animal.shelterName}</TableCell>
          <TableCell>{animal.name}</TableCell>
          <TableCell>{animal.age}</TableCell>
          <TableCell>{animal.gender}</TableCell>
          <TableCell>{animal.desc}</TableCell>
          <TableCell align="right">
            <Button sx={{ ...global.button2xs }}>Delete</Button>
          </TableCell>
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

      <DataTable rows={animalData} columns={columns} />

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{showDataTable()}</TableBody>
        </Table>
      </TableContainer> */}
    </SuperAdminLayout>
  );
}
