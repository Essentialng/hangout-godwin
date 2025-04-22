// import axios from "axios";
// import { useEffect, useState } from "react";
// import { API_ROUTE } from "../ApisConf/api_config";
// import SensorsIcon from "@mui/icons-material/Sensors";
// const youTubeStreamAPI = import.meta.env.VITE_YOUTUBE_API_KEY;
// import { useNavigate } from "react-router-dom";

// const API_KEY = `${youTubeStreamAPI}`;
// const MAX_RESULTS = 3;

// const LiveStreams = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [ORGANIZER_CHANNELS, setChannelsData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(""); 


//   // Fetch all organizer channel IDs
//   useEffect(() => {
//     const fetchAllChannels = async () => {
//       try {
//         const response = await axios.get(`${API_ROUTE}all_channels/`);
//         console.log("API response:", response.data);

//         if (response.status === 200 && Array.isArray(response.data.channels)) {
//           const channels = response.data.channels.map((channel) => channel.channel_id);
//           console.log("Extracted channel IDs:", channels);
//           setChannelsData(channels);
//         } else {
//           console.error("Invalid API response format.");
//         }
//       } catch (error) {
//         console.error("Error fetching channels:", error);
//       }
//     };

//     fetchAllChannels();
//   }, []);

//   // Fetch live streams only after ORGANIZER_CHANNELS is updated
//   useEffect(() => {
//     if (ORGANIZER_CHANNELS.length === 0) {
//       console.log("ORGANIZER_CHANNELS is empty, skipping fetch.");
//       return;
//     }

//     console.log("Fetching live streams for channels:", ORGANIZER_CHANNELS);

//     const fetchAllLiveStreams = async () => {
//       try {
//         setLoading(true);
//         let allVideos = [];

//         for (const channelId of ORGANIZER_CHANNELS) {
//           console.log(`Fetching live streams for channel: ${channelId}`);

//           const response = await fetch(
//             `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&maxResults=${MAX_RESULTS}&key=${API_KEY}`
//           );
//           const data = await response.json();

//           console.log("YouTube API Response:", data);

//           if (data.items) {
//             // Filter by selected category if available
//             const filteredVideos = data.items.filter((video) => {
//               if (selectedCategory && video.snippet.categoryId !== selectedCategory) {
//                 return false;
//               }
//               return true;
//             });

//             allVideos = [...allVideos, ...filteredVideos];
//           }
//         }

//         // Sort videos by the publishedAt timestamp
//         allVideos.sort((a, b) => {
//           return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt);
//         });

//         setVideos(allVideos);
//       } catch (error) {
//         console.error("Error fetching live streams:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllLiveStreams();
//   }, [ORGANIZER_CHANNELS, selectedCategory]); // Depend on category as well
//   const navigate = useNavigate();
 
//    const redirect = () => {
//      navigate('/HangoutPlaces');
//    }
 
//    const [events, setEvents] = useState([]);
           
       
//            useEffect(() => {
//              const token = localStorage.getItem('auth_token')
//              axios.get(`${API_ROUTE}live-events/`, {
//                  headers: {
//                      Authorization: `Token ${token}`, 
//                  },
//              })
//              .then(response => {
//                  setEvents(response.data);
//                  setLoading(false);
//              })
//              .catch(error => {
//                  console.error("Error fetching live events:", error);
//                  setLoading(false);
//              });
//          }, []);
//   return (
//     <div className=" mx-auto mt-10">
//       <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
//         <SensorsIcon style={{ fontSize: 60, color: 'red' }} /> Happening Now
//       </h2>

//       {/* Category Filter */}
//       <div className="flex justify-center mb-6">
//         <select
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           value={selectedCategory}
//           className="p-2 border rounded"
//         >
//           <option value="">Select Category</option>
//           <option value="">All</option>
//           <option value="1">Nature</option>
//           <option value="2">Gaming</option>
//           <option value="10">Sports</option>
//           <option value="10">Fun</option>
//           {/* Add more categories as needed */}
//         </select>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-40 ">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 p-10 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {videos.length > 0 ? (
//             videos.map((video) => (
//               <div key={video.id.videoId} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
//                 <span className="absolute top-5 left-4 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded">
//                   <SensorsIcon style={{ fontSize: 20 }} /> Live
//                 </span>
//                 <iframe
//                   className="w-full h-56"
//                   src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&iv_load_policy=3&disablekb=1`}
//                   frameBorder="0"
//                   allowFullScreen
//                 ></iframe>

