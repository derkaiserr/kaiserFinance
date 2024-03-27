import React,{useState} from "react";
import G from "./assets/G.png";
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';
import {Link} from "react-router-dom"

export default function SignUp() {


    const [eye, setEye] = useState(false)
  return (
    <div className=" ">
      <header className="grid px-4 grid-cols-3 text-center pt-6 font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-left"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <p>Sign Up</p>
      </header>

      <form className="absolute px-4  bottom-24" action="">
        <input
          className="w-full rounded-lg border-slate-200 outline-none border mb-7 px-3 h-10"
          type="text"
          placeholder="Name"
          name=""
          id=""
        />
        <input
          className="w-full rounded-lg border-slate-200 outline-none border mb-7 px-3 h-10"
          type="text"
          placeholder="Email"
          name=""
          id=""
        />
        <div className="relative flex items-center justify-center">

        <input
          className="w-full rounded-lg relative border-slate-200 outline-none border mb-7 px-3 pr-10 h-10"
          type={eye ? "text" : "password"}
          placeholder="Password"
          name=""
          id=""
          />
          <div className="">
        {eye ? <EyeOff className="absolute text-gray-500 right-3 top-2 " onClick={() => {setEye(false)}}/> : <Eye className="absolute text-gray-500 right-3 top-2" onClick={() => {setEye(true)}} />}

          </div>
          </div>
        <div className=" gap-2 ">
          <input
            type="checkbox"
            className="mr-1 rounded-lg border- accent-[#438883] "
            name=""
            id=""
          />
          <label htmlFor="agreement">
            By signing up, you agree to the{" "}
            <span className="text-[#438883]">
              Terms of Service and Privacy Policy
            </span>
          </label>
        </div>
        <Link to="/mainpage" className="bg-[#438883] flex items-center rounded-lg  h-10 justify-center text-white my-3">
          Sign Up
        </Link>
        <p className="text-center text-slate-500 text-sm font-semibold mb-2">
          Or
        </p>
        <button className="flex gap-3 rounded-lg border border-slate-300 h-10 items-center justify-center text-sm font-semibold w-full">
          <span>
            <img className="w-6" src={G} alt="googleIcon" />
          </span>
          Sign Up with Google
        </button>
        <p className="pt-3 text-center">
          Already have an account? 
          <Link to="/login" className="bg-transparent  text-[#438883] "> Log in.</Link>
        </p>
      </form>
    </div>
  );
}
