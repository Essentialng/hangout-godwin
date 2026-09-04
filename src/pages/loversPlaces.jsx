// import React,{useEffect, useState} from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { API_ROUTE } from "../ApisConf/api_config";
// import { useNavigate } from "react-router-dom";
// import fancyImg from '../assets/dfsdgsg.jpg';


// const PremiumLoversPage = () => {
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [places, setCategories] = useState([]);
//     const navigate = useNavigate();
//     const fetchHangoutPlaces = async () => {
//       try {
//         const response = await axios.get(`${API_ROUTE}/lovers-places/`);
        
//         if (response.status === 200 || response.status === 201) {
//           let places = response.data;
//           console.log("fetched", response.data);
    
//           // Filter out slugs that end with "-number" (e.g., "beaches-1", "restaurants-2", etc.)
//           places = places.filter(place => !place.slug.match(/-\d+$/));
    
//           setCategories(places); // Set the filtered data
//         } else {
//           console.log("Data not fetched");
//         }
//       } catch (error) {
//         console.log("Error fetching data", error);
//       }
//     };
   
//       useEffect(() => {fetchHangoutPlaces();}, []);

//   return (
//     <div>
//       <motion.div 
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="flex items-center justify-start relative p-8"
//         style={{
//           backgroundImage: `url('/images/maxresdefault (14).jpg')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           height: 280,
//         }}
//       >
//         <div className="absolute inset-0 bg-black/70"></div>
//         <div className="relative z-10 text-start">
//           <h1 className="text-white text-7xl font-extrabold">Lovers Place</h1>
//           <p className="text-white text-lg mt-2">
//             <span className="text-yellow-400 font-bold">Home</span> / Lovers Place
//           </p>
//         </div>
//       </motion.div>
      
//       <motion.div 
//         initial={{ opacity: 0, x: -100 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//         className="items-center justify-start relative p-8"
//         style={{
//           backgroundImage: `url('/images/map3.png')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           height: 270,
//         }}
//       >
//         <div className="absolute inset-0 bg-black/0"></div>
//         <div className="flex flex-col items-center justify-center mt-10 px-4 text-center">
//   <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 ">
//     <h2
//       style={{ fontFamily: 'monospace' }}
//       className="text-yellow-500 text-5xl sm:text-5xl md:text-6xl font-bold bg-white"
//     >
//       Discover
//     </h2>
//     <h2 className="text-5xl sm:text-5xl md:text-6xl font-bold text-gray-900 bg-white">
//       the Magic
//     </h2>
//   </div>
//   <img
//     src={fancyImg}
//     alt="fancyImg"
//     className="w-48 sm:w-60 md:w-72 h-auto mt-6 mb-10"
//   />
// </div>

//       </motion.div>
      
//       <div style={{marginTop:-100}} className="min-h-screen bg-white p-6 flex justify-center items-center">
//         <div  className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           {places.map((place, index) => (
//             <motion.div 
            
//             onClick={() => {
//               navigate(`/lovershangout/${place.slug}`);
//               window.scrollTo({top:0, behavior:'smooth'});
//             }}
            
            
            
//               key={index} 
//               initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: index * 0.2 }}
//               className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//             >
//                <motion.img
//                   src={`${API_ROUTE}${place.images?.[0]?.image}`}
//                   alt={place.name}
//                   className="w-full h-68 object-cover transition-all duration-500"
//                 />
              
//               <motion.div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
//                 <h2 className="text-white text-3xl font-bold">{place.name}</h2>
//                 <hr className="text-yellow-400 mt-2 mb-1"/>
//               </motion.div>
//               {hoveredIndex === index && (
//                 <motion.div 
//                   className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center p-4"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                    <motion.img
//                   src={`${API_ROUTE}${place.images?.[0]?.image}`}
//                   alt={place.name}
//                   className="w-60 h-48 object-cover transition-all duration-500"
//                   onClick={() => navigate(`/lovershangout/${place.slug}`)} 
//                 />
                
