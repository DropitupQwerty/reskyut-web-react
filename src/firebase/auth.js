import { db } from './firebase-config';
import { auth } from './firebase-config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  addDoc,
  query,
  getDocs,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';


export const deleteAccount = async (id) => {
  const userDoc = doc(db, 'ngoshelters', id);
  await deleteDoc(userDoc);
};

export async function login(loginEmail, loginPassword) {
  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  } catch (error) {
    alert(error.message);
  }
}

// Register to authentication and Add documents to Adoptors collection and ngoShelter collection
export const register = async (inputs) => {
  try {
    axios.post('http://localhost:5000/api/admin/', inputs);
  } catch (err) {
    console.log('message', err.message);
  }
};

export const logout = async () => {
  await signOut(auth);
};

//Add data to document subcollection

export const AddSubData = async (inputs, images) => {
  const docRef = await addDoc(collection(db, `pets`), {
    ...inputs,
    timestamp: serverTimestamp(),
  });
  console.log(docRef.id);
  alert('Success');
};

//Update List

export const ListUpdate = async () => {
  const q = query(
    collection(db, `pets`),
    where('shelterID', '==', auth.currentUser?.uid)
  );

  const querySnapshot = await getDocs(q);
  const queryData = querySnapshot.docs.map((detail) => ({
    ...detail.data(),
  }));

  console.log(queryData);

  return queryData;
};

//Get Subcollection
export const GetSubCollection = async () => {
  const q = query(collection(db, `adoptors`));
  const querySnapshot = await getDocs(q);

  const queryData = querySnapshot.docs.map((detail) => ({
    uid: detail.id,
  }));

  console.log(queryData);
  return queryData;
};

//Get ngo Accounts
export const GetAccounts = async () => {
  const q = query(collection(db, `ngoshelters`), where('isAdmin', '==', false));
  const querySnapshot = await getDocs(q);

  const queryData = querySnapshot.docs.map((detail) => ({
    ...detail.data(),
    uid: detail.id,
  }));
  return queryData;
};

export default function IsLoggedIn() {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const CurrentUser = async () => {
          if (currentUser?.uid) {
            const docRef = doc(db, 'ngoshelters', auth.currentUser?.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setUser({
                ...user,
                user: currentUser,
                loggedIn: true,
                userData: docSnap.data(),
              });
            }
            return user;
          }
        };
        CurrentUser();
      } else {
        setUser({ loggedIn: false });
      }
    });
  }, []);

  return user;
}
