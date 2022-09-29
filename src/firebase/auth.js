import { db, storage } from './firebase-config';
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
  onSnapshot,
  addDoc,
  query,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { async } from '@firebase/util';
import { Snackbar } from '@mui/material';
import AddAnimal from './../pages/ShelterAdmin/animallisting/editanimal';
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const ngoCollectionRef = collection(db, 'ngoshelters');

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

export const register = async (inputs) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      inputs.email,
      inputs.password
    );
    await setDoc(doc(ngoCollectionRef, auth.currentUser?.uid), {
      ...inputs,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async () => {
  await signOut(auth);
};

export default function IsLoggedIn() {
  const [user, setUser] = useState({
    // user: null,
    // loggedIn: '',
    // isAdmin: '',
  });

  //

  ///

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
                isAdmin: docSnap.data().isAdmin,
              });
            } else {
              console.log('No such document!');
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

// fetching firestore data
export const GetData = async () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      if (auth.currentUser?.uid) {
        const docRef = doc(db, 'ngoshelters', auth.currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };
    fetch();
  }, [IsLoggedIn().loggedIn]);

  return data;
};

//Add data to document subcollection

export const AddSubData = async (inputs, images) => {
  const docRef = await addDoc(
    collection(db, `ngoshelters/${auth.currentUser?.uid}/pets`),
    {
      ...inputs,
      timestamp: serverTimestamp(),
    }
  );
  console.log(docRef.id);
  alert('Success');
};

//Update List
export const listUpdate = async () => {
  const q = query(collection(db, `ngoshelters/${auth.currentUser?.uid}/pets`));
  const querySnapshot = await getDocs(q);
  const queryData = querySnapshot.docs.map((detail) => ({
    ...detail.data(),
    id: detail.id,
  }));
  console.log(queryData);
  return queryData;
};
