import { Paper, Box, Typography, Grid, Button, Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import ShelterAdminLayout from '../../components/shelterAdminLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PetsIcon from '@mui/icons-material/Pets';
export default function AdopptionPage() {
  return (
    <ShelterAdminLayout>
    <Grid item xs>
    <Typography variant="h4" align="center">
    <PetsIcon color="primary"/> <b>Adoption Page</b>
    </Typography>
    </Grid>
    <Grid item xs>
       <Checkbox {...AdopptionPage} />
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
            <TableCell ><b>Name</b></TableCell>
            <TableCell sx={{marginLeft: "10vw"}}><b>Facebook</b></TableCell>
            <TableCell><b>Want to Adopt</b></TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
    </ShelterAdminLayout>
  );
}
