// import React,{useEffect, useState} from "react";
// import { motion } from "framer-motion";
// import { Typewriter } from "react-simple-typewriter";
// import axios from "axios";
// import { API_ROUTE } from "../ApisConf/api_config";
// import { useNavigate } from "react-router-dom";
// import design from '../assets/ewwww.jpg';
// import bannerImage from "../assets/maxresdefault.jpg"; 
// import banner from "../assets/y2O4cqtylhP8.png"
// import banner2 from "../assets/maxresdefault (1).png"
// import { UserPlus } from "lucide-react";
// import fancyImg from '../assets/dfsdgsg.jpg';

// const PremiumHangoutPage = () => {

//   const [places, setCategories] = useState([]);
//   const navigate = useNavigate();

//   const people =[
//     { 
//       title: "Evelyn Drake", 
//       desc: "Relax and soak up the sun at a scenic beach destination.", 
//       img: bannerImage || "https://www.cluburlaub.de/db_images/anlagen/1178/1178_2_20200518123139.jpg"
//     },
//     { 
//       title: "Grace Ik", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Lord Money", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "John Isaac", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Dianna Awai", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Chioma Ikwegbewe", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Chioma Ikwegbewe", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Chioma Ikwegbewe", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Chioma Ikwegbewe", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },

//   ]
 
   
//   const fetchHangoutPlaces = async () => {
//     try {
//       const response = await axios.get(`${API_ROUTE}/hangout-places/`);
      
//       if (response.status === 200 || response.status === 201) {
//         let places = response.data;
  
//         // Filter out slugs that end with "-number" (e.g., "beaches-1", "restaurants-2", etc.)
//         places = places.filter(place => !place.slug.match(/-\d+$/));
  
//         setCategories(places); // Set the filtered data
//       } else {
//         console.log("Data not fetched");
//       }
//     } catch (error) {
//       console.log("Error fetching data", error);
//     }
//   };
//     useEffect(() => {fetchHangoutPlaces();}, []);
//   return (
//     <div>
//       <motion.div 
//           className="flex items-center justify-start relative p-8"
//           style={{
//             backgroundImage: `url('/images/1865104_740x550.jpg')`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             height: 400,
//           }}
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="absolute inset-0 bg-black/70"></div>
//           <div className="relative z-10 text-start">
//             <h1 className="text-white text-6xl font-extrabold">Hangout Places</h1>
//             <p className="text-white text-lg mt-2">
//               <span style={{ fontFamily: 'Poppins-Bold' }} className="text-yellow-400 font-bold">Home</span> / Hangout Places
//             </p>
//           </div>
//       </motion.div>
      
//       <motion.div className="bg-white py-8 text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black font-bold mt-5 leading-tight max-w-4xl mx-auto">
//           Explore {" "}
//           <span className="text-yellow-500">
//             <Typewriter
//               words={["Good Vibes Only", "The Place to Be", "Relax. Enjoy"]}
//               loop={true}
//               cursor
//               cursorStyle="|"
//               typeSpeed={100}
//               deleteSpeed={60}
//               delaySpeed={2000}
//             />
//           </span>
//         </h1>
//         <div>
//              <img src={fancyImg} alt='fancyImg' className="w-100 h-20 mx-auto"/>
//         </div>
//       </motion.div>
//       <div className="min-h-screen bg-white p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//           {places.map((place, index) => (
//             <motion.div
//               key={index}
//               onClick={() => {
//                 navigate(`/hangout/${place.slug}`);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//               }}
              
//               className="relative bg-white shadow rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
//               whileHover={{ scale: 1.05 }}
//               initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: index * 0.2 }}
//             >
//               <div className="relative">
            
//               <motion.img
//                 src={`${API_ROUTE}${place.images?.[0]?.image}`}
//                 alt={place.name}
//                 loading="lazy"
//                 className="w-full h-68 object-coverd transition-all duration-500"
//               />
//                 <div className="absolute inset-0 bg-black/10"></div>
//                 <div className="absolute inset-0 flex justify-center items-center bg-opacity-40">
//                   <h2 className="text-3xl font-bold text-white">{place.name}</h2>
//                 </div>
//               </div>
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-500 p-6 text-center"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
//                   {place.name}
//                 </h2>
//                 <p className="text-gray-300 mt-2 px-4 text-lg leading-relaxed">
//                   {place.description.slice(0,30)}
//                 </p>
//                 <motion.button
//                   onClick={() => navigate(`/hangout/${place.slug}`)} 
//                   whileTap={{ scale: 0.9 }}
//                   className="mt-4 px-6 py-2 cursor-pointer bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg"
//                 >
//                   Explore 
//                 </motion.button>
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//         <div className="mx-auto ">
//           <h3 style={{fontFamily:'cursive'}} className="mx-auto text-center p-5 mt-10 rounded-full">More Comming Soon....</h3>
//         </div>
//         {/* bg-gradient-to-r from-orange-100 */}
        
        
//         <div className="flex flex-col-reverse lg:flex-row items-center justify-between mt-10 gap-10 max-w-7xl mx-auto bg-white rounded-3xl ">
//         <motion.img
//         src={design}
//         alt="Discover Ossh"
//         className="w-40 max-w-xs sm:max-w-sm lg:max-w-md h-auto object-contain"
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//       />
//   {/* Text and People Section */}
//   <section className="w-full  bg-gray-100 p-6 sm:p-10 rounded-2xl shadow-inner text-center">
//     <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//       Find Your Perfect Hangout Partner
//     </h2>
//     <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
//       Connect with like-minded individuals on <span className="font-bold text-orange-600">Ossh</span>. Whether you're looking for adventure, meaningful conversations, or a casual meetup, we help you find the right company.
//     </p>

