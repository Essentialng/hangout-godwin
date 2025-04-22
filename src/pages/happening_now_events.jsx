import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { Tabs, Tab, Box, Card, CardMedia, CardContent, Typography, IconButton, CircularProgress, TextField } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CabinIcon from "@mui/icons-material/Cabin";
import HouseIcon from "@mui/icons-material/House";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {motion} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Star } from "@mui/icons-material";
import fancyImg from '../assets/dfsdgsg.jpg';
import SensorsIcon from "@mui/icons-material/Sensors";
const  youTubeStreamAPI = import.meta.env.VITE_YOUTUBE_API_KEY

const API_KEY = `${youTubeStreamAPI}`;
const MAX_RESULTS = 3;


const categories = [
  { label: "Today", icon: <HouseIcon /> },
  { label: "Tomorrow", icon: <BeachAccessIcon /> },
  { label: "This Week", icon: <CabinIcon /> },
  { label: "Next Week", icon: <BeachAccessIcon /> },
  { label: "This Month", icon: <BeachAccessIcon /> },
  { label: "Next Month", icon: <BeachAccessIcon /> },
  { label: "See All", icon: <BeachAccessIcon /> },
];


const HappeningNow = () => {
  const [hotellisting, setHotelListing] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [beachplaceData, setBeachPlace] = useState([]);
  const [beachplaceData2, setBeachPlace2] = useState([]);
  const [beachplaceData3, setBeachPlace3] = useState([]);
  const [beachplaceData4, setBeachPlace4] = useState([]);
  const [beachplaceData5, setBeachPlace5] = useState([]);
  const slug = "beaches"; 
  const slug2 = "restaurants"; 
  const slug3 = "shopping-malls"; 
  const slug4 = "launches"; 
  const slug5 = "night-clubs"; 


  // happening now method ///////////////////////////////////////

    const [videos, setVideos] = useState([]);
    const [ORGANIZER_CHANNELS, setChannelsData] = useState([]);
    
      // Fetch all organizer channel IDs
      useEffect(() => {
        const fetchAllChannels = async () => {
          try {
            const response = await axios.get(`${API_ROUTE}all_channels/`);
            console.log("API response:", response.data);
    
            if (response.status === 200 && Array.isArray(response.data.channels)) {
              const channels = response.data.channels.map((channel) => channel.channel_id);
              console.log("Extracted channel IDs:", channels);
              setChannelsData(channels);
            } else {
              console.error("Invalid API response format.");
            }
          } catch (error) {
            console.error("Error fetching channels:", error);
          }
        };
    
        fetchAllChannels();
      }, []);
    
      // Fetch live streams only after ORGANIZER_CHANNELS is updated
      useEffect(() => {
        if (ORGANIZER_CHANNELS.length === 0) {
          console.log("ORGANIZER_CHANNELS is empty, skipping fetch.");
          return;
        }
    
        console.log("Fetching live streams for channels:", ORGANIZER_CHANNELS);
    
        const fetchAllLiveStreams = async () => {
          try {
            setLoading(true);
            let allVideos = [];
    
            for (const channelId of ORGANIZER_CHANNELS) {
              console.log(`Fetching live streams for channel: ${channelId}`);
    
              const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&maxResults=${MAX_RESULTS}&key=${API_KEY}`
              );
              const data = await response.json();
    
              console.log("YouTube API Response:", data);
    
              if (data.items) {
                allVideos = [...allVideos, ...data.items];
              }
            }
    
            setVideos(allVideos);
          } catch (error) {
            console.error("Error fetching live streams:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchAllLiveStreams();
      }, [ORGANIZER_CHANNELS]);

  /// happening now end //////////////////////////////////

  const navigate = useNavigate();

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_ROUTE}/hotels/`);
      if (response.status === 200 || response.status === 201) {
        let places = response.data.filter(place => !place.slug.match(/-\d+$/));
        setHotelListing(places);
        setFilteredHotels(places);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedTab === 0) {
      fetchHotels();
    } else {
      setHotelListing([]);
      setFilteredHotels([]);
    }
  }, [selectedTab]);

  useEffect(() => {
    const filtered = hotellisting.filter(hotel =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHotels(filtered);
  }, [searchQuery, hotellisting]);

  const toggleFavorite = (index) => {
    setFavorites(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (selectedTab === 6) {
    // Redirect to the desired page (e.g., "/anotherPage")
    navigate('/Live');
  }

  useEffect(() => {
    
      if (!slug) {
        alert("Slug not available");
        return;
      }
  
      const fetchRequest = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setBeachPlace(filteredPlaces);
            console.log('beaches dataaaaaa fetche',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } finally {
          setLoading(false);
        }
      };
      const fetchRequest2 = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug2.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setBeachPlace2(filteredPlaces);
            console.log('beaches dataaaaaa fetche',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } finally {
          setLoading(false);
        }
      };
      const fetchRequest3 = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug3.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setBeachPlace3(filteredPlaces);
            console.log('beaches dataaaaaa fetche',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } finally {
          setLoading(false);
        }
      };
      const fetchRequest4 = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug4.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setBeachPlace4(filteredPlaces);
            console.log('beaches dataaaaaa fetche',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } finally {
          setLoading(false);
        }
      };
      const fetchRequest5 = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug5.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setBeachPlace5(filteredPlaces);
            console.log('beaches dataaaaaa fetche',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRequest5();
      fetchRequest4();
      fetchRequest3();
      fetchRequest2();
      fetchRequest();
    }, [slug]);


    const [events, setEvents] = useState([]);
        
    
        useEffect(() => {
          const token = localStorage.getItem('auth_token')
          axios.get(`${API_ROUTE}live-events/`, {
              headers: {
                  Authorization: `Token ${token}`, 
              },
          })
          .then(response => {
              setEvents(response.data);
              setLoading(false);
          })
          .catch(error => {
              console.error("Error fetching live events:", error);
              setLoading(false);
          });
      }, []);

  return (
    <Box sx={{ width: "100%", mx: "auto", }}>
     <div>
     <div className="mx-auto flex flex-wrap justify-center items-center text-center mb-5 mt-5">
  <h1
    style={{ fontFamily: 'monospace' }}
    className="text-3xl sm:text-5xl p-2 sm:p-4 font-bold"
  >
    Happening
  </h1>
  <h1 className="text-3xl sm:text-5xl p-2 sm:p-4 text-orange-600 font-bold flex items-center">
    Now
    <SensorsIcon style={{ fontSize: 30 }} className="ml-2 sm:ml-3" />
  </h1>
</div>

   
      {/* <img src={fancyImg} alt='fancyImg' className="w-100 h-10 mx-auto mb-2"/> */}
     </div>
      {/* Search Input */}
     
      
      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-5 px-2 sm:px-0">
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 0,
            borderColor: 'divider',
            '& .MuiTab-root': {
              mx: { xs: 0.5, sm: 1 },
              backgroundColor: '#dddd',
              color: '#000',
              borderRadius: 2,
              fontWeight: 500,
              minHeight: 'auto',
            },
          }}
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category.label} sx={{ px: { xs: 1, sm: 3 }, fontSize: { xs: 12, sm: 16 } }} />
          ))}
        </Tabs>
      </div>

