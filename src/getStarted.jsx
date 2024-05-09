import React, { useEffect, useContext } from "react";
import standMan from "./assets/standMan.png";
import bgGetStarted from "./assets/bg-getStarted.png";
import { Link } from "react-router-dom";
import UserContext from "../hooks/context/context.js";

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
        <img
          className="bg-inherit absolute h-[55vh] mx-auto left-0 right-0 z-20 top-10"
          src={standMan}
          alt=""
        />
      </figure>

      <div className="mx-auto absolute bottom-4 w-full leading-10 px-6 text-center">
        <p className="text-[#438883] text-3xl w-[70vw] mx-auto  mt-10 font-bold text-center">
          Spend Smarter Save More
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
