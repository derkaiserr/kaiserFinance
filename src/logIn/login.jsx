import React, { useState, useContext, useEffect } from "react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import UserContext from "../../hooks/context/context.js";
import { AuthContext } from "../firebase/auth.jsx";
import G from "../assets/G.png";

export default function Login() {
  const { navigate, isVisible, setIsVisible } = useContext(UserContext);
  const {
    error,
    SignIn,
    doSignInWithGoogle,
    isLoading,
    doPasswordReset,
    setInputName,
    inputName,
  } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await SignIn(email, password);

      if (auth.currentUser && auth.currentUser.email === email) {
        navigate("/home");
      } else {
        throw new Error();
      }
    } catch (err) {
      setIsVisible(true);
    }
  };

  const PasswordReset = (e) => {
    e.preventDefault();
    if (email === "") return setInputName(true);
    return doPasswordReset(email);
  };

  const homeLink = "/home";

  const [eye, setEye] = useState(false);

  return (
    <div className="login max-h-full">
      {
        <p
          data-state={isVisible}
          className="absolute z-20 text-center data-[state=true]:translate-y-0 -translate-y-24 ease-in-out top-0 bg-red-500 text-white text-md transition-all duration-300 mx-auto left-0 right-0  w-full p-5 "
        >
          {error}
        </p>
      }
      <header className="absolute w-full  px-4 grid-cols-3 text-center pt-6 font-bold">
        <p>Login</p>
      </header>

      {
        <form
          className="  justify-center flex flex-col h-[100vh] px-4  w-full "
          action=""
        >
          <div className="mb-7">
            <input
              className="w-full rounded-lg border-slate-200 outline-none border px-3 h-10"
              type="email"
              placeholder="Email"
              name=""
              id="email"
              onChange={(e) => {
                setInputName(false);
                setEmail(e.target.value.toLowerCase());
              }}
            />
            {inputName && (
              <p className="text-red-500 text-sm" htmlFor="name">
                Please enter your email.
              </p>
            )}
          </div>
          <div className="relative flex items-center justify-center">
            <input
              className="w-full rounded-lg relative border-slate-200 outline-none border mb-7 px-3 pr-10 h-10"
              type={eye ? "text" : "password"}
              placeholder="Password"
              name=""
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              {eye ? (
                <EyeOff
                  className="absolute text-gray-500 right-3 top-2 "
                  onClick={() => {
                    setEye(false);
                  }}
                />
              ) : (
                <Eye
                  className="absolute text-gray-500 right-3 top-2"
                  onClick={() => {
                    setEye(true);
                  }}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            onClick={async (e) => {
              await onSubmit(e);
            }}
            className="bg-[#438883] flex justify-center items-center  rounded-lg w-full h-10 text-white my-3"
          >
            {isLoading ? (
              <div className=" loaderAdd w-5 h-5 loaderSignUp "></div>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-center text-slate-500 text-sm font-semibold mb-2">
            Or
          </p>
          <button
            onClick={doSignInWithGoogle}
            className="flex gap-3 rounded-lg  border border-slate-300 h-10 items-center justify-center text-sm font-semibold w-full"
          >
            <span>
              <img className="w-6" src={G} alt="googleIcon" />
            </span>
            Continue with Google
          </button>

          <button
            onClick={PasswordReset}
            className="text-center text-[#438883] mt-4  font-semibold "
          >
            Forgot Password?
          </button>

          <p className="pt-1 text-center">
            Don't have an account yet?
            <Link to={"/SignUp"} className="bg-transparent  text-[#438883] ">
              {" "}
              Sign Up.
            </Link>
          </p>
        </form>
      }
    </div>
  );
}
