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
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { Redirect, Link } from 'react-router-dom';

// export const createAccount = async (inputs) => {
//   console.log(inputs);
//   await addDoc(ngoCollectionRef, ...inputs);
// };
const ngoCollectionRef = collection(db, 'ngoshelters');

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
    console.log(auth.currentUser.uid);

    // const userDoc = doc(db, 'ngoshelters', auth.currentUser);
    // console.log(userDoc);
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
