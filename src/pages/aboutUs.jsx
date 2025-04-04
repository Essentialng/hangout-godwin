import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Business, Visibility, Work } from "@mui/icons-material";
import Hotel from "../assets/cta_girl_new.jpeg";
import Hotel2 from "../assets/image (53).png";
import Hotel3 from "../assets/bpd2.jpg";
import Hotel4 from "../assets/Image (9).png";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
 const  navigate = useNavigate()
    const testimonials = [
        { id: 1, name: "John Doe", text: "This platform helped me find amazing events and meet new people!", image: Hotel },
        { id: 2, name: "Sarah Smith", text: "I love how easy it is to discover fun activities with my family!", image: Hotel2 },
        { id: 3, name: "Michael Johnson", text: "The best way to explore events in my city. Highly recommended!", image: Hotel3 },
        { id: 4, name: "Emily Davis", text: "A game-changer for socializing! I’ve attended so many cool events!", image: Hotel4 },
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
          backgroundImage: `url('/images/an.gif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 400,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-white text-6xl font-extrabold">About Us</h1>
          {/* <p className="text-lg text-white md:text-xl mt-4 max-w-2xl mx-auto">
            Find amazing events, connect with like-minded people, and create memories with family and friends.
          </p> */}
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
      <section className="px-6 md:px-20 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Thousands of Happy Users</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          See what people are saying about their experiences with us.
        </p>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
          className="w-full"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="bg-white border border-gray-300 shadow-lg p-6 rounded-lg text-center">
              <img src={testimonial.image} alt="User" className="w-24 h-24 mx-auto rounded-full mb-4" />
              <p className="text-lg text-gray-700 italic">"{testimonial.text}"</p>
              <h4 className="mt-4 font-semibold text-gray-900">{testimonial.name}</h4>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-20 py-16 text-center bg-gray-900 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Next Event Now!</h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Whether you love concerts, networking, or just hanging out with friends, we have the perfect event for you.
        </p>
        <button
        onClick={() =>navigate('/HangoutPlaces')}
         className="px-8 py-3 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg transition">
          Browse Events
        </button>
      </section>  
    </div>
  ); 
};

export default AboutUs;
