import SuperAdminLayout from '../../components/superAdminLayout';
import global from '../../styles/global';
import React, { Component, useEffect, useState } from 'react';

import {
  Typography,
  Grid,
  Button,
  Checkbox,
  TableCell,
  TableRow,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import LayersIcon from '@mui/icons-material/Layers';
import ListOfNGO from './listofngo';
import { getTrashCollection, restoreAnimal } from './../../firebase/auth';
import DataTable from '../../components/tableWithSort';
import DeleteDialog from '../../components/common/deleteDialog';
import { async } from '@firebase/util';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase-config';

export default function AdminTrash() {
  const [animalData, setAnimalData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [animal, setAnimal] = useState();

  const handleDelete = (event, rows) => {
    setOpen(true);
    setMessage(`Delete ${rows.row.name} Permanently?`);
    setAnimal(rows);
  };
  const handleRestore = async (event, rows) => {
    const deletedAnimal = animalData.filter((a) => a.id !== rows.id);
    setAnimalData(deletedAnimal);
    restoreAnimal(rows);
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
      field: 'Restore',
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button1xs }}
            onClick={(event) => {
              handleRestore(event, rows);
            }}
          >
            Restore
          </Button>
        );
      },
      width: 150,
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirmDelete = async () => {
    const deletedAnimal = animalData.filter((a) => a.id !== animal.id);
    setAnimalData(deletedAnimal);
    setOpen(false);

    console.log(animal.id);

    await deleteDoc(
      doc(db, `ngoshelters/${auth.currentUser?.uid}/trash/${animal.id}`)
    ).then(async () => {
      await deleteDoc(
        doc(db, `ngoshelters/${animal.row.shelterID}/trash/${animal.id}`)
      ).then(() => {
        alert('Animal Deleted');
      });
    });
  };
  useEffect(() => {
    const getpCollection = async () => {
      setAnimalData(await getTrashCollection());
    };
    getpCollection();
  }, []);
  console.log('delete', animalData);

  return (
    <SuperAdminLayout>
      <DeleteDialog
        open={open}
        cancel={handleClose}
        message={message}
        confirm={handleConfirmDelete}
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
    </SuperAdminLayout>
  );
}
