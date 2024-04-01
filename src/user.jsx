import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./login";
import bg from "./assets/bg-home.png";
import user from "./assets/user.svg";
import ellipses from "./assets/ellipses.png";

const User = ({ setNav, nav }) => {

  useEffect(() => {
    setNav(true);

    // return () => {
      
    // };
  }, [nav]);
  return (
    <div className="pb-28">
      <div>
        <img
          src={ellipses}
          className="absolute top-0 z-50 w-[50%] cover"
          alt=""
        />
        <img src={bg} className="relative cover w-full" alt="" />
        <picture className=" ">
          <img
            src={user}
            className="absolute bg-white  p-8 w-32 -mt-16 rounded-full left-0 right-0 mx-auto"
            alt=""
          />
        </picture>
      </div>
      <section className="mt-20 px-6">
        <div className="flex-col justify-center items-center my-6 flex">
          <p>[name]</p>
          <p>[@username]</p>
        </div>

        <div className="flex flex-col gap-10 justify-center">
          <div className="flex  justify-between">
            <label for="currency">Currency</label>
            <select className=" outline-none" name="currency" id="">
              <option value="USD">USD</option>
              <option value="NGN">NGN</option>
            </select>
          </div>
          <div className="flex justify-between">
            <label for="theme">Theme</label>
            <select className=" outline-none" name="theme" id="">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <p>About</p>
            <svg
              className="text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>

          <Link
          to="/login"
            onClick={() => setNav(false)}
            className="bg-red-600 py-3 text-lg font-semibold shadow-xl flex justify-center text-white rounded-md w-full"
          >
            Sign Out
          </Link>
        </div>
      </section>
    </div>
  );
};

export default User;
