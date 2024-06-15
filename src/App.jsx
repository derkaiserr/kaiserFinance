import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import date from "date-and-time";
import GetStarted from "./getStarted";
import { SignUp } from "./signUp/signUp.jsx";
import Login from "./logIn/login.jsx";
import PageOne from "./homePage/home.jsx";
import Stats from "./statisticsPage/stats.jsx";
import User from "./user/user.jsx";
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
import { AuthProvider } from "./firebase/auth.jsx";
import Context from "../hooks/context/context.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { imageDb, auth, db } from "./firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Wallet from "./wallet/wallet.jsx";
function App() {
  let saveLocation = window.location.pathname;

  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState(() => {
    const savedImgUrl = localStorage.getItem("imgUrl");
    return savedImgUrl ? JSON.parse(savedImgUrl) : [];
  });

  useEffect(() => {
    localStorage.setItem("imgUrl", JSON.stringify(imgUrl));
  }, [imgUrl]);
  const [selectedImage, setSelectedImage] = useState("");
  const [reloadImage, setReloadImage] = useState(false);
  const [matchingName, setMatchingName] = useState(null);
  const [nav, setNav] = useState(() => {
    const storedNav = localStorage.getItem("nav");
    return storedNav ? JSON.parse(storedNav) : false;
  });
  const [error, manageError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "🇺🇸"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      manageError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [isVisible === true]);

  useEffect(() => {
    localStorage.setItem("nav", JSON.stringify(nav));
  }, [nav]);

  const [activeLink, setActiveLink] = useState(1);

  const navLinks = [
    { img: home, altImg: greenHome, id: 1, to: "/home" },
    { img: bars, altImg: greenBars, id: 2, to: "/stats" },
    { img: "", altImg: "", id: 3 },
    { img: wallet, altImg: greenWallet, id: 4, to: "/wallet" },
    { img: user, altImg: greenUser, id: 5, to: "/user" },
  ];

  const [localCurrency, setLocalCurrency] = useState(1);

  const API_KEY = import.meta.env.VITE_SOME_KEY;

  const [currencyState, setCurrencyState] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState("$");

  // CURRENCY EXCHANGE SECTION
  const addRate = useCallback((rate) => {
    setCurrencyState(rate);
  }, []);

  const currencyMemo = useMemo(() => {
    return fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate");
        }
        return response.json();
      })
      .then((data) => {
        addRate(data.conversion_rates.NGN);
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
        manageError(error.message);
        setIsVisible(true);
      });
  }, [addRate]);

  useEffect(() => {
    // Inside useEffect, we need to execute the promise returned by currencyMemo
    currencyMemo
      .then(() => {
        // Fetch operation completed, do something if needed
      })
      .catch((error) => {
        // Handle fetch error if needed
      });
  }, [currencyMemo]);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchTransactions(currentUser);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  //TRANSACTIONS FETCH AND RESET SECTION

  const fetchTransactions = async (currentUser) => {
    if (!auth.currentUser) return;
    try {
      setLoading(true);
      const q = query(
        collection(db, "transactions"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const transactionsData = [];
      querySnapshot.forEach((docSnapshot) => {
        transactionsData.push({ ...docSnapshot.data(), id: docSnapshot.id });
      });
      setTransactions(transactionsData);
    } catch (err) {
      console.error("Error fetching transactions: ", err);
    } finally {
      setLoading(false);
    }
  };

  const resetTransactions = async () => {
    if (!auth.currentUser) {
      console.log("User is not authenticated");
      navigate("/login"); // redirect to login if user is not authenticated
      return;
    }

    try {
      const q = query(
        collection(db, "transactions"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const deletePromises = [];
      querySnapshot.forEach((docSnapshot) => {
        deletePromises.push(deleteDoc(doc(db, "transactions", docSnapshot.id)));
      });
      await Promise.all(deletePromises);
      console.log("All transactions deleted");
      setTransactions([]); // Clear the transactions state
    } catch (err) {
      console.error("Error deleting transactions: ", err);
    }
  };

  const sortedTransactions = transactions.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  const handleNavLinkClick = (id) => {
    setActiveLink(id);
  };

  // THEME SECTION
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

  //IMAGE FETCH SECTION
  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }

    const fetchImages = async () => {
      try {
        const imagesRef = ref(imageDb, `${auth.currentUser?.email}`);
        const imgs = await listAll(imagesRef);

        if (imgs.items.length === 0) {
          return;
        }

        const urls = await Promise.all(
          imgs.items.map(async (val) => {
            const url = await getDownloadURL(val);
            return url;
          })
        );

        setImgUrl(urls);
      } catch (error) {
        console.error("Error fetching images: ", error.message);
      } finally {
      }
    };

    fetchImages();
  }, [auth.currentUser, reloadImage]);

  useEffect(() => {
    if (currency === "🇺🇸") {
      setLocalCurrency(1);
      setCurrencySymbol("$");
    } else if (currency === "🇳🇬") {
      setLocalCurrency(currencyState);
      setCurrencySymbol("₦");
    }
  }, [currency, currencyState]);

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
        navigate,
        imgUrl,
        setImgUrl,
        selectedImage,
        setSelectedImage,
        matchingName,
        setMatchingName,
        setReloadImage,
        error,
        manageError,
        isVisible,
        setIsVisible,
        resetTransactions,
        loading,
        setLoading,
        currency,
        setCurrency,
      }}
    >
      <AuthProvider>
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
            <Route path="/wallet" element={<Wallet />} />
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
      </AuthProvider>
    </Context.Provider>
    //
  );
}

export default App;
