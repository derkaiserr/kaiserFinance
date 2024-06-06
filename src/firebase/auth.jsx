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
  const [inputName, setInputName] = useState(false);
  useEffect(() => {
    // Set a timer to hide the element after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      manageError("")
    }, 5000);

    // Clear the timer if the component is unmounted before 5 seconds
    return () => clearTimeout(timer);
  }, [isVisible === true]);

  const [isLoading, setIsLoading] = useState(false);

  const Register = async (email, password) => {
    setIsLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      manageError(error.message);
      console.error(error.message);
      setIsVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const SignIn = async (email, password) => {
    setIsLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser.email);
      console.log(user);
    } catch (err) {
      manageError(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const doSignInWithGoogle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const name = result.user.displayName;
      const email = result.user.email;
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      navigate("/home");
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const doSignOut = async () => {
    return await auth.signOut(auth);
  };

  const doPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email sent");
    } catch (err) {
      console.log(err.message);
    }
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
    isLoading,
    inputName,
    setInputName,
    // setIsVisible,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
