import { useState } from "react";
import { ChevronDown } from "lucide-react";
import hotel1 from "../assets/ecohotel.png";
import hotel2 from "../assets/439499370.jpg";
import hotel3 from "../assets/3bc0f85fa5650ec3572ed5ef20b540bbdd707d4e.jpeg";
import hotel4 from "../assets/1584363010628878.jpg";
import { useNavigate } from "react-router-dom";
import { nav } from "framer-motion/client";

const listings = [
  {
    id: 1,
    name: "EKO Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "26.5k Reviews",
    image: hotel1,
  },
  {
    id: 2,
    name: "MAIROT Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "26.5k Reviews",
    image: hotel2,
  },
  {
    id: 3,
    name: "Hotels and Suite",
    location: "LAGOS, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "26.5k Reviews",
    image: hotel3,
  },
  {
    id: 4,
    name: "LOTTE Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "286.5k Reviews",
    image: hotel4,
  },
];

const NewListings = () => {
  const [selectedLocation, setSelectedLocation] = useState("Lekki");
  const navigate = useNavigate();

  const redirect = () => {
    navigate('LounchPage');
  }

  return (
    <div className="w-full px-6 py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-4xl font-bold text-gray-900">
          Lounge <span className="text-gray-500 text-2xl">(632)</span>
        </h2>

        <div className="flex items-center gap-5 mt-5 sm:mt-0">

          {/* See More Button */}
          <button onClick={redirect} className="bg-orange-500 text-white px-8 py-3 ml-5 cursor-pointer  rounded-lg font-semibold shadow-md hover:bg-orange-600 transition-all">
            See More
          </button>
        </div>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {listings.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <p className="text-sm text-orange-600 font-semibold">★ Star Hotel</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{hotel.name}</h3>
              <p className="text-gray-600 mt-1">{hotel.location}</p>

              {/* Rating */}
              <div className="flex items-center mt-4">
                <span className="text-xl font-bold text-yellow-500">{hotel.rating}★ ★ ★ ★ ★</span>
                <p className="text-gray-500 text-sm ml-3">{hotel.reviews}</p>
              </div>

              {/* Price */}
              <p className="text-2xl font-semibold mt-4 text-gray-900">{hotel.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewListings;
