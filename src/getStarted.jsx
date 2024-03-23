import React from "react";
import standMan from "./assets/standman.png";
import bgGetStarted from "./assets/bg-getStarted.png";

export default function GetStarted() {
  return (
    <div>
      <figure className="pt- bg-cover w-full  bg-no-repeat  b-[url('./assets/bg-getStarted.png')]">
        <img
          src={bgGetStarted}
          className="absolute top-0 h-[500px] w-fit z-10"
          alt=""
        />
        <img
          className="bg-inherit absolute z-20 top-10"
          src={standMan}
          alt=""
        />
      </figure>

      <div className="mx-auto mt-[35rem] leading-10 px-6 text-center">
        <p className="text-[#438883] text-4xl w-[70vw] mx-auto  mt-10 font-bold text-center">
          Spend Smarter Save More
        </p>
        <button className="flex items-center mt-3 mx-auto h-14 rounded-3xl w-full font-semibold justify-center  bg-gradient-to-b from-[#69AEA9] to-[#3F8782] text-lg shadow-[#3F8782]/50 shadow-lg text-white ">
          Get Started
        </button>
        <p className="pt-3">
          Already have an account?
          <mark className="bg-transparent  text-[#438883] ">Log in.</mark>
        </p>
      </div>
    </div>
  );
}
