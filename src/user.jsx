import { useState, useEffect, createContext, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import UserContext from "../hooks/context/context.js";
import Bg from "./bg.jsx";
import user from "./assets/user.svg";
import { doSignOut } from "./firebase/auth.js";
import { auth, colRef, db, imageDb } from "./firebase/firebase.js";
import { getDocs, doc, setDoc } from "firebase/firestore";
import imageCompression from "browser-image-compression";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import Loader from "./homePage/loader.jsx";

export const ThemeContext = createContext(null);
const User = ({}) => {
  const {
    nav,
    setNav,
    transactions,
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
    setReloadImage,
    error,
    manageError,
    isVisible,
    setIsVisible,
    setLoading,
    loading
  } = useContext(UserContext);
  useEffect(() => {
    setNav(true);
  }, [nav]);

  const [modalIsOpen, setIsOpen] = useState(false);

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
  
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(colRef);
        const filteredDocs = snapshot.docs.filter((doc) => {
          return doc.data().email === auth.currentUser.email;
        });
        if (filteredDocs.length > 0) {
          setMatchingName(filteredDocs[0].data().name);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally{
        setLoading(false);
      }
    };

    fetchDocs();
  }, [selectedImage]);

  const handleImageInput = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // Compress the image file
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        console.log("compressedFile:", compressedFile);

        // Set the selected image to the state
        setSelectedImage(compressedFile);

        // Create a reference to the image in your database
        const imgRef = ref(
          imageDb,
          `${auth.currentUser.email}/${auth.currentUser.email}`
        );

        // Upload the compressed file
        await uploadBytes(imgRef, compressedFile).then((value) => {
          getDownloadURL(value.ref).then((url) => {
            setImgUrl((data) => [...data, url]);
            setIsOpen(false);
            // Optionally save the URL to localStorage
            localStorage.setItem("imgUrl", JSON.stringify([...imgUrl, url]));
          });
        });
      } catch (error) {
        console.error("Error compressing or uploading file:", error);
        manageError("Image Upload Failed");
        setIsVisible(true);
      }
    }
  };

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1, // (default: Number.POSITIVE_INFINITY)
      // maxWidthOrHeight: 800, // (default: undefined)
      useWebWorker: true, // (default: true)
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      // console.log('compressedFile:', compressedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl((prevUrls) => [...prevUrls, reader.result]);
        // Optionally save the compressed image to localStorage
        localStorage.setItem(
          "imgUrl",
          JSON.stringify([...imgUrl, reader.result])
        );
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      // console.error('Error compressing image:', error);
    }
  };

  function controlModal() {
    setIsOpen((prev) => !prev);
  }

  const removeImage = async () => {
    if (imgUrl[0] === undefined) return;
    const imgRef = ref(
      imageDb,
      `${auth.currentUser.email}/${auth.currentUser.email}`
    );
    await deleteObject(imgRef)
      .then(() => {
        setReloadImage((prev) => !prev);
        setImgUrl([undefined]);
      })
      .catch((error) => {
        manageError("Error Deleting Image");
        setIsVisible(true);
      });
    setIsOpen(false);
  };

  const resetPrompt = () => {
    const prompt = confirm("Are you sure you want to clear all transactions?");
    if (prompt) {
      setTransactions([]);
    }
  };

  if (loading){
  return <Loader />;}

  return (
    <div className="pb-28">
      {error != "" && isVisible && (
        <p className="absolute rounded-bl z-50 bg-red-500 text-white text-sm px-1 right-0">
          {error}
        </p>
      )}
      <div>
        <Bg />
        <picture className="image-container relative flex justify-center ">
          {
            <img
              src={imgUrl[0] ? imgUrl[0] : user}
              className={`absolute bg-white user ${
                !imgUrl[0] && "p-"
              }  w-40 h-40 -mt-20 rounded-full z-20 left-0 right-0 mx-auto`}
            />
          }

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
            className="editPen absolute z-20  text-[#26afa6] border-[#24a9a0] bg-[#e7e5e596] h-10 w-10 p-2 overflow-hidden   ml-28 mt-8 border  rounded-full"
          >
            <svg
              className="lucide lucide-pencil data-[state=true]:-translate-y-8 transition-all duration-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              data-state={modalIsOpen}
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x  data-[state=false]:-translate-y-6 transition-all duration-500"
              data-state={!modalIsOpen}
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        </picture>

        <section
          data-state={modalIsOpen}
          className="dropdown data-[state=true]:translate-y-0 -translate-y-56 duration-500  bg-gradient-to-r from-[#368882] to-[#2c7e78] absolute w-full transition-all ease-in-out h-[5.4cm] top-[5cm] mt-[10cm flex items-end justify-center z-0"
        >
          <div className="pictureOptions flex text-white flex-col items-center borde leading-10  p-0 w-[95%] shadow-2x shadow-blac   rounded-t-lg  text-sm">
            <button
              onClick={handleImageClick}
              className="border-b border-gray-500 w-full "
            >
              {imgUrl[0] != undefined ? "Change" : "Add"} Image
            </button>
            <button
              onClick={removeImage}
              className={
                imgUrl[0] === undefined
                  ? "text-gray-400 w-full bg-[#2224]"
                  : undefined
              }
            >
              Remove Image
            </button>
          </div>
        </section>
      </div>
      <section className="mt-24 px-6">
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
            className={`bg-slate-400 ${
              transactions.length == 0
                ? "bg-slate-500 text-[#c4c4c4e7]"
                : "text-white"
            } py-2 text-lg font-semibold shadow-xl flex justify-center  rounded-md w-full`}
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
