import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../hooks/context/authContext/authContext.jsx";
import { app, auth } from "./firebase.js";
// import { AuthProvider } from "../../hooks/context/authContext/authContext.js";

export const Register = async (email, password) => {
  // const { error, manageError } = useContext(AuthContext);
  // return createUserWithEmailAndPassword(auth, email, password);
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    // manageError(error.message);
    console.error(error.message);
  }
};
export const SignIn = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(auth.currentUser.email);
    console.log(user);
  } catch (err) {
   const error =  new Error('Authentication failed');
    // console.log(error);
    // throw error;
  }
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  // result.user
  return result;
};

export const doSignOut = async () => {
  return auth.signOut(auth);
};

export const doPasswordReset = async (email) => {
  return sendPasswordResetEmail(auth, email);
};
