import React from "react";
import { motion } from "framer-motion";
import img from '../assets/dark-spirit.jpg';
import img2 from '../assets/3f36b5c8ec567bd4087023d89b51556a.900x506x1.png';
import img3 from '../assets/756507264648436.jpg';
import img4 from '../assets/beverageindustrynews.png';
import img5 from '../assets/pngtree-a-colorful-rainbow-slushy-drink-with-pink-straw-against-png-image_13127758.png';
import img6 from '../assets/coke.png';
import img7 from '../assets/81F0RlWZG0L._AC_UF1000,1000_QL80_.jpg';
import img8 from '../assets/red-label_800x.png';
import img9 from '../assets/81bni2Z+a0L._SL1500_.png';

const brands = [
  { name: "Hennessey", logo: img2 },
  { name: "Pepsi", logo: img3 },
  { name: "Trophy", logo: img4 },
  { name: "Slurt", logo: img5 },
  { name: "Coca-cola", logo: img6 },
  { name: "Guiness", logo: img7 },
  { name: "Johnny Walker", logo: img8 },
  { name: "Monster", logo: img9 },
];

export default function EDrinkPage() {
  return (
    <div style={{borderBottomRightRadius:150}} className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 py-10 px-4">
      <div className="max-w-7xl mx-auto  flex flex-col lg:flex-row items-start gap-10">
        
        {/* Left Side Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="w-full lg:w-1/3 rounded-2xl shadow-2xl overflow-hidden"
        >
          <img
            src={img}
            alt="Bacardi Black"
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>

       
        <div className="w-full lg:w-2/3">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center text-5xl font-bold text-black mb-4"
        >
          E-Drinks for Your Event
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-lg text-gray-600 mb-8"
        >
          Discover a wide range of refreshing drinks perfect for parties, weddings, and all your special occasions.
        </motion.p>

       


          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-lg bg-white border border-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-32 object-contain mb-3 mx-auto"
                />
                <span className="inline-block bg-orange-600 text-white text-xs font-medium px-4 py-1 mx-auto text-center rounded-full tracking-wide">
                  {brand.name}
                </span>
              </motion.div>
            ))}
          </div>
                  
                    <a href="https://edrink.efixit.ng/">
                      <motion.button
                        className="border text-center mt-10 justify-center items-center border-orange-600 mx-auto text-orange-600 text-bold bg-white px-6 py-3 rounded p-1 font-medium cursor-pointer hover:text-white shadow-md hover:bg-orange-600 transition"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        Visite E-Drinks for More 
                      </motion.button>
                    </a>
                  
        </div>
      </div>
    </div>
  );
}