//     {/* People Grid */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 sm:mt-10 px-2 sm:px-0">
//       {people.slice(0, 6).map((user, index) => (
//         <motion.div
//           key={index}
//           className="bg-white rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg border border-gray-100 transition"
//           whileHover={{ scale: 1.03 }}
//         >
//           <img
//             src={user.img}
//             alt={user.title}
//             className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-orange-500 shadow -mt-12"
//           />
//           <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-4">{user.title}</h3>
//           <p className="text-green-600 text-sm font-medium">🟢 Available</p>
//           <a
//             href="https://ooshlink.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-4 px-5 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-all"
//           >
//             <UserPlus className="inline-block mr-2 w-4 h-4" />
//             Connect
//           </a>
//         </motion.div>
//       ))}
//     </div>

//     {/* Explore Button */}
//     <a
//       href="https://ooshlink.com/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="inline-block mt-10 px-8 py-3 border border-orange-600 text-orange-600 font-semibold text-base sm:text-lg rounded-lg hover:bg-orange-600 hover:text-white transition-all"
//     >
//       Explore More
//     </a>
//   </section>

//   {/* Image Section */}
  
// </div>

//       </div>
//     </div>
//   );
// };

// export default PremiumHangoutPage;



// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Typewriter } from "react-simple-typewriter";
// import axios from "axios";
// import { API_ROUTE } from "../ApisConf/api_config";
// import { useNavigate } from "react-router-dom";
// import design from '../assets/ewwww.jpg';
// import bannerImage from "../assets/maxresdefault.jpg"; 
// import banner from "../assets/y2O4cqtylhP8.png";
// import banner2 from "../assets/maxresdefault (1).png";
// import { UserPlus, MapPin, Navigation, Loader } from "lucide-react";
// import fancyImg from '../assets/dfsdgsg.jpg';

// const PremiumHangoutPage = () => {
//   const [places, setPlaces] = useState([]);
//   const [nearbyPlaces, setNearbyPlaces] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [locationError, setLocationError] = useState(null);
//   const [activeTab, setActiveTab] = useState('all'); // 'all' or 'nearby'
//   const [radius, setRadius] = useState(10); // Default radius in km
//   const navigate = useNavigate();

//   const people = [
//     { 
//       title: "Evelyn Drake", 
//       desc: "Relax and soak up the sun at a scenic beach destination.", 
//       img: bannerImage || "https://www.cluburlaub.de/db_images/anlagen/1178/1178_2_20200518123139.jpg"
//     },
//     { 
//       title: "Grace Ik", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Lord Money", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "John Isaac", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Dianna Awai", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Chioma Ikwegbewe", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//   ];

//   // Fetch all hangout places
//   const fetchHangoutPlaces = async () => {
//     try {
//       const response = await axios.get(`${API_ROUTE}/hangout-places/`);
      
//       if (response.status === 200 || response.status === 201) {
//         let places = response.data;
//         // Filter out slugs that end with "-number"
//         places = places.filter(place => !place.slug.match(/-\d+$/));
//         setPlaces(places);
//       }
//     } catch (error) {
//       console.log("Error fetching data", error);
//     }
//   };

//   // Get user's current location
//   const getUserLocation = () => {
//     setLoading(true);
//     setLocationError(null);
    
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//           fetchNearbyPlaces(latitude, longitude);
//         },
//         (error) => {
//           console.error("Geolocation error:", error);
//           let errorMessage = "Unable to get your location. ";
          
//           switch(error.code) {
//             case error.PERMISSION_DENIED:
//               errorMessage += "Please enable location access in your browser settings.";
//               break;
//             case error.POSITION_UNAVAILABLE:
//               errorMessage += "Location information is unavailable.";
//               break;
//             case error.TIMEOUT:
//               errorMessage += "Location request timed out.";
//               break;
//             default:
//               errorMessage += "Please check your location settings.";
//           }
          
//           setLocationError(errorMessage);
//           setLoading(false);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 0
//         }
//       );
//     } else {
//       setLocationError("Geolocation is not supported by your browser.");
//       setLoading(false);
//     }
//   };

//   // Fetch nearby places from backend
//   const fetchNearbyPlaces = async (lat, lng) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${API_ROUTE}/nearby/hangout/?lat=${lat}&lng=${lng}&radius=${radius}`
//       );
      
//       if (response.status === 200) {
//         setNearbyPlaces(response.data.results);
//       }
//     } catch (error) {
//       console.error("Error fetching nearby places:", error);
//       setLocationError("Failed to fetch nearby places. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle radius change
//   const handleRadiusChange = (newRadius) => {
//     setRadius(newRadius);
//     if (userLocation) {
//       fetchNearbyPlaces(userLocation.lat, userLocation.lng);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchHangoutPlaces();
//   }, []);

//   // Display function for places
//   const displayPlaces = () => {
//     if (activeTab === 'nearby') {
//       return nearbyPlaces;
//     }
//     return places;
//   };

//   return (
//     <div>
//       {/* Hero Section */}
//       <motion.div 
//         className="flex items-center justify-start relative p-8"
//         style={{
//           backgroundImage: `url('/images/1865104_740x550.jpg')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           height: 400,
//         }}
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="absolute inset-0 bg-black/70"></div>
//         <div className="relative z-10 text-start">
//           <h1 className="text-white text-6xl font-extrabold">Hangout Places</h1>
//           <p className="text-white text-lg mt-2">
//             <span style={{ fontFamily: 'Poppins-Bold' }} className="text-yellow-400 font-bold">Home</span> / Hangout Places
//           </p>
//         </div>
//       </motion.div>
      
