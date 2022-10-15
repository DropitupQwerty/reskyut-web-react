import React, { useEffect, useState } from 'react';
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
  Box,
} from '@mui/material';
import global from '../../styles/global';

import ShelterAdminLayout from '../../components/shelterAdminLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import PetsIcon from '@mui/icons-material/Pets';
import { getUsersInfo } from './../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/tableWithSort';
import { getDocs, collection, query } from 'firebase/firestore';
import { auth, db } from './../../firebase/firebase-config';

export default function AdoptionPage() {
  const navigate = useNavigate();
  const [adoptionRow, setAdoptionRow] = useState([]);

  const handleClick = (event, rows) => {
    navigate(`/message/${rows.id}/${auth.currentUser?.uid}`);
  };
  const handleDecline = (event, rows) => {
    console.log(rows.id);
    const deleteAccount = adoptionRow.filter((a) => a.id !== rows.id);
    setAdoptionRow(deleteAccount);
  };
  const handleApprove = (userAccountsId) => {};

  const columns = [
    { field: 'name', headerName: 'Display Name', minWidth: 150 },
    { field: 'facebookURL', headerName: 'facebook', minWidth: 150 },
    { field: 'petToAdopt', headerName: 'Wants To adopt', minWidth: 150 },
    { field: 'score', headerName: 'Score', minWidth: 50 },

    {
      field: 'Delete',
      headerName: 'Delete',
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button2xs }}
            onClick={(event) => {
              handleDecline(event, rows);
            }}
          >
            DELETE
          </Button>
        );
      },
      minWidth: 150,
    },
    {
      field: 'Approve',
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button1xs }}
            onClick={(event) => {
              handleClick(event, rows);
            }}
          >
            APPROVE
          </Button>
        );
      },
      minWidth: 150,
    },
    {
      field: 'View',
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button3xs }}
            onClick={(event) => {
              handleClick(event, rows);
            }}
          >
            VIEW
          </Button>
        );
      },
      minWidth: 150,
    },
  ];
  const getAcc = async () => {
    await getUsersInfo();
  };

  useEffect(() => {
    const getRow = async () => {
      const q = query(
        collection(db, `ngoshelters/${auth.currentUser?.uid}/adoptionlist`)
      );
      const acc = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        acc.push(doc.data());
      });
      setAdoptionRow(acc);
    };

    getRow();
    console.log(adoptionRow);
  }, []);

  return (
    <ShelterAdminLayout>
      <Grid item xs>
        <Typography variant="h4" align="center">
          <PetsIcon color="primary" /> <b>Adoption Page</b>
        </Typography>
      </Grid>
      <Grid item xs>
        <Button onClick={() => navigate('/adoptionpage')}>
          <RefreshIcon color="primary" />
        </Button>
        <Button>
          <DeleteIcon color="primary" />
        </Button>
      </Grid>

      <DataTable rows={adoptionRow} columns={columns} />

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell sx={{ marginLeft: '10vw' }}>
                <b>Facebook</b>
              </TableCell>
              <TableCell>
                <b>Want to Adopt</b>
              </TableCell>
              <TableCell>
                <b>Score</b>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>
                  <Loader isLoading={isLoading} height={30} width={30} />
                </TableCell>
              </TableRow>
            ) : (
              showDataTable()
            )}
          </TableBody>
        </Table>
      </TableContainer> */}
    </ShelterAdminLayout>
  );
}
