import { useState } from "react";
import bg from "./assets/bg-home.png";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import Stats from "./stats";

const PageOne = () => {
  const [eye, setEye] = useState(false);

  const [dataInput, setDataInput] = useState(false);

  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 700 },
    { name: "May", value: 500 },
  ];
  // setDataInput(data);

  return (
    <div className="mb-24">
      <img src={bg} className="relative cover w-full" alt="" />

      <section className="absolute py-7 px-5  flex flex-col justify-center bg-[#1B5C58] rounded-3xl text-white  w-[90%]  -my-28  left-0 right-0  mx-auto">
        <div className="flex  justify-between">
          <p className="flex font-semibold  items-center text-sm gap-2">
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
            className=" data-[state=true]:before:backdrop-blur-md before:bg-[#2f7e79f1  before:w-full before:-mx-5 before:py-4 before:backdrop-blur-0 text-2xl  before:absolute font-semibold"
          >
            &#36;2,504,394.52
          </p>

          <div className="flex justify-between pt-9">
            <div className="">
              <div className="items-center text-sm font-semibold text-[#ffffffc6]  justify-start gap-1 flex">
                <span className="rounded-full p-1  bg-[#ffffff41]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
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
                Income
              </div>
              <p
                data-state={eye}
                className=" data-[state=true]:before:backdrop-blur-sm font-semibold before:bg-[#2f7e793f before:w-full before:-mx-5 before:py-3 before:backdrop-blur-0  before:absolute"
              >
                &#36;3,250,000.00
              </p>
            </div>

            <div className="font-semibold">
              <div className="flex gap-1 text-sm  text-[#ffffffc6] items-center">
                <span className="rounded-full text-white p-1 bg-[#ffffff41]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
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
                Expenses
              </div>
              <p data-state={eye} className=" flex justify-end">
                &#36;745,605.48
              </p>
            </div>
          </div>
        </div>
      </section>
      <header className="mt-28 flex justify-between px-6 ">
        <p className="font-semibold text-lg">Transactions History</p>
        <p className="text-sm text-gray-500 font-semibold">see all</p>
      </header>

      <main className="px-6">
        <div className="transActs ">
          <div>
            <p>Upwork</p>
            <p>Today</p>
          </div>
          <p className="amount text-green-700">+&#36;8,000.00</p>
        </div>
        <div className="transActs">
          <div>
            <p>Transfer</p>
            <p>Yesterday</p>
          </div>
          <p className="amount text-red-700">-&#36;845.00</p>
        </div>
        <div className="transActs">
          <div>
            <p>Paypal</p>
            <p>30th Jan, 2024</p>
          </div>
          <p className="amount text-green-700">+&#36;14,000.00</p>
        </div>
        <div className="transActs">
          <div>
            <p>Upwork</p>
            <p>14th Jan, 2024</p>
          </div>
          <p className="amount text-green-700">+&#36;550.00</p>
        </div>
      </main>
      <div className="fixed bg-[#1F615C]  rounded-full p-3 bottom-8 left-0 right-0 mx-auto shadow-lg shadow-slate-300 z-30 text-white w-fit">
        <svg
          className=""
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
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
      </div>
    </div>
  );
};

export default PageOne;
