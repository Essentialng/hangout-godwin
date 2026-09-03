import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { useNavigate } from "react-router-dom";
import design from '../assets/ewwww.jpg';
import bannerImage from "../assets/maxresdefault.jpg";
import banner2 from "../assets/maxresdefault (1).png";
import { UserPlus, MapPin, Navigation, Loader, Clock, Car,ArrowRight, Footprints, Bike, Heart, MessageCircle, Users, Sparkles, Verified, Star } from "lucide-react";
import fancyImg from '../assets/dfsdgsg.jpg';
import HangoutPartnerFinder from "../components/HangoutFinders";

const PremiumHangoutPage = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [radius, setRadius] = useState(10);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [travelMode, setTravelMode] = useState('driving');
  const [placesWithDistance, setPlacesWithDistance] = useState({});
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [locations, setLocations] = useState([]);
  
  // New state for E-Date profiles
  const [edateProfiles, setEdateProfiles] = useState([]);
  const [edateLoading, setEdateLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const navigate = useNavigate();

  const TRAVEL_SPEEDS = {
    driving: 50,
    walking: 5,
    cycling: 15
  };

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

  const calculateDistancesForPlaces = (userLat, userLng, placesList) => {
    const distanceMap = {};
    placesList.forEach(place => {
      if (place.latitude && place.longitude) {
        const dist = calculateDistance(userLat, userLng, parseFloat(place.latitude), parseFloat(place.longitude));
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

  const getTravelIcon = () => {
    switch(travelMode) {
      case 'driving': return <Car size={14} />;
      case 'walking': return <Footprints size={14} />;
      case 'cycling': return <Bike size={14} />;
      default: return <Car size={14} />;
    }
  };

  const getTravelLabel = () => {
    switch(travelMode) {
      case 'driving': return 'Drive';
      case 'walking': return 'Walk';
      case 'cycling': return 'Cycle';
      default: return 'Drive';
    }
  };

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

  const extractLocations = (placesList) => {
    const locationSet = new Set();
    placesList.forEach(place => {
      if (place.location) {
        const locationParts = place.location.split(',');
        const mainLocation = locationParts[0]?.trim() || place.location;
        locationSet.add(mainLocation);
      }
    });
    return Array.from(locationSet).sort();
  };

  // Fetch E-Date profiles
  const fetchEdateProfiles = async () => {
    setEdateLoading(true);
    try {
      const response = await axios.get('https://api.edate.ng/api/discover/global/?category=all&offset=0&limit=20&gender=all&min_age=18&max_age=99');
      
      if (response.data && response.data.results) {
        // Filter to only show profiles with images and valid data
        const validProfiles = response.data.results.filter(profile => 
          profile.profile_image && 
          (profile.full_name || profile.nick_name || profile.username)
        );
        setEdateProfiles(validProfiles);
      }
    } catch (error) {
      console.error("Error fetching E-Date profiles:", error);
    } finally {
      setEdateLoading(false);
    }
  };

  useEffect(() => {
    fetchEdateProfiles();
  }, []);

  const fetchHangoutPlaces = async () => {
    try {
      const response = await axios.get(`${API_ROUTE}/hangout-places/`);
      if (response.status === 200 || response.status === 201) {
        let places = response.data;
        places = places.filter(place => !place.slug.match(/-\d+$/));
        setPlaces(places);
        setFilteredPlaces(places);
        
        const uniqueLocations = extractLocations(places);
        setLocations(uniqueLocations);
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

  const filterByLocation = (location) => {
    setSelectedLocation(location);
    if (location === 'all') {
      setFilteredPlaces(places);
    } else {
      const filtered = places.filter(place => {
        if (!place.location) return false;
        return place.location.toLowerCase().includes(location.toLowerCase());
      });
      setFilteredPlaces(filtered);
    }
  };

  useEffect(() => {
    fetchHangoutPlaces();
  }, []);

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
    return filteredPlaces;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5, type: "spring", stiffness: 100 }
    }),
    hover: { scale: 1.05, transition: { duration: 0.3, type: "spring", stiffness: 300 } }
  };

  // Profile card variants
  const profileCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 }
    }),
    hover: { y: -8, transition: { duration: 0.2 } }
  };

  const openProfileModal = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    document.body.style.overflow = 'auto';
    setSelectedProfile(null);
  };

  return (
    <div>
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
            <span className="text-yellow-400 font-bold">Home</span> / Hangout Places
          </p>
        </div>
      </motion.div>
      
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

      <div className="bg-white px-6 pt-6">
        <div className="max-w-7xl mx-auto">
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

          {activeTab === 'all' && locations.length > 0 && (
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <MapPin size={16} className="text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 mr-2">Location:</span>
                <button
                  onClick={() => filterByLocation('all')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedLocation === 'all'
                      ? 'bg-yellow-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => filterByLocation(location)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      selectedLocation === location
                        ? 'bg-yellow-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {filteredPlaces.length} places found in {selectedLocation === 'all' ? 'all locations' : selectedLocation}
              </p>
            </motion.div>
          )}

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

          {loading && activeTab === 'nearby' && (
            <div className="flex justify-center items-center py-20">
              <Loader className="animate-spin text-yellow-500" size={40} />
              <span className="ml-3 text-gray-600">Finding nearby places...</span>
            </div>
          )}

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
            ) : displayPlaces().length === 0 && !loading && activeTab === 'all' ? (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No places found in {selectedLocation}</h3>
                <p className="text-gray-500">
                  Try selecting a different location or check back later for new places!
                </p>
                <button
                  onClick={() => filterByLocation('all')}
                  className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
                >
                  View All Locations
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {displayPlaces().map((place, index) => {
                  const isHovered = hoveredCard === place.id;
                  const travelTime = activeTab === 'nearby' && placesWithDistance[place.id]?.distance 
                    ? getTravelTime(place.id) : null;
                  const distanceData = activeTab === 'nearby' && placesWithDistance[place.id];
                  const distance = distanceData?.distance;
                  
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
                                {distance < 1 
                                  ? `${Math.round(distance * 1000)}m` 
                                  : `${distance}km`}
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

                        {place.location && (
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                            <MapPin size={10} />
                            {place.location.split(',')[0]}
                          </div>
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

     

      {/* New E-Date Section -  */}
      <div className="mt-20">

        <HangoutPartnerFinder/>
        

      </div>

     
      
      {/* Profile Detail Modal */}
      {showProfileModal && selectedProfile && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeProfileModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeProfileModal}
              className="absolute right-4 top-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
              style={{ position: 'sticky', float: 'right', marginTop: '12px', marginRight: '12px' }}
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Profile Image */}
            <div className="relative">
              <img
                src={selectedProfile.profile_image}
                alt={selectedProfile.full_name || selectedProfile.username}
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=No+Image';
                }}
              />
              
              {/* Verified Badge */}
              {selectedProfile.is_verified && (
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-lg">
                  <Verified size={16} />
                  Verified
                </div>
              )}
              
              {/* Role Badge */}
              {selectedProfile.role_display && (
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium">
                  {selectedProfile.role_display}
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedProfile.full_name || selectedProfile.nick_name || selectedProfile.username}
                  </h2>
                  {selectedProfile.age && (
                    <p className="text-gray-600">{selectedProfile.age} years old</p>
                  )}
                </div>
                {selectedProfile.relationship_type && (
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
                    {selectedProfile.relationship_type.replace('_', ' ')}
                  </span>
                )}
              </div>

              {/* Location & Gender */}
              <div className="flex flex-wrap gap-3 mb-4">
                {selectedProfile.country && (
                  <div className="flex items-center gap-1.5 text-gray-600 text-sm bg-gray-100 px-3 py-1.5 rounded-full">
                    <MapPin size={14} />
                    {selectedProfile.country}
                  </div>
                )}
                {selectedProfile.gender && (
                  <div className="flex items-center gap-1.5 text-gray-600 text-sm bg-gray-100 px-3 py-1.5 rounded-full">
                    <Users size={14} />
                    {selectedProfile.gender}
                  </div>
                )}
                {selectedProfile.availability && (
                  <div className="flex items-center gap-1.5 text-green-600 text-sm bg-green-50 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {selectedProfile.availability.replace('_', ' ')}
                  </div>
                )}
              </div>

              {/* Bio */}
              {selectedProfile.bio && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-1">About</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedProfile.bio}</p>
                </div>
              )}

              {/* Expectations */}
              {selectedProfile.expectations && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Looking For</h3>
                  <p className="text-gray-600 text-sm">{selectedProfile.expectations}</p>
                </div>
              )}

              {/* Interests */}
              {selectedProfile.interests && selectedProfile.interests.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.interests.map((interest, idx) => (
                      <span key={idx} className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-medium">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Connect Button */}
              <a
                href="https://edate.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all mt-4"
              >
                <MessageCircle size={20} />
                Chat on E-Date
                <Heart size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      )}

     
    </div>
  );
};

export default PremiumHangoutPage;