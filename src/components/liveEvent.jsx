import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import eventImage from "../assets/20.jpg";
import { useNavigate } from "react-router-dom";

const LiveEvent = () => {
  
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[400px] bg-black overflow-hidden">
      {/* Background Image */}
      <img
        src={eventImage}
        alt="Live Event"
        className="w-full h-full object-cover opacity-90"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute top-5 left-5">
        <span className="bg-white text-red-500 px-3 py-1 rounded-full font-semibold text-sm shadow-md">
          🔴 Live Events
        </span>
      </div>
      
      <div className="absolute bottom-10 left-10 text-white">
        <h1 style={{justifyContent:'end', alignItems:'end', alignSelf:'end'}} className="text-7xl font-extrabold text-orange-500 ">LASGIDI</h1>
        <h2 className="text-2xl font-semibold">TOUR <span className="text-gray-300">Seyi Vibes</span></h2>
        <div className="flex items-center mt-2 text-gray-300">
          <MapPin size={18} className="text-red-500" />
          
          <span className="ml-4"> Music / Comedy / Entertainment</span>
        </div>
        <button 
        onClick={() =>navigate('/Live')}
         className="border border-white rounded left-3 mt-10 hover:bg-white hover:text-black cursor-pointer top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition">
         Explore All Live Event
      </button>
      </div>
    </div>
  );
};

export default LiveEvent;
