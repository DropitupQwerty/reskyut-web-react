//fake api
import React from 'react';
import { Link } from 'react-router-dom';
import global from '../../../styles/global';
import ShelterAdminLayout from '../../../components/shelterAdminLayout';

import { Typography, Grid, Button } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { ListUpdate } from '../../../firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import DataTable from '../../../components/tableWithSort';
import DeleteDialog from '../../../components/common/deleteDialog';
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase-config';
import { deleteDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function AnimalListing() {
  const [animalData, setAnimalData] = useState([]);
  const [isLoading, setIsloading] = useState();
  const [open, setOpen] = useState(false);
  const [animal, setAnimal] = useState();
  const [message, setMessage] = useState();
  const [selectedAnimals, setSelectedAnimals] = useState([]);

  useEffect(() => {
    const getPostList = async () => {
      setIsloading(true);
      const list = await ListUpdate();
      setAnimalData(list);
      setIsloading(false);
    };
    getPostList();
  }, []);

  const handleDialog = (event, rows) => {
    setOpen(true);
    setAnimal(rows);
    setMessage(`Move to trash?`);
  };
  const handleConfirm = async () => {
    const deletedAnimal = animalData.filter((a) => a.id !== animal.id);
    setAnimalData(deletedAnimal);

    await setDoc(
      doc(db, `ngoshelters/${auth.currentUser?.uid}/trash/${animal.id}`),
      {
        ...animal.row,
        dateDeleted: serverTimestamp(),
      }
    ).then(async () => {
      await deleteDoc(doc(db, `pets/${animal.id}`));
      toast.success('Succesfully Deleted');
    });
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'name', headerName: 'Display Name', minWidth: 150 },
    {
      field: 'desc',
      sortable: false,
      headerName: 'Description',
      flex: 1,
      minWidth: 50,
    },
    { field: 'age', sortable: false, headerName: 'Age', width: 150 },
    { field: 'gender', sortable: false, headerName: 'Gender', minWidth: 150 },

    {
      field: 'pet_category',
      sortable: false,
      headerName: 'Pet Category',
      minWidth: 50,
    },
    {
      field: 'status',
      sortable: false,
      headerName: 'Status',
      minWidth: 50,
      renderCell: (rows) => {
        return rows.row.status === 'listed' ? (
          <Typography variant="caption" color="#749F82">
            listed
          </Typography>
        ) : (
          <Typography variant="caption" color="#F2F200">
            unlisted
          </Typography>
        );
      },
    },
    {
      field: 'timestamp',
      headerName: 'Date Added',

      renderCell: (rows) => {
        const time = rows.row.timestamp;
        const date = time.toDate().toDateString();
        return <Typography variant="caption">{date}</Typography>;
      },
      minWidth: 150,
    },
    {
      field: 'Delete Animal',
      headerName: 'Delete Animal',
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button2xs }}
            onClick={(event) => handleDialog(event, rows)}
          >
            Delete
          </Button>
        );
      },
      minWidth: 150,
    },
    {
      field: 'Edit Animal',
      headerName: 'Edit Animal',
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button3xs }}
            component={Link}
            to={`/animallisting/editanimal/${rows.id}`}
          >
            Edit
          </Button>
        );
      },
      minWidth: 150,
    },
  ];

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      animalData.find((row) => row.id === id)
    );
    console.log(selectedRowsData);
    setSelectedAnimals(selectedRowsData);
  };

  const multipleUnlist = () => {
    selectedAnimals.map(async (sa) => {
      console.log(sa.id);
      await updateDoc(doc(db, `pets/${sa.id}`), {
        status: 'unlisted',
      });
    });
  };

  const multipleList = () => {
    selectedAnimals.map(async (sa) => {
      console.log(sa.id);
      await updateDoc(doc(db, `pets/${sa.id}`), {
        status: 'listed',
      });
    });
  };

  return (
    <ShelterAdminLayout>
      <DeleteDialog
        open={open}
        confirm={handleConfirm}
        cancel={handleClose}
        message={message}
      />
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
        <Button onClick={multipleList}>
          <FormatListBulletedIcon color="primary" /> List Pet
        </Button>
        <Button onClick={multipleUnlist}>
          <FormatListBulletedIcon color="primary" /> Unlist Pet
        </Button>
        <Button>
          <DeleteIcon color="primary" />
        </Button>
      </Grid>

      <DataTable
        rows={animalData}
        columns={columns}
        checkboxSelected={onRowsSelectionHandler}
      />
    </ShelterAdminLayout>
  );
}
