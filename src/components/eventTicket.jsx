import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EventTickets = () => {
  const navigate = useNavigate();
  const redirectToEvent = () => {
    window.scroll(0, 0);
    navigate("/HangoutPlaces");
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-900 text-white px-4 py-12 gap-8">
      {/* Ticket Circle Section */}
      <motion.div
        className="flex-1 flex items-center justify-center relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center rounded-full border-[10px] border-red-500 bg-black shadow-2xl text-center">
          <p className="text-2xl sm:text-4xl font-bold leading-tight tracking-wide">
            EVENT <br /> TICKETS
          </p>
        </div>

        {/* Top Button */}
        <motion.button
          className="absolute -top-6 sm:top-1/3 left-2 sm:left-0 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg bg-white text-black shadow-md transition  "
          
        >
          Start a Party 
        </motion.button>

        {/* Bottom Button */}
        <motion.button
          className="absolute -bottom-6 sm:bottom-1/3 right-2 sm:right-0 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg bg-white text-black shadow-md transition"
         
        >
          Join the Vibes 
        </motion.button>
      </motion.div>

      {/* Event Info Section */}
      <motion.div
        className="flex-1 w-full p-6 sm:p-8 bg-white text-black rounded-lg shadow-xl"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
          Don't Miss the Party of the Year!
        </h2>

        <p className="mt-4 text-sm sm:text-lg text-gray-700 leading-relaxed text-center sm:text-left">
          Ready for an unforgettable night filled with <strong>music, dancing, and endless fun</strong>?  
          Secure your ticket now for <strong>exclusive access</strong> to the hottest event in town.  
          Hurry—tickets are selling fast, so grab yours today and be part of the celebration!
        </p>

        <hr className="my-6 border-gray-300" />

        <motion.button
          onClick={redirectToEvent}
          className="w-full py-3 text-sm sm:text-lg cursor-pointer font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          Explore Events and Get Your Ticket Now 
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EventTickets;
