import React from "react";
import { motion } from "framer-motion";
import gymImg from "../assets/97cc4e12581552f98ad81c76e3d3064a.jpg";
import { useNavigate } from "react-router-dom";

const EventTickets = () => {
  const naviage = useNavigate();
  const redirect = ()=>{
    naviage('/hangout/gyms');
  }
  return (
    <div className="flex flex-col md:flex-row items-center p-7 bg-gray-100 text-white">
      {/* Image Section */}
      <div className="relative w-full md:w-1/2">
        <motion.img
          src={gymImg}
          alt="Gym"
          className="w-full h-[500px] object-cover rounded-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent rounded-lg"></div>
      </div>

      {/* Text Section */}
      <motion.div
        className="flex-1 p-8 md:p-12 bg-white text-black rounded-lg shadow-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Elevate Your Fitness Journey
        </h1>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          **Elevate Your Fitness Journey! 🏋️‍♂️🔥**
          <br />
          Your health is your greatest asset, and the gym is where strength meets commitment! Whether you're looking to build muscle, improve endurance, or stay active, our gym section at Hangout is designed to keep you motivated.
        </p>
        <p className="mt-2 text-gray-600">
          Join a community of fitness enthusiasts, track your progress, and achieve your goals in an environment that fuels success. No matter your fitness level, every step counts. Start today, stay consistent, and become the best version of yourself! 💪✨
        </p>

        <hr className="my-6 border-gray-300" />

        <motion.button
        onClick={redirect}
          className="w-full cursor-pointer py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 "
          whileHover={{ scale: 1.05 }}
        >
          Explore 
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EventTickets;
