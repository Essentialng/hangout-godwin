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
import fancyImg from '../assets/designconcept2.png';

const categories = [
  { label: "Hotels", icon: <HouseIcon /> },
  { label: "Beaches", icon: <BeachAccessIcon /> },
  { label: "Restaurants", icon: <CabinIcon /> },
  { label: "Shopping Malls", icon: <CabinIcon /> },
  { label: "Events", icon: <CabinIcon /> },
  { label: "Launches", icon: <BeachAccessIcon /> },
  { label: "Night Clubs", icon: <BeachAccessIcon /> },
];

const NewListings = () => {
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
    <Box sx={{ width: "100%", mx: "auto"}} className="mb-10">
     <div className="mx-auto flex flex-wrap justify-center items-center mb-5 mt-5">
        <h1 style={{ fontFamily: 'monospace' }} className="text-4xl sm:text-5xl p-4 font-bold text-center">
          Explore
        </h1>
        <h1 className="text-4xl sm:text-5xl p-4 text-orange-600 ml-2 font-bold text-center">
          New Listing
        </h1>
      </div>

      <img
        src={fancyImg}
        alt="fancyImg"
        className="w-70 h-auto mx-auto mb-2"
      />

      {/* Search Input */}
     
      
      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-between items-center gap-2">
  <Tabs
    value={selectedTab}
    onChange={(e, newValue) => setSelectedTab(newValue)}
    variant="scrollable"
    scrollButtons="auto"
    sx={{
      borderBottom: 1,
      borderColor: "divider",
      "& .MuiTab-root": { mx: 1 }
    }}
    className="w-full sm:w-auto"
  >
    {categories.map((category, index) => (
      <Tab key={index} label={category.label} icon={category.icon} sx={{ px: 3 }} />
    ))}
  </Tabs>
</div>

<div className="mt-5"></div>

     
     {/* Beach Listings */}
     {selectedTab === 1 && beachplaceData !=null ? (
              <div className="grid max-w-5xl mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-5 pr-5">
                {beachplaceData.map((place) => (
                  <motion.div
                    key={place.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/hangoutOverview/${place.slug}`)}
                  >
                    <img
                      src={`${API_ROUTE}${place.images?.[0]?.image}`}
                      alt={place.name}
                      className="w-full h-48 object-cover"
                    />
                         <div className="p-5">
                          {/* Title */}
                          <h3 className="text-lg font-bold text-gray-900">{place.name}</h3>
                        
                          {/* Description */}
                          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                            {place.description.length > 100 ? place.description.slice(0, 100) + "..." : place.description}
                          </p>
                        
                          {/* Rating & Explore Link */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-1">
                        
                              {[...Array(5)].map((_, index) => (
                                <div>
                                  
                                   <Star key={index} className="text-yellow-500 h-5 w-5" />
                                </div>
                               
                              ))}
                            </div>
                            
                            <button className="text-orange-500 font-medium hover:underline flex items-center">
                              Explore <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                          </div>
                        </div>
                  </motion.div>
                ))}
              </div>
 ) : (
   <Typography></Typography>
 )}
{/* lounch */}
{selectedTab === 2 && beachplaceData2 !=null ? (
              <div className="grid max-w-5xl pl-5 pr-5 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beachplaceData2.map((place) => (
                  <motion.div
                    key={place.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/hangoutOverview/${place.slug}`)}
                  >
                    <img
                      src={`${API_ROUTE}${place.images?.[0]?.image}`}
                      alt={place.name}
                      className="w-full h-48 object-cover"
                    />
                         <div className="p-5">
                          {/* Title */}
                          <h3 className="text-lg font-bold text-gray-900">{place.name}</h3>
                        
                          {/* Description */}
                          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                            {place.description.length > 100 ? place.description.slice(0, 100) + "..." : place.description}
                          </p>
                        
                          {/* Rating & Explore Link */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-1">
                        
                              {[...Array(5)].map((_, index) => (
                                <div>
                                  
                                   <Star key={index} className="text-yellow-500 h-5 w-5" />
                                </div>
                               
                              ))}
                            </div>
                            
                            <button className="text-orange-500 font-medium hover:underline flex items-center">
                              Explore <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                          </div>
                        </div>
                  </motion.div>
                ))}
              </div>
 ) : (
   <Typography></Typography>
 )}

{selectedTab === 3 && beachplaceData3 !=null ? (
              <div className="grid pl-5 pr-5 max-w-5xl mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beachplaceData3.map((place) => (
                  <motion.div
                    key={place.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/hangoutOverview/${place.slug}`)}
                  >
                    <img
                      src={`${API_ROUTE}${place.images?.[0]?.image}`}
                      alt={place.name}
                      className="w-full h-48 object-cover"
                    />
                         <div className="p-5">
                          {/* Title */}
                          <h3 className="text-lg font-bold text-gray-900">{place.name}</h3>
                        
                          {/* Description */}
                          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                            {place.description.length > 100 ? place.description.slice(0, 100) + "..." : place.description}
                          </p>
                        
                          {/* Rating & Explore Link */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-1">
                        
                              {[...Array(5)].map((_, index) => (
                                <div>
                                  
                                   <Star key={index} className="text-yellow-500 h-5 w-5" />
                                </div>
                               
                              ))}
                            </div>
                            
                            <button className="text-orange-500 font-medium hover:underline flex items-center">
                              Explore <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                          </div>
                        </div>
                  </motion.div>
                ))}
              </div>
 ) : (
   <Typography></Typography>
 )}
{selectedTab === 5 && beachplaceData4 !=null ? (
              <div className="grid pl-5 pr-5 max-w-5xl mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beachplaceData4.map((place) => (
                  <motion.div
                    key={place.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/hangoutOverview/${place.slug}`)}
                  >
                    <img
                      src={`${API_ROUTE}${place.images?.[0]?.image}`}
                      alt={place.name}
                      className="w-full h-48 object-cover"
                    />
                         <div className="p-5">
                          {/* Title */}
                          <h3 className="text-lg font-bold text-gray-900">{place.name}</h3>
                        
                          {/* Description */}
                          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                            {place.description.length > 100 ? place.description.slice(0, 100) + "..." : place.description}
                          </p>
                        
                          {/* Rating & Explore Link */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-1">
                        
                              {[...Array(5)].map((_, index) => (
                                <div>
                                  
                                   <Star key={index} className="text-yellow-500 h-5 w-5" />
                                </div>
                               
                              ))}
                            </div>
                            
                            <button className="text-orange-500 font-medium hover:underline flex items-center">
                              Explore <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                          </div>
                        </div>
                  </motion.div>
                ))}
              </div>
 ) : (
   <Typography></Typography>
 )}
{selectedTab === 6 && beachplaceData5 !=null ? (
              <div className="grid max-w-5xl pl-5 pr-5 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beachplaceData5.map((place) => (
                  <motion.div
                    key={place.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/hangoutOverview/${place.slug}`)}
                  >
                    <img
                      src={`${API_ROUTE}${place.images?.[0]?.image}`}
                      alt={place.name}
                      className="w-full h-48 object-cover"
                    />
                         <div className="p-5">
                          {/* Title */}
                          <h3 className="text-lg font-bold text-gray-900">{place.name}</h3>
                        
                          {/* Description */}
                          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                            {place.description.length > 100 ? place.description.slice(0, 100) + "..." : place.description}
                          </p>
                        
                          {/* Rating & Explore Link */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-1">
                        
                              {[...Array(5)].map((_, index) => (
                                <div>
                                  
                                   <Star key={index} className="text-yellow-500 h-5 w-5" />
                                </div>
                               
                              ))}
                            </div>
                            
                            <button className="text-orange-500 font-medium hover:underline flex items-center">
                              Explore <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                          </div>
                        </div>
                  </motion.div>
                ))}
              </div>
 ) : (
   <Typography></Typography>
 )}

{selectedTab === 4 && beachplaceData !=null ? (
              <div className="grid grid-cols-1 pl-5 pr-5 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
              {events.map(event => (
                  <div key={event.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg  ">
                      <img src={event.image} alt={event.event_title} className="w-full h-48 object-cover" />
                      <div className="p-5">
                      <h2 className="text-lg font-semibold mt-2">{event.event_title}</h2>
                     
                      <p className="text-sm text-gray-500 mt-1">Location: {event.location}</p>
                      <p className="text-sm text-gray-500">Date: {new Date(event.event_date_time).toLocaleString()}</p>
                      <p className="text-sm text-gray-700 mt-2">{event.about.slice(0,100)+ '...'}</p>
                      
                      <button
                        className="mt-6 bg-orange-600 text-white cursor-pointer hover:bg-orange-700 p-3 mx-auto font-semibold rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
                        onClick={() => navigate(`/LiveEventDetails/${event.slug}`)}
                      >
                        View Event
                      </button>
                      </div>
                  </div>
              ))}
          </div>
 ) : (
   <Typography></Typography>
 )}

      {/* Listings */}
      {selectedTab === 0 && (
        <Box 
        onClick={()=>{
          navigate(`/hotelnewlist/${hotel.slug}`)
          window.scrollTo({top:0, behavior:'smooth'})
        }}
         sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 3 }} className="pl-5 pr-5">
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
              <CircularProgress />
            </Box>
          ) : filteredHotels.length > 0 ? filteredHotels.map((hotel, index) => (
            <Card onClick={() => navigate(`/hotelnewlist/${hotel.slug}`)} key={index} sx={{ borderRadius: 4, boxShadow: 3, cursor: "pointer", position: "relative" }}>
              <IconButton
                onClick={(e) => { e.stopPropagation(); toggleFavorite(index); }}
                sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "white" }}
              >
                {favorites[index] ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon sx={{ color: "gray" }} />}
              </IconButton>
              <CardMedia component="img" height="200" image={hotel.images?.[0]?.image} alt={hotel.name} />
              <CardContent onClick={() => navigate(`/hotelnewlist/${hotel.slug}`)}>
                <Typography variant="h6" fontWeight="bold">{hotel.name}</Typography>
                <Typography variant="body2" color="text.secondary">{hotel.location}</Typography>
                <Typography variant="body2" color="text.secondary" className="flex flex-wrap mt-3">
                {[...Array(5)].map((_, index) => (
                                <div>
                                  
                                   <Star key={index} className="text-yellow-500 h-5 w-5" />
                                </div>
                               
                              ))}
                </Typography>
                <Typography variant="body1" fontWeight="bold" sx={{ mt: 1, fontSize:20 }}>
                  ₦ {Number(hotel.long_stay_price).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          )) : <Typography>No listings available</Typography>}
        </Box>
      )}
      
    </Box>
  );
};

export default NewListings;
