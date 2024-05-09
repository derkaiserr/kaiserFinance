import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../../../src/firebase/firebase";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider() {
  const [currentUser, setCurrentUser] = useState(null);
  const [looggedin, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);



useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return unsubscribe

}, [])


async function initializeUser(){
    if (user) {
        setCurrentUser({...user})
        setIsLoggedIn(true)
        
    }else{
        setCurrentUser(null)
        setIsLoggedIn(false)
    }
    setLoading(false) 
}
const value = {
    currentUser, looggedin, loading
}

    return(
        <AuthContext.Provider value={value}>

        </AuthContext.Provider>
    )

}
