import React, { useState } from 'react';
import global from '../../../styles/global';
import AppBarLayout from '../../../components/appBarLayout';
import {
  Button,
  Typography,
  Box,
  IconButton,
  FormControl,
  OutlinedInput,
  Grid,
  Select,
  MenuItem,
  TextField,
  Paper,
} from '@mui/material';

import ImageIcon from '@mui/icons-material/Image';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useNavigate } from 'react-router-dom';
import { AddSubData } from './../../../firebase/auth';

import CancelIcon from '@mui/icons-material/Cancel';
import { auth } from '../../../firebase/firebase-config';

export default function AddAnimal() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
    age: '',
    gender: '',
    status: '',
    pet_category: 'Custom',
    desc: '',
    image: '',
    shelterID: auth.currentUser?.uid,
  });
  const [images, setImages] = useState([]);
  const [textField, setTextField] = useState(false);

  console.log(inputs);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //Handle AddImages
  const handleImage = (evnt) => {
    const selectedFIles = [];
    const targetFiles = evnt.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setImages(selectedFIles);
  };

  //Do Submit
  const handleSubmit = () => {
    AddSubData(inputs, images);
    console.log(images);
  };

  //Remove Photo in UI
  const handleRemovePhoto = (photo) => {
    setImages(images.filter((p) => p !== photo));
  };

  //Dropdown
  const Custom = () => setTextField(true);

  return (
    <AppBarLayout>
      <Box>
        <Box>
          <Button
            elevation={3}
            variant="outlined"
            color="primary"
            sx={style.button}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosIcon />
          </Button>
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', ...global.textHeader }}
          >
            {'ADD ANIMAL'}
          </Typography>
        </Box>
        <Box
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
            marginTop: '30px',
          }}
        >
          <Grid container>
            <Grid item container spacing={2} direction="column">
              <Grid
                item
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    ...global.addAnimalLabels,
                  }}
                >
                  NAME:
                </Typography>
                <FormControl fullWidth>
                  <OutlinedInput
                    sx={{ ...global.borderRadius20 }}
                    name="name"
                    autoComplete="off"
                    value={inputs.name}
                    onChange={handleChange}
                  />
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
                <Typography sx={{ ...global.addAnimalLabels }}>AGE:</Typography>
                <FormControl fullWidth>
                  <Select
                    sx={{ ...global.borderRadius20 }}
                    name="age"
                    value={inputs.age}
                    onChange={handleChange}
                  >
                    <MenuItem value={'Puppy'}>Puppy</MenuItem>
                    <MenuItem value={'Adult'}>Adult</MenuItem>
                    <MenuItem value={'Senior'}>Senior</MenuItem>
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
                <Typography sx={{ ...global.addAnimalLabels }}>
                  GENDER:
                </Typography>
                <FormControl fullWidth>
                  <Select
                    sx={{ ...global.borderRadius20 }}
                    name="gender"
                    value={inputs.gender}
                    onChange={handleChange}
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
                <Typography sx={{ ...global.addAnimalLabels }}>
                  STATUS:
                </Typography>
                <FormControl fullWidth>
                  <Select
                    sx={{ ...global.borderRadius20 }}
                    name="status"
                    value={inputs.status}
                    onChange={handleChange}
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
                <Typography sx={{ ...global.addAnimalLabels }}>
                  PET CATEGORY:
                </Typography>
                <FormControl fullWidth>
                  {textField ? (
                    <OutlinedInput
                      sx={{ ...global.borderRadius20 }}
                      name="pet_category"
                      value={inputs.pet_category}
                      onChange={handleChange}
                    />
                  ) : (
                    <Select
                      sx={{ ...global.borderRadius20 }}
                      name="pet_category"
                      value={inputs.pet_category}
                      onChange={handleChange}
                    >
                      <MenuItem value={'Dog'}>Dog</MenuItem>
                      <MenuItem value={'Cat'}>Cat</MenuItem>
                      <MenuItem onClick={() => Custom()}>Custom</MenuItem>
                    </Select>
                  )}
                </FormControl>
              </Grid>
              <Grid item>
                <Typography sx={{ ...global.addAnimalLabels }}>
                  DESCRIPTION:
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  sx={{ ...global.borderRadius20 }}
                  name="desc"
                  value={inputs.desc}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button sx={{ ...global.button3 }}>CANCEL</Button>
                <Button
                  sx={{ ...global.button2Small, marginLeft: '20px' }}
                  onClick={handleSubmit}
                >
                  SAVE
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* upload image */}

          <Box sx={{ marginLeft: '20px', flexGrow: '1' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImageIcon color="primary" />
              <Typography
                variant="h6"
                sx={{ marginLeft: '10px', fontWeight: 'bold' }}
              >
                Image
              </Typography>
            </Box>
            <Typography variant="body2">
              Upload an image file, pick one from your media library, or add one
              with a URL.
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{ marginTop: '12px', ...global.button2Small }}
            >
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleImage}
              />
            </Button>

            {/*ADD ANIMAL PHOTOS */}

            <Box>
              <Grid container>
                {images.map((imageURI) => (
                  <Grid item>
                    {console.log(imageURI.index)}

                    <Paper
                      elavation={3}
                      sx={{
                        height: '130px',
                        width: '100px',
                        margin: '10px',
                        position: 'relative',
                      }}
                    >
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: '10px',
                          left: '70px',
                          padding: 0,
                        }}
                        onClick={() => handleRemovePhoto(imageURI)}
                      >
                        <CancelIcon color="primary" />
                      </IconButton>
                      <img
                        style={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
                        src={imageURI}
                        alt={imageURI}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppBarLayout>
  );
}

const style = {
  button: {
    width: '52px',
    height: '52px',
    borderRadius: '10px',
    border: '1px solid #E8E6EA',
    m: 1,
  },
};
