import { useEffect, useRef } from "react";

export default function About({toggleAbout, reff, setToggleAbout}) {
    const handlePropagation = (e) => {
    // Prevent the click event from propagating
    e.stopPropagation();
  }

  const closeAbout = () =>{
    setToggleAbout(false);
  }

  const elementRef = useRef(null);

 
  useEffect(() => {
    if (toggleAbout === true) {
      setTimeout(() => {
        elementRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 2);
    }
  }, [toggleAbout]);
  return (
    <div   onClick={handlePropagation} data-state={toggleAbout} className="data-[state=true]:scale-100 scale-0 transition-all duration-300 ease-in fixed left-0 right-0 mx-auto w-[82vw] top-0 bottom-0 bg-white about h-[80vh] my-auto  rounded-lg shadow-lg overflow-auto z-[500] ">
      <p  className="w-full  py-5 sticky top-0 backdrop-blur-md  "></p>
        <div ref={elementRef} className="mb-8"></div>
      <div  className="px-4">

      <h1  className="font-bold mb-2 mt-4 text-3xl">About</h1>
      
      <p>
        <span className="font-semibold">Welcome to Kaiser<span className="text-green-700">Finance!</span></span> Our mission is to provide you with a seamless
        and intuitive financial management experience. Whether you're tracking
        daily expenses, monitoring weekly budgets, or analyzing yearly financial
        trends, Kaiser<span className="text-green-700">Finance</span> will help you stay on top of your finances.
      </p>
      <br />
      <h3 className="font-semibold text-2xl">What is Kaiser<span className="text-green-700">Finance?</span></h3>
      <p>Kaiser<span className="text-green-700">Finance</span> is a financial management application designed to help users manage their income and expenses efficiently. The app allows you to:</p>
      <ul>
        <li><span  className="font-semibold">Track Transactions:</span> Record and categorize your daily income and expenses.</li>
        <li><span className="font-semibold">Visualize Data:</span> Generate charts to see where your money is going.</li>
        <li><span className="font-semibold">Flexible Time Intervals:</span> Analyze your financial data over different time intervals – daily, weekly, monthly, and yearly.</li>
        <li><span className="font-semibold">Secure Storage:</span> Keep your financial data secure and accessible through Firebase integration.</li>
        <li><span className="font-semibold">Currency Conversion:</span> Kaiser<span className="text-green-700">Finance</span> also offers a dynamic currency conversion feature. Using an integrated API, we provide real-time conversion rates from dollars to naira. This ensures that you can manage your finances in your preferred currency, with accurate and up-to-date exchange rates.</li>
      </ul>

    <br />
    <h3 className="font-semibold text-2xl">Technologies Used</h3>
    <p>Kaiser<span className="text-green-700">Finance</span> is built using a modern tech stack of {"{React, Firebase, Context API, Tailwind CSS, ChartJS}"} to ensure a robust, responsive, and efficient user experience:</p>
    <br />
    <p className="font-semibold">With Kaiser<span className="text-green-700">Finance,</span> you can:</p>
    <ul className="mx-2">
        <li>Understand Your Spending Habits</li>
        <li>Set Financial Goals</li>
        <li>Stay Organized</li>
    </ul>

    
    <p className="text-gray-400 text-sm float-right  absolut z-[550] right-4 bottom-1">derKaiser • 2024</p>
      </div>
    </div>
  );
}
