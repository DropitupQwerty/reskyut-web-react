import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Link } from '@mui/material';
import global from '../../styles/global';

import ShelterAdminLayout from '../../components/shelterAdminLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/tableWithSort';
import { getDocs, collection, query, doc, getDoc } from 'firebase/firestore';
import { auth, db } from './../../firebase/firebase-config';
import { async } from '@firebase/util';
import InfoDialog from '../../components/common/infoDialog';

export default function AdoptionPage() {
  const navigate = useNavigate();
  const [adoptionRow, setAdoptionRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [moreInfo, setMoreInfo] = useState();

  const handleClick = (event, rows) => {
    navigate(`/message/${rows.id}/${auth.currentUser?.uid}`);
  };
  const handleDecline = (event, rows) => {
    console.log(rows.id);
    const deleteAccount = adoptionRow.filter((a) => a.id !== rows.id);
    setAdoptionRow(deleteAccount);
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
              handleDecline(event, rows);
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

  useEffect(() => {
    const getRow = async () => {
      const q = query(
        collection(db, `ngoshelters/${auth.currentUser?.uid}/adoptionlist`)
      );
      const acc = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        acc.push(doc.data());
      });
      setAdoptionRow(acc);
    };
    getRow();
    console.log(adoptionRow);
  }, []);

  return (
    <ShelterAdminLayout>
      <InfoDialog moreInfo={moreInfo} open={open} cancel={handleClose} />
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

      <DataTable rows={adoptionRow} columns={columns} />
    </ShelterAdminLayout>
  );
}