//       {/* Typewriter Section */}
//       <motion.div className="bg-white py-8 text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-5 leading-tight max-w-4xl mx-auto">
//           Explore {" "}
//           <span className="text-yellow-500">
//             <Typewriter
//               words={["Good Vibes Only", "The Place to Be", "Relax. Enjoy"]}
//               loop={true}
//               cursor
//               cursorStyle="|"
//               typeSpeed={100}
//               deleteSpeed={60}
//               delaySpeed={2000}
//             />
//           </span>
//         </h1>
//         <div>
//           <img src={fancyImg} alt='fancyImg' className="w-100 h-20 mx-auto"/>
//         </div>
//       </motion.div>

//       {/* Tab and Location Controls */}
//       <div className="bg-white px-6 pt-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Tab Buttons */}
//           <div className="flex gap-4 mb-6 border-b border-gray-200">
//             <button
//               onClick={() => setActiveTab('all')}
//               className={`pb-3 px-4 font-semibold transition-all ${
//                 activeTab === 'all'
//                   ? 'text-yellow-500 border-b-2 border-yellow-500'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               All Hangout Places
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('nearby');
//                 if (!userLocation && !nearbyPlaces.length) {
//                   getUserLocation();
//                 }
//               }}
//               className={`pb-3 px-4 font-semibold transition-all flex items-center gap-2 ${
//                 activeTab === 'nearby'
//                   ? 'text-yellow-500 border-b-2 border-yellow-500'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <MapPin size={18} />
//               Nearby Places
//             </button>
//           </div>

//           {/* Nearby Controls */}
//           {activeTab === 'nearby' && (
//             <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={getUserLocation}
//                   className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all"
//                   disabled={loading}
//                 >
//                   <Navigation size={18} />
//                   {loading ? 'Getting Location...' : 'Use My Location'}
//                 </button>
                
//                 {userLocation && (
//                   <div className="text-sm text-gray-600">
//                     📍 Location detected
//                   </div>
//                 )}
//               </div>

