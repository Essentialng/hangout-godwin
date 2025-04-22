import React from 'react';
import { motion } from 'framer-motion';
import banner2 from "../assets/55b01c6d55887293833407e5365c550f.jpg";

const NonprofitHeroSection = () => {
  const Foods = [
    'Amala', 'Vegetable', 'Fried Rice', 'Sausage', 'Barbeque',
    'Ofada Rice', 'Iyan', 'Suya', 'Mishai', 'Pepper Soup',
    'Lounge', 'Chinese Food', 'Lunch', 'Dinner', 'Lasagne',
    'Akara', 'Burger', 'Cake', 'Okra Soup', 'Beans',
    'Shawarma', 'Chicken', 'Platains', 'Efo Riro'
  ];

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] mt-10">
      {/* Background Image */}
      <img
        src={banner2}
        alt="Live Streaming"
        className="w-full h-full object-cover"
        style={{ borderTopLeftRadius: 150, borderTopRightRadius: 150 }}
      />
      <div
        style={{ borderTopLeftRadius: 150, borderTopRightRadius: 150 }}
        className="absolute inset-0 bg-black/70"
      ></div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-10">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-orange-600 mt-4 sm:mt-6 md:mt-8 font-bold leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Explore Fast Food Near You
      </motion.h2>

        {/* Scrollable list on mobile, grid on larger screens */}
        <motion.div
          className="mt-4 mb-6 w-full max-w-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <div className="flex md:grid md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 gap-3 overflow-x-auto no-scrollbar px-1 sm:px-4">
            {Foods.map((food, index) => (
              <motion.span
                key={index}
                className="bg-white whitespace-nowrap flex-shrink-0 px-3 py-1 mt-3 rounded-full hover:bg-orange-200 hover:text-black font-semibold shadow-md text-black text-sm sm:text-base"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {food}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <a href="https://efood.efixit.ng/">
          <motion.button
            className="mt-4 bg-orange-600 border border-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-lg md:text-xl font-semibold rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105 hover:bg-orange-700"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Visit E-Food Now
          </motion.button>
        </a>
      </div>
    </div>
  );
};

export default NonprofitHeroSection;
