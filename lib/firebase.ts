import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAY0YUYEAW-e4luf-rydfcZLwn2L0rAwOA",
  authDomain: "fitnesswebsite-36735.firebaseapp.com",
  projectId: "fitnesswebsite-36735",
  storageBucket: "fitnesswebsite-36735.firebasestorage.app",
  messagingSenderId: "215392257218",
  appId: "1:215392257218:web:151b855fcdfd0c84b1675b",
  measurementId: "G-HWBN13P3DZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);