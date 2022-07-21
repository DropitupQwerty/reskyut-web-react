import {
  Button,
  Typography,
  Box,
  IconButton,
  FormControl,
  OutlinedInput,
  Input,
  Grid,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import React from 'react';

import global from '../../styles/global';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import AppBarLayout from '../../components/appBarLayout';

export default function AddAnimal() {
  const [gender, setGender] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [category, setCategory] = React.useState('');

  const style = {
    button: {
      width: '52px',
      height: '52px',
      borderRadius: '10px',
      border: '1px solid #E8E6EA',
      m: 1,
    },
  };

  const genderHandleChange = (event) => {
    setGender(event.target.value);
  };
  const statusHandleChange = (event) => {
    setStatus(event.target.value);
  };
  const categoryHandleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <AppBarLayout>
      <Box>
        <Box>
          <Button
            elevation={3}
            variant="outlined"
            color="primary"
            sx={style.button}
            component={Link}
            to="/animallisting "
            selected={window.location.pathname.includes('/animallisting')}
          >
            <ArrowBackIosIcon />
          </Button>
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', ...global.textHeader }}
          >
            ADD ANIMAL
          </Typography>
        </Box>

        <Grid
          container
          spacing={2}
          direction="column"
          sx={{ marginTop: '30px' }}
        >
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ marginRight: '12px', fontWeight: 'bold' }}>
              NAME:
            </Typography>
            <FormControl fullWidth>
              <OutlinedInput sx={{ borderRadius: '20px' }} />
            </FormControl>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ marginRight: '12px', fontWeight: 'bold' }}>
              AGE:
            </Typography>
            <FormControl fullWidth>
              <OutlinedInput sx={{ borderRadius: '20px' }} />
            </FormControl>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ marginRight: '12px', fontWeight: 'bold' }}>
              GENDER:
            </Typography>
            <FormControl fullWidth>
              <Select
                value={gender}
                onChange={genderHandleChange}
                sx={{ borderRadius: '20px' }}
              >
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ marginRight: '12px', fontWeight: 'bold' }}>
              STATUS:
            </Typography>
            <FormControl fullWidth>
              <Select
                value={status}
                onChange={statusHandleChange}
                sx={{ borderRadius: '20px' }}
              >
                <MenuItem value={'unlisted'}>Unlisted</MenuItem>
                <MenuItem value={'listed'}>Listed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ marginRight: '12px', fontWeight: 'bold' }}>
              PET CATEGORY:
            </Typography>
            <FormControl fullWidth>
              <Select
                value={category}
                onChange={categoryHandleChange}
                sx={{ borderRadius: '20px' }}
              >
                <MenuItem value={'Dog'}>Dog</MenuItem>
                <MenuItem value={'Cat'}>Cat</MenuItem>
                <MenuItem value={'Dinosaur'}>Dinosaur</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography sx={{ marginRight: '12px', fontWeight: 'bold' }}>
              DESCRIPTION:
            </Typography>
            <TextField multiline rows={3} fullWidth />
          </Grid>
        </Grid>
      </Box>
    </AppBarLayout>
  );
}
