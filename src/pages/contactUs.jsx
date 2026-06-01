import React from "react";
import { motion } from "framer-motion";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import gd from '../assets/about.jpg';

const ContactUs = () => {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
     
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center justify-center p-8"
        style={{
          backgroundImage: `url('/images/about.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 400,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold">Get in Touch</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            Reach out to us for inquiries, collaborations, or support.
          </p>
        </div>
      </motion.div>

      <div style={{marginTop:-120}} className="container relative mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[{
          icon: <Phone fontSize="large" className="text-blue-600" />, title: "Call Us",
          text: "Need immediate assistance? Give us a call, and our team will be happy to help.",
          contact: "+234 90 567 890"
        }, {
          icon: <Email fontSize="large" className="text-blue-600" />, title: "Email Us",
          text: "Have questions or inquiries? Send us an email, and we’ll get back to you as soon as possible.",
          contact: "support@ehangout.com"
        }, {
          icon: <LocationOn fontSize="large" className="text-blue-600" />, title: "Visit Us",
          text: "Stop by our office for a chat. We’re open Monday to Friday from 9 AM to 5 PM.",
          contact: "122 Ikeja, City, Lagos"
        }].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 shadow-lg flex flex-col items-center text-center transition duration-300"
          >
            {item.icon}
            <h3 className="text-2xl font-semibold mt-4">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.text}</p>
            <p className="text-gray-900 font-medium mt-2">{item.contact}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 items-center justify-center">
        {/* Left: Image Section */}
        <div className="h-full">
          <img src={gd} alt="Contact Us" className="w-full h-full object-cover rounded-2xl shadow-lg" />
        </div>

        {/* Right: Contact Form */}
        <div className="h-full flex flex-col justify-center bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800">Send Us a Message</h2>
          <form className="mt-6 space-y-6">
            {['Your Name', 'Your Email', 'Your Phone Number'].map((placeholder, index) => (
              <input
                key={index}
                type={placeholder.includes('Email') ? 'email' : 'text'}
                placeholder={placeholder}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            ))}
            <textarea
              placeholder="Your Message"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-800 focus:outline-none shadow-sm"
              rows="4"
            ></textarea>
            <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 cursor-pointer text-white py-4 rounded-lg hover:opacity-90 transition duration-300 shadow-md">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-16">
        <iframe
          className="w-full h-96 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126904.00036630788!2d3.3215902395509034!3d6.524379265356843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2a5a10a6a1%3A0xf7b8f0f885b1a5d2!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1619821141345!5m2!1sen!2sng"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
