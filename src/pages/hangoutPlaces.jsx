import React,{useEffect, useState} from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { useNavigate } from "react-router-dom";
import design from '../assets/ewwww.jpg';
import bannerImage from "../assets/maxresdefault.jpg"; 
import banner from "../assets/y2O4cqtylhP8.png"
import banner2 from "../assets/maxresdefault (1).png"
import { UserPlus } from "lucide-react";
import fancyImg from '../assets/dfsdgsg.jpg';

const PremiumHangoutPage = () => {

  const [places, setCategories] = useState([]);
  const navigate = useNavigate();

  const people =[
    { 
      title: "Evelyn Drake", 
      desc: "Relax and soak up the sun at a scenic beach destination.", 
      img: bannerImage || "https://www.cluburlaub.de/db_images/anlagen/1178/1178_2_20200518123139.jpg"
    },
    { 
      title: "Grace Ik", 
      desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
      img: banner2
    },
    { 
      title: "Lord Money", 
      desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
      img: banner2
    },
    { 
      title: "John Isaac", 
      desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
      img: banner2
    },
    { 
      title: "Dianna Awai", 
      desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
      img: banner2
    },
    { 
      title: "Chioma Ikwegbewe", 
      desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
      img: banner2
    },
    { 
      title: "Chioma Ikwegbewe", 
      desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
      img: banner2
    },
    { 
      title: "Chioma Ikwegbewe", 
      desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
      img: banner2
    },
    { 
      title: "Chioma Ikwegbewe", 
      desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
      img: banner2
    },

  ]
 
   
  const fetchHangoutPlaces = async () => {
    try {
      const response = await axios.get(`${API_ROUTE}/hangout-places/`);
      
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
              <span style={{ fontFamily: 'Poppins-Bold' }} className="text-yellow-400 font-bold">Home</span> / Hangout Places
            </p>
          </div>
      </motion.div>
      
      <motion.div className="bg-white py-8 text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black font-bold mt-5 leading-tight max-w-4xl mx-auto">
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
      <div className="min-h-screen bg-white p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {places.map((place, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(`/hangout/${place.slug}`)} 
              className="relative bg-white shadow rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="relative">
            
              <motion.img
                src={`${API_ROUTE}${place.images?.[0]?.image}`}
                alt={place.name}
                loading="lazy"
                className="w-full h-68 object-coverd transition-all duration-500"
              />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 flex justify-center items-center bg-opacity-40">
                  <h2 className="text-3xl font-bold text-white">{place.name}</h2>
                </div>
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-500 p-6 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
                  {place.name}
                </h2>
                <p className="text-gray-300 mt-2 px-4 text-lg leading-relaxed">
                  {place.description.slice(0,30)}
                </p>
                <motion.button
                  onClick={() => navigate(`/hangout/${place.slug}`)} 
                  whileTap={{ scale: 0.9 }}
                  className="mt-4 px-6 py-2 cursor-pointer bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg"
                >
                  Explore 
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="mx-auto ">
          <h3 style={{fontFamily:'cursive'}} className="mx-auto text-center p-5 mt-10 rounded-full">More Comming Soon....</h3>
        </div>
        {/* bg-gradient-to-r from-orange-100 */}
        <div className="flex flex-col lg:flex-row items-center mt-20 gap-12 p-14 mx-auto rounded-3xl  bg-white">
      {/* Image Section */}
      <motion.img
        src={design}
        alt="Discover Ossh"
        className="w-30 h-auto object-cover "
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Content Section */}
      <section className="relative bg-gray-50 flex flex-col items-center text-center  p-10 rounded-2xl shadow-md">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Find Your Perfect Hangout Partner
        </h2>
        <p className="text-lg md:text-xl mt-6 text-gray-700 leading-relaxed max-w-3xl">
          Connect with like-minded individuals on{' '}
          <span className="font-bold text-orange-600">Ossh</span>. Whether you're looking for adventure, meaningful
          conversations, or a casual meetup, we help you find the right company.
        </p>

        {/* List of People */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 w-full">
          {people.slice(0, 6).map((user, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center gap-4 border border-gray-200 p-6"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={user.img}
                alt={user.title}
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 shadow-md -mt-12"
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">{user.title}</h3>
                <p className="text-green-600 font-medium">🟢 Available</p>
              </div>
              <a
                href="https://ooshlink.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 px-6 py-2 flex items-center bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all shadow-md"
              >
                <UserPlus className="mr-2 w-5 h-5" />
                Connect
              </a>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <a
          href="https://ooshlink.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 px-10 py-4 border border-orange-600 text-orange-600 font-semibold text-lg rounded hover:text-white hover:bg-orange-700 transition-all"
        >
          Explore More
        </a>
      </section>
    </div>
      </div>
    </div>
  );
};

export default PremiumHangoutPage;

