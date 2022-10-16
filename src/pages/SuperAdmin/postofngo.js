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
import { getPetsCollection, moveToTrash } from './../../firebase/auth';
import DataTable from '../../components/tableWithSort';
import { Link } from 'react-router-dom';

import DeleteDialog from '../../components/common/deleteDialog';

export default function PostOfNgo() {
  const [animalData, setAnimalData] = useState([]);
  const [trash, setTrash] = useState();
  const [message, setMessage] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async (event, rows) => {
    console.log(rows.id);
    setTrash(rows);
    setOpen(true);
    setMessage('Confirm Deletion');
  };
  const handeleConfirm = () => {
    const deletedAnimal = animalData.filter((a) => a.id !== trash.id);
    setAnimalData(deletedAnimal);
    moveToTrash(trash);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <SuperAdminLayout>
      <DeleteDialog
        open={open}
        message={message}
        confirm={handeleConfirm}
        cancel={handleClose}
      />
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
