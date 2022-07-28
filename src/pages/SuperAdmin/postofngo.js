import SuperAdminLayout from '../../components/superAdminLayout';

import React from 'react';
import { Box} from '@mui/system';
import { Paper, Typography, Grid, Button, Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import LayersIcon from '@mui/icons-material/Layers';
import ListOfNGO from './listofngo';

export default function PostOfNGO() {
  return (
  <SuperAdminLayout>
    <Grid item xs>
    <Typography variant="h4" align="center">
    <LayersIcon color="primary"/> <b>Post of NGO</b>
    </Typography>
    </Grid>
    <Grid item xs>
       <Checkbox {...ListOfNGO} />
        <Button>
          <RefreshIcon color="primary"/>
        </Button>
        <Button>
         <DeleteIcon color="primary" />
        </Button>
      </Grid>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell ><b>NGO Name</b></TableCell>
            <TableCell sx={{marginLeft: "10vw"}}><b>Pet Name</b></TableCell>
            <TableCell ><b>Age</b></TableCell>
            <TableCell><b>Gender</b></TableCell>
            <TableCell><b>Description</b></TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  </SuperAdminLayout>
  );
}
