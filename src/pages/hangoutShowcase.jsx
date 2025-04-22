import React, { useEffect, useState } from "react";
import FunPlace from "../components/funPlaces2";
import Hotel from "../assets/ecohotel.png";
import Interior from "../assets/857e0757f11a5dae20e7c6572885f2a5.png";
import Dining from "../assets/1300d4d6c8ad7b571d091064b86f3b53.png";
import Lounge from "../assets/383aaf179876b8c6cb3cd4d15c0ba478.png";
import Bed from "../assets/icons/bed.png";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import Images from "../assets/maxresdefault.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";


  
const Showcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
  const redirect = () => {
    navigate('/HangoutPlaces');
  }

  const [events, setEvents] = useState([]);
          
      
          useEffect(() => {
            const token = localStorage.getItem('auth_token')
            axios.get(`${API_ROUTE}live-events/`, {
                headers: {
                    Authorization: `Token ${token}`, 
                },
            })
            .then(response => {
                setEvents(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching live events:", error);
                setLoading(false);
            });
        }, []);
  return (
    <div className="bg-white min-h-screen text-gray-900">
      
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-16 bg-white">
  {/* Left Section */}
  <div className="md:w-1/2 text-left space-y-6">
    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
      Where All The Fun <span className="text-orange-600">Memories Begin</span>
    </h1>
    <ul className="space-y-4 text-gray-700">
      {[
        "Discover top-rated hangout spots near you",
        "Join a growing community of fun-seekers",
        "Easily connect with businesses for reservations",
      ].map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="flex items-center space-x-3 text-base md:text-lg"
        >
          <span className="text-red-600 text-xl">✔</span>
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
    <motion.button
      onClick={redirect}
      whileHover={{ scale: 1.05 }}
      className="bg-red-600 cursor-pointer text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold shadow-lg hover:bg-red-700 transition"
    >
      Explore Place <ArrowForwardIosIcon />
    </motion.button>
  </div>

  {/* Right Section */}
  <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center">
    <div className="relative w-full max-w-[650px] h-[350px] md:h-[600px] rounded-lg overflow-hidden shadow-xl">
      <img
        src={Images}
        alt="People Enjoying Hangout"
        className="rounded-lg w-full h-full object-cover"
      />
    </div>
  </div>
</section>



      {/* Categories Section */}
      <FunPlace />

      {/* Latest Events Media */}
      <section className="px-10 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Latest Events Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
              {events.map(event => (
                  <div key={event.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg  ">
                      <img src={event.image} alt={event.event_title} className="w-full h-48 object-cover" />
                      <div className="p-5">
                      <h2 className="text-lg font-semibold mt-2">{event.event_title}</h2>
                     
                      <p className="text-sm text-gray-500 mt-1">Location: {event.location}</p>
                      <p className="text-sm text-gray-500">Date: {new Date(event.event_date_time).toLocaleString()}</p>
                      <p className="text-sm text-gray-700 mt-2">{event.about.slice(0,100)+ '...'}</p>
                      
                      <button
                        className="mt-6 bg-orange-600 text-white cursor-pointer hover:bg-orange-700 p-3 mx-auto font-semibold rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
                        onClick={() => navigate(`/LiveEventDetails/${event.slug}`)}
                      >
                        View Event
                      </button>
                      </div>
                  </div>
              ))}
          </div>
      </section>
    </div>
  );
};

export default Showcase;
