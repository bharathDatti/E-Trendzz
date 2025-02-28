// src/components/FlashSaleTimer.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const FlashSaleTimer = () => {
  // Set end time (example: 24 hours from now)
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-03-27T23:59:59") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="flex flex-col items-center mx-2">
        <span className="text-4xl font-bold text-red-100">
          {timeLeft[interval].toString().padStart(2, '0')}
        </span>
        <span className="text-sm text-gray-600 capitalize">{interval}</span>
      </div>
    );
  });

  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-lg shadow-lg max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold text-purple-100 text-center mb-4">
        ⚡Flash Sale Ends In
      </h2>
      <div className="flex justify-center ">
        {timerComponents.length ? (
          timerComponents
        ) : (
          <span className="text-white text-xl">Sale Has Ended!</span>
        )}
      </div>
      <div className="mt-4 text-center">
        <Link to={'/products'} className="bg-white text-red-500 font-semibold py-2 px-6 rounded-full hover:bg-red-100 transition duration-300">
          Grab Now🎉
        </Link>
      </div>
    </div>
  );
};

export default FlashSaleTimer;