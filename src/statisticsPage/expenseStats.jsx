import { useEffect, useState, useContext } from "react";
import UserContext from "../../hooks/context/context.js";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import ChartTime from "./chartTime.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ExpenseStats = ({}) => {
  // let sortedTransactions = transactions.sort((a, b) => {
  //   return new Date(a.date) - new Date(b.date);})

  //   useEffect(() => {setTransactions(sortedTransactions)}, [transactions])
  // useEffect(() => {
  //  sortedTransactions = transactions.sort((a, b) => {
  //   return new Date(a.date) - new Date(b.date);
  // })}, [transactions])

  // setTransactions(sortedTransactions);

  // console.log(sortedTransactions)
  const [interval, setInterval] = useState("day");

  const { sortedTransactions, localCurrency, currencySymbol, transactions } =
    useContext(UserContext);

  const aggregateTransactions = (transactions, interval) => {
    const result = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      let key;

      if (interval === "day") {
        key = date.toISOString().split("T")[0];
      } else if (interval === "week") {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        key = startOfWeek.toISOString().split("T")[0];
      } else if (interval === "month") {
        const month = String(date.getMonth() + 1).padStart(2, "0");
        key = `${date.getFullYear()}-${month}`;
      } else if (interval === "year") {
        key = `${date.getFullYear()}`;
      }

      if (!result[key]) {
        result[key] = { income: 0, expense: 0 };
      }
      if (transaction.type == "1") {
        result[key].income += Number(transaction.amount * localCurrency);
      } else {
        result[key].expense += Number(transaction.amount * localCurrency);
      }
    });

    return result;
  };
  const [labelState, setLabelState] = useState("Income");
  const [colorState, setColorState] = useState("green");
  const data = aggregateTransactions(sortedTransactions, interval);
  const labels = Object.keys(data);
  const incomeData = labels.map((label) => data[label].income);
  const expenseData = labels.map((label) => data[label].expense);
  const [dataState, setDataState] = useState("income");
  const [chartBg, setchartBg] = useState("rgba(75, 192, 192, 0.2)");

  
  
  const selectedData = dataState === 'income' ? incomeData : expenseData;
  const chartData = {
    labels,
    datasets: [
      {
        label: labelState,
        data: selectedData,
        borderColor: colorState,
        borderWidth: 2,
        backgroundColor: chartBg,
        fill: true,
      },
   
    ],
  };
  const chartWidth = window.innerWidth * 0.5;



  

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

  const times = [
    { time: "Day" },
    { time: "Week" },
    { time: "Month" },
    { time: "Year" },
  ];

  const dynamicWidth = labels.length * 60;
  const containerWidth =
    interval === "month" || interval === "year" ? "90vw" : `${dynamicWidth}px`;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        // display: true,
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        display: true,
        grid: {
          display: false, // Remove grid lines for y-axis
        },
        title: {
          display: true,
          text: "Amount",
        },
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0.4, // Smooth curve (0 for straight lines)
        borderWidth: 2, // Line thickness
      },
      point: {
        radius: 4, // Point radius
        hoverRadius: 7, // Hover radius
        backgroundColor: "white", // Point background color
        borderWidth: 1, // Point border width
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
     
    },
  };

  const income = sortedTransactions.filter(
    (transactions) => transactions.type === 1
  );
  const expenses = sortedTransactions.filter(
    (transactions) => transactions.type === 2
  );
  const [transactData, setTransactData] = useState(income);
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
              setDataState("income");
              setLabelState("Income");
              setColorState("green");
              setchartBg("rgba(75, 192, 192, 0.2)")
            } else if (selectedValue === "expenses") {
              setTransactData(expenses);
              setDataState("exp");
              setLabelState("Expense");
              setColorState("red");
              setchartBg("rgba(255, 0, 0, 0.2")
            }
          }}
        >
          <option value="income">Income</option>
          <option value="expenses">Expenses</option>
        </select>
      </div>
      <ChartTime times={times} interval={interval} setInterval={setInterval} />
      <div
        className={`overflow-x-auto overflow-y-hidden white-space-nowrap ${
          interval === "month" || interval === "year"
            ? "min-w-[90vw]"
            : "w-[90vw]"
        }`}
        style={{}}
      >
        <div style={{ width: containerWidth, height: "300px" }}>
          <Line data={chartData} options={options} />
        </div>
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