<div className="mt-5"></div>

     {/* Beach Listings */}
     {selectedTab === 1 && beachplaceData != null ? (
  <div className="max-w-6xl mx-auto px-6">
    {(() => {
      // Get today's date and tomorrow's date
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // Filter events happening tomorrow
      const tomorrowEvents = events.filter((event) => {
        const eventDate = new Date(event.event_date_time);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate.getTime() === tomorrow.getTime();
      });

      return tomorrowEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {tomorrowEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Event Image */}
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.event_title}
                  className="w-full h-60 object-cover rounded-t-xl"
                />
                <span className="absolute top-3 right-3 bg-orange-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  Tomorrow
                </span>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {event.event_title}
                </h2>
                <p className="text-sm text-gray-500 flex items-center mb-1">
                  📍 <span className="ml-1">{event.location}</span>
                </p>
                
                <div className="flex flex-wrap justify-between mt-1">
                  <p className="text-sm text-gray-500 flex items-center">
                  📅 {new Date(event.event_date_time).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    ⏰ {new Date(event.event_date_time).toLocaleTimeString()}
                    
                  </p>
                </div>


                <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                  {event.about.length > 120
                    ? event.about.slice(0, 120) + "..."
                    : event.about}
                </p>

                {/* View Event Button */}
                <button
                  className="mt-6 w-full bg-orange-600 text-white font-semibold rounded-lg py-3 flex items-center justify-center shadow-md transition-transform hover:scale-105 hover:bg-orange-700"
                  onClick={() => navigate(`/LiveEventDetails/${event.slug}`)}
                >
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg font-medium mt-10">
          No event tomorrow
        </div>
      );
    })()}
  </div>
) : (
  <Typography></Typography>
)}

