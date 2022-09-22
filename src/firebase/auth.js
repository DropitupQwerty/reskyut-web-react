import { db } from './firebase-config';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore';
import { auth } from './firebase-config';
import { Navigate, useNavigate } from 'react-router-dom';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const ngoCollectionRef = collection(db, 'ngoshelters');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const deleteAccount = async (id) => {
  const userDoc = doc(db, 'ngoshelters', id);
  await deleteDoc(userDoc);
};

export const login = async (loginEmail, loginPassword) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
  } catch (error) {
    console.log(error.message);
  }
};

export function isAuth() {}

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
