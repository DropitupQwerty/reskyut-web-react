import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import global from '../styles/global';

export default function AdoptionRow({ userAccount, decline }) {
  const navigate = useNavigate();

  return (
    <TableRow key={userAccount.id}>
      <TableCell>{userAccount.displayName}</TableCell>
      <TableCell>
        <Link href={userAccount.fbLink} target="_blank">
          {userAccount.fbLink}
        </Link>
      </TableCell>
      <TableCell></TableCell>
      <TableCell>Points</TableCell>
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
          onClick={() =>
            navigate(`/message/${userAccount.id}/${auth.currentUser?.uid}`)
          }
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
