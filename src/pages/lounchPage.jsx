import { useState } from "react";
import { ChevronDown } from "lucide-react";
import hotel1 from "../assets/ecohotel.png";
import hotel2 from "../assets/439499370.jpg";
import hotel3 from "../assets/3bc0f85fa5650ec3572ed5ef20b540bbdd707d4e.jpeg";
import hotel4 from "../assets/1584363010628878.jpg";

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
  {
    id: 4,
    name: "LOTTE Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "286.5k Reviews",
    image: hotel4,
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
  {
    id: 4,
    name: "LOTTE Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "286.5k Reviews",
    image: hotel4,
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
  {
    id: 4,
    name: "LOTTE Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "286.5k Reviews",
    image: hotel4,
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
  {
    id: 4,
    name: "LOTTE Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "286.5k Reviews",
    image: hotel4,
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
  {
    id: 4,
    name: "LOTTE Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "286.5k Reviews",
    image: hotel4,
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
  {
    id: 4,
    name: "LOTTE Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "286.5k Reviews",
    image: hotel4,
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

const LounchPage = () => {
  const [selectedLocation, setSelectedLocation] = useState("Lekki");

  return (
    <div className="w-full px-6 py-12 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-center items-center bg-orange-800 p-6 rounded-xl  mb-10">
        <h2 className="text-5xl font-bold text-white">
          Lounge <span className="text-white text-2xl">(632)</span>
        </h2>

        <div className="flex items-center gap-5 mt-5 sm:mt-0">
          {/* Location Dropdown */}
          <button className="bg-white border text-green-800 px-6 ml-5 py-3 rounded-lg flex items-center gap-2 shadow-md hover:bg-black-400 transition-all">
            {selectedLocation} <ChevronDown size={20} />
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

export default LounchPage;
