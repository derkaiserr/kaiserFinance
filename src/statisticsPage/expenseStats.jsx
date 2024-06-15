import { useEffect, useState, useContext, useRef } from "react";
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
  Filler,
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

const ExpenseStats = () => {
  const [interval, setInterval] = useState("day");

  const { sortedTransactions, localCurrency, currencySymbol, theme } =
    useContext(UserContext);

  const aggregateTransactions = (transactions, interval) => {
    const result = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      let key;

      if (interval === "day") {
        key = date.toLocaleDateString("en-NG");
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
  const [colorState, setColorState] = useState("#1c9890");
  const data = aggregateTransactions(sortedTransactions, interval);
  const labels = Object.keys(data);
  const incomeData = labels.map((label) => data[label].income);
  const expenseData = labels.map((label) => data[label].expense);
  const [dataState, setDataState] = useState("income");

  const chartRef = useRef(null);
  const [fillGradient, setFillGradient] = useState([
    { color: "rgba(75, 192, 192, 0.4)" },
    { color: "rgba(255, 255, 255, 0.1)" },
  ]);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;

      const gradientStroke = ctx.createLinearGradient(500, 250, 400, 0);
      gradientStroke.addColorStop(0, colorState);
      gradientStroke.addColorStop(1, colorState);

      const gradientFill = ctx.createLinearGradient(5, 90, 30, 289);
      gradientFill.addColorStop(0, fillGradient[0].color);
      gradientFill.addColorStop(
        1,
        theme === "dark" ? "transparent" : fillGradient[1].color
      );

      chart.data.datasets[0].borderColor = gradientStroke;
      chart.data.datasets[0].pointBorderColor = gradientStroke;
      chart.data.datasets[0].backgroundColor = gradientFill;

      chart.update();
    }
  }, [colorState]);

  const selectedData = dataState === "income" ? incomeData : expenseData;
  const chartData = {
    labels,
    datasets: [
      {
        label: labelState,
        data: selectedData,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
      },
    ],
  };

  const formattedNumber = (number) => {
    const numericValue = parseFloat(number);
    if (isNaN(numericValue)) {
      return "";
    }
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
    interval === "month" || interval === "year" || labels.length < 6
      ? "90vw"
      : `${dynamicWidth}px `;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          color: theme === "dark" ? "#aaa" : "rgba(80,80,80,0.9)",
          font: {
            weight: "semibold",
          },
          beginAtZero: true,
          maxTicksLimit: 5,
          padding: 20,
        },
        grid: {
          drawTicks: false,
          display: false,
        },
      },
      x: {
        grid: {
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          color: theme === "dark" ? "#aaa" : "rgba(80,80,80,0.9)",
          font: {
            weight: "semibold",
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
      point: {
        radius: 4,
        hoverRadius: 7,
        backgroundColor: "white",
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
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
          colorState === "#1c9890" ? "text-[#1c9890]" : "text-red-600"
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
              setColorState("#1c9890");
              setFillGradient([
                { color: "rgba(75, 192, 192, 0.4)" },
                { color: "rgba(255, 255, 255, 0.1)" },
              ]);
            } else if (selectedValue === "expenses") {
              setTransactData(expenses);
              setDataState("exp");
              setLabelState("Expense");
              setColorState("rgba(205, 50, 50, 0.7)");
              setFillGradient([
                { color: "rgba(255, 50, 50, 0.4)" },
                { color: "rgba(255, 255, 255, 0.1)" },
              ]);
            }
          }}
        >
          <option value="income">Income</option>
          <option value="expenses">Expenses</option>
        </select>
      </div>
      <ChartTime
        times={times}
        interval={interval}
        setInterval={setInterval}
        dataState={dataState}
      />
      <div
        className={`overflow-x-auto overflow-y-hidden white-space-nowrap min-w-[90vw] mx-6`}
        style={{}}
      >
        <div style={{ width: containerWidth, height: "300px" }}>
          <Line data={chartData} ref={chartRef} options={options} />
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
