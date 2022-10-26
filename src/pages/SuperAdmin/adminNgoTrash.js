import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import global from '../../styles/global';
import SuperAdminLayout from '../../components/superAdminLayout';
import { Typography, Grid, Button, Checkbox } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import DataTable from '../../components/tableWithSort';
import DeleteDialog from './../../components/common/deleteDialog';
import {
  getDocs,
  query,
  collection,
  deleteDoc,
  doc,
  where,
  updateDoc,
} from 'firebase/firestore';
import { auth } from '../../firebase/firebase-config';
import { db } from './../../firebase/firebase-config';
import { toast } from 'react-toastify';

export default function AdminNgoTrash() {
  const [accounts, setAccounts] = useState([]);
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  const handleDialog = (event, rows) => {
    setOpen(true);
    setUserId(rows.row);
    console.log(rows.row.display_name);
    setMessage(`Delete this account permanently?`);
  };

  const handleRestore = async (event, rows) => {
    const deletedAccount = accounts.filter((a) => a.id !== rows.id);
    setAccounts(deletedAccount);

    console.log(rows.row);
    await updateDoc(doc(db, `ngoshelters/${rows.id}`), {
      ...rows.row,
      isDelete: false,
    })
      .then(() => {
        toast.success('NGO Admin Succesfully Restored!');
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = async () => {
    await deleteDoc(
      doc(`ngoshelters/${auth.currentUser.uid}/accountstrash/${userId.id}`)
    ).then(() => {
      toast.success('Deleted succesfully');
    });
  };

  const columns = [
    { field: 'firstName', headerName: 'Name', minWidth: 150 },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    { field: 'display_name', headerName: 'Display Name', minWidth: 150 },
    {
      field: 'isAdmin',
      headerName: 'Role',
      minWidth: 150,
      renderCell: (rows) => {
        return rows.row.isAdmin ? (
          <Typography color="primary" variant="caption">
            Super Admin
          </Typography>
        ) : (
          <Typography color="secondary" variant="caption">
            Ngo Admin
          </Typography>
        );
      },
    },

    {
      field: 'Delete',
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
      width: 150,
    },
    {
      field: 'Restore',
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button1xs }}
            onClick={(event) => handleRestore(event, rows)}
          >
            Restore
          </Button>
        );
      },
      width: 150,
    },
  ];

  useEffect(() => {
    const allAccounts = async () => {
      const accountsTrashCollection = [];
      const q = query(
        collection(db, `ngoshelters`),
        where('isDelete', '==', true)
      );
      await getDocs(q).then((res) => {
        res.docs.map((r) => {
          accountsTrashCollection.push(r.data());
        });
      });
      setAccounts(accountsTrashCollection);
    };
    allAccounts();
  }, []);
  console.log(accounts);

  return (
    <SuperAdminLayout>
      <DeleteDialog
        open={open}
        cancel={handleClose}
        confirm={confirmDelete}
        message={message}
      />
      ;
      <Grid item xs>
        <Typography variant="h4" align="center">
          <PersonRemoveIcon color="primary" /> <b>Deleted NGO Accounts</b>
        </Typography>
      </Grid>
      <Grid item xs>
        <Button>
          <RefreshIcon color="primary" />
        </Button>
        <Button>
          <PersonRemoveIcon color="primary" />
        </Button>
      </Grid>
      <DataTable rows={accounts} columns={columns} />
    </SuperAdminLayout>
  );
}