//                 <div className="p-4">
//                   <p className="text-sm font-semibold text-gray-700 truncate">
//                     {video.snippet.title}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {video.snippet.channelTitle}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">No live streams available.</p>
//           )}
//         </div>
//       )}
//       <section className=" mt-20">
//         <h2 className="text-5xl font-bold mx-auto text-gray-800 text-center mb-10">Happening Soon</h2>
//         <div className="grid grid-cols-1 bg-gray-200 p-10 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {events.map(event => (
//                   <div key={event.id} className="border bg-white border-gray-300 rounded-lg overflow-hidden ">
//                       <img src={event.image} alt={event.event_title} className="w-full h-48 object-cover" />
//                       <div className="p-5">
//                       <h2 className="text-lg font-semibold mt-2">{event.event_title}</h2>
                     
//                       <p className="text-sm text-gray-500 mt-1">Location: {event.location}</p>
//                       <p className="text-sm text-gray-500">Date: {new Date(event.event_date_time).toLocaleString()}</p>
//                       <p className="text-sm text-gray-700 mt-2">{event.about.slice(0,50)+ '...'}</p>
                      
//                       <button
//                         className="mt-6 bg-orange-600 text-white cursor-pointer hover:bg-orange-700 p-3 mx-auto font-semibold rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
//                         onClick={() => navigate(`/LiveEventDetails/${event.slug}`)}
//                       >
//                         Check Out
//                       </button>
//                       </div>
//                   </div>
//               ))}
//           </div>
//       </section>
//     </div>
//   );
// };

