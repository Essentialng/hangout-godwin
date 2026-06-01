import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, RefreshCcw, ArrowLeft, ArrowRight, MapPin, Navigation, Loader, Clock, Car, Footprints, Bike, Eye } from "lucide-react";
import homeHero from "../assets/7cbedd189de2504e8086a5bbb1751ef5.png";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HeroSection = ({ userLocation: propUserLocation, locationLoading: propLocationLoading }) => {
  const [placeData, setPlacesData] = useState([]);
  const [placeData2, setPlacesData2] = useState([]);
  const [placeData3, setPlacesData3] = useState([]);
  const [placeData4, setPlacesData4] = useState([]);
  const [placeData5, setPlacesData5] = useState([]);
  const [placeData6, setPlacesData6] = useState([]);
  const [placeData7, setPlacesData7] = useState([]);
  const [placeData8, setPlacesData8] = useState([]);
  const [placeData9, setPlacesData9] = useState([]);
  const [placeData10, setPlacesData10] = useState([]);
  const [placeData11, setPlacesData11] = useState([]);
  const [placeData12, setPlacesData12] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hotellisting, setHotelListing] = useState([]);
  
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [showDistance, setShowDistance] = useState(false);
  const [placesWithDistance, setPlacesWithDistance] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [travelMode, setTravelMode] = useState('driving');

  const TRAVEL_SPEEDS = {
    driving: 50,
    walking: 5,
    cycling: 15
  };

  useEffect(() => {
    if (propUserLocation) {
      setUserLocation(propUserLocation);
      setShowDistance(true);
      if (propUserLocation.lat && propUserLocation.lng) {
        calculateAllDistances(propUserLocation.lat, propUserLocation.lng);
      }
    } else if (!propLocationLoading && !propUserLocation) {
      getUserLocation();
    }
  }, [propUserLocation, propLocationLoading]);

  useEffect(() => {
    if (userLocation && (hotellisting.length > 0 || placeData.length > 0)) {
      calculateAllDistances(userLocation.lat, userLocation.lng);
      setShowDistance(true);
    }
  }, [userLocation, hotellisting, placeData, placeData2, placeData3, placeData4, placeData5, placeData6, placeData7, placeData8, placeData9, placeData10, placeData11, placeData12]);

  const slug = 'restaurants'; 
  const slug2 = 'bars-and-clubs'; 
  const slug3 = 'beaches'; 
  const slug4 = 'movie-theaters'; 
  const slug5 = 'theme-parks'; 
  const slug6 = 'arcades'; 
  const slug7 = 'museums'; 
  const slug8 = 'spas'; 
  const slug9 = "night-clubs"; 
  const slug10 = "launches"; 
  const slug11 = "comedy-shows"; 
  const slug12 = "gyms"; 

  const navigate = useNavigate();

  const getUserLocation = () => {
    setLocationLoading(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setShowDistance(true);
          setLocationLoading(false);
          calculateAllDistances(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          let errorMessage = "Unable to get your location. ";
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Please enable location access to see distances.";
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
          setLocationLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setLocationLoading(false);
    }
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

  const calculateTravelTime = (distanceKm, mode) => {
    const speed = TRAVEL_SPEEDS[mode];
    const timeHours = distanceKm / speed;
    const timeMinutes = Math.round(timeHours * 60);
    
    if (timeMinutes < 1) return "< 1 min";
    if (timeMinutes < 60) return `${timeMinutes} min`;
    const hours = Math.floor(timeMinutes / 60);
    const mins = timeMinutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getTravelTime = (distanceKm) => {
    if (!distanceKm) return null;
    return calculateTravelTime(distanceKm, travelMode);
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

  const calculateAllDistances = (userLat, userLng) => {
    const allPlacesArrays = [
      { data: hotellisting, type: 'hotel' },
      { data: placeData, type: 'restaurant' },
      { data: placeData2, type: 'bar' },
      { data: placeData3, type: 'beach' },
      { data: placeData4, type: 'movie' },
      { data: placeData5, type: 'themepark' },
      { data: placeData6, type: 'arcade' },
      { data: placeData7, type: 'museum' },
      { data: placeData8, type: 'spa' },
      { data: placeData9, type: 'nightclub' },
      { data: placeData10, type: 'lunch' },
      { data: placeData11, type: 'comedy' },
      { data: placeData12, type: 'gym' },
    ];

    const distanceMap = {};

    allPlacesArrays.forEach(placeType => {
      placeType.data.forEach(place => {
        if (place.latitude && place.longitude) {
          const dist = calculateDistance(userLat, userLng, place.latitude, place.longitude);
          distanceMap[`${placeType.type}_${place.id}`] = {
            distance: Math.round(dist * 10) / 10,
            name: place.name,
            drivingTime: calculateTravelTime(dist, 'driving'),
            walkingTime: calculateTravelTime(dist, 'walking'),
            cyclingTime: calculateTravelTime(dist, 'cycling')
          };
        }
      });
    });

    setPlacesWithDistance(distanceMap);
  };

  const getDistanceData = (place, type) => {
    if (!showDistance || !userLocation) return null;
    const key = `${type}_${place.id}`;
    return placesWithDistance[key] || null;
  };

  const slugs = [slug, slug2, slug3, slug4, slug5, slug6, slug7, slug8, slug9, slug10, slug11, slug12];
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}/hangout-places/`);

        if (response.status === 200 || response.status === 201) {
          console.log("Fetched hangout places:", response.data);
          const allPlaces = response.data;
          
          const fetchData = (slugIndex, setState) => {
            const baseSlug = slugs[slugIndex].split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setState(filteredPlaces);
          };

          fetchData(0, setPlacesData);
          fetchData(1, setPlacesData2);
          fetchData(2, setPlacesData3);
          fetchData(3, setPlacesData4);
          fetchData(4, setPlacesData5);
          fetchData(5, setPlacesData6);
          fetchData(6, setPlacesData7);
          fetchData(7, setPlacesData8);
          fetchData(8, setPlacesData9);
          fetchData(9, setPlacesData10);
          fetchData(10, setPlacesData11);
          fetchData(11, setPlacesData12);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}/hotels/`);
        if (response.status === 200 || response.status === 201) {
          console.log("Fetched hotels:", response.data);
          let places = response.data.filter(place => !place.slug.match(/-\d+$/));
          setHotelListing(places);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchRequests();
    fetchHotels();
  }, []);

  useEffect(() => {
    if (userLocation && (hotellisting.length > 0 || placeData.length > 0)) {
      calculateAllDistances(userLocation.lat, userLocation.lng);
    }
  }, [userLocation, travelMode]);

  // Enhanced renderPlaceCard with view count inside the card
  const renderPlaceCard = (place, type, imageUrl, listingCount, viewCount) => {
    const distanceData = getDistanceData(place, type);
    const isHovered = hoveredCard === `${type}_${place.id}`;
    
    return (
      <motion.div
        key={place.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3, type: "spring", stiffness: 300 }
        }}
        className="bg-white shadow-lg border border-gray-100 overflow-hidden cursor-pointer w-full relative rounded-xl"
        onClick={() => {
          navigate(`/hangout/${place.slug}`);
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        }}
        onMouseEnter={() => setHoveredCard(`${type}_${place.id}`)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Distance Badge - Top Right */}
        <AnimatePresence>
          {distanceData && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-2 right-2 z-10 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex flex-col gap-1 shadow-lg"
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
                  {travelMode === 'driving' && `🚗 ${distanceData.drivingTime}`}
                  {travelMode === 'walking' && `🚶 ${distanceData.walkingTime}`}
                  {travelMode === 'cycling' && `🚲 ${distanceData.cyclingTime}`}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Count Badge - Top Left */}
        {viewCount !== undefined && viewCount !== null && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-2 left-2 z-10 bg-gradient-to-r from-blue-600 to-blue-500 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-lg"
          >
            <Eye size={12} className="text-yellow-300" />
            <span>{viewCount.toLocaleString()} Views</span>
          </motion.div>
        )}

        {/* Image Section */}
        <motion.div className="relative overflow-hidden h-48">
          <motion.img
            src={imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            onError={(e) => {
              e.target.src = homeHero;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
        
        {/* Content Section */}
        <motion.div 
          className="p-4 text-center relative"
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.h3 
            className="text-lg font-bold text-gray-900 line-clamp-1"
            animate={{ color: isHovered ? "#f59e0b" : "#111827" }}
          >
            {place.name}
          </motion.h3>
          
          {distanceData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2"
            >
              <p className="text-yellow-600 text-xs font-semibold flex items-center justify-center gap-1">
                <Clock size={12} />
                {travelMode === 'driving' && `Drive: ${distanceData.drivingTime}`}
                {travelMode === 'walking' && `Walk: ${distanceData.walkingTime}`}
                {travelMode === 'cycling' && `Cycle: ${distanceData.cyclingTime}`}
              </p>
            </motion.div>
          )}
          
          <motion.p 
            className="text-gray-600 text-sm mt-2 leading-relaxed"
            animate={{ opacity: isHovered ? 0.7 : 1 }}
          >
            {listingCount}+ Listings
          </motion.p>
          
          {/* Animated underline on hover */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Location and Travel Mode Controls */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <motion.div 
          className="flex justify-between items-center mb-6 flex-wrap gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3 
            className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
          >
            Explore Hangout Places
          </motion.h3>
          
          <div className="flex items-center gap-3 flex-wrap">
            {/* Travel Mode Selector */}
            {showDistance && userLocation && (
              <motion.div 
                className="flex items-center gap-2 bg-white rounded-xl shadow-lg p-1"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <button
                  onClick={() => setTravelMode('driving')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    travelMode === 'driving' 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Car size={14} />
                  Drive
                </button>
                <button
                  onClick={() => setTravelMode('walking')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    travelMode === 'walking' 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Footprints size={14} />
                  Walk
                </button>
                <button
                  onClick={() => setTravelMode('cycling')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    travelMode === 'cycling' 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Bike size={14} />
                  Cycle
                </button>
              </motion.div>
            )}

            {!showDistance && !locationLoading && !userLocation && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={getUserLocation}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold"
              >
                <Navigation size={16} />
                Show Distance & Travel Time
              </motion.button>
            )}
            
            {locationLoading && (
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md">
                <Loader className="animate-spin" size={16} />
                <span className="text-sm text-gray-600">Getting your location...</span>
              </div>
            )}
            
            {showDistance && userLocation && (
              <motion.div 
                className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-2 rounded-xl shadow-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <MapPin size={16} />
                <span className="text-sm font-semibold">
                  {getTravelLabel()} time shown
                </span>
              </motion.div>
            )}
            
            {locationError && (
              <motion.div 
                className="text-red-500 text-xs bg-red-50 px-3 py-1 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {locationError}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Cards Grid */}
      <div className="px-4 pb-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Hotels */}
          {hotellisting.length > 0 && renderPlaceCard(
            hotellisting[0], 
            'hotel', 
            `${hotellisting[0].images?.[0]?.image}`,
            hotellisting.length,
            hotellisting[0]?.view_count
          )}
          
          {/* Restaurants */}
          {placeData.length > 0 && renderPlaceCard(
            placeData[0],
            'restaurant',
            `${API_ROUTE}${placeData[0].images?.[0]?.image}`,
            placeData.length,
            placeData[0]?.view_count
          )}
          
          {/* Bars & Clubs */}
          {placeData2.length > 0 && renderPlaceCard(
            placeData2[0],
            'bar',
            `${API_ROUTE}${placeData2[0].images?.[0]?.image}`,
            placeData2.length,
            placeData2[0]?.view_count
          )}

          {/* Beaches */}
          {placeData3.length > 0 && renderPlaceCard(
            placeData3[0],
            'beach',
            `${API_ROUTE}${placeData3[0].images?.[0]?.image}`,
            placeData3.length,
            placeData3[0]?.view_count
          )}

          {/* Movie Theaters */}
          {placeData4.length > 0 && renderPlaceCard(
            placeData4[0],
            'movie',
            `${API_ROUTE}${placeData4[0].images?.[0]?.image}`,
            placeData4.length,
            placeData4[0]?.view_count
          )}

          {/* Theme Parks */}
          {placeData5.length > 0 && renderPlaceCard(
            placeData5[0],
            'themepark',
            `${API_ROUTE}${placeData5[0].images?.[0]?.image}`,
            placeData5.length,
            placeData5[0]?.view_count
          )}

          {/* Arcades */}
          {placeData6.length > 0 && renderPlaceCard(
            placeData6[0],
            'arcade',
            `${API_ROUTE}${placeData6[0].images?.[0]?.image}`,
            placeData6.length,
            placeData6[0]?.view_count
          )}

          {/* Museums */}
          {placeData7.length > 0 && renderPlaceCard(
            placeData7[0],
            'museum',
            `${API_ROUTE}${placeData7[0].images?.[0]?.image}`,
            placeData7.length,
            placeData7[0]?.view_count
          )}

          {/* Spas */}
          {placeData8.length > 0 && renderPlaceCard(
            placeData8[0],
            'spa',
            `${API_ROUTE}${placeData8[0].images?.[0]?.image}`,
            placeData8.length,
            placeData8[0]?.view_count
          )}

          {/* Night Clubs */}
          {placeData9.length > 0 && renderPlaceCard(
            placeData9[0],
            'nightclub',
            `${API_ROUTE}${placeData9[0].images?.[0]?.image}`,
            placeData9.length,
            placeData9[0]?.view_count
          )}

          {/* Lunches */}
          {placeData10.length > 0 && renderPlaceCard(
            placeData10[0],
            'lunch',
            `${API_ROUTE}${placeData10[0].images?.[0]?.image}`,
            placeData10.length,
            placeData10[0]?.view_count
          )}

          {/* Comedy Shows */}
          {placeData11.length > 0 && renderPlaceCard(
            placeData11[0],
            'comedy',
            `${API_ROUTE}${placeData11[0].images?.[0]?.image}`,
            placeData11.length,
            placeData11[0]?.view_count
          )}

          {/* Gyms */}
          {placeData12.length > 0 && renderPlaceCard(
            placeData12[0],
            'gym',
            `${API_ROUTE}${placeData12[0].images?.[0]?.image}`,
            placeData12.length,
            placeData12[0]?.view_count
          )}
        </div>
      </div>
      
      {/* See All Button */}
      <motion.div 
        className="pb-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-gray-800 to-gray-700 text-white justify-center items-center cursor-pointer hover:from-orange-600 hover:to-orange-500 px-6 py-3 text-base font-semibold rounded-xl shadow-lg flex items-center transition-all duration-300 gap-2"
          onClick={() => {
            navigate(`/HangoutPlaces`);
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          }}
        >
          See All Places
          <ArrowForwardIosIcon style={{ fontSize: 14 }} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroSection;