import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import date from "date-and-time";
import GetStarted from "./getStarted";
// import SignUp from "./signUp/signUp.jsx";
import { SignUp } from "./signUp/signUp.jsx";
import Login from "./logIn/login.jsx";
// import Mainpage from "./mainpage";
import PageOne from "./homePage/home.jsx";
import Stats from "./statisticsPage/stats.jsx";
import User from "./user.jsx";
import bars from "./assets/bars.svg";
import user from "./assets/user.svg";
import home from "./assets/home.svg";
import wallet from "./assets/wallet.svg";
import greenBars from "./assets/greenBars.svg";
import greenUser from "./assets/greenUser.svg";
import greenHome from "./assets/greenHome.svg";
import greenWallet from "./assets/greenWallet.svg";
import "./App.css";
import AddExpense from "./homePage/add.jsx";
import Context from "../hooks/context/context.js";
// 'X-RapidAPI-Key':import.meta.env.VITE_SOME_KEY
function App() {
  let saveLocation = window.location.pathname;
  const [nav, setNav] = useState(() => {
    const storedNav = localStorage.getItem("nav");
    return storedNav ? JSON.parse(storedNav) : false; // Parse JSON string to boolean
  });

  // Update local storage whenever the nav state changes
  useEffect(() => {
    localStorage.setItem("nav", JSON.stringify(nav));
  }, [nav]); // Run this effect whenever nav changes

  // const savedNav = (link) => {
  //   setNav(link.to);
  // };

  const [activeLink, setActiveLink] = useState(
    //   ()=> {
    //   const storedActiveLink = localStorage.getItem("activeLink");
    // return storedActiveLink ? JSON.parse(storedActiveLink) : 1
    // }
    1
  );

  // useEffect(() => {
  //   localStorage.setItem("activeLink", JSON.stringify(activeLink));
  // }, [activeLink])

  // const data = 1;

  const now = new Date(2014, 1, 11);
  const newDate = date.format(now, "ddd, MMM DD YYYY");
  // console.log(newDate)

  const navLinks = [
    { img: home, altImg: greenHome, id: 1, to: "/home" },
    { img: bars, altImg: greenBars, id: 2, to: "/stats" },
    { img: "", altImg: "", id: 3 },
    { img: wallet, altImg: wallet, id: 4, to: "/home" },
    { img: user, altImg: greenUser, id: 5, to: "/user" },
  ];

  const dateFunction = (year, month, day) => {
    return date.format(new Date(year, month, day), "MMM DD, YYYY");
  };

  // const formattedNumber = (number) => {
  //   // Convert the string to a number
  //   const numericValue = parseFloat(number);

  //   // Check if the input is a valid number
  //   if (isNaN(numericValue)) {
  //     return ""; // Return an empty string if it's not a valid number
  //   }

  //   // Format the number with two decimal places and comma separators
  //   return numericValue.toLocaleString(undefined, {
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   });
  // };

  const [localCurrency, setLocalCurrency] = useState(1);

  const API_KEY = import.meta.env.VITE_SOME_KEY;
  // const [currencyState, setCurrencyState] = useState(0);

  const [currencyState, setCurrencyState] = useState(1250);
  const [currencySymbol, setCurrencySymbol] = useState("$");

  // console.log(currencyState * "3")
  // const addRate = useCallback((rate) => {
  //   setCurrencyState(rate);
  // }, []);

  // addRate(1250);

  // const currencyMemo = useMemo(() => {
  //   return fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch exchange rate");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       addRate(data.conversion_rates.NGN);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching exchange rate:", error);
  //     });
  // }, [addRate]);

  // useEffect(() => {
  //   // Inside useEffect, we need to execute the promise returned by currencyMemo
  //   currencyMemo
  //     .then(() => {
  //       // Fetch operation completed, do something if needed
  //     })
  //     .catch((error) => {
  //       // Handle fetch error if needed
  //     });
  // }, [currencyMemo]);

  console.log(localCurrency);

  // Use currencyState in your component
  // const updatedTransactions =

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "Upwork",
      date: dateFunction(2021, 0, 24),
      amount: 8000, // Update the amount based on localCurrency
      income: 8000,
      type: 1,
    },
    {
      id: 2,
      name: "Transfer",
      date: dateFunction(2024, 4, 7),
      amount: 845, // Update the amount based on localCurrency
      expense: 845,
      type: 2,
    },
    {
      id: 3,
      name: "Paypal",
      date: dateFunction(2024, 1, 20),
      amount: 14000, // Update the amount based on localCurrency
      income: 14000,
      type: 1,
    },
    {
      id: 4,
      name: "Netflix",
      date: dateFunction(2024, 0, 14),
      amount: 14.99, // Update the amount based on localCurrency
      expense: 14.99,
      type: 2,
    },
  ]);

  // transactions.map((transaction) => transaction.amount * localCurrency)
  // const updatedTx = transactions.map(item => ({
  //   ...item,
  //   amount: item.amount  * localCurrency,
  // }));
  // console.log(updatedTx)
  // useEffect(()=>
  // setTransactions(updatedTx),[])

  useEffect(() => {
    console.log(transactions);
    // console.log(formattedNumber("8000" * localCurrency));
  }, [localCurrency]);

  const value = transactions[0].amount;
  const [values, setValues] = useState(3 * localCurrency);

  // let sortedTransactions
  const sortedTransactions = transactions.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  // Example of updating the transactions state

  // Create a new array with updated transaction objects

  // Update the transactions state with the new array
  // useEffect(() => {
  //   setTransactions(updatedTransactions);
  // }, [localCurrency]);

  // transactions.map((transaction) => console.log( new Date (transaction.date)))

  // console.log(sortedTransactions);

  const handleNavLinkClick = (id) => {
    setActiveLink(id);
  };

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.body.className = theme;
  }, [theme]);
  const toggleDarkMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // console.log(currencyState);

  return (
    <Context.Provider
      value={{
        setNav,
        nav,
        theme,
        setTheme,
        currencyState,
        currencySymbol,
        setCurrencyState,
        setCurrencySymbol,
        localCurrency,
        setLocalCurrency,
        transactions,
        setTransactions,
        toggleDarkMode,
        sortedTransactions,
      }}
    >
      <div className={`${theme} inter  `}>
        <Routes>
          <Route
            path="/"
            element={<GetStarted theme={theme} setNav={setNav} />}
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/add" element={<AddExpense />} />
          <Route path="/home" element={<PageOne />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/user" element={<User />} />
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
                <img
                  src={saveLocation === nav.to ? nav.altImg : nav.img}
                  alt=""
                />
              </Link>
            ))}
          </footer>
        )}
      </div>
    </Context.Provider>
    //
  );
}

export default App;
