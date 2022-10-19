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
  collection,
  query,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
  where,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from './../../firebase/firebase-config';
import { async } from '@firebase/util';
import InfoDialog from '../../components/common/infoDialog';
import DeclineDialog from '../../components/common/declineDialog';
import { toast } from 'react-toastify';
import { getUsersInfo, listAdoptor } from '../../firebase/auth';
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import ApproveDialog from '../../components/common/approveDialog';

export default function AdoptionPage() {
  const navigate = useNavigate();
  const [adoptionRow, setAdoptionRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [decline, setDecline] = useState(false);
  const [user, setUser] = useState();
  const [moreInfo, setMoreInfo] = useState();
  const [declinedMessage, setDeclinedMessage] = useState();
  const [a, setA] = useState([]);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);

  const handleClick = (event, rows) => {
    navigate(`/message/${rows.id}/${auth.currentUser?.uid}`);
  };

  const handleDeclineDialog = (event, rows) => {
    console.log(rows.id);
    setUser(rows.row);
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

  const handleApproveDialog = async (event, rows) => {
    setOpenApproveDialog(true);
    setUser(rows.row);
    console.log('approve', user);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenApproveDialog(false);
  };

  const handleSendDecline = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `users/${user.id}/notifications`), {
      preview: declinedMessage,
      time: serverTimestamp(),
      name: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
    })
      .then(async (r) => {
        await addDoc(
          collection(db, `ngoshelters/${auth.currentUser.uid}/adoptionhistory`),
          {
            ...user,
            id: r.id,
            cid: user.id,
            isDecline: true,
            preview: declinedMessage,
            time: serverTimestamp(),
            photoURL: auth.currentUser.photoURL,
          },
          { merge: true }
        );
      })
      .then(async () => {
        await updateDoc(
          doc(db, `matches/${user.id}${auth.currentUser.uid}`),
          {
            isDeclined: true,
          },
          { merge: true }
        );
      });

    const deleteAccount = adoptionRow.filter((a) => a.id !== user.id);
    setAdoptionRow(deleteAccount);

    setDecline(false);
    setDeclinedMessage('');
  };

  const handleChange = (e) => {
    setDeclinedMessage(e);
  };

  useEffect(() => {
    const users = [];
    const docRef = collection(db, 'matches');
    const q = query(
      docRef,
      where('usersMatched', 'array-contains', auth.currentUser?.uid),
      where('isDeclined', '==', false)
    );

    onSnapshot(q, (querySnapshot) => {
      const userInfos = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
      }));

      userInfos.map(async (a) => {
        users.push(
          await listAdoptor(getMatchedUserInfo(a.users, auth.currentUser?.uid))
        );
        setAdoptionRow(users);
      });
    });
  }, []);

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
              handleApproveDialog(event, rows);
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

  return (
    <ShelterAdminLayout>
      <ApproveDialog open={openApproveDialog} cancel={handleClose} />
      <InfoDialog moreInfo={moreInfo} open={open} cancel={handleClose} />
      <DeclineDialog
        open={decline}
        confirm={handleSendDecline}
        onChange={handleChange}
        value={declinedMessage}
        cancel={handleCancelDecline}
        user={user}
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
