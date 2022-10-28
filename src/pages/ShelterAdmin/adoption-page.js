import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Link, Box, Badge } from '@mui/material';
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
  getDocs,
} from 'firebase/firestore';
import { auth, db } from './../../firebase/firebase-config';
import InfoDialog from '../../components/common/infoDialog';
import DeclineDialog from '../../components/common/declineDialog';
import {
  approveAdoption,
  declineAdoption,
  listAdoptor,
  moveToHistory,
} from '../../firebase/auth';
import getMatchedUserInfo from '../../lib/getMatchedUserInfo';
import ApproveDialog from '../../components/common/approveDialog';
import { sendNotification, updateMessageField } from './../../firebase/auth';
import { async } from '@firebase/util';

export default function AdoptionPage() {
  const navigate = useNavigate();
  const [adoptionRow, setAdoptionRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [decline, setDecline] = useState(false);
  const [user, setUser] = useState();
  const [moreInfo, setMoreInfo] = useState();
  const [notifMessage, setNotifMessage] = useState();
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [clicked, setClicked] = useState();

  const a = sessionStorage.getItem('notifcount');

  const handleClick = (event, rows) => {
    updateDoc(doc(db, `matches/${rows.id}${auth.currentUser?.uid}`), {
      isNotifRead: true,
    });

    navigate(`/message/${rows.id}/${auth.currentUser?.uid}`);
  };

  const handleDeclineDialog = (event, rows) => {
    console.log(rows.id);
    setUser(rows.row);
    setNotifMessage(
      `Adoption is closed. Sorry this pet is no longer available`
    );
    setDecline(true);
  };

  const handleInfoDialog = async (event, rows) => {
    setOpen(true);
    setUser(rows.row);
    console.log(rows.row);
    await getDoc(doc(db, `users/${rows.id}/form/form`)).then((res) => {
      setMoreInfo(res.data());
    });
  };

  const handleApproveDialog = async (event, rows) => {
    setNotifMessage(
      `Congratulation you are the chosen adoptor for this pet ${rows.row.petToAdopt} please proceed to the ngo shelter `
    );
    setOpenApproveDialog(true);
    setUser(rows.row);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenApproveDialog(false);
  };

  const handleCancelDecline = (e) => {
    e.preventDefault();
    setNotifMessage('');
    setDecline(false);
  };

  const confirmApprove = async () => {
    approveAdoption(user, notifMessage);
    setOpenApproveDialog(false);
    const approvedAccount = adoptionRow.filter((a) => a.id !== user.id);
    setAdoptionRow(approvedAccount);
  };

  const handleSendDecline = async (e) => {
    e.preventDefault();
    declineAdoption(user, notifMessage);
    const deleteAccount = adoptionRow.filter((a) => a.id !== user.id);
    setAdoptionRow(deleteAccount);
    setDecline(false);
    setNotifMessage('');
  };

  const handleChange = (e) => {
    setNotifMessage(e);
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      adoptionRow.find((row) => row.id === id)
    );
    console.log(selectedRowsData);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Display Name',
      minWidth: 150,
      flex: 1,
      renderCell: (rows) => {
        return !rows?.row?.isNotifRead ? (
          <Box sx={{ display: 'absolute' }}>
            <Typography variant="caption">{rows?.row?.name}</Typography>
            <Badge
              color="primary"
              variant="dot"
              invisible={a == 0}
              sx={{ left: '20px' }}
            />
          </Box>
        ) : (
          <Typography variant="caption">{rows?.row?.name}</Typography>
        );
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'timestamp',
      headerName: 'Date',
      flex: 1,
      renderCell: (rows) => {
        const time = rows.row?.timestamp;
        const date = time?.toDate().toDateString();
        return <Typography variant="caption">{date}</Typography>;
      },
    },
    { field: 'petToAdopt', headerName: 'Wants To adopt', minWidth: 150 },
    {
      field: 'score',
      headerName: 'Score',
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
      headerName: 'Decline',
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

  useEffect(() => {
    const docRef = collection(db, 'matches');
    const q = query(
      docRef,
      where('usersMatched', 'array-contains', auth.currentUser?.uid),
      where('isDeclined', '==', false),
      where('isApprovedAdoptor', '==', false)
    );

    onSnapshot(q, (querySnapshot) => {
      const userInfos = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
      }));
      let users = [];
      userInfos.map(async (a) => {
        const u = await listAdoptor(
          getMatchedUserInfo(a?.users, auth.currentUser?.uid)
        );
        users.push(u);
        const asd = [...users];
        setAdoptionRow(asd);
      });
      // const n = [...users];
    });
  }, [clicked]);

  return (
    <ShelterAdminLayout>
      <ApproveDialog
        open={openApproveDialog}
        cancel={handleClose}
        user={user?.name}
        confirm={confirmApprove}
      />
      <InfoDialog moreInfo={moreInfo} open={open} cancel={handleClose} />
      <DeclineDialog
        open={decline}
        confirm={handleSendDecline}
        onChange={handleChange}
        value={notifMessage}
        cancel={handleCancelDecline}
        user={user}
      />
      <Grid item xs>
        <Typography variant="h4" align="center">
          <PetsIcon color="primary" /> <b>Adoption Page</b>
        </Typography>
      </Grid>
      <Box sx={{ marginTop: '50px', display: 'relative' }}>
        <DataTable
          rows={adoptionRow}
          checkboxSelected={onRowsSelectionHandler}
          checkBox={false}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: 'time', sort: 'desc' }],
            },
          }}
        />
      </Box>
    </ShelterAdminLayout>
  );
}
