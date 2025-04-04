import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, RefreshCcw, ArrowLeft, ArrowRight } from "lucide-react";
import homeHero from "../assets/7cbedd189de2504e8086a5bbb1751ef5.png";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const HeroSection = () => {
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
            setPlacesData2(filteredPlaces);
            console.log('beaches data',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
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
            setPlacesData3(filteredPlaces);
            console.log('beaches data',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
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
            setPlacesData4(filteredPlaces);
            console.log('beaches data',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
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
            setPlacesData5(filteredPlaces);
            console.log('beaches data',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } 
      };
      const fetchRequest6 = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug6.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setPlacesData6(filteredPlaces);
            console.log('beaches data',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } 
      };
      const fetchRequest7 = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug7.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setPlacesData7(filteredPlaces);
            console.log('beaches data',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } 
      };
      const fetchRequest8 = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug8.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setPlacesData8(filteredPlaces);
            console.log('beaches data',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } 
      };
      const fetchRequest9 = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug9.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setPlacesData9(filteredPlaces);
            console.log('beaches data',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } 
      };
      const fetchRequest10 = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug10.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setPlacesData10(filteredPlaces);
            console.log('beaches data',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } 
      };
      const fetchRequest11 = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug11.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setPlacesData11(filteredPlaces);
            console.log('beaches data',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } 
      };
      const fetchRequest12 = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hangout-places/`);
  
          if (response.status === 200 || response.status === 201) {
            const allPlaces = response.data;
            const baseSlug = slug12.split("-")[0];
            const filteredPlaces = allPlaces.filter((place) =>
              place.slug.startsWith(baseSlug)
            );
            setPlacesData12(filteredPlaces);
            console.log('beaches data',filteredPlaces);
          } else {
            console.log("Cannot fetch data");
          }
        } catch (error) {
          console.log("Error fetching data", error);
        } 
      };

      const fetchHotels = async () => {
        
        try {
          const response = await axios.get(`${API_ROUTE}/hotels/`);
          if (response.status === 200 || response.status === 201) {
            let places = response.data.filter(place => !place.slug.match(/-\d+$/));
            setHotelListing(places);
            
          }
        } catch (error) {
          console.error("Error fetching data", error);
        }
        
      };
      fetchHotels();
      fetchRequest7();
      fetchRequest10();
      fetchRequest11();
      fetchRequest12();
      fetchRequest9();
      fetchRequest8();
      fetchRequest6();
      fetchRequest5();
      fetchRequest4();
      fetchRequest3();
      fetchRequest();
      fetchRequest2();
    }, [slug]);


  return (
    <div className="w-full bg-white pb-12">
      
      {/* Top Banner */}
      <div className="text-center py-10 mt-16 mb-12 px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-snug">
          The world is going  
          <span className="text-orange-500 text-7xl md:text-8xl font-black italic tracking-wide">e</span>, so are we.
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
          Experience a new way to **discover, connect, and hang out** with like-minded people.  
          From vibrant social events to exclusive gatherings, we're bringing the future of hangouts right to your fingertips.  
           **Explore. Connect. Enjoy.**
        </p>
      </div>

      {/* Categories with Move-in Animation */}
      <div className="bg-[#fca674] p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

        {/* restaurants listing +++++++++++++++++++++++++++*/}
        
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {hotellisting.length > 0 && (
            <motion.div
              key={hotellisting[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100  p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/HotelsNewListing`)}
            >
              <img
                src={`${hotellisting[0].images?.[0]?.image}`}
                alt={hotellisting[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">Hotels Listing</h3>
               
                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {hotellisting.length}+ Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {placeData2.length > 0 && (
            <motion.div
              key={placeData2[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100  p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/hangout/${placeData2[0].slug}`)}
            >
              <img
                src={`${API_ROUTE}${placeData2[0].images?.[0]?.image}`}
                alt={placeData2[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{placeData2[0].name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {placeData2.length} + Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {placeData3.length > 0 && (
            <motion.div
              key={placeData3[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100  p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/hangout/${placeData3[0].slug}`)}
            >
              <img
                src={`${API_ROUTE}${placeData3[0].images?.[0]?.image}`}
                alt={placeData3[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{placeData3[0].name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {placeData3.length}+ Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {placeData4.length > 0 && (
            <motion.div
              key={placeData4[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100  p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/hangout/${placeData4[0].slug}`)}
            >
              <img
                src={`${API_ROUTE}${placeData4[0].images?.[0]?.image}`}
                alt={placeData4[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{placeData4[0].name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {placeData4.length}+ Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {placeData5.length > 0 && (
            <motion.div
              key={placeData5[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100  p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/hangout/${placeData5[0].slug}`)}
            >
              <img
                src={`${API_ROUTE}${placeData5[0].images?.[0]?.image}`}
                alt={placeData5[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{placeData5[0].name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {placeData5.length}+ Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {placeData6.length > 0 && (
            <motion.div
              key={placeData6[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100  p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/hangout/${placeData6[0].slug}`)}
            >
              <img
                src={`${API_ROUTE}${placeData6[0].images?.[0]?.image}`}
                alt={placeData6[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{placeData6[0].name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {placeData6.length}+ Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {placeData7.length > 0 && (
            <motion.div
              key={placeData7[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100  p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/hangout/${placeData7[0].slug}`)}
            >
              <img
                src={`${API_ROUTE}${placeData7[0].images?.[0]?.image}`}
                alt={placeData7[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{placeData7[0].name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {placeData7.length}+ Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {placeData8.length > 0 && (
            <motion.div
              key={placeData8[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100 p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/hangout/${placeData8[0].slug}`)}
            >
              <img
                src={`${API_ROUTE}${placeData8[0].images?.[0]?.image}`}
                alt={placeData8[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{placeData8[0].name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {placeData8.length}+ Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {placeData9.length > 0 && (
            <motion.div
              key={placeData9[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100 p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/hangout/${placeData9[0].slug}`)}
            >
              <img
                src={`${API_ROUTE}${placeData9[0].images?.[0]?.image}`}
                alt={placeData9[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{placeData9[0].name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {placeData8.length}+ Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {placeData10.length > 0 && (
            <motion.div
              key={placeData10[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100 p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/hangout/${placeData10[0].slug}`)}
            >
              <img
                src={`${API_ROUTE}${placeData10[0].images?.[0]?.image}`}
                alt={placeData10[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{placeData10[0].name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {placeData10.length}+ Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {placeData11.length > 0 && (
            <motion.div
              key={placeData11[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100 p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/hangout/${placeData11[0].slug}`)}
            >
              <img
                src={`${API_ROUTE}${placeData11[0].images?.[0]?.image}`}
                alt={placeData11[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{placeData11[0].name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {placeData11.length}+ Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        <div className="justify-center p-2">
          {/* Restaurants Listing */}
          {placeData12.length > 0 && (
            <motion.div
              key={placeData12[0].id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100 p-1 overflow-hidden cursor-pointer w-full lg:w-[100%]"
              onClick={() => navigate(`/hangout/${placeData12[0].slug}`)}
            >
              <img
                src={`${API_ROUTE}${placeData12[0].images?.[0]?.image}`}
                alt={placeData12[0].name}
                className="w-full h-38 object-cover"
              />
              <div className="p-5 text-center">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900">{placeData12[0].name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {placeData12.length}+ Listings
                </p>
              </div>
            </motion.div>
          )}

        </div>
        
          
      </div>
      <div className="bg-[#fca674] p-3">
      <button
          className=" bg-white justify-center items-center mx-auto text-black cursor-pointer hover:text-orange-600 hover:bg-white px-5 md:px-8 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
          onClick={() => navigate('/HangoutPlaces')}
          >
          See All <ArrowForwardIosIcon style={{ fontSize: 20, color:'black', marginLeft:10}} className="mr-3 hover:text-orange-600" /> 
        </button>
      </div>
      
      {/* Event Banner */}
      {/* <div className="relative w-full mt-30 mx-auto">
        <img src={homeHero} alt="Event" className="w-full h-100" />
       
        <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full text-white transition">
        
        </button>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full text-white transition">
          
        </button>
        <button 
        onClick={() => navigate(`/hangout/bars-and-clubs`)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 border cursor-pointer border-white text-white px-6 py-3 rounded-md font-semibold">
          View Place
        </button>
      </div> */}
    </div>
  );
};

export default HeroSection;
