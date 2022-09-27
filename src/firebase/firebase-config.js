import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDhVFtxYg0X3DEx4jdzKJDKG8-zzU5Zu08',
  authDomain: 'reskyut-fd0bf.firebaseapp.com',
  databaseURL:
    'https://reskyut-fd0bf-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'reskyut-fd0bf',
  storageBucket: 'reskyut-fd0bf.appspot.com',
  messagingSenderId: '908436192805',
  appId: '1:908436192805:web:2401a3311fb00b1bec09cc',
  measurementId: 'G-RLPKZEXCVQ',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage(app);
