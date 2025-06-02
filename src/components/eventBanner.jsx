import React from "react";
import banner from "../assets/ea8388fbef8fe264fa0d0cc4f88e1035.jfif";
import { useNavigate } from "react-router-dom";

const EventBanner = () => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/HangoutPlaces");
  };

  return (
    <div className="w-full px-4 sm:px-6 py-8 flex justify-center">
      <div className="relative w-full max-w-6xl rounded-full overflow-hidden bg-black text-white">
        {/* Background Image */}
        <img
          src={banner}
          alt="Venue"
          className="w-full h-50 sm:h-64 md:h-72 lg:h-70 object-cover opacity-70"
        />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-start px-4 sm:px-8 md:px-12 py-6 sm:py-10">
          <h2 className="text-center ml-5 mr-5 sm:text-left text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Find the <em className="italic">BEST EVENT</em>{" "}
            <span className="text-red-500 block">Around You</span>
          </h2>

          <p className=" ml-5 mr-5 text-center sm:text-left text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg">
            Discover the hottest events happening near you — from live music and parties to exclusive gatherings.
          </p>

          <button
            onClick={redirect}
            className=" ml-10 mr-5 cursor-pointer sm:mt-6 bg-red-600 hover:bg-red-700 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition"
          >
            Discover Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
