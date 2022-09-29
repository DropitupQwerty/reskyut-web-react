import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './../../../firebase/firebase-config';

export default function AdoptPet() {
  const [inputs, setInputs] = useState({
    pet_adopted: 'saipa',
    userId: 'Erickson',
  });

  const handlePetAdopt = async () => {
    const docRef = await addDoc(
      collection(
        db,
        `adoptors/
      HWQ1OGcuyyd4aR0Q5l4rh67MQcq2/${inputs.userId}`
      ),
      {
        ...inputs,
        timestamp: serverTimestamp(),
      }
    );
  };

  return (
    <Box>
      <Button onClick={handlePetAdopt}>Swiped</Button>
    </Box>
  );
}
