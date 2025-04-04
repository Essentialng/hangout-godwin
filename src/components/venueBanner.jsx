import React from "react";
import banner from "../assets/73845e9e2e0e6aab6d9428085191f8db.jfif"
import { useNavigate } from "react-router-dom";

const VenueBanner = () => {
  const navigate = useNavigate();
  const redirect = () =>{
    navigate('/HangoutPlaces');
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
          <h2 className="text-4xl font-bold">
            Find the <em className="italic">BEST</em>{" "}
            <span className="text-red-500 text-4xl">Hangout Places</span>
          </h2>
          <p className="text-sm mt-2 w-3/4 mb-3">
          Looking for the perfect place to relax, socialize, or have fun? Explore our curated list of the best hangout spots around, from trendy cafes and amusement parks to serene beaches and shopping malls.
          </p>
        </div>

        {/* Button */}
        <button
        onClick={redirect}
         className="absolute cursor-pointer ml-5 bottom-5 left-8 bg-red-600 ml-5 text-white px-6 py-2 rounded-full font-semibold">
          Venue
        </button>
      </div>
    </div>
  );
};

export default VenueBanner;
