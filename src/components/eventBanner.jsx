import React from "react";
import banner from "../assets/ea8388fbef8fe264fa0d0cc4f88e1035.jfif"
import { useNavigate } from "react-router-dom";

const EventBanner = () => {
  const naviage = useNavigate();
  const redirect = () =>{
    naviage('/HangoutPlaces');
  }
  return (
    <div className="flex justify-center items-center py-10">
      <div className="relative w-full max-w-6xl bg-black rounded-full overflow-hidden flex items-center">
        {/* Background Image */}
        <img
          src={banner}
          alt="Venue"
          className="w-full h-52 object-cover opacity-80"
        />

        {/* Content */}
        <div className="absolute left-8 text-white">
          <h2 className="text-4xl font-bold ">
            Find the <em className="italic ">BEST EVENT</em>{" "}
            <span className="text-red-500 text-4xl">Happening Arround you Places</span>
          </h2>
          <p className="text-sm mt-2 w-3/4">
          Don’t miss out on the excitement! Get your ticket now and be part of unforgettable parties, live shows, and special gatherings near you.
          </p>
        </div>

        {/* Button */}
        <button 
        onClick={redirect}
        className="absolute cursor-pointer mt-5 bottom-5 left-8 bg-red-600 ml-5 text-white px-6 py-2 rounded-full font-semibold">
          Event
        </button>
      </div>
    </div>
  );
};

export default EventBanner;
