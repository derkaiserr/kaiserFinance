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

const ExpenseStats = ({ data }) => {
  const chartWidth = window.innerWidth * 0.9;
  return (
    <div>
      <div className=" flex justify-center">
        <LineChart
          width={chartWidth}
          height={400}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#1B5C58" />
        </LineChart>
      </div>

      <section>
        <div className="flex justify-between items-center p-6">
          <p className="font-semibold">Top Spending</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up-down"
          >
            <path d="m21 16-4 4-4-4" />
            <path d="M17 20V4" />
            <path d="m3 8 4-4 4 4" />
            <path d="M7 4v16" />
          </svg>
        </div>
        <div className="expenses px-6">
        <div className="transActs">
            <div>
              <p>Starbucks</p>
              <p>Jan 22, 2024</p>
            </div>
            <p className="amount  text-red-700">-&#36;180.00</p>
          </div>
        
          
          <div className="transActs">
            <div>
              <p>Transfer</p>
              <p>Yesterday</p>
            </div>
            <p className="amount  text-red-700">-&#36;85.00</p>
          </div>
          <div className="transActs">
            <div>
              <p>Youtube</p>
              <p>Feb 14, 2024</p>
            </div>
            <p className="amount  text-red-700">-&#36;11.99</p>
          </div>
         
        </div>
      </section>
    </div>
  );
};

export default ExpenseStats;
