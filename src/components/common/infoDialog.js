import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  List,
  ListItemText,
} from '@mui/material';
import React from 'react';
import global from '../../styles/global';

const InfoDialog = ({ open, moreInfo, cancel }) => {
  const styles = {
    itemList: {
      alignItems: 'center',
      marginTop: '10px',
    },
    textLabel: {
      fontWeight: '700',
    },
  };

  const {
    AllFamilyWantAdopt,
    AvailableTime,
    BestWayToContact,
    Birthdate,
    CompleteName,
    ContactNumber,
    DwellingOwnership,
    FullAddress,
    HaveEverAdoptedBefore,
    IfCatCanGetOut,
    IfCatPreparedOdorFeces,
    IfDogHaveYard,
    IfDogPreparedManage,
    IsPetAllowed,
    Location,
    ResponsibleForPet,
    SourceOFIncome,
    TypeOfDwelling,
    WantToTryAdoptOther,
  } = moreInfo || {};

  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          borderRadius: 30,
          width: '500px',
          height: '600px',
          padding: '10px',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          color: '#E94057',
          marginTop: '20px',
        }}
      >
        <Typography sx={{ textAlign: 'center' }} variant="h4">
          Additional Information
        </Typography>
      </DialogTitle>
      <DialogContent>
        <List>
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Complete Name:
              </Typography>
            }
            secondary={<Typography>{CompleteName}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Contact Number :
              </Typography>
            }
            secondary={<Typography>{ContactNumber}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Best Way to Contact :
              </Typography>
            }
            secondary={<Typography>{BestWayToContact}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Location :
              </Typography>
            }
            secondary={<Typography>{Location}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Full Address :
              </Typography>
            }
            secondary={<Typography>{FullAddress}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Birthdate :
              </Typography>
            }
            secondary={<Typography>{Birthdate}</Typography>}
          />

          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Occupation or Source of income :
              </Typography>
            }
            secondary={<Typography>{SourceOFIncome}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Type of Dwelling :
              </Typography>
            }
            secondary={<Typography>{TypeOfDwelling}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Dwelling Ownership :
              </Typography>
            }
            secondary={<Typography>{DwellingOwnership}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Have confirmed that pets are allowed by the owner or the condo
                admin?
              </Typography>
            }
            secondary={<Typography>{IsPetAllowed}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Are all the members of your household supportive of
                adopting/fostering?:
              </Typography>
            }
            secondary={<Typography>{AllFamilyWantAdopt}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Who will be responsible for the pet's care?:
              </Typography>
            }
            secondary={<Typography>{ResponsibleForPet}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Have you ever adopted an animal before? :
              </Typography>
            }
            secondary={<Typography>{HaveEverAdoptedBefore}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Do you have a fenced yard? "n/a" if you're not adopting a dog
              </Typography>
            }
            secondary={<Typography>{IfDogHaveYard}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Are you prepared to manage Chewing, Marking and Excessive
                Barking? "n/a" if you're not adopting a dog
              </Typography>
            }
            secondary={<Typography>{IfDogPreparedManage}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Can your cat get out of the house? "n/a" if you're not adopting
                a cat
              </Typography>
            }
            secondary={<Typography>{IfCatCanGetOut}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Are you prepared for the unpleasant odor of cat feces? "n/a" if
                you're not adopting a cat
              </Typography>
            }
            secondary={<Typography>{IfCatPreparedOdorFeces}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                Can you share your available time? Most of the Shelters are
                doing 1 on 1 interview about adoption.
              </Typography>
            }
            secondary={<Typography>{AvailableTime}</Typography>}
          />
          <ListItemText
            sx={styles.itemList}
            primary={
              <Typography paddingRight={1} sx={styles.textLabel}>
                If the rescue you indicated is no longer available, are you open
                to choosing another rescue?
              </Typography>
            }
            secondary={<Typography>{WantToTryAdoptOther}</Typography>}
          />
        </List>
      </DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Button sx={{ ...global.button2xs }} onClick={cancel}>
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
