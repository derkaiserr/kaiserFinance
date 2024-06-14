import React, { useContext, useEffect, useState, useRef } from "react";
import G from "../assets/G.png";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
// import { Register, doSignInWithGoogle } from "../firebase/auth";
import { AuthContext } from "../firebase/auth.jsx";
import { app, auth, db, colRef } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import UserContext from "../../hooks/context/context.js";
import useClickOutside from "../../hooks/useClickOutside.jsx";



function Privacy (){

  const handlePropagation = (e) => {
    //   // Prevent the click event from propagating
      e.stopPropagation();
    }
  return(<div onClick={handlePropagation} className="absolute h-[50vh] top-0 bottom-0 left-0 right-0 m-auto w-[95vw] bg-white terms p-6 shadow-lg rounded-lg ">
   <p className="font-bold text-xl">Terms and Privacy</p>
    <p>Lorem ipsum dolor... just accept the terms and move on bro😂</p>

  </div>)
}
function SignUp() {
  const { navigate } = useContext(UserContext);
  const [eye, setEye] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [toggleTerms, setToggleTerms] = useState(false);
  const { Register, doSignInWithGoogle, inputName,  setInputName, error, isVisible, isLoading } =
    useContext(AuthContext);
  // const user = auth.currentUser;
  // useEffect(() => {
  //   if (user != null) {
  //     // User is signed in
  //     setSignedUp(true);
  //     console.log(user);
  //   } else {
  //     // No user is signed in
  //     setSignedUp(false);
  //   }
  // }, [user]);

  // const ref = useRef(null)
  const closeTerms = () => {
    setToggleTerms(false);
  };
  const ref = useClickOutside(closeTerms);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    console.log(isVisible);
    if (!checked && email !== "" && password !== "") {
      setCheckError(true);
      return;
    }
    if (name === "") {
      setInputName(true);
      return;
    }
    await Register(email, password);
    if (auth.currentUser === null) {
      // setIsSigningIn(true)
      // throw new Error("You Suck!");
      const error = new Error("error");
      console.log(error);
      throw error;
    }
    try {
      const docRef = await addDoc(collection(db, "userName"), {
        email: email.toLowerCase(),
        name: name,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
    navigate("/home");
  };
  const googleSignIn = (e)=>{
    // e.preventDefault()
    doSignInWithGoogle
    return navigate('home')
  }
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const openTerms = (e) =>{
    e.preventDefault();
    setToggleTerms(true);
  }



  return (
    <div className="signUp pt6">
      { (
        <p
          data-state={isVisible}
          className="absolute z-20 text-center data-[state=true]:translate-y-0 -translate-y-24 ease-in-out top-0 bg-red-500 text-white text-md transition-all duration-300 mx-auto left-0 right-0  w-full p-5 "
        >
          {error.slice(9)}
        </p>
      )}
      <header className="grid absolute w-full px-4 grid-cols-3 text-center pt-6 font-bold">
        <svg
          onClick={() => navigate("/")}
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
        <p>Sign Up</p>
      </header>

      <form className="flex flex-col justify-center h-dvh  px-4 " action="">
        <div className="mb-7">
          <input
            className="w-full rounded-lg border-slate-200 outline-none border  px-3 h-10"
            type="text"
            placeholder="Name"
            name=""
            id="name"
            onChange={(e) => {
              setName(e.target.value);
              setInputName(false);
            }}
          />
          {inputName && (
            <p className="text-red-500 text-sm" htmlFor="name">
              Please enter your name.
            </p>
          )}
        </div>
        <input
          className="w-full rounded-lg border-slate-200 outline-none border mb-7 px-3 h-10"
          type="text"
          placeholder="Email"
          name=""
          id="email"
          onChange={(e) => setEmail(e.target.value)}
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
        <div className=" gap-2 ">
          <input
            type="checkbox"
            className="mr-1 rounded-lg border- accent-[#438883] "
            name="agreement"
            id="agreement"
            checked={checked}
            onChange={handleChange}
          />
          <label htmlFor="agreement">
            By signing up, you agree to the {" "}
            <p ref={ref} onClick={openTerms} className="inline text-[#438883]">
                Terms of Service and Privacy Policy
            </p>
            <div data-state={toggleTerms} className="data-[state=true]:block hidden  bg-transparent h-full top-0 left-0 z-50 absolute w-full "> </div>
          </label>
          {checkError && (
            <p className="text-red-500 text-sm">
              Please accept the terms and privacy policy to continue.
            </p>
          )}
        </div>

        {toggleTerms && <Privacy />}
        <button
          className="bg-[#438883] flex items-center rounded-lg  h-10 justify-center text-white my-3"
          type="submit"
          onClick={async (e) => {
            await onSubmit(e);
          }}
        >
          {isLoading? <div className=" loaderAdd w-5 h-5 loaderSignUp "></div> : "Sign Up"}
        </button>
        <p className="text-center text-slate-500 text-sm font-semibold mb-2">
          Or
        </p>
        <button
          onClick={doSignInWithGoogle}
          className="flex gap-3 rounded-lg  border border-slate-300 h-10 items-center justify-center text-sm font-semibold w-full"
        >
          <span>
            <img className="w-6" src={G} alt="googleIcon" />
          </span>
          Continue with Google
        </button>
        <p className="pt-3 text-center">
          Already have an account?
          <Link to="/login" className="bg-transparent  text-[#438883] ">
            {" "}
            Log in.
          </Link>
        </p>
      </form>
    </div>
  );
}

export { SignUp };
