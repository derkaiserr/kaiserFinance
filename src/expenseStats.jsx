import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ExpenseStats = ({ chartData, transactions }) => {
  const chartWidth = window.innerWidth * 0.9;

  const numberWithCommas = "8,000.00";
  const numberWithoutCommas = parseFloat(numberWithCommas.replace(/,/g, ""));
  const data = transactions.map((transaction) => {
    const parts = transaction.date.split(' ');
    const dateParts = parts[0].split('/');
    const month = parseInt(dateParts[1], 10); // Extract month as a number
    return { ...transaction, month };
    
    
  });
  const groupedData = data.reduce((acc, curr) => {
    const { month, income, expense } = curr;
    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 };
    }
    if (income) {
      acc[month].income += income;
    }
    if (expense) {
      acc[month].expense += expense;
    }
    return acc;
  }, {});
  const chartD = Object.values(groupedData);
  console.log(chartD)

  return (
    <div>
      <div className=" flex justify-center">
        <LineChart
          width={chartWidth}
          height={400}
          data={chartD}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#1B5C58" />
          <Line type="monotone" dataKey="expense" stroke="#FF0000" />
        </LineChart>
        
      </div>

      <main className="px-6">
        {chartData.map((transaction) => (
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
              {transaction.type === 1 ? "+" : "-"} &#36;{transaction.amount}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ExpenseStats;
