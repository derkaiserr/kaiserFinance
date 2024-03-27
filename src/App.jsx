import { useState, useEffect } from "react";
import GetStarted from "./getStarted";
import SignUp from "./signUp";
import Login from "./login";
import Mainpage from "./mainpage";
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
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  let saveLocation = window.location.pathname;
  const [nav, setNav] = useState(false);

  const savedNav = (link) => {
    setNav(link.to);
  };

  console.log(nav);
  useEffect(() => {
    const handleLocationChange = () => {
      // Update saveLocation whenever the pathname changes
      saveLocation = window.location.pathname;
    };

    // Attach an event listener for location change
    window.addEventListener("popstate", handleLocationChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 700 },
    { name: "May", value: 500 },
  ];

  const navLinks = [
    { img: home, altImg: greenHome, id: 1, to: "/home" },
    { img: bars, altImg: greenBars, id: 2, to: "/stats" },
    { img: "", altImg: "", id: 3 },
    { img: wallet, altImg: greenWallet, id: 4, to: "/home" },
    { img: user, altImg: greenUser, id: 5, to: "/user" },
  ];
  return (
    <div className=" inter ">
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/home" element={<PageOne />} />
        <Route path="/mainpage/*" element={<Mainpage data={data} nav={nav} setNav={setNav} />} />
        <Route path="/stats" element={<Stats data={data} />} />
        <Route path="/user" element={<User />} />
      </Routes>
      {/* <GetStarted /> */}
      {/* <SignUp /> */}
      {/* <Login /> */}
      {/* <Mainpage /> */}

      {nav && (
        <footer className="fixed bg-white flex  py-3 pt-4 bottom-0 w-full justify-around border border-t-2">
          {navLinks.map((nav) => (
            <Link to={nav.to} key={nav.id}>
              <img src={nav.img} alt="" />
            </Link>
          ))}
        </footer>
      ) }
    </div>
  );
}

export default App;
