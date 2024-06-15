import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAO16xMaMYZCorJtGMRc3Z7bRMu8MC6zo0",
  authDomain: "kaiserfinance-288b6.firebaseapp.com",
  projectId: "kaiserfinance-288b6",
  storageBucket: "kaiserfinance-288b6.appspot.com",
  messagingSenderId: "139392231715",
  appId: "1:139392231715:web:a681a02beb146e65030496",
  measurementId: "G-DN35R1GGW5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const colRef = collection(db, "userName");

const imageDb = getStorage(app);

export { app, auth, db, colRef, imageDb };
