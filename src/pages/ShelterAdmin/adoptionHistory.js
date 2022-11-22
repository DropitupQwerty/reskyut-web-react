import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Link, Box } from '@mui/material';
import global from '../../styles/global';

import ShelterAdminLayout from '../../components/shelterAdminLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/tableWithSort';
import { getDocs, collection, query, doc, getDoc } from 'firebase/firestore';
import { auth, db } from './../../firebase/firebase-config';
import HistoryIcon from '@mui/icons-material/History';
import DeleteDialog from './../../components/common/deleteDialog';
import InfoDialog from '../../components/common/infoDialog';

export default function AdoptionHistory() {
  const navigate = useNavigate();
  const [adoptionRow, setAdoptionRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [moreInfo, setMoreInfo] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selected, setSelected] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState();

  const handleInfoDialog = async (event, rows) => {
    setOpen(true);
    await getDoc(doc(db, `users/${rows.row.cid}/form/form`)).then((res) => {
      setMoreInfo(res.data());
    });
    console.log(rows.row);
  };
  const handleCloseInfoDialog = async (event, rows) => {
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
    {
      field: 'time',
      headerName: 'Date',
      flex: 1,
      renderCell: (rows) => {
        const time = rows.row.time;
        const date = time.toDate().toDateString();
        return <Typography variant="caption">{date}</Typography>;
      },
    },
    { field: 'petToAdopt', headerName: 'Wants To adopt', minWidth: 150 },
    {
      field: 'isDecline',
      headerName: 'Adoption Status',
      minWidth: 150,
      renderCell: (rows) => {
        return !rows.row.isDeclined && rows.row.isApprovedAdoptor ? (
          <Typography color="#749F82" variant="caption">
            Accepted Adoptor
          </Typography>
        ) : (
          <Typography color="primary" variant="caption">
            Declined Adoptor
          </Typography>
        );
      },
    },
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
      field: 'View',
      sortable: false,
      renderCell: (rows) => {
        return (
          <Button
            sx={{ ...global.button3xs }}
            onClick={(event) => {
              navigate(`/message/${rows.row.cid}/${auth.currentUser.uid}`);
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
        collection(db, `ngoshelters/${auth.currentUser?.uid}/adoptionhistory`)
      );
      const acc = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        acc.push(doc.data());
      });
      setAdoptionRow(acc);
    };
    getRow();
  }, []);

  const handleDeleteDialog = () => {
    const c = selected.length;
    setOpenDeleteDialog(true);
    setDeleteMessage(
      `Are you sure you want to the ${c} items in your history?`
    );
  };

  ///Get all selected in checkbox
  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      adoptionRow.find((row) => row.id === id)
    );
    setSelected(selectedRowsData);
  };
  const handleConfirmDelete = () => {
    setOpenDeleteDialog(false);

    const item = adoptionRow.filter((a) => a.id !== selected.id);
    setAdoptionRow(item);
  };

  return (
    <ShelterAdminLayout>
      <InfoDialog
        open={open}
        cancel={handleCloseInfoDialog}
        moreInfo={moreInfo}
      />
      <DeleteDialog
        open={openDeleteDialog}
        message={deleteMessage}
        confirm={handleConfirmDelete}
      />
      <Grid item xs>
        <Typography variant="h4" align="center">
          <HistoryIcon color="primary" /> <b>Adoption History</b>
        </Typography>
      </Grid>
      <Box sx={{ marginTop: '50px' }}>
        <DataTable
          rows={adoptionRow}
          checkboxSelected={onRowsSelectionHandler}
          columns={columns}
          checkBox={false}
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
