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

const VITE_FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const VITE_FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const VITE_FIREBASE_PROJECT_ID = "kaiserfinance-288b6"
const VITE_FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const VITE_FIREBASE_MESSAGING_SENDER_ID = import.meta.env
  .VITE_FIREBASE_MESSAGING_SENDER_ID;
const VITE_FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
const VITE_FIREBASE_MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);
const colRef = collection(db, "userName");

const imageDb = getStorage(app);

export { app, auth, db, colRef, imageDb };
