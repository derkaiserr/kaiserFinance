import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../../../src/firebase/firebase";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Register, SignIn } from "../../../src/firebase/auth";
import App from "../../../src/App";
const AuthContext = createContext();

// export function useAuth(){
//     return useContext(AuthContext)
// }
// export {AuthContext}

 function AuthProvider() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [looggedin, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);



// useEffect(()=>{
//     const unsubscribe = onAuthStateChanged(auth, initializeUser)
//     return unsubscribe

// }, [])


// async function initializeUser(){
//     if (user) {
//         setCurrentUser({...user})
//         setIsLoggedIn(true)
        
//     }else{
//         setCurrentUser(null)
//         setIsLoggedIn(false)
//     }
//     setLoading(false) 
// }
// const value = {
//     currentUser, looggedin, loading
// }

const [error, manageError] = useState("jjn")

    return(
        <AuthContext.Provider value={{error, manageError}}>
            <Register/>
            <SignIn />
            <App />
        </AuthContext.Provider>
    )

}


export {AuthProvider, AuthContext}