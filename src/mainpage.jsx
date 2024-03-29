import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import PageOne from "./home";
import Stats from "./stats";
import User from "./user";
import bars from "./assets/bars.svg";
import user from "./assets/user.svg";
import home from "./assets/home.svg";
import wallet from "./assets/wallet.svg";
import greenBars from "./assets/greenBars.svg";
import greenUser from "./assets/greenUser.svg";
import greenHome from "./assets/greenHome.svg";
import greenWallet from "./assets/greenWallet.svg";

const Mainpage = ({ data, setNav, nav }) => {
  useEffect(() => {
    setNav(true);

    // return () => {
      
    // };
  }, [nav]);
 

  const navLinks = [
    { img: home, altImg: greenHome, id: 1, to: "/home" },
    { img: bars, altImg: greenBars, id: 2, to: "/stats" },
    { img: "", altImg: "", id: 3 },
    { img: wallet, altImg: greenWallet, id: 4, to: "/home" },
    { img: user, altImg: greenUser, id: 5, to: "/user" },
  ];

  return (
    <div>
      {/* <PageOne /> */}

      <Routes>
        {/* <Route exact path="/" element={<GetStarted />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> */}
        <Route exact path="/" element={<PageOne />} />
        {/* <Route path="/mainpage" element={<Mainpage />} />
        <Route path="/stats" element={<Stats data={data} />} />
        <Route path="/user" element={<User />} /> */}
         <Route exact path="/home" element={<PageOne />} />
        <Route path="/stats" element={<Stats data={data} />} />
        <Route path="/user" element={<User setNav={setNav} />} />
      </Routes>
    </div>
  );
};

export default Mainpage;
