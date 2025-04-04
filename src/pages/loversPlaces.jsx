import React,{useEffect, useState} from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { useNavigate } from "react-router-dom";
import fancyImg from '../assets/dfsdgsg.jpg';


const PremiumLoversPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [places, setCategories] = useState([]);
    const navigate = useNavigate();
    const fetchHangoutPlaces = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}/lovers-places/`);
        
        if (response.status === 200 || response.status === 201) {
          let places = response.data;
          console.log("fetched", response.data);
    
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
    <div>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-start relative p-8"
        style={{
          backgroundImage: `url('/images/maxresdefault (14).jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 280,
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
        <div className="flex items-center justify-center mt-10">
          <h2 style={{fontFamily:'monospace'}} className="text-yellow-500 text-6xl font-bold bg-white">Discover</h2>
          <h2 className="font-bold ml-4 text-6xl bg-white"> the Magic </h2>
        </div>
        <img src={fancyImg} alt='fancyImg' className="w-100 h-20 mx-auto"/>
      </motion.div>
      
      <div style={{marginTop:-100}} className="min-h-screen bg-white p-6 flex justify-center items-center">
        <div  className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {places.map((place, index) => (
            <motion.div 
            onClick={() => navigate(`/lovershangout/${place.slug}`)} 
              key={index} 
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
               <motion.img
                  src={`${API_ROUTE}${place.images?.[0]?.image}`}
                  alt={place.name}
                  className="w-full h-68 object-cover transition-all duration-500"
                />
              
              <motion.div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-white text-3xl font-bold">{place.name}</h2>
                <hr className="text-yellow-400 mt-2 mb-1"/>
              </motion.div>
              {hoveredIndex === index && (
                <motion.div 
                  className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                   <motion.img
                  src={`${API_ROUTE}${place.images?.[0]?.image}`}
                  alt={place.name}
                  className="w-60 h-48 object-cover transition-all duration-500"
                  onClick={() => navigate(`/lovershangout/${place.slug}`)} 
                />
                
                  <p className="text-white text-center mt-4">{place.description.slice(0,30)}</p>
                  <motion.button
                      onClick={() => navigate(`/lovershangout/${place.slug}`)} 
                      whileTap={{ scale: 0.9 }}
                      className="mt-4 px-6 py-2 mb-3 cursor-pointer bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg"
                      >
                      Explore 
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumLoversPage;