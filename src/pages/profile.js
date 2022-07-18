import {
  Avatar,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import ShelterAdminLayout from '../components/shelterAdminLayout';
import { deepOrange } from '@mui/material/colors';
import { Box } from '@mui/system';

export default function Profile() {
  return (
    <ShelterAdminLayout>
      <Box>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ width: '100vw', marginTop: '20px' }}
          spacing={2}
        >
          <Avatar
            sx={{ bgcolor: deepOrange[500], height: '200px', width: '200px' }}
          ></Avatar>
        </Stack>
        <Box id="Form Container">
          <FormControl sx={{ m: 1, width: '300px' }}>
            <Typography sx={{ fontWeight: 'bold' }}> Firstname</Typography>

            <TextField inputProps={{ readOnly: true }} />
          </FormControl>
          <FormControl sx={{ m: 1, width: '300px' }}>
            <Typography sx={{ fontWeight: 'bold' }}> Middle</Typography>

            <TextField inputProps={{ readOnly: true }} />
          </FormControl>
          <FormControl sx={{ m: 1, width: '300px' }}>
            <Typography sx={{ fontWeight: 'bold' }}> LastName</Typography>

            <TextField inputProps={{ readOnly: true }} />
          </FormControl>

          <FormControl sx={{ m: 1, width: '300px' }}>
            <Typography sx={{ fontWeight: 'bold' }}> Username</Typography>

            <TextField inputProps={{ readOnly: true }} />
          </FormControl>
          <FormControl sx={{ m: 1, width: '300px' }}>
            <Typography sx={{ fontWeight: 'bold' }}> Email</Typography>

            <TextField inputProps={{ readOnly: true }} />
          </FormControl>
          <FormControl sx={{ m: 1, width: '300px' }}>
            <Typography sx={{ fontWeight: 'bold' }}> Display Name </Typography>

            <TextField inputProps={{ readOnly: true }} />
          </FormControl>
        </Box>
      </Box>
    </ShelterAdminLayout>
  );
}
