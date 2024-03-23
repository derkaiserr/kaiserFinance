import { useState } from "react";
import bg from "./assets/bg-home.png";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";

const PageOne = () => {
  const [eye, setEye] = useState(false);
  return (
    <div>
      <img src={bg} className="relative cover w-full" alt="" />

      <section className="absolute py-5 px-3  flex flex-col justify-center bg-[#1B5C58] rounded-lg text-white  w-[80%]  -my-24  left-0 right-0  mx-auto ight-4">
        <div className="flex  justify-between">
          <p className="flex  items-center text-sm gap-2">
            Total Balance
            <span className="">
              {eye ? (
                <EyeOff
                  className=" w-5"
                  onClick={() => {
                    setEye(false);
                  }}
                />
              ) : (
                <Eye
                  className=" w-5"
                  onClick={() => {
                    setEye(true);
                  }}
                />
              )}
            </span>
          </p>
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
            class="lucide lucide-ellipsis"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>

        <div>
          
            <p
              data-state={eye}
              className=" data-[state=true]:before:backdrop-blur-md before:bg-[#2f7e79f1  before:w-[95%] before:py-4 before:backdrop-blur-0 text-2xl  before:absolute font-semibold"
              
            >
              &#36;2,500,000.00
            </p>

            <div className="flex justify-between">

            
            <div className="">
            <div className=" flex">
              <span>
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
                  class="lucide lucide-move-up"
                >
                  <path d="M8 6L12 2L16 6" />
                  <path d="M12 2V22" />
                </svg>
              </span>
              Income
            </div>
            <p
              data-state={eye}
              className=" data-[state=true]:before:backdrop-blur-sm before:bg-[#2f7e793f before:w-[95%] before:py-3 before:backdrop-blur-0  before:absolute"
            >
              &#36;1800.00
            </p>
          </div>

          <div>
            <div className="flex">
              <span>
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
                  class="lucide lucide-move-down"
                >
                  <path d="M8 18L12 22L16 18" />
                  <path d="M12 2V22" />
                </svg>
              </span>
              Expenses
            </div>
            <p
              data-state={eye}
              className=" data-[state=true]:before:backdrop-blur-sm before:bg-[#2f7e793f before:w-[95%] before:py-3 before:backdrop-blur-0  before:absolute"
            >
              &#36;2,500.00
            </p>
          </div>
          </div>
        </div>
      </section>
      <header>
        <p>Transactions History</p>
        <p>see all</p>
      </header>

      <main>
        <div className="transActs">
          <div>
            <p>Upwork</p>
            <p>Today</p>
          </div>
          <p className="amount">+850</p>
        </div>
        <div className="transActs">
          <div>
            <p>Transfer</p>
            <p>Yesterday</p>
          </div>
          <p className="amount">-85</p>
        </div>
        <div className="transActs">
          <div>
            <p>Paypal</p>
            <p>30th Jan, 2024</p>
          </div>
          <p className="amount">+80</p>
        </div>
        <div className="transActs">
          <div>
            <p>Upwork</p>
            <p>14th Jan, 2024</p>
          </div>
          <p className="amount">+550</p>
        </div>
      </main>

        <svg
          className="fixed bg-[#1F615C]  rounded-full p-4 bottom-9 left-0 right-0 mx-auto shadow-lg shadow-slate-300 z-30 text-white "
          xmlns="http://www.w3.org/2000/svg"
          width="65"
          height="65"
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
      <footer className="fixed bottom-0 w-full  grid px-5 grid-cols-3 items-center py-3 pt-5 border border-t-2">

        <div className="flex justify-between">
          <svg
            className="group-[.footIcons]:bg-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-home"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-bar-chart"
          >
            <line x1="12" x2="12" y1="20" y2="10" />
            <line x1="18" x2="18" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="16" />
          </svg>
        </div>
        <div></div>
        <div className="flex justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-wallet"
          >
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
          </svg>
          <svg
            className="group-[.footIcons]:bg-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-user-round"
          >
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
          </svg>
        </div>
      </footer>
    </div>
  );
};

export default PageOne;
