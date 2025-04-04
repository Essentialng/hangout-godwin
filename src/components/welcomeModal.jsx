import React from "react";
import { motion } from "framer-motion";
import bannerImage from "../assets/maxresdefault.jpg"; // Replace with your actual image

const WelcomeModal = ({ onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl"
        initial={{ x: "-100vw" }} // Moves in from the left
        animate={{ x: 0 }} // Stops at normal position
        transition={{ type: "spring", stiffness: 100, damping: 15 }} // Smooth transition
      >
        {/* Image Banner */}
        <div className="relative w-full h-full md:h-90">
          <img 
            src={bannerImage} 
            alt="Hangout Event" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center">
              🎉 Welcome to Hangout!
            </h2>
          </div>
        </div>

        {/* Text Content */}
        <div className="p-8 text-center">
          <motion.p 
            className="text-lg md:text-xl text-gray-700 leading-relaxed"
            initial={{ opacity: 0, x: -50 }} // Moves text in from the left
            animate={{ opacity: 1, x: 0 }} // Stops at normal position
            transition={{ duration: 0.8, delay: 0.3 }} // Delayed effect
          >
            The ultimate destination to explore 
            <span className="font-semibold text-orange-500"> thrilling events</span>, 
            <span className="font-semibold text-blue-500"> vibrant hangout spots</span>, and 
            <span className="font-semibold text-green-500"> exclusive experiences</span>.  
            Whether you're looking for a night of electrifying music, a cozy café to unwind, or an adventure-filled getaway,  
            we bring you the best places to 
            <span className="font-semibold text-purple-500"> connect, celebrate, and create unforgettable memories</span>.  
          </motion.p>

          {/* Call to Action Button */}
          <motion.button 
            onClick={onClose} 
            className="mt-6 px-8 py-3 text-lg bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all shadow-md"
            whileHover={{ scale: 1.05 }} // Slight pop effect on hover
            whileTap={{ scale: 0.95 }} // Press-down effect
          >
            Explore Now 🚀
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeModal;
