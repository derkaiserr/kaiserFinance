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
import AddExpense from "./add"
function App() {
  let saveLocation = window.location.pathname;
  const [nav, setNav] = useState(false);

  // const savedNav = (link) => {
  //   setNav(link.to);
  // };

  console.log(nav);

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


  const transactions = [
    //type 1 is income, type 2 is expense
    { id:1, name: "Upwork", date: "Today", amount: "8,000.00", type: 1},
    { id:2, name: "Transfer", date: "Yesterday", amount: "845.00", type: 2},
    { id:3, name: "Paypal", date: "30th Jan, 2024", amount: "14,000.00", type: 1},
    { id:4, name: "Netflix", date: "14th Jan, 2024", amount: "14.99", type: 1},

  ]

  const [activeLink, setActiveLink] = useState(1);

  const handleNavLinkClick = (id) => {
    setActiveLink(id);
  };

  return (
    <div className=" inter ">
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mainpage/*"
          element={<Mainpage data={data} nav={nav} transactions={transactions}  setNav={setNav} />}
        />
        <Route path="/add" element={<AddExpense />}/>
        <Route path="/home" element={<PageOne transactions={transactions} />} />
        <Route path="/stats" element={<Stats data={data} setNav={setNav} transactions={transactions} nav={nav} />} />
        <Route path="/user" element={<User setNav={setNav} nav={nav} />} />
      </Routes>

      {nav && (
        <footer className="fixed bg-white flex z-[100] py-3 pt-4 bottom-0 w-full justify-around border border-t-2">
          {navLinks.map((nav) => (
            <Link
              to={nav.to}
              key={nav.id}
              onClick={() => handleNavLinkClick(nav.id)}
              className={activeLink === nav.id ? "active" : ""}
            >
              <img src={activeLink === nav.id ? nav.altImg : nav.img} alt="" />
            </Link>
          ))}
        </footer>
      )}
    </div>
//     <div>
// {/* <AddExpense/> */}
//     </div>
  );
}

export default App;
