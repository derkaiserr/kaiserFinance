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

const Stats = ({ data }) => {
  const chartWidth = window.innerWidth * 0.9;

  {
    console.log(data);
  }
  return (
    <div>
      <header className="flex justify-between  p-6">
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
          <select name="" className="outline-none"  id="">
            <option value="Expenses">Expenses</option>
            <option value="Income">Income</option>
          </select>
        </div>
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
          <div className="expenses">
            <div className="expense">
              <p>Starbucks</p>
              <p>-&#36;180.00</p>
            </div>
            <div className="expense">
              <p>Transfer</p>
              <p>-&#36;85.00</p>
            </div>
            <div className="expense">
              <p>Youtube</p>
              <p>-&#36;11.99</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stats;
