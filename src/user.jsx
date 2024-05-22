import { useState, useEffect, createContext, useContext, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Modal from "react-modal";
import UserContext from "../hooks/context/context.js";
import bg from "./assets/bg-home.png";
import user from "./assets/user.svg";
import ellipses from "./assets/ellipses.png";
import { doSignOut } from "./firebase/auth.js";
import { auth, colRef, db, imageDb } from "./firebase/firebase.js";
import { getDocs, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

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
    setTransactions,
    imgUrl,
    setImgUrl,
    selectedImage,
    setSelectedImage,
    matchingName,
    setMatchingName,
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

  const imageRef = useRef(null);
  const handleImageClick = () => {
    imageRef.current.click();
  };

  // const [matchingName, setMatchingName] = useState(null);

  // useEffect(() => {
  //   // Save state to local storage whenever it changes
  //   localStorage.setItem("savedNames", JSON.stringify(matchingName));
  // }, [matchingName]);

  // const [imgUrl, setImgUrl] = useState([])

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const snapshot = await getDocs(colRef);
        const filteredDocs = snapshot.docs.filter((doc) => {
          return doc.data().email === auth.currentUser.email;
        });
        if (filteredDocs.length > 0) {
          setMatchingName(filteredDocs[0].data().name);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocs();
  }, [selectedImage]);

  const handleImageInput = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Set the selected image to the state
      setSelectedImage(file);

      // Create a reference to the image in your database
      const imgRef = ref(
        imageDb,
        `${auth.currentUser.email}/${auth.currentUser.email}`
      );

      try {
        // Upload the file directly from the event object
        await uploadBytes(imgRef, file).then((value) => {
          getDownloadURL(value.ref).then((url) => {
            setImgUrl((data) => [...data, url]);
          });
        });
        console.log("Upload successful");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // Modal.setAppElement('#root')
  // const customStyles = {
  //   content: {
  //     backgroundColor: "#1B5C58",
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //   },
  // };

  // let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function controlModal() {
    setIsOpen((prev) => !prev);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const resetPrompt = () => {
    const prompt = confirm("Are you sure you want to clear all transactions?");
    if (prompt) {
      setTransactions([]);
    }
  };

  return (
    <div className="pb-28">
      <div>
        <img
          src={ellipses}
          className="absolute top-0 z-50 w-[50%] cover"
          alt=""
        />
        <img src={bg} className="relative cover z-20 w-full" alt="" />
        <picture className="image-container relative flex justify-center ">
          {
            <img
              src={imgUrl[0] ? imgUrl[0] : user}
              className={`absolute bg-white user ${
                !imgUrl[0] && "p-8"
              }  w-40 h-40 -mt-20 rounded-full z-20 left-0 right-0 mx-auto`}
              alt=""
            />
          }

          {/* {imgUrl.map(img => <img src={img} />)} */}
          <svg
            onClick={handleImageClick}
            className=" svg absolute -mt-20 w-40 h-40 p-14 text-gray-200 cursor-pointer rounded-full"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <input
            type="file"
            className="hidden"
            name="myImage"
            ref={imageRef}
            accept="image/jpeg, image/png, image/gif"
            onChange={handleImageInput}
          />
          <div
            onClick={controlModal}
            className="editPen absolute z-20  text-[#26afa6] border-[#24a9a0] bg-[#bdbdbdb4] h-10 w-10 p-2 overflow-hidden   ml-28 mt-8 border  rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              data-state={modalIsOpen}
              className="lucide lucide-pencil data-[state=true]:-translate-y-8 transition-all duration-200"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-x  data-[state=true]:-translate-y-6 transition-all duration-200"
              data-state={modalIsOpen}
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        </picture>

        <section
          data-state={modalIsOpen}
          className="dropdown data-[state=true]:translate-y-0 -translate-y-56 duration-400  bg-gradient-to-r from-[#368882] to-[#2c7e78] absolute w-full transition-all ease-in-out h-52 top-[14rem] flex items-end justify-center z-0"
        >
          <div className="pictureOptions flex text-white flex-col items-center borde leading-10  p-0 w-[95%] shadow-2x shadow-blac   rounded-t-lg  text-sm">
            <button
              onClick={handleImageClick}
              className="border-b border-gray-500 w-full "
            >
              {imgUrl[0] != undefined ? "Change" : "Add"} Image
            </button>
            <button className={imgUrl[0] === undefined ? "text-gray-400 w-full bg-[#2224]" : undefined}>
              Remove Image
            </button>
          </div>
        </section>
      </div>
      <section className="mt-20 px-6">
        <div className="flex-col justify-center items-center my-6 flex">
          <p>{matchingName}</p>
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
          <button
            onClick={resetPrompt}
            className="bg-slate-400 py-2 text-lg font-semibold shadow-xl flex justify-center text-white rounded-md w-full"
            type="reset"
          >
            Reset
          </button>

          <Link
            to="/login"
            onClick={() => {
              setNav(false);
              doSignOut();
              setImgUrl([]);
              setMatchingName(null);
            }}
            className="bg-red-600 py-2 text-lg font-semibold shadow-xl flex justify-center text-white rounded-md w-full"
          >
            Sign Out
          </Link>
        </div>
      </section>
    </div>
  );
};

export default User;
