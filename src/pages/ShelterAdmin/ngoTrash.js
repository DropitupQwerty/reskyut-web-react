import SuperAdminLayout from '../../components/superAdminLayout';
import global from '../../styles/global';
import React, { useEffect, useState } from 'react';

import { Typography, Grid, Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import LayersIcon from '@mui/icons-material/Layers';
import { getTrashCollection, restoreAnimal } from './../../firebase/auth';
import DataTable from '../../components/tableWithSort';
import DeleteDialog from '../../components/common/deleteDialog';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase-config';
import ShelterAdminLayout from './../../components/shelterAdminLayout';
import { toast } from 'react-toastify';

export default function NgoTrash() {
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

    await setDoc(doc(db, `pets/${rows.id}`), {
      ...rows.row,
      adminDelete: false,
    }).then(async () => {
      await deleteDoc(
        doc(db, `ngoshelters/${auth.currentUser?.uid}/trash/${rows.id}`)
      );
    });
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
        return !rows.row?.adminDelete ? (
          <Button
            sx={{ ...global.button2xs }}
            onClick={(event) => {
              handleDelete(event, rows);
            }}
          >
            Delete
          </Button>
        ) : (
          <Typography
            color="primary"
            sx={{ textAlign: 'center', padding: '0 20px' }}
            variant="caption"
          >
            Admin Deletion
          </Typography>
        );
      },
      width: 150,
    },
    {
      field: 'Restore',
      sortable: false,
      renderCell: (rows) => {
        if (!rows.row?.adminDelete) {
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
        }
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
    console.log(animal.id);
    await deleteDoc(
      doc(db, `ngoshelters/${auth.currentUser?.uid}/trash/${animal.id}`)
    )
      .then(() => {
        toast.success('Pet Deleted');
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.code);
      });
    console.log('delete', animal);
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      animalData.find((row) => row.id === id)
    );
    console.log(selectedRowsData);
  };

  useEffect(() => {
    const getpCollection = async () => {
      setAnimalData(await getTrashCollection());
    };
    getpCollection();
  }, []);

  console.log(animalData);

  return (
    <ShelterAdminLayout>
      <DeleteDialog
        open={open}
        cancel={handleClose}
        message={message}
        confirm={handleConfirmDelete}
      />
      <Grid item xs>
        <Typography variant="h4" align="center">
          <DeleteIcon color="primary" /> <b>Deleted Animals</b>
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Button>
            <DeleteIcon color="primary" /> <b>Delete selected</b>
          </Button>
        </Grid>
        <Grid item>
          <Button>
            <DeleteIcon color="primary" /> <b>Delete All</b>
          </Button>
        </Grid>
      </Grid>

      <DataTable
        checkBox={true}
        rows={animalData}
        columns={columns}
        checkboxSelected={onRowsSelectionHandler}
      />
    </ShelterAdminLayout>
  );
}
