import React, { useEffect, useState } from "react";
import G from "../assets/G.png";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Register, doSignInWithGoogle } from "../firebase/auth";
import { app, auth, db, colRef } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

 function SignUp() {
  const [eye, setEye] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const navigate = useNavigate();
  const user = auth.currentUser;
  useEffect(() => {
    if (user != null) {
      // User is signed in
      setSignedUp(true);
      console.log(user);
    } else {
      // No user is signed in
      setSignedUp(false);
    }
  }, [user]);


   


  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(auth.currentUser);
    await Register(email, password);
    if (auth.currentUser === null) {
      // setIsSigningIn(true)
      // throw new Error("You Suck!");
      const error = new Error("error")
      console.log(error);
      throw error
    }
     try {
    const docRef = await addDoc(collection(db, "userName"), {
      email: email,
      name: name,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
    navigate("/home");
  };


  const fetchName = () =>{
    
  }
  
  return (
    <div className="signUp ">
      <header className="grid absolute w-full px-4 grid-cols-3 text-center pt-6 font-bold">
        <svg
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

      <form className="flex flex-col justify-center h-[100vh] px-4 " action="">
        <input
          className="w-full rounded-lg border-slate-200 outline-none border mb-7 px-3 h-10"
          type="text"
          placeholder="Name"
          name=""
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
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
          />
          <label htmlFor="agreement">
            By signing up, you agree to the
            <span className="text-[#438883]">
              Terms of Service and Privacy Policy
            </span>
          </label>
        </div>
        <button
          className="bg-[#438883] flex items-center rounded-lg  h-10 justify-center text-white my-3"
          type="submit"
          onClick={async (e) => {
            await onSubmit(e);
          }}
        >
         
            Sign Up
        </button>
        <p className="text-center text-slate-500 text-sm font-semibold mb-2">
          Or
        </p>
        <button
          onClick={doSignInWithGoogle}
          className="flex gap-3 rounded-lg border border-slate-300 h-10 items-center justify-center text-sm font-semibold w-full"
        >
          <span>
            <img className="w-6" src={G} alt="googleIcon" />
          </span>
          Sign Up with Google
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

export {SignUp}

