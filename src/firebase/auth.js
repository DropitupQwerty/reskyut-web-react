import { db, storage } from './firebase-config';
import { auth } from './firebase-config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  addDoc,
  query,
  getDocs,
  serverTimestamp,
  where,
  updateDoc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { arrayUnion } from 'firebase/firestore';
import backendURL from '../services/config.json';
import getMatchedUserInfo from './../lib/getMatchedUserInfo';

export const apiEnpoint = backendURL;

export const deleteAccount = async (id) => {
  //Delete user Auth
  axios.post(`${apiEnpoint}/api/admin/${id}`);

  //Delete user Doc
  const userDoc = doc(db, 'ngoshelters', id);
  await deleteDoc(userDoc);

  //delete  pets with thesame shelterID
  const q = query(collection(db, `pets`), where('shelterID', '==', id));
  const querySnapshot = await getDocs(q);
  querySnapshot.map((snap) => {
    deleteDoc(snap);
  });
};

// Login Account
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
    axios.post(apiEnpoint + '/api/admin', inputs);
  } catch (err) {
    console.log('message', err.message);
  }
};

export const logout = async () => {
  await signOut(auth);
};

//Add data to document subcollection
export const AddSubData = async (inputs, images) => {
  const promises = [];
  const imageURL = [];

  await addDoc(collection(db, `pets`), {
    ...inputs,
    timestamp: serverTimestamp(),
  }).then((docRef) => {
    images.map((file) => {
      console.log('loop');

      const sotrageRef = ref(storage, `${docRef.id}/${file.name}`);

      const uploadTask = uploadBytesResumable(sotrageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
            imageURL.push();
            console.log('File available at', downloadURLs);
            async function updateDocs() {
              await updateDoc(
                doc(db, `pets`, docRef.id),
                {
                  id: docRef.id,
                  imageURL: arrayUnion(downloadURLs),
                },
                { merge: true }
              );
            }
            updateDocs();
          });
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        alert('Pet added to databse');
      })
      .then((err) => console.log(err));
  });
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

//getUSerinfo
export const getUserInfo = async () => {
  const userss = [];
  const docRef = collection(db, 'matches');
  const q = query(
    docRef,
    where('usersMatched', 'array-contains', auth.currentUser?.uid)
  );
  const querySnapshot = await getDocs(q);
  const userInfos = querySnapshot.docs.map((detail) => ({
    ...detail.data(),
    uid: detail.id,
  }));
  console.log('auth userInfos', userInfos);

  return userInfos;
};

//Messages
export const getMessages = (userInfo) => {
  const userss = [];

  for (let i = 0; i < userInfo.length; i++) {
    userss.push(getMatchedUserInfo(userInfo[i].users, auth.currentUser?.uid));
  }

  return userss;
};

//Gett Messages and Account info
export const UseBoth = () => {
  const [userInfo, setUserInfo] = useState('');
  const [acc, setAcc] = useState([]);
  useEffect(() => {
    const getMessages = async () => {
      setUserInfo(await getUserInfo());
    };

    getMessages();
  }, []);
  useEffect(() => {
    setAcc(getMessages(userInfo));
  }, [userInfo]);

  return acc;
};
