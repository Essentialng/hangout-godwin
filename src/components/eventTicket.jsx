import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EventTickets = () => {
  const navigate = useNavigate();
  const redirectToEvent = () =>{
    window.scroll(0,0);
    navigate('/HangoutPlaces')
    ;}
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-900 text-white p-12">
      
      {/* Circular Ticket Section */}
      <motion.div
        className="flex-1 flex items-center justify-center relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-64 h-64 flex items-center justify-center rounded-full border-[10px] border-red-500 bg-black shadow-2xl">
          <p className="text-4xl font-bold text-center leading-tight tracking-wide">
            EVENT <br /> TICKETS
          </p>
        </div>

        <motion.button
          className="absolute top-1/3 left-0 px-4 py-2 rounded-lg bg-white text-black shadow-md transition hover:bg-red-500 hover:text-white"
          whileHover={{ scale: 1.1 }}
        >
          Start a Party 🎉
        </motion.button>

        <motion.button
          className="absolute bottom-1/3 right-0 px-4 py-2 rounded-lg bg-white text-black shadow-md transition hover:bg-red-500 hover:text-white"
          whileHover={{ scale: 1.1 }}
        >
          Join the Vibes 🔥
        </motion.button>
      </motion.div>

      {/* Event Details Section */}
      <motion.div
        className="flex-1 p-8 bg-white text-black rounded-lg shadow-xl ml-4 glassmorphism"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Don't Miss the Party of the Year!
        </h2>

        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Ready for an unforgettable night filled with **music, dancing, and endless fun**? 🎶💃  
          Secure your ticket now for **exclusive access** to the hottest event in town.  
          Hurry—tickets are selling fast, so grab yours today and be part of the celebration! 🎟️✨
        </p>

        <hr className="my-6 border-gray-300" />

        <motion.button
        onClick={redirectToEvent}
          className="w-full py-3 text-lg cursor-pointer font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition"
          whileHover={{ scale: 1.05 }}
        >
         Explore Events and Get Your Ticket Now🎟️
        </motion.button>
      </motion.div>
      
    </div>
  );
};

export default EventTickets;
