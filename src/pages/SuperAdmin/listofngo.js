import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import global from '../../styles/global';
import SuperAdminLayout from '../../components/superAdminLayout';
import { Typography, Grid, Button, Checkbox } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { deleteAccount, disbleAccount } from '../../firebase/auth';
import { GetAccounts, enableAccount } from './../../firebase/auth';
import DataTable from '../../components/tableWithSort';
import DeleteDialog from './../../components/common/deleteDialog';
import { async } from '@firebase/util';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

export default function ListOfNgo() {
  const [accounts, setAccounts] = useState([]);
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  const handleDialog = (event, rows) => {
    setOpen(true);
    setUserId(rows.row);
    console.log(rows.row.display_name);
    setMessage(`Disable Account`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnable = async (event, rows) => {
    setOpen(false);
    const allAcc = [...accounts];
    const index = allAcc.indexOf(rows.row);
    allAcc[index] = { ...allAcc[index] };
    allAcc[index].isDisable = !allAcc[index].isDisable;
    setAccounts(allAcc);
    console.log(allAcc);
    enableAccount(rows.id);
  };

  const handleDisable = async () => {
    setOpen(false);
    const allAcc = [...accounts];
    const index = allAcc.indexOf(userId);
    allAcc[index] = { ...allAcc[index] };
    allAcc[index].isDisable = !allAcc[index].isDisable;
    console.log(allAcc[index].isDisable);
    setAccounts(allAcc);
    disbleAccount(userId.id);
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
      field: 'Status',
      sortable: false,
      renderCell: (rows) => {
        return !rows.row.isDisable ? (
          <Button
            sx={{ ...global.button2xs }}
            onClick={(event) => {
              handleDialog(event, rows);
            }}
          >
            Disable
          </Button>
        ) : (
          <Button
            sx={{ ...global.button1xs }}
            onClick={(event) => {
              handleEnable(event, rows);
            }}
          >
            Enable
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
      <DeleteDialog
        open={open}
        cancel={handleClose}
        confirm={handleDisable}
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
