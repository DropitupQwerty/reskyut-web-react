import { db } from './firebase-config';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
} from 'firebase/firestore';

const ngoCollectionRef = collection(db, 'ngoshelters');

export const createAccount = async (
  firstName,
  middleName,
  lastName,
  username,
  password,
  email,
  displayName,
  desc
) => {
  await addDoc(ngoCollectionRef, {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    username: username,
    password: password,
    email: email,
    display_name: displayName,
    desc: desc,
  });
  return;
};

export const deleteAccount = async (id) => {
  const userDoc = doc(db, 'ngoshelters', id);
  await deleteDoc(userDoc);
};
