import React from "react";
import standMan from "./assets/standMan.png";
import bgGetStarted from "./assets/bg-getStarted.png";
import {Link} from "react-router-dom"

export default function GetStarted({setNav, theme}) {

  setNav(false)
  return (
    <div>
      <figure className="pt- bg-cover w-full  bg-no-repeat  b-[url('./assets/bg-getStarted.png')]">
       { theme === "light" && <img
          src={bgGetStarted}
          className="absolute top-0 h-[500px]  w-full z-10"
          alt=""
        />}
        <img
          className="bg-inherit absolute mx-auto left-0 right-0 z-20 top-10"
          src={standMan}
          alt=""
        />
      </figure>

      <div className="mx-auto mt-[35rem] leading-10 px-6 text-center">
        <p className="text-[#438883] text-4xl w-[70vw] mx-auto  mt-10 font-bold text-center">
          Spend Smarter Save More
        </p>
        
        <Link to='/signUp' className="flex items-center mt-3 mx-auto h-14 rounded-3xl w-full font-semibold justify-center  bg-gradient-to-b from-[#69AEA9] to-[#3F8782] text-lg shadow-[#3F8782]/50 shadow-lg text-white "  >
          Get Started
        </Link>
        <p className="pt-3">
          Already have an account?
          <Link to="/login" className="bg-transparent  text-[#438883] ">Log in.</Link>
        </p>
      </div>
    </div>
  );
}
