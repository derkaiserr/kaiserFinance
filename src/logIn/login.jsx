import React, { useState, useContext, useEffect } from "react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { SignIn, doSignInWithGoogle } from "../firebase/auth";
import UserContext from "../../hooks/context/context.js";
// import { AuthContext } from "../../hooks/context/authContext/authContext.jsx";

export default function Login() {
  const { navigate, isVisible, setIsVisible, erro, anageError } =
    useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  // const {userLoggedIn} = useContext(useAuth)

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await SignIn(email, password);

      // Check if sign-in was successful
      if (auth.currentUser && auth.currentUser.email === email) {
        navigate("/home");
      } else {
        throw new Error("Sign-in failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error during sign-in:", err);

      // If sign-in failed, manage the error and set visibility state
      setError(err.message);
      setIsVisible(true);
    }
  };

  
  const homeLink = "/home";

  // const onGoogleLogin = (e) =>{
  //   e.preventDefault()
  //   if(!isSigningIn){
  //     setIsSigningIn(true)
  //      doSignInWithGoogle().catch(err=>{
  //       setIsSigningIn(false)
  //      })
  //   }
  // }

  // useEffect(()=>{
  //   <Navigate to={homeLink}  />
  // },[ isSigningIn])
  const [eye, setEye] = useState(false);

  return (
    <div className="login max-h-full">
      { (
        <p
          data-state={isVisible}
          className="absolute z-20 text-center data-[state=true]:translate-y-0 -translate-y-24 ease-in-out top-0 bg-red-500 text-white text-md transition-all duration-300 mx-auto left-0 right-0  w-full p-5 "
        >
          {error}
        </p>
      )}
      <header className="absolute w-full grid px-4 grid-cols-3 text-center pt-6 font-bold">
        <svg
          onClick={() => navigate(-1)}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-left"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <p>Login</p>
      </header>

      {
        <form
          className="  justify-center flex flex-col h-[100vh] px-4  w-full "
          action=""
        >
          <input
            className="w-full rounded-lg border-slate-200 outline-none border mb-7 px-3 h-10"
            type="email"
            placeholder="Email"
            name=""
            id="email"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
          <div className="relative flex items-center justify-center">
            <input
              className="w-full rounded-lg relative border-slate-200 outline-none border mb-7 px-3 pr-10 h-10"
              type={eye ? "text" : "password"}
              placeholder="Password"
              name=""
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="">
              {eye ? (
                <EyeOff
                  className="absolute text-gray-500 right-3 top-2 "
                  onClick={() => {
                    setEye(false);
                  }}
                />
              ) : (
                <Eye
                  className="absolute text-gray-500 right-3 top-2"
                  onClick={() => {
                    setEye(true);
                  }}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            onClick={async (e) => {
              await onSubmit(e);
            }}
            className="bg-[#438883]  rounded-lg w-full h-10 text-white my-3"
          >
            Login
            {/* { <Link   to={ homeLink }>
          </Link>} */}
          </button>

          <p className="text-center text-[#438883]  font-semibold mb-2">
            Forgot Password?
          </p>

          <p className="pt-3 text-center">
            Don't have an account yet?
            <Link to={"/SignUp"} className="bg-transparent  text-[#438883] ">
              {" "}
              Sign Up.
            </Link>
          </p>
        </form>
      }
    </div>
  );
}
