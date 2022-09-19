import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';

const docRef = doc(db, 'ngoshelters');
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log('Document data:', docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log('No such document!');
}
