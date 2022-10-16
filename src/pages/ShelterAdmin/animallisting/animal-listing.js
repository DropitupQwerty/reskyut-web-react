//fake api
import React from 'react';
import { Link } from 'react-router-dom';
import global from '../../../styles/global';
import ShelterAdminLayout from '../../../components/shelterAdminLayout';

import {
  Paper,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { ListUpdate } from '../../../firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from './../../../components/common/loader';
import { Box } from '@mui/material';
import DataTable from '../../../components/tableWithSort';

export default function AnimalListing() {
  const [animalData, setAnimalData] = useState([]);
  const [isLoading, setIsloading] = useState();

  useEffect(() => {
    const getPostList = async () => {
      setIsloading(true);
      const list = await ListUpdate();
      setAnimalData(list);
      setIsloading(false);
    };
    getPostList();
  }, []);
  console.log(animalData);

  const columns = [
    { field: 'name', headerName: 'Display Name', minWidth: 150 },
    { field: 'age', sortable: false, headerName: 'Age', width: 150 },
    { field: 'gender', sortable: false, headerName: 'Gender', minWidth: 150 },
    {
      field: 'pet_category',
      sortable: false,
      headerName: 'Pet Category',
      minWidth: 50,
    },
    { field: 'status', sortable: false, headerName: 'Status', minWidth: 50 },
    {
      field: 'desc',
      sortable: false,
      headerName: 'Description',
      flex: 1,
      minWidth: 50,
    },

    {
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button2xs }}
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

  return (
    <ShelterAdminLayout>
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
                <b>Name</b>
              </TableCell>
              <TableCell sx={{ marginLeft: '10vw' }}>
                <b>Age</b>
              </TableCell>
              <TableCell>
                <b>Gender</b>
              </TableCell>
              <TableCell>
                <b>Pet Category</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
              <TableCell align="center">
                <b>Status</b>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <Box>
                <TableRow>
                  <TableCell>
                    <Loader isLoading={isLoading} height={30} width={30} />
                  </TableCell>
                </TableRow>
              </Box>
            ) : (
              showDataTable()
            )}
          </TableBody>
        </Table>
      </TableContainer> */}
    </ShelterAdminLayout>
  );
}
