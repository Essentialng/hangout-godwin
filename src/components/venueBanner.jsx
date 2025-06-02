import React from "react";
import banner from "../assets/73845e9e2e0e6aab6d9428085191f8db.jfif";
import { useNavigate } from "react-router-dom";

const VenueBanner = () => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/HangoutPlaces");
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div className="relative w-full max-w-6xl bg-black rounded-full overflow-hidden flex flex-col sm:flex-row items-center">
        <img
          src={banner}
          alt="Venue"
          className="w-full h-64 sm:h-62 object-cover opacity-80"
        />

        <div className="absolute inset-0 flex flex-col justify-center sm:items-start items-center text-white px-5 py-4 text-center sm:text-left">
          <h2 className="text-3xl ml-10 mr-10 sm:text-3xl md:text-4xl font-bold leading-tight">
            Find the <em className="italic">BEST</em>{" "}
            <span className="text-red-500">Hangout Places</span>
          </h2>
          <p className="text-sm ml-10 mr-10 sm:text-base mt-2 sm:w-2/3 w-full mb-4">
            Looking for the perfect place to relax, socialize, or have fun? Explore our curated list of the best hangout spots around, from trendy cafes and amusement parks to serene beaches and shopping malls.
          </p>
          <button
            onClick={redirect}
            className="bg-red-600 ml-10 mr-10 cursor-pointer  text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition"
          >
            Venue
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueBanner;
