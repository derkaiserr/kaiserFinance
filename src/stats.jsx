import { useState, useEffect } from "react";
import ExpenseStats from "./expenseStats";

const Stats = ({ data, nav, setNav }) => {
  const chartWidth = window.innerWidth * 0.9;

  useEffect(() => {
    setNav(true);

    // return () => {

    // };
  }, [nav]);
  {
    console.log(data);
  }

  return (
    <div className="mb-28">
      <header className="flex justify-between   p-6">
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

        <p className="font-semibold">Statistics</p>
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
            class="lucide lucide-arrow-down-to-line"
          >
            <path d="M12 17V3" />
            <path d="m6 11 6 6 6-6" />
            <path d="M19 21H5" />
          </svg>
        </div>
      </header>

      <main>
        <section className="head flex justify-around py-4 pb-12">
          <button>Day</button>
          <button>Week</button>
          <button>Month</button>
          <button>Year</button>
        </section>
        <div className="absolute text-[#1B5C58] z-40 right-8 ">
          <select name="" className="outline-none" id="">
            <option value="Expenses">Expenses</option>
            <option value="Income">Income</option>
          </select>
        </div>

        <ExpenseStats data={data} />
      </main>
    </div>
  );
};

export default Stats;
