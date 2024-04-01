import React, { useState } from "react";

import bg from "./assets/bg-home.png";
import ellipses from "./assets/ellipses.png";

const AddExpense = () => {


    const [inputValue, setInputValue] = useState('')
  return (
    <div>
      <img
        src={ellipses}
        className="absolute top-0 z-20 w-[50%] cover"
        alt=""
      />
      <img src={bg} className="relative cover w-full" alt="" />
      <header className="flex text-white absolute top-10 rid grid-cols-3 flex-row w-full justify-between   p-6">
        <div>
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
            class="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </div>

        <p className="font-semibold">Add Expense</p>
        <div>
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
      </header>

      <form
        className="addForm p-9 py-6 w-[90%] h-[70%] shadow-lg rounded-lg justify-between bg-white flex flex-col absolute  top-[20%] text-xl font-semibold  mx-auto left-0 right-0 "
        action=""
      >
        <div>
          <label className="text-sm text-[#666666]" htmlFor="name">
            Name
          </label>
          <br />
          <input
            className="p-2   text-[#666666]"
            type="text"
            name="name"
            id="Name"
          />
        </div>
        <div className="relative ">
          <label className="text-sm text-[#666666]" htmlFor="amount">
            Amount
          </label>
          <br />
          <p className="absolute left-3 top-[2.55rem] text-sm  ">&#36;</p>
          <input
            type="text"
            className="px-6 pr-12 py-2"
            name="amount"
            id="amount"
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
          />
          <button onClick={(e)=>{
            e.preventDefault()
            setInputValue("")}} className="absolute text-sm text-[#666666] right-1 p-2 top-[2rem]">
            Clear
          </button>
        </div>
        <div className="w-full ">
          <label className="text-sm text-[#666666]" htmlFor="date">
            Date
          </label>
          <br />
          <input type="date" name="date" className="p-2 w-full" id="date" />
        </div>
        <button className="hover:bg-[#438883] py-2 border rounded-lg w-full flex items-center justify-center hover:text-white my-3">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
