import { db } from './firebase-config';
import { auth } from './firebase-config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const ngoCollectionRef = collection(db, 'ngoshelters');

export default function IsLoggedIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  // console.log(user);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }

      setUser(currentUser);
      console.log(currentUser);
    });
  }, []);

  return loggedIn;
}

export function NavUser() {
  const navigate = useNavigate();
  if (IsLoggedIn()) {
    navigate(`${auth.currentUser?.uid}/dashboard`);
  } else {
    navigate(`/`);
  }
}

export const deleteAccount = async (id) => {
  const userDoc = doc(db, 'ngoshelters', id);
  await deleteDoc(userDoc);
};

export const login = async (loginEmail, loginPassword) => {
  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  } catch (error) {
    console.log(error.message);
  }
};

export const register = async (inputs) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      inputs.email,
      inputs.password
    );
    await setDoc(doc(ngoCollectionRef, auth.currentUser.uid), {
      ...inputs,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async () => {
  await signOut(auth);
};
