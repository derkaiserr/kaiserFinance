import React, { useState } from "react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import {Link} from "react-router-dom"

export default function Login() {
  const [eye, setEye] = useState(false);

  return (
    <div className="login">
      <header className="grid px-4 grid-cols-3 text-center pt-6 font-bold">
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
        <p>Login</p>
      </header>

      <form className="  justify-center flex flex-col h-[100vh] px-4  w-full " action="">
        
        <input
          className="w-full rounded-lg border-slate-200 outline-none border mb-7 px-3 h-10"
          type="email"
          placeholder="Email"
          name=""
          id="username"
        />
        <div className="relative flex items-center justify-center">
          <input
            className="w-full rounded-lg relative border-slate-200 outline-none border mb-7 px-3 pr-10 h-10"
            type={eye ? "text" : "password"}
            placeholder="Password"
            name=""
            id="password"
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

        <Link to="/home" className="bg-[#438883] flex items-center justify-center rounded-lg w-full h-10 text-white my-3">
          Login
        </Link>
        <p className="text-center text-[#438883]  font-semibold mb-2">
          Forgot Password?
        </p>

        <p className="pt-3 text-center">
          Don't have an account yet?
          <span className="bg-transparent  text-[#438883] "> Sign Up.</span>
        </p>
      </form>
    </div>
  );
}
