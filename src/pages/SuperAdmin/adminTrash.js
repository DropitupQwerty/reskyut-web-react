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
import {
  deleteDoc,
  doc,
  collection,
  query,
  getDocs,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase-config';
import { toast } from 'react-toastify';

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
        toast.succes('Animal Deleted');
      });
    });
  };
  const getAllAdminDelete = async () => {
    let adminDelete = [];
    const q = query(collection(db, `ngoshelters`));
    await getDocs(q).then((res) => {
      res.docs.map((r) => {
        const mq = query(
          collection(db, `ngoshelters/${r.data().id}/trash`),
          where('adminDelete', '==', true)
        );

        onSnapshot(mq, (querySnapshot) => {
          const userInfos = querySnapshot.docs.map((detail) => ({
            ...detail.data(),
            id: detail.id,
          }));

          userInfos.map((ui) => {
            adminDelete.push(ui);
            const u = [...adminDelete];
            setAnimalData(u);
          });
        });
      });
    });
  };

  useEffect(() => {
    getAllAdminDelete();
  }, []);

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
          <DeleteIcon color="primary" /> <b>Deleted Animals</b>
        </Typography>
      </Grid>
      <Grid item xs>
        <Button onClick={getAllAdminDelete()}>
          <RefreshIcon color="primary" />
        </Button>
      </Grid>

      <DataTable rows={animalData} columns={columns} />
    </SuperAdminLayout>
  );
}
