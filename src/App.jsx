import { useState, useEffect } from "react";
import date from 'date-and-time';
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
// 'X-RapidAPI-Key':import.meta.env.VITE_SOME_KEY
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
      //   ()=> {
        //   const storedActiveLink = localStorage.getItem("activeLink");
        // return storedActiveLink ? JSON.parse(storedActiveLink) : 1
        // } 
        1 );
        
        // useEffect(() => {
          //   localStorage.setItem("activeLink", JSON.stringify(activeLink));
          // }, [activeLink])
          
          
          
          const data = 1
          
          const now = new Date(2014, 1,11);
          const newDate = date.format(now, 'ddd, MMM DD YYYY');
          // console.log(newDate)
          
          const navLinks = [
            { img: home, altImg: greenHome, id: 1, to: "/home" },
    { img: bars, altImg: greenBars, id: 2, to: "/stats" },
    { img: "", altImg: "", id: 3 },
    { img: wallet, altImg: wallet, id: 4, to: "/home" },
    { img: user, altImg: greenUser, id: 5, to: "/user" },
  ];
  
  const dateFUnction = (year, month, day) => {
    return date.format(new Date(year, month, day), 'MMM DD, YYYY')
  }
  
  const [transactions, setTransactions] = useState( [
    //type 1 is income, type 2 is expense
    { id:1, name: "Upwork", date: dateFUnction(2021, 0, 24) ,   amount: "8,000.00", income: 8000, type: 1},
    { id:2, name: "Transfer", date:dateFUnction(2024, 1, 17), amount: "845.00", expense: 845, type: 2},
    { id:3, name: "Paypal", date: dateFUnction(2024, 1, 20), amount: "14,000.00", income: 14000, type: 1},
    { id:4, name: "Netflix", date: dateFUnction(2024, 0, 14), amount: "14.99", expense: 14.99, type: 2},
    
  ])
  
  
  const sortedTransactions = transactions.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });
  
  // transactions.map((transaction) => console.log( new Date (transaction.date)))
  
  
  console.log(sortedTransactions)
  
  
  
  
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
    
    const APIK_KEY = import.meta.env.VITE_SOME_KEY;
    const [currencyState, setCurrencyState] = useState(0)
    
    const addRate = (rate) => {
      setCurrencyState(rate)
}

    fetch(`https://v6.exchangerate-api.com/v6/${APIK_KEY}/latest/USD`)
    .then((response) => {
      return response.json()
    })
    .then(data => addRate(data.conversion_rates.NGN))

    console.log(currencyState)

  return (
    <div className={`${theme} inter  `}>
      <Routes>
        <Route path="/" element={<GetStarted theme={theme} setNav={setNav} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route
          path="/mainpage/*"
          element={<Mainpage data={data} nav={nav} transactions={transactions}  setNav={setNav} />}
        /> */}
        <Route path="/add" element={<AddExpense transactions={transactions} setTransactions={setTransactions} />}/>
        <Route path="/home" element={<PageOne theme={theme} transactions={transactions} setNav={setNav} nav={nav} />} />
        <Route path="/stats" element={<Stats data={data} sortedTransactions={ sortedTransactions}  setNav={setNav} transactions={transactions} setTransactions={setTransactions}  nav={nav} />} />
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
              <img src={saveLocation === nav.to ? nav.altImg : nav.img} alt="" />
            </Link>
          ))}
        </footer>
      )}
    </div>
//    
  );
}

export default App;