//                   <p className="text-white text-center mt-4">{place.description.slice(0,30)}</p>
//                   <motion.button
//                       onClick={() => navigate(`/lovershangout/${place.slug}`)} 
//                       whileTap={{ scale: 0.9 }}
//                       className="mt-4 px-6 py-2 mb-3 cursor-pointer bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg"
//                       >
//                       Explore 
//                   </motion.button>
//                 </motion.div>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumLoversPage;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { useNavigate } from "react-router-dom";
import fancyImg from '../assets/dfsdgsg.jpg';
import { MapPin, Navigation, Loader, Heart, Compass } from "lucide-react";

const PremiumLoversPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [places, setPlaces] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'nearby'
  const [radius, setRadius] = useState(10); // Default radius in km
  const navigate = useNavigate();

  // Fetch all lovers places
  const fetchLoversPlaces = async () => {
    try {
      const response = await axios.get(`${API_ROUTE}/lovers-places/`);
      
      if (response.status === 200 || response.status === 201) {
        let places = response.data;
        console.log("fetched", response.data);
  
        // Filter out slugs that end with "-number"
        places = places.filter(place => !place.slug.match(/-\d+$/));
  
        setPlaces(places);
      } else {
        console.log("Data not fetched");
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  // Get user's current location
  const getUserLocation = () => {
    setLoading(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchNearbyPlaces(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          let errorMessage = "Unable to get your location. ";
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Please enable location access in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage += "Location request timed out.";
              break;
            default:
              errorMessage += "Please check your location settings.";
          }
          
          setLocationError(errorMessage);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  // Fetch nearby places from backend
  const fetchNearbyPlaces = async (lat, lng) => {
    setLoading(true);
    try {
      // Using the all-places endpoint to get nearby lovers places
      const response = await axios.get(
        `${API_ROUTE}/nearby/all/?lat=${lat}&lng=${lng}&radius=${radius}&type=lovers`
      );
      
      if (response.status === 200) {
        // Filter only lovers places from results
        const loversResults = response.data.results.filter(
          place => place.type === 'lovers'
        );
        
        // Fetch full details for nearby places
        const nearbyDetails = await Promise.all(
          loversResults.map(async (nearby) => {
            try {
              const detailResponse = await axios.get(`${API_ROUTE}/lovers-places/${nearby.id}/`);
              return detailResponse.data;
            } catch (err) {
              console.error("Error fetching place details:", err);
              return null;
            }
          })
        );
        
        setNearbyPlaces(nearbyDetails.filter(place => place !== null));
      }
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      setLocationError("Failed to fetch nearby places. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle radius change
  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
    if (userLocation) {
      fetchNearbyPlaces(userLocation.lat, userLocation.lng);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchLoversPlaces();
  }, []);

  // Display function for places
  const displayPlaces = () => {
    if (activeTab === 'nearby') {
      return nearbyPlaces;
    }
    return places;
  };

  // Get placeholder image
  const getPlaceholderImage = (place) => {
    if (place.images?.[0]?.image) {
      return `${API_ROUTE}${place.images[0].image}`;
    }
    return '/images/lovers-placeholder.jpg'; // Add a default image
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-start relative p-8"
        style={{
          backgroundImage: `url('/images/maxresdefault (14).jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 480,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-start">
          <h1 className="text-white text-7xl font-extrabold">Lovers Place</h1>
          <p className="text-white text-lg mt-2">
            <span className="text-yellow-400 font-bold">Home</span> / Lovers Place
          </p>
        </div>
      </motion.div>
      
      {/* Decorative Section */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="items-center justify-start relative p-8"
        style={{
          backgroundImage: `url('/images/map3.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 270,
        }}
      >
        <div className="absolute inset-0 bg-black/0"></div>
        <div className="flex flex-col items-center justify-center mt-10 px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <h2
              style={{ fontFamily: 'monospace' }}
              className="text-yellow-500 text-5xl sm:text-5xl md:text-6xl font-bold bg-white"
            >
              Discover
            </h2>
            <h2 className="text-5xl sm:text-5xl md:text-6xl font-bold text-gray-900 bg-white">
              the Magic
            </h2>
          </div>
          <img
            src={fancyImg}
            alt="fancyImg"
            className="w-48 sm:w-60 md:w-72 h-auto mt-6 mb-10"
          />
        </div>
      </motion.div>
      
      {/* Tab and Location Controls */}
      <div className="bg-white px-6 pt-6" style={{ marginTop: 100 }}>
        <div className="max-w-7xl mx-auto">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-3 px-4 font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'text-pink-500 border-b-2 border-pink-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Heart size={18} />
              All Romantic Places
            </button>
            <button
              onClick={() => {
                setActiveTab('nearby');
                if (!userLocation && !nearbyPlaces.length) {
                  getUserLocation();
                }
              }}
              className={`pb-3 px-4 font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'nearby'
                  ? 'text-pink-500 border-b-2 border-pink-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Compass size={18} />
              Nearby Romantic Spots
            </button>
          </div>

          {/* Nearby Controls */}
          {activeTab === 'nearby' && (
            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={getUserLocation}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all"
                  disabled={loading}
                >
                  <Navigation size={18} />
                  {loading ? 'Finding Romance...' : 'Find Nearby Romantic Spots'}
                </button>
                
                {userLocation && (
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin size={14} className="text-pink-500" />
                    📍 Location detected
                  </div>
                )}
              </div>

              {/* Radius Selector */}
              {userLocation && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Search Radius:</span>
                  <select
                    value={radius}
                    onChange={(e) => handleRadiusChange(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                  >
                    <option value={5}>5 km (💕 Close by)</option>
                    <option value={10}>10 km (💖 Nearby)</option>
                    <option value={20}>20 km (💗 A bit far)</option>
                    <option value={50}>50 km (❤️ Worth the drive)</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Location Error Message */}
          {locationError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {locationError}
            </div>
          )}

          {/* Loading State */}
          {loading && activeTab === 'nearby' && (
            <div className="flex justify-center items-center py-20">
              <Loader className="animate-spin text-pink-500" size={40} />
              <span className="ml-3 text-gray-600">Finding romantic spots near you...</span>
            </div>
          )}

          {/* Places Grid */}
          <div className="min-h-screen bg-white pb-6">
            {displayPlaces().length === 0 && !loading && activeTab === 'nearby' ? (
              <div className="text-center py-20">
                <Heart size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No romantic spots found nearby</h3>
                <p className="text-gray-500">
                  Try increasing the search radius or check back later for new places! 💕
                </p>
                <button
                  onClick={() => setActiveTab('all')}
                  className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  Browse All Romantic Places
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {displayPlaces().map((place, index) => (
                  <motion.div 
                    onClick={() => {
                      navigate(`/lovershangout/${place.slug}`);
                      window.scrollTo({top: 0, behavior: 'smooth'});
                    }}
                    key={place.id || index} 
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Distance Badge for Nearby Places */}
                    {activeTab === 'nearby' && place.distance_km && (
                      <div className="absolute top-3 right-3 z-10 bg-pink-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Heart size={12} />
                        {place.distance_km} km away
                      </div>
                    )}

                    <motion.img
                      src={getPlaceholderImage(place)}
                      alt={place.name}
                      className="w-full h-68 object-cover transition-all duration-500"
                      onError={(e) => {
                        e.target.src = '/images/lovers-placeholder.jpg';
                      }}
                    />
                    
                    <motion.div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                      <h2 className="text-white text-3xl font-bold">{place.name}</h2>
                      <hr className="text-pink-400 mt-2 mb-1"/>
                      {activeTab === 'nearby' && place.distance_km && (
                        <p className="text-pink-300 text-sm mt-1">
                          💕 {place.distance_km} km from you
                        </p>
                      )}
                    </motion.div>

                    {hoveredIndex === index && (
                      <motion.div 
                        className="absolute inset-0 bg-black bg-opacity-85 flex flex-col justify-center items-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.img
                          src={getPlaceholderImage(place)}
                          alt={place.name}
                          className="w-60 h-48 object-cover rounded-lg transition-all duration-500"
                        />
                        <p className="text-white text-center mt-4">
                          {place.description?.slice(0, 60) || place.about?.slice(0, 60) || "Perfect spot for romance! 💕"}
                        </p>
                        
                        {activeTab === 'nearby' && place.distance_km && (
                          <p className="text-pink-400 text-sm mt-2">
                            📍 {place.distance_km} km away • {place.distance_mi} miles
                          </p>
                        )}
                        
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="mt-4 px-6 py-2 mb-3 cursor-pointer bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition-all shadow-md hover:shadow-lg"
                        >
                          Explore Romantic Spot 💕
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLoversPage;