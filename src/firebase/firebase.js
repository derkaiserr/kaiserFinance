import { initializeApp } from "firebase/app";
// import {  collection, getDocs, snapshotEqual } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { getStorage } from "firebase/storage";

const VITE_SOME_FIREBASE_API_KEY = "AIzaSyAO16xMaMYZCorJtGMRc3Z7bRMu8MC6zo0";
const VITE_SOME_FIREBASE_AUTH_DOMAIN = "kaiserfinance-288b6.firebaseapp.com";
const VITE_SOME_FIREBASE_PROJECT_ID = "kaiserfinance-288b6"
const VITE_SOME_FIREBASE_STORAGE_BUCKET = "kaiserfinance-288b6.appspot.com";
const VITE_SOME_FIREBASE_MESSAGING_SENDER_ID = "139392231715";
const VITE_SOME_FIREBASE_APP_ID = "1:139392231715:web:a681a02beb146e65030496"
const VITE_SOME_FIREBASE_MEASUREMENT_ID = "G-DN35R1GGW5";
const firebaseConfig = {
  apiKey: VITE_SOME_FIREBASE_API_KEY,
  authDomain: VITE_SOME_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_SOME_FIREBASE_PROJECT_ID,
  storageBucket: VITE_SOME_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_SOME_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_SOME_FIREBASE_APP_ID,
  measurementId: VITE_SOME_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);
const colRef = collection(db, "userName");

const imageDb = getStorage(app);

export { app, auth, db, colRef, imageDb };
