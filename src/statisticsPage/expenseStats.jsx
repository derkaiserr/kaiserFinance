import { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import UserContext from "../../hooks/context/context.js";
import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import {
  LineChart,
  // Line,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  // Legend,
} from "recharts";

const ExpenseStats = ({ income, expenses, setTransactData, transactData }) => {
  // let sortedTransactions = transactions.sort((a, b) => {
  //   return new Date(a.date) - new Date(b.date);})

  //   useEffect(() => {setTransactions(sortedTransactions)}, [transactions])
  // useEffect(() => {
  //  sortedTransactions = transactions.sort((a, b) => {
  //   return new Date(a.date) - new Date(b.date);
  // })}, [transactions])

  // setTransactions(sortedTransactions);

  // console.log(sortedTransactions)

  const { sortedTransactions, localCurrency, currencySymbol } =
    useContext(UserContext);
  const [dataState, setDataState] = useState(
    sortedTransactions.map(
      (transaction) => transaction.income * localCurrency || 0
    )
  );
  const [labelState, setLabelState] = useState("Income");
  const [colorState, setColorState] = useState("green");
  const chartDataa = {
    labels: sortedTransactions.map((transaction) => transaction.date),
    datasets: [
      {
        label: labelState,
        data: dataState, // Assuming income is always present
        borderColor: colorState,
        fill: false,
      },
    ],
  };

  const chartWidth = window.innerWidth * 0.5;

  const numberWithCommas = "8,000.00";
  const numberWithoutCommas = parseFloat(numberWithCommas.replace(/,/g, ""));
  const data = sortedTransactions.map((transaction) => {
    const parts = transaction.date.split(" ");
    const dateParts = parts[0].split("/");
    const month = parseInt(dateParts[1], 10); // Extract month as a number
    return { ...transaction, month };
  });

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false, // Disable x-axis grid lines
        },
      },
      y: {
        grid: {
          display: false, // Disable y-axis grid lines
        },
      },
    },
    // responsive: true, // Set responsive to false to define fixed width and height
    // maintainAspectRatio: true, // Set maintainAspectRatio to false to allow defining custom width and height
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    // width: chartWidth, // Set width
    // height: "20rem" // Set height
  };

  const formattedNumber = (number) => {
    // Convert the string to a number
    const numericValue = parseFloat(number);

    // Check if the input is a valid number
    if (isNaN(numericValue)) {
      return ""; // Return an empty string if it's not a valid number
    }

    // Format the number with two decimal places and comma separators
    return numericValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="relative pt-10">
      <div
        className={` absolute  ${
          colorState === "green" ? "text-green-600" : "text-red-600"
        }  z-40 right-6  top-0`}
      >
        <select
          name="data"
          className="outline-none h-8 "
          id="tracker"
          onChange={(e) => {
            const selectedValue = e.target.value;
            if (selectedValue === "income") {
              setTransactData(income);
              setDataState(
                sortedTransactions.map(
                  (transaction) => transaction.income * localCurrency || 0
                )
              );
              setLabelState("Income");
              setColorState("green");
            } else if (selectedValue === "expenses") {
              setTransactData(expenses);
              setDataState(
                sortedTransactions.map(
                  (transaction) => transaction.expense * localCurrency || 0
                )
              );
              setLabelState("Expense");
              setColorState("red");
            }
          }}
        >
          <option value="income">Income</option>
          <option value="expenses">Expenses</option>
        </select>
      </div>
      <div className=" flex py-5 justify-center">
        <Line data={chartDataa} options={chartOptions} />
      </div>

      <main className="px-6 relative">
        {transactData.map((transaction) => (
          <div key={transaction.id} className="flex justify-between my-4">
            <div className="">
              <p className="font-semibold">{transaction.name}</p>
              <p className="text-slate-500 font-medium text-sm">
                {transaction.date}
              </p>
            </div>
            <p
              className={`amount font-semibold ${
                transaction.type === 1 ? "text-green-700" : "text-red-700"
              } `}
            >
              {transaction.type === 1 ? "+" : "-"} {currencySymbol}
              {formattedNumber(transaction.amount * localCurrency)}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ExpenseStats;
