import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Business, Visibility, Work } from "@mui/icons-material";
import Hotel from "../assets/ecohotel.png";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
 const  navigate = useNavigate()
    const testimonials = [
        { id: 1, name: "John Doe", text: "This platform helped me find amazing events and meet new people!", image: Hotel },
        { id: 2, name: "Sarah Smith", text: "I love how easy it is to discover fun activities with my family!", image: Hotel },
        { id: 3, name: "Michael Johnson", text: "The best way to explore events in my city. Highly recommended!", image: Hotel },
        { id: 4, name: "Emily Davis", text: "A game-changer for socializing! I’ve attended so many cool events!", image: Hotel },
      ];
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section with Background Image */}
      <motion.div
        initial={{ opacity: 0, y: -0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative p-8 flex items-center justify-center"
        style={{
         
          
          height: 200,
        }}
      >
        
        <div className="relative z-10 text-center">
          <h1 className="text-black text-6xl font-extrabold">Privacy policy</h1>
          <p className="text-lg text-gray-500 md:text-xl mt-4 max-w-2xl mx-auto">
            Find amazing events, connect with like-minded people, and create memories with family and friends.
          </p>
        </div>
      </motion.div>

      {/* Sections */}
      <section className="px-6 md:px-20 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-gray-100 p-8 rounded-lg shadow flex flex-col items-center text-center">
          <Work fontSize="large" className="text-orange-500 mb-4" />
          <h3 className="text-2xl font-semibold mb-4">What We Do</h3>
          <p className="text-gray-600">
            We provide an all-in-one platform to find and attend events that match your interests. From concerts and social gatherings to corporate networking and adventure trips, we bring people together.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg shadow flex flex-col items-center text-center">
          <Business fontSize="large" className="text-orange-500 mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-600">
            Our mission is to make social life more accessible and enjoyable by creating a space where users can easily discover and join events that align with their passions.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg shadow flex flex-col items-center text-center">
          <Visibility fontSize="large" className="text-orange-500 mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
          <p className="text-gray-600">
            We aim to become the #1 platform for event discovery worldwide, making it easier for people to find new experiences, build connections, and enjoy life to the fullest.
          </p>
        </div>
      </section>

      {/* Happy Users - Auto Sliding Testimonials */}
      

      
    </div>
  ); 
};

export default AboutUs;
