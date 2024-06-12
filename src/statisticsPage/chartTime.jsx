import { useState } from "react";

const ChartTime = ({ times, interval, setInterval }) => {
  return (
    <div className="w-full flex justify-around buttons">

      {times.map((value, index) => (
        <button
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
