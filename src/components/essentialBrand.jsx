import React from "react";
import { motion } from "framer-motion";
import brand1 from "../assets/2390316s.jpg";
import brand2 from "../assets/hotel-logo-design-service.png";
import brand3 from "../assets/airbnb-logo.png";
import brand4 from "../assets/images (2).jfif";
import brand5 from "../assets/Comfort-Inn-Logo-tumb.jpg";
import brand6 from "../assets/Microtel-Logo.png";
import brand7 from "../assets/Days-Inn-Logo.png";
import brand8 from "../assets/PG-logo-500x334-min.png";
import brand9 from "../assets/6697d091429fa6d1fe78cdad_1_KJOpWsK2S5IQvl4Sssu2zA.png";
import brand10 from "../assets/direct.jpg";
import brand11 from "../assets/Rolex-logo+2021.jpg";
import brand13 from "../assets/uhm-luxury-hotel.jpg";
import brand12 from "../assets/canva-decorative-flourishes-antique-ornamental-logo-design-template-IhcBafQRYoA.png";

const partnerBrands = [
  { src: brand1, alt: "Brand 1" },
  { src: brand2, alt: "Brand 2" },
  { src: brand3, alt: "Brand 3" },
  { src: brand4, alt: "Brand 4" },
  { src: brand5, alt: "Brand 5" },
  { src: brand6, alt: "Brand 6" },
  { src: brand7, alt: "Brand 6" },
  { src: brand8, alt: "Brand 6" },
  { src: brand9, alt: "Brand 6" },
  { src: brand10, alt: "Brand 6" },
  { src: brand11, alt: "Brand 6" },
  { src: brand12, alt: "Brand 6" },
  { src: brand13, alt: "Brand 6" },
];

// **Framer Motion Variant for Infinite Scrolling**
const scrollVariants = {
  animate: {
    x: ["0%", "-100%"], 
    transition: { repeat: Infinity, duration: 10, ease: "linear" },
  },
};

const EssentialBrand = () => {
  return (
    <div className="w-full p-4 bg-white rounded-3xl text-center shadow-xl">
      <h2 className="text-4xl font-bold text-gray-800 mt-4">Trusted by Leading Brands</h2>
      <p className="text-lg text-gray-600 mt-2">
        We collaborate with globally recognized brands to bring you the best experiences.
      </p>

      {/* Scrolling Brands Container */}
      <div className="relative overflow-hidden mt-8">
        <motion.div className="flex space-x-10" variants={scrollVariants} animate="animate">
          {[...partnerBrands, ...partnerBrands].map((brand, index) => (
            <motion.img
              key={index}
              src={brand.src}
              alt={brand.alt}
              className="w-50 h-20 border border-gray-200 rounded  hover:scale-100 transition-transform duration-300 shadow-lg"
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EssentialBrand;
