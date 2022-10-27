import { db, storage, auth2 } from './firebase-config';
import { auth } from './firebase-config';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  sendPasswordResetEmail,
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
  deleteField,
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
import { toast } from 'react-toastify';
import getMatchedUserInfo from './../lib/getMatchedUserInfo';
import bcrypt from 'bcryptjs';

const { backendURL } = config;

// Login Account
export async function login(loginEmail, loginPassword) {
  await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(async (res) => {
      await getDoc(doc(db, `ngoshelters/${res.user.uid}`)).then((res) => {
        if (res.exists()) {
          res.data().isAdmin
            ? toast.success('Admin Successfully Login')
            : !res.data().isAdmin
            ? res.data().isDisable || res.data().isDelete
              ? toast.warn('Account Disable or Deleted')
              : toast.success('Succesfully Login')
            : toast.warn('Not A valid admin');
        } else {
          toast.warn('User not found');
          logout();
        }
      });
    })
    .catch((error) => {
      toast.warn(error.code);
    });
}

//Create account in asecondary authentication
export const register = async (inputs, image) => {
  const hashedPassword = bcrypt.hashSync(inputs.password, 10);

  return await createUserWithEmailAndPassword(
    auth2,
    inputs.email,
    inputs.password
  )
    .then(() => {
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
                        password: hashedPassword,
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
              password: hashedPassword,
            }).then(() => {
              console.log('dpName', user.displayName);
              toast.success('Ngo Account Created');
              signOut(auth2);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((err) => {
      return err.code;
    });
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
    where('isDelete', '==', false),
    where('isAdmin', '==', false)
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
  if (images.length !== 0) {
    await addDoc(collection(db, `pets`), {
      ...inputs,
      timestamp: serverTimestamp(),
    }).then((docRef) => {
      uploadMultipleImage(images, docRef.id);
    });
  } else if (images.length > 9) {
    toast.error('Maximum of 9 pictures');
  } else {
    toast.error('Please Insert Atleast 1 Picture');
  }
};

//Update List of pets
export const ListUpdate = async () => {
  const q = query(
    collection(db, `pets`),
    where('shelterID', '==', auth.currentUser?.uid),
    where('isAdopted', '==', false)
  );
  const querySnapshot = await getDocs(q);
  const queryData = querySnapshot.docs.map((detail) => ({
    ...detail.data(),
  }));

  return queryData;
};

export const ListAdoptedPet = async () => {
  const q = query(
    collection(db, `pets`),
    where('shelterID', '==', auth.currentUser?.uid),
    where('isAdopted', '==', true)
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
  if (images.length !== 0) {
    await updateDoc(doc(db, `pets/${id}`), {
      ...inputs,
      imageURL: deleteField(),
    }).then((docRef) => {
      uploadMultipleImage(images, id);
    });
  } else {
    await updateDoc(doc(db, `pets/${id}`), {
      ...inputs,
    }).then(() => {
      toast.success('Sucessfully Updated', { autoClose: 2000 });
    });
  }
};

/**This Will manage the application users Request */

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
};

export const updateAccountPassword = async (values, email) => {
  const user = auth.currentUser;

  const hashedPassword = bcrypt.hashSync(values.newPassword, 10);

  const credential = EmailAuthProvider.credential(
    user.email,
    values.currentPassword
  );
  return reauthenticateWithCredential(user, credential)
    .then(() => {
      updatePassword(user, values.newPassword);
      toast.success('Password Updated');
    })
    .then(async () => {
      await updateDoc(doc(db, `ngoshelters/${auth.currentUser.uid}`), {
        password: hashedPassword,
      });
    })
    .catch((error) => {
      toast.warn(error.code);
      return error.code;
    });
};

export const listAdoptor = async (userAccount) => {
  let dataNeed = {};
  const { id, photoURL, displayName, email } = userAccount || {};
  const docRef = doc(db, `users/${id}`);

  const formSnap = await getDoc(doc(docRef, '/form/form'));
  const AdoptionInfo = await getDoc(
    doc(db, `matches/${id}${auth.currentUser?.uid}`)
  );
  const petInfo = await getDoc(
    doc(db, `pets/${AdoptionInfo.data()?.petToAdopt}`)
  );

  if (!petInfo.exists()) {
    dataNeed = {
      photoURL: photoURL,
      isApprovedAdoptor: false,
      isDeclined: true,
      id: id,
      name: displayName,
      facebookURL: formSnap.data()?.BestWayToContact,
      timestamp: AdoptionInfo.data()?.timestamp,
      petToAdopt: 'Deleted',
      petToAdoptId: '',
      email: email,
      score: formSnap.data()?.score,
    };
  } else {
    dataNeed = {
      photoURL: photoURL,
      isApprovedAdoptor: AdoptionInfo.data()?.isApprovedAdoptor,
      isDeclined: AdoptionInfo.data()?.isDeclined,
      id: id,
      timestamp: AdoptionInfo.data()?.adoptionTime,
      name: displayName,
      email: email,
      facebookURL: formSnap.data()?.BestWayToContact,
      petToAdopt: petInfo.data()?.name,
      petToAdoptId: petInfo.data()?.id,
      score: formSnap.data()?.score,
    };
  }

  return dataNeed;
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
  console.log('Update');
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
      toast.success('Successfully Deleted');
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
        await deleteDoc(
          doc(db, `ngoshelters/${auth.currentUser.uid}/trash/${res.data().id}`)
        )
          .then(async () => {
            await deleteDoc(
              doc(
                db,
                `ngoshelters/${rows.row.shelterID}/trash/${res.data().id}`
              )
            );
          })
          .finally(() => {
            toast.success('Animal Restored');
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const sendNotification = async (user, notifMessage) => {
  const doc = await addDoc(collection(db, `users/${user.id}/notifications`), {
    preview: notifMessage,
    time: serverTimestamp(),
    name: auth.currentUser.displayName,
    petName: user?.petToAdopt,
    photoURL: auth.currentUser.photoURL,
    isRead: 'false',
  });
  return doc;
};

export const moveToHistory = async (
  user,
  r,
  isDecline,
  isApprovedAdoptor,
  notifMessage
) => {
  await addDoc(
    collection(db, `ngoshelters/${auth.currentUser.uid}/adoptionhistory`),
    {
      ...user,
      id: r.id,
      cid: user.id,
      isDecline: isDecline,
      isApprovedAdoptor: isApprovedAdoptor,
      preview: notifMessage,
      time: serverTimestamp(),
      photoURL: auth.currentUser.photoURL,
    },
    { merge: true }
  );
};

export const updateMessageField = async (
  user,
  isDeclined,
  isApprovedAdoptor
) => {
  await updateDoc(
    doc(db, `matches/${user.id}${auth.currentUser.uid}`),
    {
      isDeclined: isDeclined,
      isApprovedAdoptor: isApprovedAdoptor,
    },
    { merge: true }
  );
};

export const approveAdoption = async (user, notifMessage) => {
  console.log('user Approve ADdoption', user);
  await movePending(user);
  await sendNotification(user, notifMessage)
    .then(async (r) => {
      moveToHistory(user, r, false, true, notifMessage);
    })
    .then(async () => {
      updateMessageField(user, false, true);
    })
    .catch((error) => {
      console.log(error.code);
    });
  await updateDoc(
    doc(db, `pets/${user?.petToAdoptId}`),
    { isAdopted: true, status: 'unlisted' },
    { merge: true }
  )
    .catch((error) => {
      console.log(error.code);
    })
    .finally(() => {
      toast.success('Sucessfully Approved');
    });
  const q = query(
    collection(db, `matches`),
    where('petToAdopt', '==', user?.petToAdoptId),
    where('isApprovedAdoptor', '==', false),
    where('isDeclined', '==', false)
  );
  await getDocs(q).then((r) => {
    r.docs.map(async (e) => {
      console.log(e.data());
      const u = await listAdoptor(
        getMatchedUserInfo(e.data()?.users, auth.currentUser?.uid)
      );
      console.log('ulist', u);
      updateMessageField(u, true, false);
      const notif = `Adoption is closed. We have already found ${user?.petToAdopt} 's New Parents`;
      sendNotification(u, notif).then(async (r) => {
        moveToHistory(u, r, true, false, notifMessage);
        await deletePending(u);
      });
    });
  });
};

export const declineAdoption = async (user, notifMessage) => {
  console.log(user);
  await deletePending(user);
  await sendNotification(user, notifMessage)
    .then(async (r) => {
      moveToHistory(user, r, true, false, notifMessage);
    })
    .then(async () => {
      updateMessageField(user, true, false);
    })
    .catch((error) => {
      alert(error.code);
    })
    .finally(() => {
      toast.success('Sucessfully Decline');
    });
};

export const movePending = async (user) => {
  console.log(user);

  await getDoc(doc(db, `users/${user.id}/pending/${user.petToAdoptId}`)).then(
    (pendingPet) => {
      console.log(pendingPet.data());
      addDoc(collection(db, `users/${user.id}/adopted`), {
        ...pendingPet.data(),
      });
    }
  );
  await deletePending(user);
};

export const deletePending = async (user) => {
  await deleteDoc(doc(db, `users/${user.id}/pending/${user.petToAdoptId}`));
};

export const uploadMultipleImage = async (images, id) => {
  let i = 0;
  const promises = [];
  const imageURL = [];
  images.map((file) => {
    console.log('loop');
    const sotrageRef = ref(
      storage,
      `animals/${auth.currentUser.uid}/${id}/${i}.jpg`
    );
    const uploadTask = uploadBytesResumable(sotrageRef, file);
    promises.push(uploadTask);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => console.log(error),
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
          imageURL.push();
          console.log('File available at', downloadURLs);
          async function updateDocs() {
            await updateDoc(
              doc(db, `pets`, id),
              {
                id: id,
                imageURL: arrayUnion(downloadURLs),
              },
              { merge: true }
            );
          }
          updateDocs();
        });
      }
    );
    i++;
  });
  Promise.all(promises)
    .then(() => {
      toast.success('Successfully Created');
    })
    .then((err) => console.log(err));
};

export const resetPassword = (loginEmail) => {
  var actionCodeSettings = {
    // After password reset, the user will be give the ability to go back
    // to this page.
    url: 'http://localhost:3000/',
    handleCodeInApp: false,
  };
  sendPasswordResetEmail(auth, loginEmail, actionCodeSettings)
    .then(() => {
      console.log('send');
      toast.success('Please Check your Emails');
    })
    .catch((error) => {
      const errorCode = error.code;
      toast.success(errorCode);
    });
};

export const deleteAndBackup = async (animal) => {
  await setDoc(
    doc(db, `ngoshelters/${auth.currentUser?.uid}/trash/${animal.id}`),
    {
      ...animal,
      dateDeleted: serverTimestamp(),
    }
  ).then(async () => {
    await deleteDoc(doc(db, `pets/${animal.id}`));
    toast.success('Succesfully Deleted');
  });
};
