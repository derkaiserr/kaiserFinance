import { useState, useEffect, useContext } from "react";
import ExpenseStats from "./expenseStats.jsx";
import UserContext from "../../hooks/context/context.js";

const Stats = () => {
  const {
    nav,
    setNav,
    localCurrency,
    currencySymbol,
    transactions,
    setTransactions,
    sortedTransactions,
    navigate,
  } = useContext(UserContext);
  const chartWidth = window.innerWidth * 0.9;

  const income = sortedTransactions.filter(
    (transactions) => transactions.type === 1
  );
  const expenses = sortedTransactions.filter(
    (transactions) => transactions.type === 2
  );
  const [transactData, setTransactData] = useState(income);

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
            onClick={ ()=> navigate(-1)}
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
        {transactions.length > 0 ? (
          <ExpenseStats
            transactData={transactData}
            setTransactData={setTransactData}
            income={income}
            expenses={expenses}
          />
        ) : (
          <p className="px-6 text-gray-500">No statistical data available.</p>
        )}
      </main>
    </div>
  );
};

export default Stats;
