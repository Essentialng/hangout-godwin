import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_ROUTE } from "../ApisConf/api_config";
import { Dialog } from "@headlessui/react";
import { Share, Star, Map } from "@mui/icons-material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hangout() {
  const { slug } = useParams();
  const [placeData, setPlacesData] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [places, setCategories] = useState([]);
  const navigate = useNavigate();

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
          setPlacesData(filteredPlaces);
          console.log('beaches data',filteredPlaces);
        } else {
          console.log("Cannot fetch data");
        }
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [slug]);

  const sharePlace = (place) => {
    const shareUrl = `${window.location.origin}/hangout/${place.slug}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  const fetchHangoutPlaces = async () => {
    try {
      const response = await axios.get(`${API_ROUTE}hangout-places/`);
      
      if (response.status === 200 || response.status === 201) {
        let places = response.data;
  
        // Filter out slugs that end with "-number" (e.g., "beaches-1", "restaurants-2", etc.)
        places = places.filter(place => !place.slug.match(/-\d+$/));
  
        setCategories(places); // Set the filtered data
      
      } else {
        console.log("Data not fetched");
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  useEffect(() => {fetchHangoutPlaces();}, []);

  return (
    <div className=" bg-[#dee3ed] p-5">
        <h2 className="text-4xl capitalize mt-6 font-bold mb-7 text-gray-800">
      {slug.charAt(0).toUpperCase() + slug.slice(1)} hangout spots <span style={{fontSize:22, color:'grey'}}>({placeData.length})</span>
    </h2>

    <div className="flex flex-wrap gap-3 cursor-pointer mb-8">
    {places.slice(0, 9).map((data, index) => (
      <span
        key={index}
        style={{ fontSize: 20 }}
        onClick={() => navigate(`/hangout/${data.slug}`)}
        className="bg-white px-3 py-1 rounded-full font-semibold shadow-md"
      >
        {data.name}
      </span>
    ))}
  </div>


       {loading ? (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/30 backdrop-blur-md z-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-transparent border-t-yellow-400 border-l-yellow-400 rounded-full animate-[spin_2s_linear_infinite]"></div>
            <p className="text-white text-lg font-medium tracking-wide animate-[pulse_70s_infinite]">
              Loading, please wait...
            </p>
          </div>
        </div>
     
      ) : (
        <div className="grid max-w-5xl mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeData.map((place) => (
            <motion.div
              key={place.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
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
      )}

      {/* Popup Modal */}
      {selectedPlace && (
        <Dialog open={true} onClose={() => setSelectedPlace(null)}>
          <div className="fixed inset-0 bg-black/70 bg-opacity-20 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white p-6 border border-gray-400 rounded-lg shadow-lg max-w-4xl w-full overflow-hidden flex"
            >
              <div className="w-2/3">
                <img
                  src={`${API_ROUTE}${selectedImage}`}
                  alt={selectedPlace.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <hr className="mt-5 text-gray-200" />
                <div className="flex gap-2 p-2 overflow-x-auto">
                  {selectedPlace.images?.map((img, index) => (
                    <img
                      key={index}
                      src={`${API_ROUTE}${img.image}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80"
                      onClick={() => setSelectedImage(img.image)}
                    />
                  ))}
                </div>
              </div>
              <div className="w-1/3 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedPlace.name}</h2>
                  <p className="text-gray-600 mt-2">{selectedPlace.description}</p>
                  <p className="text-gray-500 mt-2"><LocationOnOutlinedIcon/> {selectedPlace.location}</p>
                  <div className="flex items-center mt-2"><h1 className="text-3xl font-bold text-gray-500">5</h1>
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="text-yellow-500" />
                  ))}
                </div>
                  <button
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.location)}`, "_blank")}
                    className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all flex items-center gap-2 mt-3"
                  >
                    <Map /> View in Map
                  </button>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => sharePlace(selectedPlace)}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                  >
                    <Share /> Share
                  </button>
                  <button
                    onClick={() => setSelectedPlace(null)}
                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
