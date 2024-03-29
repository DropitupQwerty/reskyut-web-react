import React, { useEffect, useState } from 'react';
import global from '../../styles/global';
import AppBarAdminLayout from '../../components/appBarAdminLayout';

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

import { Link, useParams, useNavigate } from 'react-router-dom';
import { getAnimalProfile, moveToTrash } from './../../firebase/auth';
import DeleteDialog from './../../components/common/deleteDialog';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './../../firebase/firebase-config';

export default function ViewAnimal() {
  const { id } = useParams();
  const [trash, setTrash] = useState();
  const [message, setMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setOpen(true);
    setMessage('Confirm Deletion');
  };
  const handeleConfirm = async () => {
    // await deleteDoc(doc(db, `pets/${id}`));
    moveToTrash(inputs);
    setOpen(false);
    navigate(-1);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getAnimalPro = async () => {
      const animalProfile = await getAnimalProfile(id);
      setInputs({ ...animalProfile });
      setImages([...animalProfile.imageURL]);
      //Check the Images if a Valid URL
    };
    getAnimalPro();
  }, []);

  console.log(inputs);

  const inputsCom = [
    {
      value: inputs.name,
      label: 'Name',
    },
    {
      value: inputs.age,
      label: 'Age',
    },
    {
      value: inputs.gender,
      label: 'Gender',
    },
    {
      value: inputs.status,
      label: 'Status',
    },
    {
      value: inputs.pet_category,
      label: 'Pet Category',
    },
  ];

  return (
    <AppBarAdminLayout>
      <DeleteDialog
        open={open}
        message={message}
        confirm={handeleConfirm}
        cancel={handleClose}
      />
      <Box>
        <Box>
          <Button
            elevation={3}
            variant="outlined"
            color="primary"
            sx={style.button}
            component={Link}
            to="/admin/post-of-animal-rescue-shelter"
          >
            <ArrowBackIosIcon />
          </Button>
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', ...global.textHeader }}
          >
            {'VIEW ANIMAL'}
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
              {inputsCom.map((i) => {
                return (
                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography sx={{ ...global.addAnimalLabels }}>
                      {i.label}
                    </Typography>
                    <FormControl fullWidth>
                      <OutlinedInput
                        sx={{ borderRadius: '20px' }}
                        value={i.value}
                        readOnly="true"
                      />
                    </FormControl>
                  </Grid>
                );
              })}

              <Grid item>
                <Typography sx={{ marginRight: '12px', fontWeight: 'bold' }}>
                  DESCRIPTION:
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  defaultValue={inputs.desc}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={handleDelete}
                  sx={{ ...global.button2, marginLeft: '20px' }}
                >
                  DELETE
                </Button>
              </Grid>
            </Grid>
          </Grid>
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

            <Box marginTop={2}>
              <Grid container>
                {images.map((imageURI) => {
                  console.log(imageURI);
                  return (
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
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppBarAdminLayout>
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
