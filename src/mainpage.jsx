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

const Mainpage = ({data}) => {
  let saveLocation = window.location.pathname;
  const [nav, setNav] = useState(saveLocation);

  const savedNav = (link) => {
    setNav(link.to);
  };

  console.log(nav)
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
        <Route path="/mainpage" element={<Mainpage />} />
        <Route path="/stats" element={<Stats data={data} />} />
        <Route path="/user" element={<User />} />
      </Routes>

     
      

    
    </div>
  );
};

export default Mainpage;
