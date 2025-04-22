import React from "react";
import { motion } from "framer-motion";
import Images from "../assets/homepage-hero-florist-woman.png";
import brand1 from "../assets/2390316s.jpg";
import brand2 from "../assets/hotel-logo-design-service.png";
import brand3 from "../assets/airbnb-logo.png";
import brand4 from "../assets/images (2).jfif";
import { useState } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { useNavigate } from "react-router-dom";
import EventIcon from '@mui/icons-material/Event';
import brand5 from "../assets/Comfort-Inn-Logo-tumb.jpg";
import brand6 from "../assets/Microtel-Logo.png";
import brand7 from "../assets/Days-Inn-Logo.png";
import brand8 from "../assets/PG-logo-500x334-min.png";
import brand9 from "../assets/6697d091429fa6d1fe78cdad_1_KJOpWsK2S5IQvl4Sssu2zA.png";
import brand10 from "../assets/ESSENTIAL LOGO 2watermark.png";
import brand11 from "../assets/Rolex-logo+2021.jpg";
import brand13 from "../assets/uhm-luxury-hotel.jpg";
import brand12 from "../assets/canva-decorative-flourishes-antique-ornamental-logo-design-template-IhcBafQRYoA.png";

export default function PostEvent() {
    
// **Framer Motion Variant for Infinite Scrolling**
const scrollVariants = {
  animate: {
    x: ["0%", "-100%"], 
    transition: { repeat: Infinity, duration: 10, ease: "linear" },
  },
};

    const testimonials = [
        {
          rating: "⭐⭐⭐⭐⭐",
          text: "Amazing experience, highly recommended!",
          author: "Jane D.",
        },
        {
          rating: "⭐⭐⭐⭐",
          text: "Great atmosphere and wonderful service.",
          author: "Michael S.",
        },
        {
          rating: "⭐⭐⭐⭐⭐",
          text: "A must-visit! The best place to hang out.",
          author: "Emily R.",
        },
      ];
      const partnerBrands = [
        { src: brand1, alt: "Brand 1" },
        { src: brand2, alt: "Brand 2" },
        { src: brand3, alt: "Brand 3" },
        { src: brand4, alt: "Brand 4" },
        { src: brand5, alt: "Brand 5" },
        { src: brand6, alt: "Brand 6" },
        { src: brand7, alt: "Brand 6" },
        { src: brand8, alt: "Brand 6" },
        { src: brand9, alt: "Brand 6" },
        { src: brand10, alt: "Brand 6" },
        { src: brand11, alt: "Brand 6" },
        { src: brand12, alt: "Brand 6" },
        { src: brand13, alt: "Brand 6" },
      ];
      
     
      const [currentIndex, setCurrentIndex] = useState(0);

      const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      };   
      const navigate = useNavigate();
      const [isModalOpen, setIsModalOpen] = useState(false);
      const redirectToDetails = () => navigate("/ContactUs");
      const redirectToDetails2 = () => navigate("/ContactUs");
      const redirectToDetailsLiveEvent = () => navigate("/CreateLiveEvent");
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Left Section */}
      <div className="md:w-1/2 text-left space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">It's Free to be on Our Platform</h1>
        <ul className="space-y-4 text-gray-700">
          {[
            "74% of organizers stream here and have more than $10,000+ per month",
            "83% of users hire or buy from businesses listed here",
            "76 million visitors explore businesses each month",
            "Get your Business standout without stress",
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-3 text-lg"
            >
              <span className="text-red-600 text-xl">✔</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
        <motion.button
         onClick={toggleModal}
          whileHover={{ scale: 1.05 }}
          className="bg-orange-600 cursor-pointer text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-orange-700 transition"
        >
         Get Started for Free<ArrowForwardIosIcon/>
        </motion.button>

        <motion.button
         onClick={()=>{
          navigate('/AdsSub');
          window.scrollTo({top:0,behavior:'smooth'});
         }}
          whileHover={{ scale: 1.05 }}
          className="border border-orange-600 text-orange-600 cursor-pointer mt-4 ml-3  px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-orange-600 hover:text-white transition"
        >
         Run Ads <ArrowForwardIosIcon/>
        </motion.button>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-70 z-50"
          >
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center relative">
              <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={toggleModal}>
                <CloseIcon fontSize="large" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Your Spot</h2>
              {/* <span className="text-gray-600 mb-5">Post your spot here at Hangout and get millions of People turning up </span> */}
              <div className="flex flex-col space-y-4">
                {/* Events */}
                <button onClick={()=>navigate('/EventPostSelection')} className="flex flex-col items-start cursor-pointer bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition">
                  <div className="flex items-center space-x-3">
                    <EventIcon className="text-blue-500 text-2xl" />
                    <span className="text-gray-900 font-medium text-lg">Events</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Sport</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Concert</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Festival</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Comedy Show</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Theatre</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Exhibition</span>
                  </div>
                </button>

                {/* Hotels */}
                <button onClick={redirectToDetails2} className="flex flex-col items-start cursor-pointer bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition">
                  <div className="flex items-center space-x-3">
                    <HotelIcon className="text-green-500 text-2xl" />
                    <span className="text-gray-900 font-medium text-lg">Hotels</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Short-let</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Long-let</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Luxury</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Budget</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Resort</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Apartment</span>
                  </div>
                </button>

                {/* Hangout Spots */}
                <button onClick={redirectToDetails2} className="flex flex-col items-start cursor-pointer bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition">
                  <div className="flex items-center space-x-3">
                    <LocalBarIcon className="text-pink-500 text-2xl" />
                    <span className="text-gray-900 font-medium text-lg">Hangout Spots</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">Bars</span>
                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">Lounges</span>
      <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">Cafés</span>
      <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">Beach</span>
      <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">Poolside</span>
      <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">Game Center</span>
    </div>
  </button>
</div>

            </div>
          </motion.div>
        )}
      </div>
       {/* Modal */}
       

      {/* Right Section - Image with Chat Overlays */}
      <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center">
        <div className="relative w-[350px] h-[400px] rounded-lg overflow-hidden shadow-xl">
          <img src={Images} alt="Business Owner" className="rounded-lg w-full h-full object-cover" />
        </div>

        {/* Chat Bubbles */}
        {[ 
          { text: "Can i list my spot on hangout?", sender: "Message from Abby", position: "top-4 left-4" },
          { text: "Yes, we do! How can we help?", sender: "Bloom & Co", position: "top-24 left-16" },
          { text: "⭐⭐⭐⭐⭐ Bloom & Co did an AMAZING job!", sender: "", position: "bottom-16 right-4" },
          { text: "Thank you! It was our pleasure!", sender: "Bloom & Co", position: "bottom-4 right-16" },
        ].map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
            className={`absolute ${msg.position} bg-white backdrop-blur-md p-4 shadow-md rounded-lg text-sm w-48`}
          >
            {msg.sender && <p className="font-semibold text-gray-800">{msg.sender}</p>}
            <p className="text-gray-600">{msg.text}</p>
          </motion.div>
        ))}
      </div>
      
    </div>
    

    <div className="w-full px-6 md:px-20 py-16">
      {/* Testimonials Section */}
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
        <h2 className="text-4xl font-bold text-gray-900">What People Are Saying</h2>
        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-100 rounded-2xl  relative text-left"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <FormatQuoteIcon className="text-red-500 text-5xl absolute top-4 left-4" />
              <p className="text-gray-700 italic">{testimonial.text}</p>
              <FormatQuoteIcon className="text-red-500 text-5xl absolute bottom-4 right-4 rotate-180" />
              <p className="mt-4 font-semibold text-gray-900">{testimonial.author}</p>
              <p className="text-yellow-500">{testimonial.rating}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Partner Brands Section */}
      <div className="w-full mt-1 p-4 bg-white rounded-3xl text-center shadow-xl">
            <h2 className="text-4xl font-bold text-gray-800 mt-4">Trusted by Leading Brands</h2>
            <p className="text-lg text-gray-600 mt-2">
              We collaborate with globally recognized brands to bring you the best experiences.
            </p>
      
            {/* Scrolling Brands Container */}
            <div className="relative overflow-hidden mt-8">
              <motion.div className="flex space-x-10" variants={scrollVariants} animate="animate">
                {[...partnerBrands, ...partnerBrands].map((brand, index) => (
                  <motion.img
                    key={index}
                    src={brand.src}
                    alt={brand.alt}
                    className="w-30 h-22 hover:scale-110 transition-transform duration-300 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
    </div>
    </div>
    
  );
}
