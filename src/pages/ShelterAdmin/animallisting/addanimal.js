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

import logoReskyut from '../../../../src/assets/logoReskyut.webp';
import ImageIcon from '@mui/icons-material/Image';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { Link, useNavigate } from 'react-router-dom';
import IsLoggedIn, {
  AddSubData,
  listUpdate,
  updateList,
} from './../../../firebase/auth';
import Input from './../../../components/common/input';

import { auth, storage } from './../../../firebase/firebase-config';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';
import CancelIcon from '@mui/icons-material/Cancel';
export default function AddAnimal() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    age: '',
    gender: '',
    status: '',
    pet_category: '',
    desc: '',
    image: '',
  });
  const [images, setImages] = useState([]);

  console.log(inputs);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //handle addImages
  const handleImage = (evnt) => {
    const selectedFIles = [];
    const targetFiles = evnt.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setImages(selectedFIles);
  };

  const handleSubmit = () => {
    //Submit all image and inputs to collection ngoshelters/

    console.log(images);
  };

  //Remove photo in UI
  const handleRemovePhoto = (photo) => {
    setImages(images.filter((p) => p !== photo));
  };

  if (IsLoggedIn().loggedIn) {
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
                  <Typography sx={{ ...global.addAnimalLabels }}>
                    AGE:
                  </Typography>
                  <FormControl fullWidth>
                    <OutlinedInput
                      sx={{ ...global.borderRadius20 }}
                      name="age"
                      value={inputs.age}
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
                    <Select
                      sx={{ ...global.borderRadius20 }}
                      name="pet_category"
                      value={inputs.pet_category}
                      onChange={handleChange}
                    >
                      <MenuItem value={'Dog'}>Dog</MenuItem>
                      <MenuItem value={'Cat'}>Cat</MenuItem>
                      <MenuItem value={'Others'}>others</MenuItem>
                    </Select>
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
                Upload an image file, pick one from your media library, or add
                one with a URL.
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
              <Box marginTop={2}>
                <Grid container>
                  {images.map((imageURI) => (
                    <Grid item>
                      {console.log(imageURI.index)}
                      <IconButton onClick={() => handleRemovePhoto(imageURI)}>
                        <CancelIcon
                          color="primary"
                          sx={{
                            position: 'absolute',
                            top: '30px',
                            left: '80px',
                          }}
                        />
                      </IconButton>
                      <Paper
                        elavation={3}
                        sx={{ height: '130px', width: '100px', margin: '10px' }}
                      >
                        <img
                          style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            borderRadius: '10px',
                          }}
                          className="photo-uploaded"
                          src={imageURI}
                          alt="Photo uploaded"
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
  } else {
    navigate('/');
  }
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
