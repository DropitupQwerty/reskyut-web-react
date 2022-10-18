import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Link } from '@mui/material';
import global from '../../styles/global';

import ShelterAdminLayout from '../../components/shelterAdminLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/tableWithSort';
import {
  getDocs,
  collection,
  query,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
  deleteDoc,
  setDoc,
  where,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from './../../firebase/firebase-config';
import { async } from '@firebase/util';
import InfoDialog from '../../components/common/infoDialog';
import DeclineDialog from '../../components/common/declineDialog';
import { toast } from 'react-toastify';
import { getUsersInfo } from '../../firebase/auth';

export default function AdoptionPage() {
  const navigate = useNavigate();
  const [adoptionRow, setAdoptionRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [decline, setDecline] = useState(false);
  const [declineUser, setDeclineUser] = useState();
  const [moreInfo, setMoreInfo] = useState();
  const [declinedMessage, setDeclinedMessage] = useState();

  const handleClick = (event, rows) => {
    navigate(`/message/${rows.id}/${auth.currentUser?.uid}`);
  };

  const handleDeclineDialog = (event, rows) => {
    console.log(rows.id);
    setDeclineUser(rows.row);
    setDeclinedMessage(
      'Than you for adopting ngunit hindi iaw ang napili . pagpasend syahan mo na ha salamat'
    );
    setDecline(true);
  };

  const handleInfoDialog = async (event, rows) => {
    setOpen(true);

    await getDoc(doc(db, `users/${rows.id}/form/form`)).then((res) => {
      setMoreInfo(res.data());
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'name', headerName: 'Display Name', minWidth: 150 },
    {
      field: 'facebookURL',
      headerName: 'Contacts',
      flex: 1,
      renderCell: (params) => (
        <Link href={params.row.facebookURL} target="_blank">
          {params.row.facebookURL}
        </Link>
      ),
    },
    { field: 'petToAdopt', headerName: 'Wants To adopt', minWidth: 150 },
    {
      field: 'score',
      headerName: 'Score',
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button2xsyellow }}
            onClick={(event) => {
              handleInfoDialog(event, rows);
            }}
          >
            {rows.row.score}
          </Button>
        );
      },
      minWidth: 150,
    },

    {
      field: 'Delete',
      headerName: 'Delete',
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button2xs }}
            onClick={(event) => {
              handleDeclineDialog(event, rows);
            }}
          >
            DECLINE
          </Button>
        );
      },
      width: 150,
    },
    {
      field: 'Approve',
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button1xs }}
            onClick={(event) => {
              handleClick(event, rows);
            }}
          >
            APPROVE
          </Button>
        );
      },
      width: 150,
    },

    {
      field: 'View',
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button3xs }}
            onClick={(event) => {
              handleClick(event, rows);
            }}
          >
            VIEW
          </Button>
        );
      },
      width: 150,
    },
  ];

  const handleSendDecline = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `users/${declineUser.id}/notifications`), {
      preview: declinedMessage,
      time: serverTimestamp(),
      name: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
    })
      .then(async () => {
        await addDoc(
          collection(db, `ngoshelters/${auth.currentUser.uid}/adoptionhistory`),
          {
            ...declineUser,
            isDecline: true,
            preview: declinedMessage,
            time: serverTimestamp(),
            photoURL: auth.currentUser.photoURL,
          }
        );
      })
      .then(async () => {
        await updateDoc(
          doc(db, `matches/${declineUser.id}${auth.currentUser.uid}`),
          {
            isDeclined: true,
          },
          { merge: true }
        );
      })
      .then(async () => {
        // await deleteDoc(
        //   doc(
        //     db,
        //     `ngoshelters/${auth.currentUser.uid}/adoptionlist/${declineUser.id}`
        //   )
        // );
      })
      .catch((error) => {
        toast.warn(error.code);
      });

    // .then(async () => {
    //   await getDoc(doc(db, `pets/${declineUser.petToAdopt.id}`)).then(
    //     async (res) => {
    //       await setDoc(
    //         doc(db, `ngoshelters/${auth.currentUser.uid}/adoptedanimals/${declineUser.petToAdopt.id}`),{
    //           ...res.data()
    //         }
    //       );
    //     }
    //   );
    // })

    const deleteAccount = adoptionRow.filter((a) => a.id !== declineUser.id);
    setAdoptionRow(deleteAccount);

    setDecline(false);
    setDeclinedMessage('');
  };

  const handleChange = (e) => {
    setDeclinedMessage(e);
  };

  // useEffect(() => {
  //   const getRow = async () => {
  //     await getUsersInfo();
  //     const q = query(
  //       collection(db, `ngoshelters/${auth.currentUser?.uid}/adoptionlist`),
  //       where('isDeclined', '==', false)
  //     );
  //     const acc = [];
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       acc.push(doc.data());
  //     });
  //     setAdoptionRow(acc);
  //   };
  //   getRow();
  // }, []);

  useEffect(() => {
    const q = query(
      collection(db, `ngoshelters/${auth.currentUser?.uid}/adoptionlist`),
      where('isDeclined', '==', false)
    );
    onSnapshot(q, (querySnapshot) => {
      const acc = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        uid: detail.id,
      }));
      setAdoptionRow(acc);
    });
  }, []);

  ///Get all selected in checkbox
  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      adoptionRow.find((row) => row.id === id)
    );
    console.log(selectedRowsData);
  };

  const handleCancelDecline = (e) => {
    e.preventDefault();
    setDeclinedMessage('');
    setDecline(false);
  };

  return (
    <ShelterAdminLayout>
      <InfoDialog moreInfo={moreInfo} open={open} cancel={handleClose} />
      <DeclineDialog
        open={decline}
        confirm={handleSendDecline}
        onChange={handleChange}
        value={declinedMessage}
        cancel={handleCancelDecline}
        user={declineUser}
      />
      <Grid item xs>
        <Typography variant="h4" align="center">
          <PetsIcon color="primary" /> <b>Adoption Page</b>
        </Typography>
      </Grid>
      <Grid item xs>
        <Button onClick={() => navigate('/adoptionpage')}>
          <RefreshIcon color="primary" />
        </Button>
        <Button>
          <DeleteIcon color="primary" />
        </Button>
      </Grid>

      <DataTable
        rows={adoptionRow}
        checkboxSelected={onRowsSelectionHandler}
        columns={columns}
      />
    </ShelterAdminLayout>
  );
}
