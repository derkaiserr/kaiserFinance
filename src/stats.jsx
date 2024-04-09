import { useState, useEffect } from "react";
import ExpenseStats from "./expenseStats";

const Stats = ({ data, nav, setNav, transactions }) => {
  const chartWidth = window.innerWidth * 0.9;

  const income = transactions.filter((transactions) => transactions.type === 1);
  const expenses = transactions.filter(
    (transactions) => transactions.type === 2
  );
  const [transactData, setTransactData] = useState(expenses);

  useEffect(() => console.log(transactData), [transactData]);
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-down-to-line"
          >
            <path d="M12 17V3" />
            <path d="m6 11 6 6 6-6" />
            <path d="M19 21H5" />
          </svg>
        </div>
      </header>

      <main>
        <section className="head flex justify-around py-4 pb-12">
          <button
            onClick={() => {
              setTransactData(expenses);
            }}
          >
            Day
          </button>
          <button>Week</button>
          <button>Month</button>
          <button>Year</button>
        </section>
        <div className="absolute text-[#1B5C58] z-40 right-8 ">
          <select
            name="data"
            className="outline-none"
            id="tracker"
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue === "Expenses") {
                setTransactData(expenses);
              } else if (selectedValue === "Income") {
                setTransactData(income);
              }
            }}
          >
            <option value="Expenses">Expenses</option>
            <option value="Income">Income</option>
          </select>
        </div>

        <ExpenseStats chartData={transactData} transactions={transactions} />
      </main>
    </div>
  );
};

export default Stats;
