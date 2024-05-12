import { initializeApp } from "firebase/app";
// import {  collection, getDocs, snapshotEqual } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";

// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

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
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);
const colRef = collection(db, "userName");

// const Docs  =  getDocs(colRef)
//   .then((snapshot) =>  {
//     let books = [];
//     //   snapshot.docs.map((doc) =>(books.push({...doc.data, id: doc.id})))
//     //   console.log(books)
//     // })
//    snapshot.docs.map((doc) => {
//       if (doc.data.email === auth.currentUser.email) {
//         // return doc.data.name
//       }
//       console.log(doc.data().email)
//     });

//     // snapshot.docs.forEach((doc) => {
//     //   books.push({ ...doc.data(), id: doc.id });
//     //   console.log(books);
//     // });
//   })
//   .catch((err) => {
//     console.error(err.message);
//   });
// console.log(Docs);

// createUserWithEmailAndPassword(auth, email, password)
// .then((userCredential) => {
//   // Signed up
//   const user = userCredential.user;
//   // ...
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // ..
// });
// console.log(app)

// const [name, setName] = useState([])

// const Docs = getDocs(colRef)
//   .then((snapshot) => {
//     // Filter documents based on email
//     const filteredDocs = snapshot.docs.filter((doc) => {
//       return doc.data().email === auth.currentUser.email;
//     });

//     // Log the filtered documents
//     filteredDocs.forEach((doc) => {
//       const name = doc.data().name;
//       return name;
//     });

//     // Optionally, return the filtered documents if needed
//     // return filteredDocs;
//   })
//   .catch((error) => {
//     console.error("Error getting documents: ", error);
//   });



export { app, auth, db, colRef };
