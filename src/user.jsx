import { useState, useEffect, createContext, useContext, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
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
  const [selectedImage, setSelectedImage] = useState("");
  const [matchingName, setMatchingName] = useState(() => {
    // Retrieve initial state from local storage
    const savedName = localStorage.getItem("savedNames");
    return savedName ? JSON.parse(savedName) : null;
  });

  useEffect(() => {
    // Save state to local storage whenever it changes
    localStorage.setItem("savedNames", JSON.stringify(matchingName));
  }, [matchingName]);

  const [imgUrl, setImgUrl] = useState([])

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
        await uploadBytes(imgRef, file)
        .then(value =>{
          getDownloadURL(value.ref).then(url =>{
            setImgUrl(data => [...data, url])
          })
        })
        console.log("Upload successful");
      } catch (error) {
        console.error("Error uploading file:", error);
      }

      // Log the file for debugging purposes
      // console.log(file);
    }
  };



  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = ref(imageDb, `${auth.currentUser.email}`);
        const imgs = await listAll(imagesRef);

        if (imgs.items.length === 0) {
          console.log("No images found");
          return;
        }

        console.log(imgs); // Check the structure and content of imgs

        const urls = await Promise.all(
          imgs.items.map(async (val) => {
            const url = await getDownloadURL(val);
            return url;
          })
        );

        setImgUrl(urls);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, [selectedImage]); // Add any necessary dependencies

  useEffect(() => {
    console.log(imgUrl);
  }, [imgUrl]);

  // const cityRef = doc(db, 'userName', 'Ya4rTI1lFMn6Uu78ABSh');
  // setDoc(cityRef, { picture: selectedImage }, { merge: true });

  // const Docs = getDocs(colRef)
  //   .then((snapshot) => {
  //     // Filter documents based on email
  //     const filteredDocs = snapshot.docs.filter((doc) => {
  //       return doc.data().email === auth.currentUser.email;
  //     });

  //     // Log the filtered documents
  //     filteredDocs.forEach((doc) => {
  //       const name = doc.data().name;
  //       return name;
  //     });

  //     // Optionally, return the filtered documents if needed
  //     // return filteredDocs;
  //   })
  //   .catch((error) => {
  //     console.error("Error getting documents: ", error);
  //   });

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
        <img src={bg} className="relative cover w-full" alt="" />
        <picture className="image-container relative flex justify-center ">
          {
            <img
              onClick={handleImageClick}
              src={imgUrl ? imgUrl[0] : user}
              className={`absolute bg-white user ${
                !imgUrl && "p-8"
              }  w-40 h-40 -mt-20 rounded-full left-0 right-0 mx-auto`}
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
        </picture>
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
              setImgUrl([])
              setMatchingName(null)
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
