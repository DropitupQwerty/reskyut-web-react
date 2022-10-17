import { db, storage, auth2 } from './firebase-config';
import { auth } from './firebase-config';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
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
  setDoc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
} from 'firebase/auth';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { arrayUnion } from 'firebase/firestore';
import config from '../services/config.json';
import getMatchedUserInfo from './../lib/getMatchedUserInfo';

import { toast } from 'react-toastify';

const { backendURL } = config;

// Login Account
export async function login(loginEmail, loginPassword) {
  await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((res) => {
      toast.success('Logged In', {
        position: 'bottom-right',
        autoClose: 2000,
      });
    })
    .catch((err) => {
      toast.warn(err.code, {
        position: 'bottom-right',
        autoClose: 2000,
      });
    });
  return false;
}

//Create account in asecondary authentication
export const register = async (inputs, image) => {
  await createUserWithEmailAndPassword(
    auth2,
    inputs.email,
    inputs.password
  ).then(() => {
    console.log('img', image);

    if (image.length !== 0) {
      image.map((file) => {
        const profileRef = ref(
          storage,
          `profiles/${auth2.currentUser.uid}.jpg`
        );
        const uploadTask = uploadBytesResumable(profileRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            alert('image error', error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const user = auth2.currentUser;
              updateProfile(user, {
                displayName: inputs.display_name,
                photoURL: downloadURL,
              })
                .then(async () => {
                  await setDoc(
                    doc(db, `ngoshelters/${auth2.currentUser?.uid}`),
                    {
                      id: user?.uid,
                      ...inputs,
                      photoURL: downloadURL,
                    }
                  ).then(() => {
                    console.log('dpName', user.displayName);
                    console.log('imgUrl', user.photoURL);
                    toast.success('Ngo Account Created');
                    signOut(auth2);
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            });
          }
        );
      });
    } else {
      const user = auth2.currentUser;
      updateProfile(user, {
        displayName: inputs.display_name,
      })
        .then(async () => {
          await setDoc(doc(db, `ngoshelters/${auth2.currentUser?.uid}`), {
            id: user?.uid,
            ...inputs,
          }).then(() => {
            console.log('dpName', user.displayName);
            alert('NGO USER CREATED');
            signOut(auth2);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
  return;
};

//logout user
export const logout = async () => {
  await signOut(auth);
};

//* This will manage the ngo accounts * */

//Get ngo Accounts
export const GetAccounts = async () => {
  const q = query(
    collection(db, `ngoshelters`),
    where('isDelete', '==', false)
  );
  const querySnapshot = await getDocs(q);
  const queryData = querySnapshot.docs.map((detail) => ({
    ...detail.data(),
  }));
  return queryData;
};
export const getNgoCount = async () => {
  const q = query(collection(db, `ngoshelters`), where('isAdmin', '==', false));
  const querySnapshot = await getDocs(q);
  const queryData = querySnapshot.docs.map((detail) => ({
    ...detail.data(),
  }));
  return queryData.length;
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
  const petColl = [];
  const q = query(collection(db, 'pets'));
  await getDocs(q).then((res) => {
    res.docs.map((r) => {
      petColl.push(r.data());
    });
  });
  return petColl;
};

//Adding Pet document to pet Collection
export const AddSubData = async (inputs, images) => {
  const promises = [];
  const imageURL = [];
  if (images.length !== 0) {
    await addDoc(collection(db, `pets`), {
      ...inputs,
      timestamp: serverTimestamp(),
    }).then((docRef) => {
      images.map((file) => {
        console.log('loop');
        const sotrageRef = ref(
          storage,
          `animals/${auth.currentUser.uid}/${docRef.id}/${file.name}`
        );
        const uploadTask = uploadBytesResumable(sotrageRef, file);
        promises.push(uploadTask);
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => console.log(error),
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURLs) => {
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
              }
            );
          }
        );
      });
      Promise.all(promises)
        .then(() => {
          alert('Pet added to databse');
        })
        .then((err) => console.log(err));
    });
  } else if (images.length > 9) {
    alert('Must upload 9 images or less');
  } else {
    alert('Must add a photo');
  }
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
  users.map((userAccount) => listAdoptor(userAccount));
  return users;
};

export const updateAccountInfo = async (inputs, image) => {
  console.log('update Account', inputs);
  const user = auth.currentUser;

  await updateDoc(doc(db, `ngoshelters/${auth.currentUser.uid}`), {
    ...inputs,
  }).then(() => {
    updateProfile(user, {
      displayName: inputs.display_name,
    }).catch((error) => {
      alert(error);
    });
  });

  if ((await image.length) !== 0) {
    image.map((file) => {
      const profileRef = ref(storage, `profiles/${auth.currentUser.uid}.jpg`);
      const uploadTask = uploadBytesResumable(profileRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          alert('image error', error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const user = auth.currentUser;
            updateProfile(user, {
              displayName: inputs.display_name,
              photoURL: downloadURL,
            })
              .then(async () => {
                await setDoc(doc(db, `ngoshelters/${user.uid}`), {
                  id: user?.uid,
                  ...inputs,
                  photoURL: downloadURL,
                });

                signOut(auth2);
              })
              .catch((error) => {
                // An error occurred
                // ...
              });
          });
        }
      );
    });
  }
  return;
};

export const updateAccountPassword = async (values, email) => {
  console.log(values);
  try {
    if (values.confirmPassword === values.newPassword) {
      const user = auth.currentUser;

      const credential = EmailAuthProvider.credential(
        user.email,
        values.currentPassword
      );
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, values.newPassword);
          toast.success('Password Updated');
        })
        .catch((error) => {
          toast.warn(error.code);
        });
    }
  } catch (error) {
    toast.error(error.code);
  }
};