//               {/* Radius Selector */}
//               {userLocation && (
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm text-gray-600">Radius:</span>
//                   <select
//                     value={radius}
//                     onChange={(e) => handleRadiusChange(Number(e.target.value))}
//                     className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
//                   >
//                     <option value={5}>5 km</option>
//                     <option value={10}>10 km</option>
//                     <option value={20}>20 km</option>
//                     <option value={50}>50 km</option>
//                   </select>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Location Error Message */}
//           {locationError && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
//               {locationError}
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && activeTab === 'nearby' && (
//             <div className="flex justify-center items-center py-20">
//               <Loader className="animate-spin text-yellow-500" size={40} />
//               <span className="ml-3 text-gray-600">Finding nearby places...</span>
//             </div>
//           )}

//           {/* Places Grid */}
//           <div className="min-h-screen bg-white pb-6">
//             {displayPlaces().length === 0 && !loading && activeTab === 'nearby' ? (
//               <div className="text-center py-20">
//                 <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">No nearby places found</h3>
//                 <p className="text-gray-500">
//                   Try increasing the search radius or check back later for new places!
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                 {displayPlaces().map((place, index) => (
//                   <motion.div
//                     key={place.id || index}
//                     onClick={() => {
//                       navigate(`/hangout/${place.slug}`);
//                       window.scrollTo({ top: 0, behavior: 'smooth' });
//                     }}
//                     className="relative bg-white shadow rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
//                     whileHover={{ scale: 1.05 }}
//                     initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.1 }}
//                   >
//                     <div className="relative">
//                       <motion.img
//                         src={place.images?.[0]?.image ? `${API_ROUTE}${place.images[0].image}` : bannerImage}
//                         alt={place.name}
//                         loading="lazy"
//                         className="w-full h-68 object-cover transition-all duration-500"
//                         onError={(e) => {
//                           e.target.src = bannerImage;
//                         }}
//                       />
                      
//                       {/* Distance Badge for Nearby Places */}
//                       {activeTab === 'nearby' && place.distance_km && (
//                         <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-semibold">
//                           📍 {place.distance_km} km away
//                         </div>
//                       )}
                      
//                       <div className="absolute inset-0 bg-black/10"></div>
//                       <div className="absolute inset-0 flex justify-center items-center bg-opacity-40">
//                         <h2 className="text-3xl font-bold text-white text-center px-4">
//                           {place.name}
//                         </h2>
//                       </div>
//                     </div>
                    
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-500 p-6 text-center"
//                       whileHover={{ scale: 1.02 }}
//                     >
//                       <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
//                         {place.name}
//                       </h2>
//                       <p className="text-gray-300 mt-2 px-4 text-lg leading-relaxed">
//                         {place.description?.slice(0, 50) || place.about?.slice(0, 50) || "Discover this amazing hangout spot!"}
//                       </p>
                      
//                       {/* Location and Distance in hover */}
//                       {place.location && (
//                         <p className="text-yellow-400 mt-2 text-sm flex items-center gap-1">
//                           <MapPin size={14} />
//                           {place.location}
//                         </p>
//                       )}
                      
//                       {activeTab === 'nearby' && place.distance_km && (
//                         <p className="text-white mt-1 text-xs">
//                           {place.distance_km} km from you
//                         </p>
//                       )}
                      
//                       <motion.button
//                         whileTap={{ scale: 0.9 }}
//                         className="mt-4 px-6 py-2 cursor-pointer bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg"
//                       >
//                         Explore Now
//                       </motion.button>
//                     </motion.div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Coming Soon Section */}
//       <div className="mx-auto">
//         <h3 style={{ fontFamily: 'cursive' }} className="mx-auto text-center p-5 mt-10 rounded-full">
//           More Coming Soon....
//         </h3>
//       </div>

//       {/* People Connect Section */}
//       <div className="flex flex-col-reverse lg:flex-row items-center justify-between mt-10 gap-10 max-w-7xl mx-auto bg-white rounded-3xl">
//         <motion.img
//           src={design}
//           alt="Discover Ossh"
//           className="w-40 max-w-xs sm:max-w-sm lg:max-w-md h-auto object-contain"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//         />
        
//         <section className="w-full bg-gray-100 p-6 sm:p-10 rounded-2xl shadow-inner text-center">
//           <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//             Find Your Perfect Hangout Partner
//           </h2>
//           <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
//             Connect with like-minded individuals on <span className="font-bold text-orange-600">Ossh</span>. Whether you're looking for adventure, meaningful conversations, or a casual meetup, we help you find the right company.
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 sm:mt-10 px-2 sm:px-0">
//             {people.map((user, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg border border-gray-100 transition"
//                 whileHover={{ scale: 1.03 }}
//               >
//                 <img
//                   src={user.img}
//                   alt={user.title}
//                   className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-orange-500 shadow -mt-12"
//                 />
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-4">{user.title}</h3>
//                 <p className="text-green-600 text-sm font-medium">🟢 Available</p>
//                 <a
//                   href="https://ooshlink.com/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="mt-4 px-5 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-all"
//                 >
//                   <UserPlus className="inline-block mr-2 w-4 h-4" />
//                   Connect
//                 </a>
//               </motion.div>
//             ))}
//           </div>

//           <a
//             href="https://ooshlink.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block mt-10 px-8 py-3 border border-orange-600 text-orange-600 font-semibold text-base sm:text-lg rounded-lg hover:bg-orange-600 hover:text-white transition-all"
//           >
//             Explore More
//           </a>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default PremiumHangoutPage;


// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Typewriter } from "react-simple-typewriter";
// import axios from "axios";
// import { API_ROUTE } from "../ApisConf/api_config";
// import { useNavigate } from "react-router-dom";
// import design from '../assets/ewwww.jpg';
// import bannerImage from "../assets/maxresdefault.jpg"; 
// import banner from "../assets/y2O4cqtylhP8.png";
// import banner2 from "../assets/maxresdefault (1).png";
// import { UserPlus, MapPin, Navigation, Loader } from "lucide-react";
// import fancyImg from '../assets/dfsdgsg.jpg';

// const PremiumHangoutPage = () => {
//   const [places, setPlaces] = useState([]);
//   const [nearbyPlaces, setNearbyPlaces] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [locationError, setLocationError] = useState(null);
//   const [activeTab, setActiveTab] = useState('all');
//   const [radius, setRadius] = useState(10);
//   const navigate = useNavigate();

//   // Helper function to get correct image URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return bannerImage;
    
//     // If it's already a full URL
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//       return imagePath;
//     }
    
//     // If it's a relative path starting with /
//     if (imagePath.startsWith('/')) {
//       return `${API_ROUTE}${imagePath}`;
//     }
    
//     // If it's just the filename
//     return `${API_ROUTE}/media/${imagePath}`;
//   };

//   const people = [
//     { 
//       title: "Evelyn Drake", 
//       desc: "Relax and soak up the sun at a scenic beach destination.", 
//       img: bannerImage
//     },
//     { 
//       title: "Grace Ik", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Lord Money", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "John Isaac", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Dianna Awai", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//     { 
//       title: "Chioma Ikwegbewe", 
//       desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
//       img: banner2
//     },
//   ];

//   const fetchHangoutPlaces = async () => {
//     try {
//       const response = await axios.get(`${API_ROUTE}/hangout-places/`);
      
//       if (response.status === 200 || response.status === 201) {
//         let places = response.data;
//         places = places.filter(place => !place.slug.match(/-\d+$/));
//         setPlaces(places);
//       }
//     } catch (error) {
//       console.log("Error fetching data", error);
//     }
//   };

//   const getUserLocation = () => {
//     setLoading(true);
//     setLocationError(null);
    
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//           fetchNearbyPlaces(latitude, longitude);
//         },
//         (error) => {
//           console.error("Geolocation error:", error);
//           let errorMessage = "Unable to get your location. ";
          
//           switch(error.code) {
//             case error.PERMISSION_DENIED:
//               errorMessage += "Please enable location access in your browser settings.";
//               break;
//             case error.POSITION_UNAVAILABLE:
//               errorMessage += "Location information is unavailable.";
//               break;
//             case error.TIMEOUT:
//               errorMessage += "Location request timed out.";
//               break;
//             default:
//               errorMessage += "Please check your location settings.";
//           }
          
//           setLocationError(errorMessage);
//           setLoading(false);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 0
//         }
//       );
//     } else {
//       setLocationError("Geolocation is not supported by your browser.");
//       setLoading(false);
//     }
//   };

//   const fetchNearbyPlaces = async (lat, lng) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${API_ROUTE}/nearby/hangout/?lat=${lat}&lng=${lng}&radius=${radius}`
//       );
      
//       if (response.status === 200) {
//         console.log("Nearby places response:", response.data);
//         setNearbyPlaces(response.data.results || []);
//       }
//     } catch (error) {
//       console.error("Error fetching nearby places:", error);
//       setLocationError("Failed to fetch nearby places. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRadiusChange = (newRadius) => {
//     setRadius(newRadius);
//     if (userLocation) {
//       fetchNearbyPlaces(userLocation.lat, userLocation.lng);
//     }
//   };

//   useEffect(() => {
//     fetchHangoutPlaces();
//   }, []);

//   const displayPlaces = () => {
//     if (activeTab === 'nearby') {
//       return nearbyPlaces;
//     }
//     return places;
//   };

//   return (
//     <div>
//       {/* Hero Section - Keep your existing JSX */}
//       <motion.div 
//         className="flex items-center justify-start relative p-8"
//         style={{
//           backgroundImage: `url('/images/1865104_740x550.jpg')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           height: 400,
//         }}
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="absolute inset-0 bg-black/70"></div>
//         <div className="relative z-10 text-start">
//           <h1 className="text-white text-6xl font-extrabold">Hangout Places</h1>
//           <p className="text-white text-lg mt-2">
//             <span style={{ fontFamily: 'Poppins-Bold' }} className="text-yellow-400 font-bold">Home</span> / Hangout Places
//           </p>
//         </div>
//       </motion.div>
      
//       {/* Typewriter Section */}
//       <motion.div className="bg-white py-8 text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-5 leading-tight max-w-4xl mx-auto">
//           Explore {" "}
//           <span className="text-yellow-500">
//             <Typewriter
//               words={["Good Vibes Only", "The Place to Be", "Relax. Enjoy"]}
//               loop={true}
//               cursor
//               cursorStyle="|"
//               typeSpeed={100}
//               deleteSpeed={60}
//               delaySpeed={2000}
//             />
//           </span>
//         </h1>
//         <div>
//           <img src={fancyImg} alt='fancyImg' className="w-100 h-20 mx-auto"/>
//         </div>
//       </motion.div>

//       {/* Tab and Location Controls */}
//       <div className="bg-white px-6 pt-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Tab Buttons */}
//           <div className="flex gap-4 mb-6 border-b border-gray-200">
//             <button
//               onClick={() => setActiveTab('all')}
//               className={`pb-3 px-4 font-semibold transition-all ${
//                 activeTab === 'all'
//                   ? 'text-yellow-500 border-b-2 border-yellow-500'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               All Hangout Places
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('nearby');
//                 if (!userLocation && !nearbyPlaces.length) {
//                   getUserLocation();
//                 }
//               }}
//               className={`pb-3 px-4 font-semibold transition-all flex items-center gap-2 ${
//                 activeTab === 'nearby'
//                   ? 'text-yellow-500 border-b-2 border-yellow-500'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <MapPin size={18} />
//               Nearby Places
//             </button>
//           </div>

//           {/* Nearby Controls */}
//           {activeTab === 'nearby' && (
//             <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={getUserLocation}
//                   className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all"
//                   disabled={loading}
//                 >
//                   <Navigation size={18} />
//                   {loading ? 'Getting Location...' : 'Use My Location'}
//                 </button>
                
//                 {userLocation && (
//                   <div className="text-sm text-gray-600">
//                     📍 Location detected
//                   </div>
//                 )}
//               </div>

//               {/* Radius Selector */}
//               {userLocation && (
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm text-gray-600">Radius:</span>
//                   <select
//                     value={radius}
//                     onChange={(e) => handleRadiusChange(Number(e.target.value))}
//                     className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
//                   >
//                     <option value={5}>5 km</option>
//                     <option value={10}>10 km</option>
//                     <option value={20}>20 km</option>
//                     <option value={50}>50 km</option>
//                   </select>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Location Error Message */}
//           {locationError && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
//               {locationError}
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && activeTab === 'nearby' && (
//             <div className="flex justify-center items-center py-20">
//               <Loader className="animate-spin text-yellow-500" size={40} />
//               <span className="ml-3 text-gray-600">Finding nearby places...</span>
//             </div>
//           )}

//           {/* Places Grid */}
//           <div className="min-h-screen bg-white pb-6">
//             {displayPlaces().length === 0 && !loading && activeTab === 'nearby' ? (
//               <div className="text-center py-20">
//                 <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">No nearby places found</h3>
//                 <p className="text-gray-500">
//                   Try increasing the search radius or check back later for new places!
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                 {displayPlaces().map((place, index) => (
//                   <motion.div
//                     key={place.id || index}
//                     onClick={() => {
//                       navigate(`/hangout/${place.slug}`);
//                       window.scrollTo({ top: 0, behavior: 'smooth' });
//                     }}
//                     className="relative bg-white shadow rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
//                     whileHover={{ scale: 1.05 }}
//                     initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.1 }}
//                   >
//                     <div className="relative">
//                       <motion.img
//                         src={getImageUrl(place.images?.[0]?.image)}
//                         alt={place.name}
//                         loading="lazy"
//                         className="w-full h-68 object-cover transition-all duration-500"
//                         onError={(e) => {
//                           console.log(`Failed to load image for ${place.name}:`, e.target.src);
//                           e.target.src = bannerImage;
//                         }}
//                       />
                      
//                       {/* Distance Badge for Nearby Places */}
//                       {activeTab === 'nearby' && place.distance_km && (
//                         <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-semibold">
//                           📍 {place.distance_km} km away
//                         </div>
//                       )}
                      
//                       <div className="absolute inset-0 bg-black/10"></div>
//                       <div className="absolute inset-0 flex justify-center items-center bg-opacity-40">
//                         <h2 className="text-3xl font-bold text-white text-center px-4">
//                           {place.name}
//                         </h2>
//                       </div>
//                     </div>
                    
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-500 p-6 text-center"
//                       whileHover={{ scale: 1.02 }}
//                     >
//                       <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
//                         {place.name}
//                       </h2>
//                       <p className="text-gray-300 mt-2 px-4 text-lg leading-relaxed">
//                         {place.description?.slice(0, 50) || place.about?.slice(0, 50) || "Discover this amazing hangout spot!"}
//                       </p>
                      
//                       {place.location && (
//                         <p className="text-yellow-400 mt-2 text-sm flex items-center gap-1">
//                           <MapPin size={14} />
//                           {place.location}
//                         </p>
//                       )}
                      
//                       {activeTab === 'nearby' && place.distance_km && (
//                         <p className="text-white mt-1 text-xs">
//                           {place.distance_km} km from you
//                         </p>
//                       )}
                      
//                       <motion.button
//                         whileTap={{ scale: 0.9 }}
//                         className="mt-4 px-6 py-2 cursor-pointer bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg"
//                       >
//                         Explore Now
//                       </motion.button>
//                     </motion.div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Coming Soon Section */}
//       <div className="mx-auto">
//         <h3 style={{ fontFamily: 'cursive' }} className="mx-auto text-center p-5 mt-10 rounded-full">
//           More Coming Soon....
//         </h3>
//       </div>

//       {/* People Connect Section - Keep your existing JSX */}
//       <div className="flex flex-col-reverse lg:flex-row items-center justify-between mt-10 gap-10 max-w-7xl mx-auto bg-white rounded-3xl">
//         <motion.img
//           src={design}
//           alt="Discover Ossh"
//           className="w-40 max-w-xs sm:max-w-sm lg:max-w-md h-auto object-contain"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//         />
        
//         <section className="w-full bg-gray-100 p-6 sm:p-10 rounded-2xl shadow-inner text-center">
//           <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//             Find Your Perfect Hangout Partner
//           </h2>
//           <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
//             Connect with like-minded individuals on <span className="font-bold text-orange-600">Ossh</span>. Whether you're looking for adventure, meaningful conversations, or a casual meetup, we help you find the right company.
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 sm:mt-10 px-2 sm:px-0">
//             {people.map((user, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg border border-gray-100 transition"
//                 whileHover={{ scale: 1.03 }}
//               >
//                 <img
//                   src={user.img}
//                   alt={user.title}
//                   className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-orange-500 shadow -mt-12"
//                 />
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-4">{user.title}</h3>
//                 <p className="text-green-600 text-sm font-medium">🟢 Available</p>
//                 <a
//                   href="https://ooshlink.com/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="mt-4 px-5 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-all"
//                 >
//                   <UserPlus className="inline-block mr-2 w-4 h-4" />
//                   Connect
//                 </a>
//               </motion.div>
//             ))}
//           </div>

//           <a
//             href="https://ooshlink.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block mt-10 px-8 py-3 border border-orange-600 text-orange-600 font-semibold text-base sm:text-lg rounded-lg hover:bg-orange-600 hover:text-white transition-all"
//           >
//             Explore More
//           </a>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default PremiumHangoutPage;


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { useNavigate } from "react-router-dom";
import design from '../assets/ewwww.jpg';
import bannerImage from "../assets/maxresdefault.jpg"; 
import banner from "../assets/y2O4cqtylhP8.png";
import banner2 from "../assets/maxresdefault (1).png";
import { UserPlus, MapPin, Navigation, Loader, Clock, Car, Footprints, Bike } from "lucide-react";
import fancyImg from '../assets/dfsdgsg.jpg';

const PremiumHangoutPage = () => {
  const [places, setPlaces] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [radius, setRadius] = useState(10);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [travelMode, setTravelMode] = useState('driving'); // 'driving', 'walking', 'cycling'
  const [placesWithDistance, setPlacesWithDistance] = useState({});
  const navigate = useNavigate();

  // Travel speed constants (km/h)
  const TRAVEL_SPEEDS = {
    driving: 50,
    walking: 5,
    cycling: 15
  };

  // Calculate travel time based on distance and mode
  const calculateTravelTime = (distanceKm, mode) => {
    if (!distanceKm) return null;
    const speed = TRAVEL_SPEEDS[mode];
    const timeHours = distanceKm / speed;
    const timeMinutes = Math.round(timeHours * 60);
    
    if (timeMinutes < 1) return "< 1 min";
    if (timeMinutes < 60) return `${timeMinutes} min`;
    const hours = Math.floor(timeMinutes / 60);
    const mins = timeMinutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Calculate distance between coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Calculate distances for nearby places
  const calculateDistancesForPlaces = (userLat, userLng, placesList) => {
    const distanceMap = {};
    placesList.forEach(place => {
      if (place.latitude && place.longitude) {
        const dist = calculateDistance(userLat, userLng, place.latitude, place.longitude);
        distanceMap[place.id] = {
          distance: Math.round(dist * 10) / 10,
          drivingTime: calculateTravelTime(dist, 'driving'),
          walkingTime: calculateTravelTime(dist, 'walking'),
          cyclingTime: calculateTravelTime(dist, 'cycling')
        };
      }
    });
    return distanceMap;
  };

  // Get travel time based on current mode
  const getTravelTime = (placeId) => {
    if (!placesWithDistance[placeId]) return null;
    const data = placesWithDistance[placeId];
    switch(travelMode) {
      case 'driving': return data.drivingTime;
      case 'walking': return data.walkingTime;
      case 'cycling': return data.cyclingTime;
      default: return data.drivingTime;
    }
  };

  // Get travel icon
  const getTravelIcon = () => {
    switch(travelMode) {
      case 'driving': return <Car size={14} />;
      case 'walking': return <Footprints size={14} />;
      case 'cycling': return <Bike size={14} />;
      default: return <Car size={14} />;
    }
  };

  // Get travel label
  const getTravelLabel = () => {
    switch(travelMode) {
      case 'driving': return 'Drive';
      case 'walking': return 'Walk';
      case 'cycling': return 'Cycle';
      default: return 'Drive';
    }
  };

  // Helper function to get correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return bannerImage;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    if (imagePath.startsWith('/')) {
      return `${API_ROUTE}${imagePath}`;
    }
    return `${API_ROUTE}/media/${imagePath}`;
  };

  const people = [
    { title: "Evelyn Drake", desc: "Relax and soak up the sun at a scenic beach destination.", img: bannerImage },
    { title: "Grace Ik", desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", img: banner2 },
    { title: "Lord Money", desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", img: banner2 },
    { title: "John Isaac", desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", img: banner2 },
    { title: "Dianna Awai", desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", img: banner2 },
    { title: "Chioma Ikwegbewe", desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", img: banner2 },
  ];

  const fetchHangoutPlaces = async () => {
    try {
      const response = await axios.get(`${API_ROUTE}/hangout-places/`);
      if (response.status === 200 || response.status === 201) {
        let places = response.data;
        places = places.filter(place => !place.slug.match(/-\d+$/));
        setPlaces(places);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

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
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  const fetchNearbyPlaces = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_ROUTE}/nearby/hangout/?lat=${lat}&lng=${lng}&radius=${radius}`
      );
      
      if (response.status === 200) {
        const places = response.data.results || [];
        setNearbyPlaces(places);
        // Calculate distances for these places
        const distanceMap = calculateDistancesForPlaces(lat, lng, places);
        setPlacesWithDistance(distanceMap);
      }
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      setLocationError("Failed to fetch nearby places. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
    if (userLocation) {
      fetchNearbyPlaces(userLocation.lat, userLocation.lng);
    }
  };

  useEffect(() => {
    fetchHangoutPlaces();
  }, []);

  // Update distances when travel mode changes
  useEffect(() => {
    if (userLocation && nearbyPlaces.length > 0) {
      const distanceMap = calculateDistancesForPlaces(userLocation.lat, userLocation.lng, nearbyPlaces);
      setPlacesWithDistance(distanceMap);
    }
  }, [travelMode, userLocation, nearbyPlaces]);

  const displayPlaces = () => {
    if (activeTab === 'nearby') {
      return nearbyPlaces;
    }
    return places;
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5, type: "spring", stiffness: 100 }
    }),
    hover: { scale: 1.05, transition: { duration: 0.3, type: "spring", stiffness: 300 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        className="flex items-center justify-start relative p-8"
        style={{
          backgroundImage: `url('/images/1865104_740x550.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 400,
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-start">
          <h1 className="text-white text-6xl font-extrabold">Hangout Places</h1>
          <p className="text-white text-lg mt-2">
            <span style={{ fontFamily: 'Poppins-Bold' }} className="text-yellow-400 font-bold">Home</span> / Hangout Places
          </p>
        </div>
      </motion.div>
      
      {/* Typewriter Section */}
      <motion.div className="bg-white py-8 text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-5 leading-tight max-w-4xl mx-auto">
          Explore {" "}
          <span className="text-yellow-500">
            <Typewriter
              words={["Good Vibes Only", "The Place to Be", "Relax. Enjoy"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={60}
              delaySpeed={2000}
            />
          </span>
        </h1>
        <div>
          <img src={fancyImg} alt='fancyImg' className="w-100 h-20 mx-auto"/>
        </div>
      </motion.div>

      {/* Tab and Location Controls */}
      <div className="bg-white px-6 pt-6">
        <div className="max-w-7xl mx-auto">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab('all')}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeTab === 'all'
                  ? 'text-yellow-500 border-b-2 border-yellow-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Hangout Places
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setActiveTab('nearby');
                if (!userLocation && !nearbyPlaces.length) {
                  getUserLocation();
                }
              }}
              className={`pb-3 px-4 font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'nearby'
                  ? 'text-yellow-500 border-b-2 border-yellow-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MapPin size={18} />
              Nearby Places
            </motion.button>
          </div>

          {/* Nearby Controls */}
          {activeTab === 'nearby' && (
            <motion.div 
              className="mb-6 flex flex-wrap gap-4 items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={getUserLocation}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all"
                  disabled={loading}
                >
                  <Navigation size={18} />
                  {loading ? 'Getting Location...' : 'Use My Location'}
                </motion.button>
                
                {userLocation && (
                  <motion.div 
                    className="text-sm text-gray-600 flex items-center gap-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    📍 Location detected
                  </motion.div>
                )}

                {/* Travel Mode Selector */}
                {userLocation && nearbyPlaces.length > 0 && (
                  <motion.div 
                    className="flex items-center gap-2 bg-gray-100 rounded-lg p-1"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <button
                      onClick={() => setTravelMode('driving')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                        travelMode === 'driving' 
                          ? 'bg-yellow-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Car size={14} />
                      Drive
                    </button>
                    <button
                      onClick={() => setTravelMode('walking')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                        travelMode === 'walking' 
                          ? 'bg-yellow-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Footprints size={14} />
                      Walk
                    </button>
                    <button
                      onClick={() => setTravelMode('cycling')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                        travelMode === 'cycling' 
                          ? 'bg-yellow-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Bike size={14} />
                      Cycle
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Radius Selector */}
              {userLocation && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Radius:</span>
                  <select
                    value={radius}
                    onChange={(e) => handleRadiusChange(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  >
                    <option value={5}>5 km</option>
                    <option value={10}>10 km</option>
                    <option value={20}>20 km</option>
                    <option value={50}>50 km</option>
                  </select>
                </div>
              )}
            </motion.div>
          )}

          {/* Location Error Message */}
          <AnimatePresence>
            {locationError && (
              <motion.div 
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {locationError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {loading && activeTab === 'nearby' && (
            <div className="flex justify-center items-center py-20">
              <Loader className="animate-spin text-yellow-500" size={40} />
              <span className="ml-3 text-gray-600">Finding nearby places...</span>
            </div>
          )}

          {/* Places Grid */}
          <div className="min-h-screen bg-white pb-6">
            {displayPlaces().length === 0 && !loading && activeTab === 'nearby' ? (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No nearby places found</h3>
                <p className="text-gray-500">
                  Try increasing the search radius or check back later for new places!
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {displayPlaces().map((place, index) => {
                  const isHovered = hoveredCard === place.id;
                  const travelTime = activeTab === 'nearby' && placesWithDistance[place.id]?.distance 
                    ? getTravelTime(place.id) : null;
                  const distanceData = activeTab === 'nearby' && placesWithDistance[place.id];
                  
                  return (
                    <motion.div
                      key={place.id || index}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      onClick={() => {
                        navigate(`/hangout/${place.slug}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="relative bg-white shadow rounded-2xl overflow-hidden cursor-pointer"
                      onMouseEnter={() => setHoveredCard(place.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={getImageUrl(place.images?.[0]?.image)}
                          alt={place.name}
                          loading="lazy"
                          className="w-full h-68 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          onError={(e) => {
                            e.target.src = bannerImage;
                          }}
                        />
                        
                        {/* Distance and Travel Time Badge */}
                        {activeTab === 'nearby' && distanceData && (
                          <motion.div 
                            className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="flex items-center gap-1">
                              <MapPin size={12} />
                              <span>
                                {distanceData.distance < 1 
                                  ? `${Math.round(distanceData.distance * 1000)}m` 
                                  : `${distanceData.distance}km`}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-300 border-t border-white/20 pt-1 mt-1">
                              <Clock size={10} />
                              <span className="text-xs">
                                {getTravelIcon()} {travelTime}
                              </span>
                            </div>
                          </motion.div>
                        )}
                        
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute inset-0 flex justify-center items-center">
                          <motion.h2 
                            className="text-3xl font-bold text-white text-center px-4"
                            animate={{ y: isHovered ? -20 : 0 }}
                          >
                            {place.name}
                          </motion.h2>
                        </div>
                      </div>
                      
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-500 p-6 text-center"
                        animate={{ opacity: isHovered ? 1 : 0 }}
                      >
                        <motion.h2 
                          className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                        >
                          {place.name}
                        </motion.h2>
                        
                        <motion.p 
                          className="text-gray-300 mt-2 px-4 text-lg leading-relaxed"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                          transition={{ delay: 0.05 }}
                        >
                          {place.description?.slice(0, 50) || place.about?.slice(0, 50) || "Discover this amazing hangout spot!"}
                        </motion.p>
                        
                        {place.location && (
                          <motion.p 
                            className="text-yellow-400 mt-2 text-sm flex items-center gap-1"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <MapPin size={14} />
                            {place.location}
                          </motion.p>
                        )}
                        
                        {activeTab === 'nearby' && travelTime && (
                          <motion.p 
                            className="text-white mt-1 text-xs flex items-center gap-1"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                            transition={{ delay: 0.15 }}
                          >
                            <Clock size={12} />
                            {getTravelLabel()} time: {travelTime}
                          </motion.p>
                        )}
                        
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="mt-4 px-6 py-2 cursor-pointer bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Explore Now
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="mx-auto">
        <h3 style={{ fontFamily: 'cursive' }} className="mx-auto text-center p-5 mt-10 rounded-full">
          More Coming Soon....
        </h3>
      </div>

      {/* People Connect Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between mt-10 gap-10 max-w-7xl mx-auto bg-white rounded-3xl">
        <motion.img
          src={design}
          alt="Discover Ossh"
          className="w-40 max-w-xs sm:max-w-sm lg:max-w-md h-auto object-contain"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
        
        <section className="w-full bg-gray-100 p-6 sm:p-10 rounded-2xl shadow-inner text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find Your Perfect Hangout Partner
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Connect with like-minded individuals on <span className="font-bold text-orange-600">Ossh</span>. Whether you're looking for adventure, meaningful conversations, or a casual meetup, we help you find the right company.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 sm:mt-10 px-2 sm:px-0">
            {people.map((user, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg border border-gray-100 transition"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={user.img}
                  alt={user.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-orange-500 shadow -mt-12"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-4">{user.title}</h3>
                <p className="text-green-600 text-sm font-medium">🟢 Available</p>
                <a
                  href="https://ooshlink.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-5 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-all"
                >
                  <UserPlus className="inline-block mr-2 w-4 h-4" />
                  Connect
                </a>
              </motion.div>
            ))}
          </div>

          <a
            href="https://ooshlink.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 px-8 py-3 border border-orange-600 text-orange-600 font-semibold text-base sm:text-lg rounded-lg hover:bg-orange-600 hover:text-white transition-all"
          >
            Explore More
          </a>
        </section>
      </div>
    </div>
  );
};

export default PremiumHangoutPage;

