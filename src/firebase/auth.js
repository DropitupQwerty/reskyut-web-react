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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { arrayUnion } from 'firebase/firestore';
import config from '../services/config.json';
import getMatchedUserInfo from './../lib/getMatchedUserInfo';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';

const { backendURL } = config;

// Login Account
export async function login(loginEmail, loginPassword) {
  await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((res) => {
      console.log('login', res);
    })
    .catch((err) => {
      alert(err.message);
    });
  return false;
}

// Register to authentication and Add documents to Adoptors collection and ngoShelter collection
export const register = async (inputs) => {
  try {
    axios.post(backendURL + '/admin', inputs);
  } catch (err) {
    console.log('message', err.message);
  }
};

//logout user
export const logout = async () => {
  await signOut(auth);
};

//* This will manage the ngo accounts * */

//Get ngo Accounts
export const GetAccounts = async () => {
  const response = await axios.get(`${backendURL}/admin`);
  return response.data;
};

//Delete ngo Accounts
export const deleteAccount = async (id) => {
  //Delete user Auth
  axios.post(`${backendURL}/admin/${id}`);

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

//Get
export const getUser = async () => {
  const docRef = doc(db, `ngoshelters/${auth.currentUser?.uid}`);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

//Set the user if logged in
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

/**This is for managing collection of pets */

//Get All pets Collection
export const getPetsCollection = async () => {
  const petCollection = await axios
    .get(`${backendURL}/animals`)
    .catch((error) => {
      console.log(error);
    });
  return petCollection.data;
};

//Adding Pet document to pet Collection
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

//Update List of pets
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

//Get Animal Profile
export const getAnimalProfile = async (id) => {
  const docRef = doc(db, `pets/${id}`);
  const petSnap = await getDoc(docRef);
  return petSnap.data();
};

//Update Animal Profile
export const updateAnimalProfile = async (id, inputs, images) => {
  const promises = [];
  const docRef = doc(db, `pets/${id}`);
  await updateDoc(docRef, {
    ...inputs,
    timestamp: serverTimestamp(),
  }).then(() => {
    images.map((file) => {
      console.log('auth', file);
      const sotrageRef = ref(storage, `${id}/${file.name}`);
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
            console.log('File available at', downloadURLs);
            async function updateDocs() {
              await updateDoc(
                docRef,
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

/**This Will manage the application users Request */

//Getting the users information
export const getUsersInfo = async () => {
  const users = [];
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
  if (userInfos) {
    for (let i = 0; i < userInfos.length; i++) {
      users.push(getMatchedUserInfo(userInfos[i].users, auth.currentUser?.uid));
    }
  }
  return users;
};

export const Adoption = (userAccount) => {
  const [rowData, setRowData] = useState({
    facebookURL: '',
    petToAdopt: '',
    score: '',
  });

  const { id } = userAccount;

  useEffect(() => {
    const getInfo = async () => {
      //Getting the value for table
      const docRef = doc(db, `users/${id}`);
      const userSnap = await getDoc(docRef);
      const formSnap = await getDoc(doc(docRef, '/form/form'));
      await getDoc(doc(db, `matches/${id}${auth.currentUser?.uid}`)).then(
        (res) => {
          const getPet = async () => {
            const petSnap = await getDoc(
              doc(db, `pets/${res.data()?.petToAdopt}`)
            );
            setRowData({
              ...rowData,
              name: userAccount?.name,
              facebookURL: formSnap.data()?.BestWayToContact,
              petToAdopt: petSnap.data()?.name,
              score: userSnap.data()?.score,
            });
          };
          getPet();
        }
      );
    };
    getInfo();
  }, [userAccount.id]);
  return rowData;
};
