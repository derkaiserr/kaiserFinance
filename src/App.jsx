import { useState, useEffect } from "react";
import GetStarted from "./getStarted";
import SignUp from "./signUp";
import Login from "./login";
// import Mainpage from "./mainpage";
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
  const [nav, setNav] = useState(() => {
    const storedNav = localStorage.getItem('nav');
    return storedNav ? JSON.parse(storedNav) : false; // Parse JSON string to boolean
  });

  // Update local storage whenever the nav state changes
  useEffect(() => {
    localStorage.setItem('nav', JSON.stringify(nav));
  }, [nav]); // Run this effect whenever nav changes


  // const savedNav = (link) => {
    //   setNav(link.to);
    // };
    
    const [activeLink, setActiveLink] = useState(
      ()=> {
      const storedActiveLink = localStorage.getItem("activeLink");
    return storedActiveLink ? JSON.parse(storedActiveLink) : 1
    } 
  );

  useEffect(() => {
    localStorage.setItem("activeLink", JSON.stringify(activeLink));
  }, [activeLink])

  
    
  const data = 1


  const navLinks = [
    { img: home, altImg: greenHome, id: 1, to: "/home" },
    { img: bars, altImg: greenBars, id: 2, to: "/stats" },
    { img: "", altImg: "", id: 3 },
    { img: wallet, altImg: greenWallet, id: 4, to: "/home" },
    { img: user, altImg: greenUser, id: 5, to: "/user" },
  ];


  const transactions = [
    //type 1 is income, type 2 is expense
    { id:1, name: "Upwork", date: "Today", amount: "8,000.00", income: 8000, type: 1},
    { id:2, name: "Transfer", date: "Yesterday", amount: "845.00", expense: 845, type: 2},
    { id:3, name: "Paypal", date: "30th Jan, 2024", amount: "14,000.00", income: 14000, type: 1},
    { id:4, name: "Netflix", date: "14th Jan, 2024", amount: "14.99", income: 14.99, type: 1},

  ]


  const handleNavLinkClick = (id) => {
    setActiveLink(id);
  };

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    useEffect(() => {
      localStorage.setItem('theme', theme);
      // if(theme === 'black') {
      // document.body.className = theme;}
      // if (theme === 'light') {
      //   document.body.className = "green"
      // }
      document.body.className = theme
    }, [theme]);
    const toggleDarkMode = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

  return (
    <div className={`${theme} inter  `}>
      <Routes>
        <Route path="/" element={<GetStarted setNav={setNav} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route
          path="/mainpage/*"
          element={<Mainpage data={data} nav={nav} transactions={transactions}  setNav={setNav} />}
        /> */}
        <Route path="/add" element={<AddExpense />}/>
        <Route path="/home" element={<PageOne transactions={transactions} setNav={setNav} nav={nav} />} />
        <Route path="/stats" element={<Stats data={data}  setNav={setNav} transactions={transactions} nav={nav} />} />
        <Route path="/user" element={<User setNav={setNav} theme={theme} setTheme={setTheme} toggleDarkMode={toggleDarkMode} nav={nav} />} />
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
//    
  );
}

export default App;