// export default LiveStreams;

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
     <div className="mx-auto flex flex-wrap justify-between justify-center item-center mb-5 mt-5 ">
        <h1 style={{fontFamily:'monospace'}}className="text-5xl p-4 font-bold">Happening </h1>
        <h1  className="text-5xl p-4 text-orange-600 ml-2 font-bold"> Now  <SensorsIcon style={{ fontSize: 40 }} className="mr-3" /> </h1>
        
            
      </div>
   
      {/* <img src={fancyImg} alt='fancyImg' className="w-100 h-10 mx-auto mb-2"/> */}
     </div>
      {/* Search Input */}
     
      
      {/* Tabs Navigation */}
      <div style={{ justifyContent: "center", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px",marginBottom:20 }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 0, borderColor: "divider", "& .MuiTab-root": { mx: 1 } }}
        >
          {categories.map((category, index) => (
            <Tab style={{backgroundColor:'#dddd', color:'#000', borderRadius:10, fontWeight:500}} key={index} label={category.label} sx={{ px: 3 }} />
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
        <Box onClick={() => navigate(`/hotelnewlist/${hotel.slug}`)} sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 3 }}>
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



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { API_ROUTE } from "../ApisConf/api_config";

// const LiveEvents = () => {
//   const navigate = useNavigate();
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//       const token = localStorage.getItem('auth_token')
//       axios.get(`${API_ROUTE}live-events/`, {
//           headers: {
//               Authorization: `Token ${token}`, 
//           },
//       })
//       .then(response => {
//           setEvents(response.data);
//           setLoading(false);
//       })
//       .catch(error => {
//           console.error("Error fetching live events:", error);
//           setLoading(false);
//       });
//   }, []);
  

//     if (loading) {
//         return <div className="flex justify-center items-center h-screen">Loading...</div>;
//     }

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Live Events</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {events.map(event => (
//                     <div key={event.id} className="border rounded-lg overflow-hidden shadow-lg p-4">
//                         <img src={event.image} alt={event.event_title} className="w-full h-48 object-cover" />
//                         <h2 className="text-lg font-semibold mt-2">{event.event_title}</h2>
//                         <p className="text-sm text-gray-600">{event.caption}</p>
//                         <p className="text-sm text-gray-500 mt-1">Location: {event.location}</p>
//                         <p className="text-sm text-gray-500">Date: {new Date(event.event_date_time).toLocaleString()}</p>
//                         <p className="text-sm text-gray-700 mt-2">{event.about.slice(0,100)+ '...'}</p>
//                         <p className="text-sm text-gray-600 mt-2">Organizer: {event.organizer_name}</p>
//                         <button
//                           className="mt-6 bg-orange-600 cursor-pointer hover:bg-orange-700 px-5 md:px-8 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
//                           onClick={() => navigate(`/LiveEventDetails/${event.slug}`)}
//                         >
//                           View Event
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default LiveEvents;






// export default LiveStreams;
// import { useEffect, useState } from "react";

// const API_KEY = "AIzaSyA9OK9gtXQrggzVwmBzXnVUq3ab1x9xTmM"; // Replace with your API key
// const CLIENT_ID = "530644344791-9s9beovnqmmjjk04h7ipd994e2af5qj6.apps.googleusercontent.com"; // From Google Cloud Console
// const SCOPES = "https://www.googleapis.com/auth/youtube";

// const LiveStreams = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userChannel, setUserChannel] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isBroadcasting, setIsBroadcasting] = useState(false);

//   // Initialize Google API client
//   useEffect(() => {
//     const loadGoogleAPI = () => {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/api.js';
//       script.onload = () => {
//         window.gapi.load('client:auth2', initClient);
//       };
//       document.body.appendChild(script);
//     };

//     const initClient = () => {
//       window.gapi.client.init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         scope: SCOPES,
//         discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
//       }).then(() => {
//         // Listen for sign-in state changes
//         window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
//         // Handle initial sign-in state
//         updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
//       });
//     };

//     const updateSigninStatus = (isSignedIn) => {
//       setIsAuthenticated(isSignedIn);
//       if (isSignedIn) {
//         getUserChannel();
//       }
//     };

//     loadGoogleAPI();
//   }, []);

//   // Get user's YouTube channel info
//   const getUserChannel = () => {
//     window.gapi.client.youtube.channels.list({
//       part: 'snippet',
//       mine: true
//     }).then(response => {
//       const channel = response.result.items[0];
//       setUserChannel(channel);
//       // Store channel ID in your backend/database here
//       console.log('User channel:', channel);
//     });
//   };

//   // Handle sign-in
//   const handleAuthClick = () => {
//     window.gapi.auth2.getAuthInstance().signIn();
//   };

//   // Handle sign-out
//   const handleSignoutClick = () => {
//     window.gapi.auth2.getAuthInstance().signOut();
//   };

//   // Start broadcasting
//   const startBroadcasting = () => {
//     setIsBroadcasting(true);
//     // Here you would typically create a live event via YouTube API
//     // and embed the streaming interface
//   };

//   // Fetch live streams (including the user's stream if broadcasting)
//   useEffect(() => {
//     const fetchLiveStreams = async () => {
//       try {
//         let allVideos = [];
        
//         // Add user's channel to the list if authenticated and broadcasting
//         const channelsToCheck = [...ORGANIZER_CHANNELS];
//         if (isAuthenticated && userChannel && isBroadcasting) {
//           channelsToCheck.push(userChannel.id);
//         }

//         for (const channelId of channelsToCheck) {
//           const response = await fetch(
//             `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&maxResults=1&key=${API_KEY}`
//           );
//           const data = await response.json();
//           if (data.items) {
//             allVideos = [...allVideos, ...data.items];
//           }
//         }

//         setVideos(allVideos);
//       } catch (error) {
//         console.error("Error fetching live streams:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLiveStreams();
//   }, [isAuthenticated, userChannel, isBroadcasting]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
//         🔴 Live Streaming
//       </h2>

//       {/* Authentication and Broadcast Controls */}
//       <div className="mb-8 p-4 bg-gray-100 rounded-lg">
//         {!isAuthenticated ? (
//           <button 
//             onClick={handleAuthClick}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Sign in with YouTube
//           </button>
//         ) : (
//           <div>
//             <div className="flex items-center mb-4">
//               <img 
//                 src={userChannel?.snippet?.thumbnails?.default?.url} 
//                 alt="Channel" 
//                 className="w-10 h-10 rounded-full mr-3"
//               />
//               <span>{userChannel?.snippet?.title}</span>
//               <button 
//                 onClick={handleSignoutClick}
//                 className="ml-4 text-sm text-gray-600 hover:text-gray-800"
//               >
//                 Sign out
//               </button>
//             </div>
            
//             {!isBroadcasting ? (
//               <button
//                 onClick={startBroadcasting}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               >
//                 Start Broadcasting
//               </button>
//             ) : (
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold mb-2">Live Broadcast</h3>
//                 {/* Embed YouTube Live Streaming Interface */}
//                 <div className="w-full h-96 bg-black">
//                   {/* In a real implementation, you would embed the streaming interface here */}
//                   <p className="text-white text-center py-40">
//                     YouTube Live Streaming Interface would appear here
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setIsBroadcasting(false)}
//                   className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                 >
//                   Stop Broadcasting
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Live Streams Display */}
//       <h3 className="text-2xl font-bold mb-4 text-gray-800">Live Streams</h3>
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {videos.length > 0 ? (
//             videos.map((video) => (
//               <div key={video.id.videoId} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
//                 <span className="absolute top-5 left-4 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded">
//                   🔴 Live
//                 </span>
//                 <iframe
//                   className="w-full h-56"
//                   src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&iv_load_policy=3`}
//                   frameBorder="0"
//                   allowFullScreen
//                 ></iframe>
//                 <div className="p-4">
//                   <p className="text-sm font-semibold text-gray-700 truncate">
//                     {video.snippet.title}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {video.snippet.channelTitle}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">No live streams available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveStreams;




// import React, { useEffect, useRef, useState } from "react";
// import SimplePeer from "simple-peer";
// import { Buffer } from "buffer";
// import axios from "axios";

// window.Buffer = Buffer;

// const LiveStream = () => {
//   const videoRef = useRef(null);
//   const wsRef = useRef(null);
//   const peerRef = useRef(null);
//   const [streamStatus, setStreamStatus] = useState("Connecting...");
//   const [streamKey, setStreamKey] = useState('cb237281-9274-456d-90fa-e29ecb61916d');
//    const [status, setStatus] = useState('Initializing...');
//     const [isLive, setIsLive] = useState(false);

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         const token = localStorage.getItem('auth_token');
//         if (!token) throw new Error('Not authenticated');
        
//         const response = await axios.get('http://127.0.0.1:8000/get-stream-key/', {
//           headers: { Authorization: `Token ${token}` }
//         });
        
//         setStreamKey(response.data.streamKey);
//         setStatus('Ready to broadcast');
//         console.log('key', response.data.streamKey)
//       } catch (error) {
//         console.error('Initialization error:', error);
//         setStatus('Initialization failed');
//       }
//     };

//     initialize();
//   }, []);

//   useEffect(() => {
    
//     const socket = new WebSocket(`ws://localhost:8001/ws/live/${streamKey}/`);
//     wsRef.current = socket;

//     socket.onopen = () => {
//       console.log("✅ WebSocket connected");

//       // Viewer is NOT the initiator (broadcaster is the initiator)
//       const newPeer = new SimplePeer({
//         initiator: false, // Viewer waits for an offer
//         trickle: false,
//       });

//       peerRef.current = newPeer; // Assign it here before using

//       newPeer.on("signal", (data) => {
//         console.log("📡 Sending answer to broadcaster:", data);
//         if (wsRef.current.readyState === WebSocket.OPEN) {
//           wsRef.current.send(JSON.stringify({ type: "answer", signal: data }));
//         } else {
//           console.warn("❌ WebSocket not open. Cannot send answer.");
//         }
//       });

//       newPeer.on("stream", (stream) => {
//         console.log("✅ Received remote stream:", stream);
//         setStreamStatus("Live");
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         } else {
//           console.error("❌ VideoRef is null. Cannot set stream.");
//         }
//       });

//       newPeer.on("error", (err) => {
//         console.error("⚠️ Peer connection error:", err);
//         setStreamStatus("Connection error");
//       });
//     };

//     socket.onmessage = (event) => {
//       console.log("📩 WebSocket message received:", event.data);
//       const data = JSON.parse(event.data);

//       if (data.type === "offer" && peerRef.current) {
//         console.log("📡 Received WebRTC offer from broadcaster:", data.signal);
//         peerRef.current.signal(data.signal); // Respond to offer
//       } else {
//         console.warn("⚠️ Unexpected WebSocket message:", data);
//       }
//     };

//     socket.onclose = () => {
//       console.log("❌ WebSocket closed");
//       setStreamStatus("Stream ended");
//       cleanup();
//     };

//     socket.onerror = (error) => {
//       console.error("❌ WebSocket error:", error);
//       setStreamStatus("Connection error");
//     };

//     const cleanup = () => {
//       if (peerRef.current) {
//         peerRef.current.destroy();
//         peerRef.current = null;
//       }
//       if (wsRef.current) {
//         wsRef.current.close();
//         wsRef.current = null;
//       }
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject = null;
//       }
//     };

//     return cleanup;
//   }, [streamKey]);

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Live Stream: {streamKey}</h1>
//       <p style={styles.status}>Status: {streamStatus}</p>
//       <video ref={videoRef} autoPlay playsInline controls style={styles.video} />
//       {streamStatus !== "Live" && <p>🔄 {streamStatus}</p>}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "30px",
//     maxWidth: "800px",
//     margin: "0 auto",
//   },
//   header: {
//     fontSize: "24px",
//     marginBottom: "10px",
//   },
//   status: {
//     fontWeight: "bold",
//     marginBottom: "15px",
//   },
//   video: {
//     width: "100%",
//     minHeight: "400px",
//     borderRadius: "8px",
//     backgroundColor: "#000",
//   },
// };

// export default LiveStream;



// import React, { useEffect, useRef, useState } from "react";
// import SimplePeer from "simple-peer";
// import { Buffer } from "buffer";
// import axios from "axios";

// window.Buffer = Buffer;

// const LiveStream = ({ isBroadcaster = true }) => {
//   const videoRef = useRef(null);
//   const [ws, setWs] = useState(null);
//   const [peer, setPeer] = useState(null);
//   const [streamKey, setStreamKey] = useState(null);
//   const [isStreaming, setIsStreaming] = useState(false);

//   useEffect(() => {
//     const fetchStreamKey = async () => {
//       const token = localStorage.getItem("auth_token");
//       if (!token) {
//         console.warn("User is not logged in.");
//         return;
//       }

//       try {
//         const response = await axios.get("http://127.0.0.1:8000/get-stream-key/", {
//           headers: { Authorization: `Token ${token}` },
//         });

//         setStreamKey(response.data.streamKey); // ✅ Just fetch stream key, no auto-start
//         console.log("Stream Key:", response.data.streamKey);
//       } catch (error) {
//         console.error("Error fetching stream key:", error);
//       }
//     };

//     fetchStreamKey();
//   }, []);

// const startLiveStream = async () => {
//     console.log("Starting live stream...");
//     const token = localStorage.getItem("auth_token");

//     try {
//         // 🔹 First, fetch the CSRF token from Django
//         const csrfResponse = await axios.get("http://127.0.0.1:8000/get-csrf-token/", {
//             withCredentials: true, // Ensure cookies are sent
//         });
//         const csrfToken = csrfResponse.data.csrfToken;  // Adjust according to your backend response
//        console.log('c-token',csrfToken);
//         // 🔹 Now, start the live stream with the CSRF token
//         const response = await axios.post(
//             "http://127.0.0.1:8000/live-stream-start/",
//             {},
//             {
//                 headers: {
//                     Authorization: `Token ${token}`,
//                     "X-CSRFToken": csrfToken,  // Include CSRF token
//                 },
//                 withCredentials: true,  // Ensure cookies are sent
//             }
//         );

//         setStreamKey(response.data.streamKey);
//         setIsStreaming(true);
//         console.log("Live Stream Started:", response.data);
//     } catch (error) {
//         console.error("Error starting live stream:", error);
//     }
// };


//   const stopLiveStream = async () => {
//     console.log("Stopping live stream...");

//     const token = localStorage.getItem("auth_token");
//     try {
//         // 🔹 First, fetch the CSRF token from Django
//         const csrfResponse = await axios.get("http://127.0.0.1:8000/get-csrf-token/", {
//             withCredentials: true, // Ensure cookies are sent
//         });
//         const csrfToken = csrfResponse.data.csrfToken;  // Adjust according to your backend response
//        console.log('c-token',csrfToken);
//         // 🔹 Now, start the live stream with the CSRF token
//         const response = await axios.post(
//             "http://127.0.0.1:8000/live-stream-stop/",
//             {},
//             {
//                 headers: {
//                     Authorization: `Token ${token}`,
//                     "X-CSRFToken": csrfToken,  // Include CSRF token
//                 },
//                 withCredentials: true,  // Ensure cookies are sent
//             }
//         );

//         setIsStreaming(false);
//         if (peer) peer.destroy();
//         if (ws) ws.close();
//         console.log("Live Stream Stopped");
//         console.log("Live Stream Started:", response.data);
//     } catch (error) {
//         console.error("Error stopping live stream:", error);
//     }
    
//   };

//   useEffect(() => {
//     //console.log('stream key', streamKey)
//    // if (!isStreaming || !streamKey) return;
//     const socket = new WebSocket(`ws://localhost:8000/ws/live/${streamKey}/`);
//     setWs(socket);

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('socet io data', data)
//       if (data.signal && peer) {
//         peer.signal(data.signal); // Pass received signal to peer
//       }
//     };

//     socket.onclose = () => console.log("WebSocket closed");

//     return () => socket.close();
// }, [streamKey]);


//   useEffect(() => {
//     if (!ws || !isStreaming) return;

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//         const newPeer = new SimplePeer({
//           initiator: isBroadcaster,
//           trickle: false,
//           stream,
//         });

//         newPeer.on("signal", (data) => {
//           ws.send(JSON.stringify({ signal: data }));
//         });

//         newPeer.on("stream", (remoteStream) => {
//           videoRef.current.srcObject = remoteStream;
//         });

//         setPeer(newPeer);
//       })
//       .catch((err) => console.error("Error accessing camera:", err));

//     return () => peer && peer.destroy();
//   }, [ws, isStreaming]);

//   return (
//     <div className="p-30 mb-20">
//       <h1>Live Streaming {streamKey || "No Stream Key"}</h1>
//       <video ref={videoRef} autoPlay playsInline muted={isBroadcaster} style={{ width: "100%", height: "auto" }}></video>

//       {isBroadcaster ? (
//         <>
//           {!isStreaming ? (
//             <button
//               className="bg-black text-white p-2 rounded"
//               onClick={startLiveStream}
//               style={{ display: "block", margin: "10px", padding: "10px" }}
//             >
//               ▶️ Start Live
//             </button>
//           ) : (
//             <button
//               className="bg-black text-white p-2 rounded"
//               onClick={stopLiveStream}
//               style={{ display: "block", margin: "10px", padding: "10px" }}
//             >
//               ⏹️ Stop Live
//             </button>
//           )}
//         </>
//       ) : (
//         <p>You are not a broadcaster.</p>
        
//       )}
//     </div>
//   );
// };

// export default LiveStream;



// import React, { useEffect, useRef, useState } from "react";
// import SimplePeer from "simple-peer";
// import { Buffer } from "buffer";
// import axios from "axios";
// window.Buffer = Buffer;

// const LiveStream = ({ isBroadcaster }) => {
//   const videoRef = useRef(null);
//   const [ws, setWs] = useState(null);
//   const [peer, setPeer] = useState(null);
//   const [streamKey, setStreamKey] = useState(null);

//   useEffect(() => {
//     const fetchStreamKey = async () => {
//       const token = localStorage.getItem("auth_token");
//       console.log("Retrieved Token:", token);  // ✅ Debug Token
  
//       if (!token) {
//         alert("User is not logged in.");
//         return;
//       }
  
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/get-stream-key/",
//           {
//             headers: {
//               Authorization: `Token ${token}`,
//               "Content-Type": "application/json"
//             }
//           }
//         );
        
        
//         const stream_key_value = response.data.streamKey
//         setStreamKey(stream_key_value)
//         console.log("Successfu key:", stream_key_value);
//       } catch (error) {
//         console.error("Error fetching stream key:", error);
//         console.error("Error details:", error.response?.data || error.message);
//       }
//     };
  
//     fetchStreamKey();
//   }, []);
  

//   useEffect(() => {
//     console.log('stream key', streamKey)
//     const socket = new WebSocket(`ws://localhost:8000/ws/live/${streamKey}/`);
//     setWs(socket);

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('socet io data', data)
//       if (data.signal && peer) {
//         peer.signal(data.signal); // Pass received signal to peer
//       }
//     };

//     socket.onclose = () => console.log("WebSocket closed");

//     return () => socket.close();
//   }, [streamKey]);

//   useEffect(() => {
//     if (!ws) return;

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//         const newPeer = new SimplePeer({
//           initiator: isBroadcaster, // Broadcaster: true, Viewer: false
//           trickle: false,
//           stream,
//         });

//         newPeer.on("signal", (data) => {
//           ws.send(JSON.stringify({ signal: data })); // Send signal to WebSocket
//         });

//         newPeer.on("stream", (remoteStream) => {
//           videoRef.current.srcObject = remoteStream; // Viewer's video
//         });

//         setPeer(newPeer);
//       })
//       .catch((err) => console.error("Error accessing camera:", err));

//     return () => peer && peer.destroy();
//   }, [ws]);

//   return (
//     <div className="p-30 mb-20">
//       <h1>Live Streaming {streamKey}</h1>
//       <video ref={videoRef} autoPlay playsInline muted={isBroadcaster}></video>
//     </div>
//   );
// };

// export default LiveStream;
