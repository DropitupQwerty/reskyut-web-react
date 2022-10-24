import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import global from '../../styles/global';
import SuperAdminLayout from '../../components/superAdminLayout';
import { Typography, Grid, Button } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
  GetAccounts,
  enableAccount,
  disableAccount,
} from './../../firebase/auth';
import DataTable from '../../components/tableWithSort';
import DeleteDialog from './../../components/common/deleteDialog';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './../../firebase/firebase-config';
import { toast } from 'react-toastify';
import DisableDialog from './../../components/common/disableDialog';
import { async } from '@firebase/util';

export default function ListOfNgo() {
  const [accounts, setAccounts] = useState([]);
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [disable, setDisable] = useState(false);

  const handleDialog = (event, rows) => {
    setOpen(true);
    setUserId(rows.row);
    console.log(rows.row.display_name);
    setMessage(`Delete this account?`);
  };

  const handleClose = () => {
    setOpen(false);
    setDisable(false);
  };

  const handleStatus = async (event, rows) => {
    setUserId(rows.row);
    setDisable(true);
    !rows.row.isDisable
      ? setMessage('Enable this Account?')
      : setMessage('Disable this Account');
  };

  const handleDeleteAccount = async () => {
    const deleteAccount = accounts.filter((a) => a.id !== userId.id);
    setAccounts(deleteAccount);
    setOpen(false);
    disableAccount(userId.id);
    await updateDoc(
      doc(db, `ngoshelters/${userId.id}`),
      {
        ...userId,
        isDelete: true,
      },
      { merge: true }
    )
      .then(() => {
        toast.warn('Account Added to Account Trash', { icon: false });
      })
      .catch((error) => {
        toast.warn(error.code);
      });
  };

  const handleDisableAccount = async () => {
    const allAcc = [...accounts];
    const index = allAcc.indexOf(userId);
    allAcc[index] = { ...allAcc[index] };
    allAcc[index].isDisable = !allAcc[index].isDisable;
    setAccounts(allAcc);
    console.log(userId.isDisable);
    userId.isDisable ? enableAccount(userId.id) : disableAccount(userId.id);

    setDisable(false);
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
          <Typography color="#749F82" variant="caption">
            Ngo Admin
          </Typography>
        );
      },
    },
    {
      field: 'Status',
      sortable: false,
      renderCell: (rows) => {
        return rows.row.isDisable ? (
          <Button
            sx={{ ...global.button2xsyellow }}
            onClick={(event) => {
              handleStatus(event, rows);
            }}
          >
            Disabled
          </Button>
        ) : (
          <Button
            sx={{ ...global.button1xs }}
            onClick={(event) => {
              handleStatus(event, rows);
            }}
          >
            Enabled
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
            to={`/admin/listofngo/viewngo/${rows.id}`}
          >
            View
          </Button>
        );
      },
      width: 150,
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
  ];

  useEffect(() => {
    const allAccounts = async () => {
      const acc = await GetAccounts();
      setAccounts(acc);
      console.log(acc);
    };
    allAccounts();
  }, []);

  return (
    <SuperAdminLayout>
      <DisableDialog
        open={disable}
        cancel={handleClose}
        confirm={handleDisableAccount}
        message={message}
      />
      <DeleteDialog
        open={open}
        cancel={handleClose}
        confirm={handleDeleteAccount}
        message={message}
      />
      ;
      <Grid item xs>
        <Typography variant="h4" align="center">
          <ApartmentIcon color="primary" /> <b>List of NGO</b>
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
