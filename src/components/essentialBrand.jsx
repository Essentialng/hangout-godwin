import React from "react";
import { motion } from "framer-motion";
import brand1 from "../assets/2390316s.jpg";
import brand2 from "../assets/plan.jpg";
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
import { useTranslation } from "react-i18next";

const partnerBrands = [
  { src: brand1, alt: "Brand 1" },
  { src: brand2, alt: "Brand 2" },
  { src: brand3, alt: "Brand 3" },
  { src: brand4, alt: "Brand 4" },
  { src: brand5, alt: "Brand 5" },
  { src: brand6, alt: "Brand 6" },
  { src: brand7, alt: "Brand 7" },
  { src: brand8, alt: "Brand 8" },
  { src: brand9, alt: "Brand 9" },
  { src: brand10, alt: "Brand 10" },
  { src: brand11, alt: "Brand 11" },
  { src: brand12, alt: "Brand 12" },
  { src: brand13, alt: "Brand 13" },
];

const scrollVariants = {
  animate: {
    x: ["0%", "-100%"],
    transition: { repeat: Infinity, duration: 15, ease: "linear" },
  },
};

const EssentialBrand = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-12 bg-white rounded-3xl text-center shadow-xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-2">
        {t('partners.title')}
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
        {t('partners.description')}
      </p>

     
      <div className="relative overflow-hidden mt-6">
        <motion.div
          className="flex space-x-6 sm:space-x-10 items-center"
          variants={scrollVariants}
          animate="animate"
        >
          {[...partnerBrands, ...partnerBrands].map((brand, index) => (
            <motion.img
              key={index}
              src={brand.src}
              alt={brand.alt}
              className="w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 border border-gray-200 object-contain rounded-lg hover:scale-105 transition-transform duration-300 shadow"
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EssentialBrand;