{/* lounch */}
{selectedTab === 2 && beachplaceData2 != null ? (
  <div className="max-w-6xl mx-auto px-6">
    {(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() + 2); // Day after tomorrow

      const weekEnd = new Date(today);
      weekEnd.setDate(today.getDate() + (5 - today.getDay())); // Up to Friday

      const weekendStart = new Date(today);
      weekendStart.setDate(today.getDate() + (6 - today.getDay())); // Saturday

      const weekendEnd = new Date(today);
      weekendEnd.setDate(today.getDate() + (7 - today.getDay())); // Sunday

      // Filter events happening tomorrow
      const tomorrowEvents = events.filter((event) => {
        const eventDate = new Date(event.event_date_time);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate.getTime() === tomorrow.getTime();
      });

      // Filter events happening this week (Tuesday to Friday)
      const thisWeekEvents = events.filter((event) => {
        const eventDate = new Date(event.event_date_time);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= weekStart && eventDate <= weekEnd;
      });

      // Filter weekend events (Saturday & Sunday)
      const weekendEvents = events.filter((event) => {
        const eventDate = new Date(event.event_date_time);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= weekendStart && eventDate <= weekendEnd;
      });

      // Decide which events to display
      let displayedEvents = [];
      let displayLabel = "";

      if (tomorrowEvents.length > 0) {
        displayedEvents = tomorrowEvents;
        displayLabel = "Tomorrow";
      } else if (thisWeekEvents.length > 0) {
        displayedEvents = thisWeekEvents;
        displayLabel = "This Week";
      } else if (weekendEvents.length > 0) {
        displayedEvents = weekendEvents;
        displayLabel = "This Weekend";
      }

      return displayedEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {displayedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Event Image */}
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.event_title}
                  className="w-full h-60 object-cover rounded-t-xl"
                />
                <span className="absolute top-3 right-3 bg-orange-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {displayLabel}
                </span>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {event.event_title}
                </h2>
                <p className="text-sm text-gray-500 flex items-center mb-1">
                  📍 <span className="ml-1">{event.location}</span>
                </p>
                <div className="flex flex-wrap justify-between mt-1">
                  <p className="text-sm text-gray-500 flex items-center">
                  📅 {new Date(event.event_date_time).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    ⏰ {new Date(event.event_date_time).toLocaleTimeString()}
                    
                  </p>
                </div>
                <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                  {event.about.length > 120
                    ? event.about.slice(0, 120) + "..."
                    : event.about}
                </p>

                {/* View Event Button */}
                <button
                  className="mt-6 w-full bg-orange-600 text-white font-semibold rounded-lg py-3 flex items-center justify-center shadow-md transition-transform hover:scale-105 hover:bg-orange-700"
                  onClick={() => navigate(`/LiveEventDetails/${event.slug}`)}
                >
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg font-medium mt-10">
          No event tomorrow, this week, or this weekend
        </div>
      );
    })()}
  </div>
) : (
  <Typography></Typography>
)}