export const listAdoptor = async (userAccount) => {
  const { id } = userAccount;
  const docRef = doc(db, `users/${id}`);
  const userSnap = await getDoc(docRef);
  const formSnap = await getDoc(doc(docRef, '/form/form'));
  await getDoc(doc(db, `matches/${id}${auth.currentUser?.uid}`)).then(
    async (res) => {
      console.log(res.data().petToAdopt);
      await getDoc(doc(db, `pets/${res.data()?.petToAdopt}`))
        .then(async (petSnap) => {
          console.log(petSnap.data());
          await setDoc(
            doc(db, `ngoshelters/${auth.currentUser?.uid}/adoptionlist/${id}`),
            {
              id: id,
              name: userAccount?.displayName,
              facebookURL: formSnap.data()?.BestWayToContact,
              petToAdopt: petSnap.data()?.name,
              score: userSnap.data()?.score,
            }
          );
        })
        .catch((error) => {
          console.log('Pet Delete By Admin', error);
        });
    }
  );
};

export const disableAccount = async (rows) => {
  const q = query(collection(db, 'pets'));

  await updateDoc(doc(db, `ngoshelters/${rows}`), {
    isDisable: true,
  }).then(async () => {
    await getDocs(q, where('shelterID', '==', rows)).then((res) => {
      res.docs.map(async (r) => {
        await updateDoc(doc(db, `pets/${r.data().id}`), {
          status: 'unlisted',
        });
      });
    });
  });
};
export const enableAccount = async (rows) => {
  await updateDoc(doc(db, `ngoshelters/${rows}`), {
    isDisable: false,
  });
};

export const getTrashCollection = async () => {
  const petColl = [];
  const q = query(collection(db, `ngoshelters/${auth.currentUser?.uid}/trash`));
  await getDocs(q).then((res) => {
    res.docs.map((r) => {
      petColl.push(r.data());
    });
  });
  return petColl;
};

export const moveToTrash = async (rows) => {
  await setDoc(
    doc(db, `ngoshelters/${auth.currentUser.uid}/trash/${rows.id}`),
    {
      ...rows.row,
      adminDelete: true,
    }
  )
    .then(() => {
      setDoc(doc(db, `ngoshelters/${rows.row.shelterID}/trash/${rows.id}`), {
        ...rows.row,
        adminDelete: true,
      });
    })
    .then(async () => {
      await deleteDoc(doc(db, `pets/${rows.row.id}`), {
        ...rows.row,
      });
    })
    .catch((error) => console.log(error));
};

export const restoreAnimal = async (rows) => {
  await setDoc(doc(db, `pets`, `${rows.id}`), {
    ...rows.row,
    adminDelete: false,
  })
    .then(async () => {
      await getDoc(
        doc(db, `ngoshelters/${auth.currentUser?.uid}/trash/${rows.id}`)
      ).then(async (res) => {
        console.log(res.data().id);
        await deleteDoc(
          doc(db, `ngoshelters/${auth.currentUser.uid}/trash/${res.data().id}`)
        )
          .then(async () => {
            console.log(res.data());
            await deleteDoc(
              doc(
                db,
                `ngoshelters/${rows.row.shelterID}/trash/${res.data().id}`
              )
            );
          })
          .then(() => {
            alert('Animal Restored');
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
