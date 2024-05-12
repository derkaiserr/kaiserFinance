import { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserContext from "../hooks/context/context.js";
import bg from "./assets/bg-home.png";
import user from "./assets/user.svg";
import ellipses from "./assets/ellipses.png";
import { doSignOut } from "./firebase/auth.js";
import { auth,colRef, } from "./firebase/firebase.js";
import { getDocs } from "firebase/firestore";
// import { name } from "./firebase/firebase.js";
// import { YourComponent } from "./firebase/firebase.js";
export const ThemeContext = createContext(null);
const User = ({}) => {
  const {
    nav,
    setNav,
    theme,
    setTheme,
    setLocalCurrency,
    currencyState,
    setCurrencySymbol,
  } = useContext(UserContext);
  useEffect(() => {
    setNav(true);
  }, [nav]);

  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );
  const changeCurrency = (e) => {
    const value = e.target.value;
    // localStorage.getItem("currency");
    localStorage.setItem("currency", value);
    setCurrency(value);
    if (value === "USD") {
      setLocalCurrency(1);
      setCurrencySymbol("$");
    } else if (value === "NGN") {
      setLocalCurrency(currencyState);
      setCurrencySymbol("₦");
    }
  };



  const [matchingEmail, setMatchingEmail] = useState(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const snapshot = await getDocs(colRef);
        const filteredDocs = snapshot.docs.filter((doc) => {
          return doc.data().email === auth.currentUser.email;
        });
        if (filteredDocs.length > 0) {
          setMatchingEmail( filteredDocs[0].data().name)
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocs();
  }, []);
// console.log(<YourComponent/>)

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
            className="absolute bg-white user  p-8 w-32 -mt-16 rounded-full left-0 right-0 mx-auto"
            alt=""
          />
        </picture>
      </div>
      <section className="mt-20 px-6">
        <div className="flex-col justify-center items-center my-6 flex">
          <p>{matchingEmail}</p>
          <p>{auth.currentUser?.email}</p>
        </div>

        <div className="flex flex-col gap-10 justify-center">
          <div className="flex  justify-between">
            <label htmlFor="currency">Currency</label>
            <select
              onChange={changeCurrency}
              className=" outline-none"
              name="currency"
              id="currency"
              value={currency}
            >
              <option value="USD">USD</option>
              <option value="NGN">NGN</option>
            </select>
          </div>
          <div className="flex justify-between">
            <label htmlFor="theme">Theme</label>
            <select
              className=" outline-none"
              name="theme"
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          {/* <DarkMode /> */}

          <div className="flex items-center justify-between">
            <p>About</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=" text-gray-500lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>

          <Link
            to="/login"
            onClick={() => {setNav(false)
            doSignOut()
            }}
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