{selectedTab === 3 && beachplaceData3 != null ? (
  <div className="max-w-6xl mx-auto px-6">
    {(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + (8 - today.getDay())); // Start of next week (Monday)

      const nextSunday = new Date(nextMonday);
      nextSunday.setDate(nextMonday.getDate() + 6); // End of next week (Sunday)

      // Filter events happening next week (Monday-Sunday)
      const nextWeekEvents = events.filter((event) => {
        const eventDate = new Date(event.event_date_time);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= nextMonday && eventDate <= nextSunday;
      });

      return nextWeekEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {nextWeekEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Event Image */}
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.event_title}
                  className="w-full h-60 object-cover rounded-t-xl"
                />
                <span className="absolute top-3 right-3 bg-orange-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  Next Week
                </span>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {event.event_title}
                </h2>
                <p className="text-sm text-gray-500 flex items-center mb-1">
                  📍 <span className="ml-1">{event.location}</span>
                </p>
                <div className="flex flex-wrap justify-between mt-1">
                  <p className="text-sm text-gray-500 flex items-center">
                  📅 {new Date(event.event_date_time).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    ⏰ {new Date(event.event_date_time).toLocaleTimeString()}
                    
                  </p>
                </div>

                <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                  {event.about.length > 120
                    ? event.about.slice(0, 120) + "..."
                    : event.about}
                </p>

                {/* View Event Button */}
                <button
                  className="mt-6 w-full bg-orange-600 text-white font-semibold rounded-lg py-3 flex items-center justify-center shadow-md transition-transform hover:scale-105 hover:bg-orange-700"
                  onClick={() => navigate(`/LiveEventDetails/${event.slug}`)}
                >
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg font-medium mt-10">
          No events next week
        </div>
      );
    })()}
  </div>
) : (
  <Typography></Typography>
)}

{selectedTab === 4 && beachplaceData4 != null ? (
  <div className="max-w-6xl mx-auto px-6">
    {(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // First day of the current month
      const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      // Last day of the current month
      const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      // Filter events happening this month
      const currentMonthEvents = events.filter((event) => {
        const eventDate = new Date(event.event_date_time);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= currentMonthStart && eventDate <= currentMonthEnd;
      });

      return currentMonthEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {currentMonthEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Event Image */}
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.event_title}
                  className="w-full h-60 object-cover rounded-t-xl"
                />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  This Month
                </span>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {event.event_title}
                </h2>
                <p className="text-sm text-gray-500 flex items-center mb-1">
                  📍 <span className="ml-1">{event.location}</span>
                </p>
                <div className="flex flex-wrap justify-between mt-1">
                  <p className="text-sm text-gray-500 flex items-center">
                    📅 {new Date(event.event_date_time).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    ⏰ {new Date(event.event_date_time).toLocaleTimeString()}
                  </p>
                </div>

                <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                  {event.about.length > 120
                    ? event.about.slice(0, 120) + "..."
                    : event.about}
                </p>

                {/* View Event Button */}
                <button
                  className="mt-6 w-full bg-blue-600 text-white font-semibold rounded-lg py-3 flex items-center justify-center shadow-md transition-transform hover:scale-105 hover:bg-blue-700"
                  onClick={() => navigate(`/LiveEventDetails/${event.slug}`)}
                >
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg font-medium mt-10">
          No events this month
        </div>
      );
    })()}
  </div>
) : (
  <Typography></Typography>
)}


