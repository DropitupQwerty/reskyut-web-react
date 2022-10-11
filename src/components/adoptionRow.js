import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../firebase/firebase-config';
import { Adoption } from './../firebase/auth';

import { Button, TableCell, TableRow } from '@mui/material';
import global from '../styles/global';

export default function AdoptionRow({ userAccount, decline }) {
  const navigate = useNavigate();
  const dataRow = Adoption(userAccount);

  const { displayName, id } = userAccount;
  const { facebookURL, petToAdopt, score } = dataRow;

  return (
    <TableRow key={userAccount.id}>
      <TableCell>{displayName}</TableCell>
      <TableCell>
        <Link href={facebookURL} target="_blank">
          {facebookURL}
        </Link>
      </TableCell>
      <TableCell>{petToAdopt}</TableCell>
      <TableCell>{score}</TableCell>
      <TableCell>
        <Button
          sx={{ ...global.button2xs }}
          onClick={() => decline(userAccount)}
        >
          Decline
        </Button>
      </TableCell>
      <TableCell>
        <Button sx={{ ...global.button1xs }}>Approve</Button>
      </TableCell>

      <TableCell>
        <Button
          sx={{ ...global.button3xs }}
          onClick={() => navigate(`/message/${id}/${auth.currentUser?.uid}`)}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
