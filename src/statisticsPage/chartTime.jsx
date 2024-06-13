import { useState } from "react";

const ChartTime = ({ times, interval, setInterval, dataState }) => {
//  const [savedTime, setSavedTime] = useState("")

  return (
    <div className="w-full flex justify-around buttons">

      {times.map((value, index) => (
        <button className={(value.time.toLowerCase() == interval ? (dataState === "income" ? "bg-green-800 text-white " : "bg-red-700 text-white p-2 rounded-md" ) : "bg-transparent") + "p-2 rounded-md"}
          onClick={(e) => {
            setInterval(value.time.toLowerCase());
          }}
          key={index}
        >
          {value.time}
        </button>
      ))}
    </div>
  );
};

export default ChartTime;