{selectedTab === 5 && beachplaceData5 != null ? (
  <div className="max-w-6xl mx-auto px-6">
    {(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // First day of next month
      const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);

      // Last day of next month
      const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0);

      // Filter events happening next month
      const nextMonthEvents = events.filter((event) => {
        const eventDate = new Date(event.event_date_time);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= nextMonthStart && eventDate <= nextMonthEnd;
      });

      return nextMonthEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {nextMonthEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Event Image */}
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.event_title}
                  className="w-full h-60 object-cover rounded-t-xl"
                />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  Next Month
                </span>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {event.event_title}
                </h2>
                <p className="text-sm text-gray-500 flex items-center mb-1">
                  📍 <span className="ml-1">{event.location}</span>
                </p>
                <div className="flex flex-wrap justify-between mt-1">
                  <p className="text-sm text-gray-500 flex items-center">
                  📅 {new Date(event.event_date_time).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    ⏰ {new Date(event.event_date_time).toLocaleTimeString()}
                    
                  </p>
                </div>

                <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                  {event.about.length > 120
                    ? event.about.slice(0, 120) + "..."
                    : event.about}
                </p>

                {/* View Event Button */}
                <button
                  className="mt-6 w-full bg-blue-600 text-white font-semibold rounded-lg py-3 flex items-center justify-center shadow-md transition-transform hover:scale-105 hover:bg-blue-700"
                  onClick={() => navigate(`/LiveEventDetails/${event.slug}`)}
                >
                  View Event
                </button>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg font-medium mt-10">
          No events next month
        </div>
      );
    })()}
  </div>
) : (
  <Typography></Typography>
)}
{selectedTab === 6 ? (<div>Redirecting...</div> ) : (<Typography></Typography>)}








      {/* Listings */}
      {selectedTab === 0 && (
        <Box onClick={() => navigate(`/hotelnewlist/${hotel.slug}`)} sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 3 }} className="p-6">
          {videos.length > 0 ? (
                      videos.map((video) => (
                        <div key={video.id.videoId} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
                          <span className="absolute top-5 left-4 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded">
                          <SensorsIcon style={{fontSize:20}}/> Live
                          </span>
                          <iframe
                            className="w-full h-56"
                            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&iv_load_policy=3&disablekb=1`}
                            frameBorder="0"
                            allowFullScreen
                          ></iframe>
          
        
                          <div className="p-4">
                            <p className="text-sm font-semibold text-gray-700 truncate">
                              {video.snippet.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {video.snippet.channelTitle}
                            </p>
                          </div>
                         
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">No live streams available.</p>
                    )}
                    
                   
        </Box>
        
      )}
      {selectedTab === 0 && beachplaceData != null ? (
  <div className="max-w-6xl mx-auto m-4">
  {(() => {
    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter events happening today
    const todayEvents = events.filter((event) => {
      const eventDate = new Date(event.event_date_time);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === today.getTime();
    });

    return todayEvents.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {todayEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all"
          >
            {/* Event Image */}
            <div className="relative">
              <img
                src={event.image}
                alt={event.event_title}
                className="w-full h-60 object-cover rounded-t-xl"
              />
              <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                Today
              </span>
            </div>

            {/* Event Details */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {event.event_title}
              </h2>
              <p className="text-sm text-gray-500 flex items-center mb-1">
                📍 <span className="ml-1">{event.location}</span>
              </p>

              <div className="flex flex-wrap justify-between mt-1">
                <p className="text-sm text-gray-500 flex items-center">
                  📅 {new Date(event.event_date_time).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                  ⏰ {new Date(event.event_date_time).toLocaleTimeString()}
                </p>
              </div>

              <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                {event.about.length > 120
                  ? event.about.slice(0, 120) + "..."
                  : event.about}
              </p>

              {/* View Event Button */}
              <button
                className="mt-6 w-full bg-orange-600 text-white font-semibold rounded-lg py-3 flex items-center justify-center shadow-md transition-transform cursor-pointer hover:scale-105 hover:bg-orange-700"
                onClick={() => navigate(`/LiveEventDetails/${event.slug}`)}
              >
                View Event
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center text-gray-500 text-lg font-medium mt-10">
        No events today
      </div>
    );
  })()}
</div>

) : (
  <Typography></Typography>
)}
    </Box>
  );
};

export default HappeningNow;
