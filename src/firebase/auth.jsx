import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { app, auth } from "./firebase.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [error, manageError] = useState("");
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    // Set a timer to hide the element after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      manageError("")
    }, 5000);

    // Clear the timer if the component is unmounted before 5 seconds
    return () => clearTimeout(timer);
  }, [isVisible === true]);
  const Register = async (email, password) => {
    // const { error, manageError } = useContext(AuthContext);
    // return createUserWithEmailAndPassword(auth, email, password);

    
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      manageError(error.message);
      console.error(error.message);
      setIsVisible(true)
    }
  };
  const SignIn = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser.email);
      console.log(user);
    } catch (err) {

      //  const error =  new Error('Authentication failed');
      manageError(err.message);
      console.log(err);
    }
  };

  const doSignInWithGoogle = (e) => {
    e.preventDefault()
    const provider = new GoogleAuthProvider();
    const result = signInWithPopup(auth, provider);
    result.then((res)=>{ 
      console.log(res);
      const name = res.user.displayName
      const email = res.user.email
      // const displayPicture = res.user.photoURL
      // console.error(displayPicture)
      localStorage.setItem("name", name)
      localStorage.setItem("email", email)
      navigate("/home")
      // localStorage.setItem("displayPicture", displayPicture)
    }).catch((err)=>{
      console.error(err.message);
    });
  };

  const doSignOut = async () => {
    return await auth.signOut(auth);
  };

  const doPasswordReset = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const authContext = {
    Register,
    SignIn,
    doSignInWithGoogle,
    doSignOut,
    doPasswordReset,
    error,
    manageError,
    isVisible,
    // setIsVisible,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
