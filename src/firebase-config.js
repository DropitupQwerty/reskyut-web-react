// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhVFtxYg0X3DEx4jdzKJDKG8-zzU5Zu08",
  authDomain: "reskyut-fd0bf.firebaseapp.com",
  databaseURL: "https://reskyut-fd0bf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reskyut-fd0bf",
  storageBucket: "reskyut-fd0bf.appspot.com",
  messagingSenderId: "908436192805",
  appId: "1:908436192805:web:2401a3311fb00b1bec09cc",
  measurementId: "G-RLPKZEXCVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();