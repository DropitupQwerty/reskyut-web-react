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
import { async } from '@firebase/util';

export default function NgoTrash() {
  const [animalData, setAnimalData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [animal, setAnimal] = useState();
  const [selected, setSelected] = useState();
  const [iconDeleteDialog, setIconDeleteDialog] = useState(false);
  const [iconDeleteAllDialog, setIconDeleteAllDialog] = useState(false);

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
        return !rows.row?.adminDelete ? (
          <Button
            sx={{ ...global.button1xs }}
            onClick={(event) => {
              handleRestore(event, rows);
            }}
          >
            Restore
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
  ];

  const handleClose = () => {
    setOpen(false);
    setIconDeleteDialog(false);
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
    setSelected(selectedRowsData);
  };

  const openDialogDeleteSelected = () => {
    if (selected.length !== 0) {
      setIconDeleteDialog(true);
      selected.length !== animalData.length
        ? setMessage(
            `Are youre you want to delete this${selected?.length} items`
          )
        : setMessage(`Are youre you want to delete all items`);
    }
  };
  const openDialogDeleteAllSelected = () => {
    setMessage(`Are youre you want to delete all items`);
    setIconDeleteAllDialog(true);
  };

  const confirmMultipleDelete = () => {
    let _data = [...animalData];
    selected.map(async (ad) => {
      _data = _data.filter((t) => t.id !== ad.id);
      await deleteDoc(
        doc(db, `ngoshelters/${auth.currentUser}/trash/${ad.id}`)
      );
    });
    setAnimalData(_data);
    setIconDeleteDialog(false);
  };

  const confirmDeleteAll = () => {
    let _data = [...animalData];
    animalData.map(async (ad) => {
      _data = _data.filter((t) => t.id !== ad.id);
      await deleteDoc(
        doc(db, `ngoshelters/${auth.currentUser}/trash/${ad.id}`)
      );
    });
    setAnimalData(_data);
    setIconDeleteDialog(false);
  };

  useEffect(() => {
    const getpCollection = async () => {
      setAnimalData(await getTrashCollection());
    };
    getpCollection();
  }, []);

  return (
    <ShelterAdminLayout>
      <DeleteDialog
        open={iconDeleteDialog}
        cancel={handleClose}
        message={message}
        confirm={confirmMultipleDelete}
      />
      <DeleteDialog
        open={open}
        cancel={handleClose}
        message={message}
        confirm={handleConfirmDelete}
      />
      <DeleteDialog
        open={iconDeleteAllDialog}
        cancel={handleClose}
        message={message}
        confirm={confirmDeleteAll}
      />

      <Grid item xs>
        <Typography variant="h4" align="center">
          <DeleteIcon color="primary" /> <b>Deleted Animals</b>
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Button onClick={openDialogDeleteSelected}>
            <DeleteIcon color="primary" /> <b>Delete selected</b>
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={openDialogDeleteAllSelected}>
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
