import { useState } from "react";
import { ChevronDown } from "lucide-react";
import hotel1 from "../assets/ecohotel.png";
import hotel2 from "../assets/439499370.jpg";
import hotel3 from "../assets/3bc0f85fa5650ec3572ed5ef20b540bbdd707d4e.jpeg";
import hotel4 from "../assets/1584363010628878.jpg";
import { useNavigate } from "react-router-dom";

const listings = [
  {
    id: 1,
    name: "EKO Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "26.5k Reviews",
    image: hotel1
  },
  {
    id: 2,
    name: "MAIROT Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "26.5k Reviews",
    image: hotel2
  },
  {
    id: 3,
    name: "Hotels and Suite",
    location: "LAGOS, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "26.5k Reviews",
    image: hotel3
  },
  {
    id: 4,
    name: "LOTTE Hotels and Suite",
    location: "Lagos, Nigeria",
    price: "₦150,000",
    rating: 5,
    reviews: "286.5k Reviews",
    image: hotel4
  }
];

const NewListings = () => {
  const [selectedLocation, setSelectedLocation] = useState("Lekki");
  const navigate = useNavigate();
  const riderect = () =>{
    navigate('HotelsNewListing');
    window.scrollTo(0,0);
  }
  
  // const apiKey = "AIzaSyAq_rSHqPq1VKhMckXEt3PQGDzdFMAxicM"; // Replace with your API key
  // const location = "37.7749,-122.4194"; // Example: San Francisco (latitude, longitude)
  
  // const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location}`;

  return (
    <div className="w-full px-6 py-10 max-w-7xl mx-auto">
    
      <div className="flex flex-col sm:flex-row justify-center ml-5 items-center bg-white p-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
    {/* <div style={{ width: "100%", height: "400px" }}>
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
      ></iframe>
    </div> */}
          New Listings<span className="text-gray-500 text-xl">(232)</span>

        </h2>
        

        <div className="flex items-center gap-4 mt-4 sm:mt-0 ml-5">
          

          {/* See More Button */}
          <button onClick={riderect}  className="bg-orange-500 cursor-pointer text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition">
            See More
          </button>
        </div>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-gray-100 p-6 rounded-xl">
        {listings.map((hotel) => (
          <div 
            key={hotel.id} 
            className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <p className="text-sm text-orange-500 font-semibold">★ Star Hotel</p>
              <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
              <p className="text-gray-500">{hotel.location}</p>
              
              <div className="flex items-center mt-3">
                <span className="text-lg font-bold text-yellow-500">{hotel.rating}★ ★ ★ ★</span>
                <p className="text-gray-500 text-sm ml-2">{hotel.reviews}</p>
              </div>

             
              <p className="text-xl font-semibold mt-3 text-gray-900">{hotel.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewListings;
