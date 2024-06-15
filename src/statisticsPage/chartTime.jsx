const ChartTime = ({ times, interval, setInterval, dataState }) => {
  return (
    <div className="w-full flex justify-around buttons">
      {times.map((value, index) => (
        <button
          className={`${
            value.time.toLowerCase() == interval
              ? dataState === "income"
                ? "bg-[#1c9890] text-white "
                : "bg-red-700 text-white  rounded-md"
              : "bg-transparent"
          } p-1 px-4  rounded-md`}
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
