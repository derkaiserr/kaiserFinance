import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, snapshotEqual } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


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
    measurementId: "G-DN35R1GGW5"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  const db = getFirestore()
  const colRef = collection(db, "userName")

  getDocs(colRef)
  .then((snapshot) => {
    let books = []
  //   snapshot.docs.map((doc) =>(books.push({...doc.data, id: doc.id})))
  //   console.log(books)
  // })
  snapshot.docs.forEach((doc) => {books.push({...doc.data, id: doc.id})
    console.log(books)
})})
  .catch((err) => {
    console.error(err.message)
  })

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


  export {app, auth}