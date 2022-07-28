import SuperAdminLayout from '../../components/superAdminLayout';

import React from 'react';
import { Box} from '@mui/system';
import { Paper, Typography, Grid, Button, Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
export default function ListOfNGO() {
  return (
  <SuperAdminLayout>
    <Grid item xs>
    <Typography variant="h4" align="center">
    <ApartmentIcon color="primary"/> <b>List of NGO</b>
    </Typography>
    </Grid>
    <Grid item xs>
       <Checkbox {...ListOfNGO} />
        <Button>
          <RefreshIcon color="primary"/>
        </Button>
        <Button>
         <PersonRemoveIcon color="primary" />
        </Button>
      </Grid>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell ><b>Name</b></TableCell>
            <TableCell sx={{marginLeft: "10vw"}}><b>Email</b></TableCell>
            <TableCell><b>Display Name</b></TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  </SuperAdminLayout>
  );
}
