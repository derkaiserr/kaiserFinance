import React, { useEffect, useContext } from "react";
import standMan from "./assets/standMan.png";
import bgGetStarted from "./assets/bg-getStarted.png";
import { Link } from "react-router-dom";
import UserContext from "../hooks/context/context.js";
import Coin from "./assets/Coint.png";
import Donut from "./assets/Donut.png";

export default function GetStarted() {
  const { setNav, theme } = useContext(UserContext);
  useEffect(() => setNav(false), []);

  return (
    <div>
      <figure className=" w-full  bg-no-repeat ">
        {theme === "light" && (
          <img
            src={bgGetStarted}
            className="absolute top-0 h-[60vh]  w-full z-10"
            alt=""
          />
        )}
        <div className="relative">

        <img
          className="bg-inherit absolute h-[55vh] mx-auto left-0 right-0 z-20 top-10"
          src={standMan}
          alt=""
          />
        <img  className="bg-inherit absolute h-[10vh] mx-auto left-0 right-0 -translate-x-[130%] z-20 top-12" src={Coin} alt="" />
        <img className="bg-inherit absolute h-[10vh] mx-auto left-0 right-0 translate-x-[125%] z-20 translate-y-[2.4cm]" src={Donut} alt="" />
          </div>
      </figure>

      <div className="mx-auto absolute bottom-4 w-full leading-10 px-6 text-center">
        <p className="text-[#438883] [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-slate-400 text-3xl w-[70vw] mx-auto  mt-10 font-bold text-center">
          Spend Smarter
        </p>
        <p className="text-[#438883] [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-slate-400 text-3xl w-[70vw] mx-auto  mt-1 mb-3 font-bold text-center">
           Save More
        </p>

        <Link
          to="/signUp"
          className="flex items-center mt-3 mx-auto h-14 rounded-3xl w-full font-semibold justify-center  bg-gradient-to-b from-[#69AEA9] to-[#3F8782] text-lg shadow-[#3F8782]/50 shadow-lg text-white "
        >
          Get Started
        </Link>
        <p className="pt-3">
          Already have an account?
          <Link to="/login" className="bg-transparent  text-[#438883] ">
            Log in.
          </Link>
        </p>
      </div>
    </div>
  );
}
