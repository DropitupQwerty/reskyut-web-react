import React from 'react';
import { Link } from 'react-router-dom';
import global from '../../styles/global';
import ShelterAdminLayout from '../../components/shelterAdminLayout';
import {
  Paper,
  Box,
  Typography,
  Grid,
  Button,
  Checkbox,
  IconButton,
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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData('Name', 'Age, Gender', 'Pet Category', 'Description')];
export default function AnimalListing() {
  return (
    <ShelterAdminLayout>
      <Grid item xs>
        <Typography variant="h4" align="center">
          <ReceiptLongIcon color="primary" /> <b>Animal Listing</b>
        </Typography>
      </Grid>
      <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {' '}
        <Button
          variant="contained"
          color="primary"
          sx={{
            ...global.button2Small,
          }}
          component={Link}
          to="/animallisting/addanimal"
          selected={window.location.pathname.includes(
            '/animallisting/addanimal'
          )}
        >
          <Typography>
            <b> + New Animal</b>
          </Typography>
        </Button>
      </Grid>

      <Grid item xs>
        <Checkbox {...AnimalListing} />
        <Button>
          <RefreshIcon color="primary" />
        </Button>
        <Button>
          <DeleteIcon color="primary" />
        </Button>
      </Grid>
      <TableContainer component={Paper}>
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
              <TableCell sx={{ marginRight: '10vw' }}>
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </ShelterAdminLayout>
  );
}
