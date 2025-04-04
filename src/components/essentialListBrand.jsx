import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles
import brand1 from "../assets/2390316s.jpg";
import brand2 from "../assets/direct.jpg";
import { motion } from "framer-motion";

const companies = [
  { name: "E-Plan", website: "https://www.eplan.com", logo: brand2 },
  { name: "E-Farm", website: "https://www.microsoft.com", logo: brand1 },
  { name: "E-Direct", website: "https://www.apple.com", logo: brand1 },
  { name: "E-Stores", website: "https://www.amazon.com", logo: brand1 },
  { name: "E-Venue", website: "https://www.tesla.com", logo: brand1 },
  { name: "E-Plan", website: "https://www.eplan.com", logo: brand1 },
  { name: "E-Farm", website: "https://www.microsoft.com", logo: brand1 },
  { name: "E-Direct", website: "https://www.apple.com", logo: brand1 },
  { name: "E-Stores", website: "https://www.amazon.com", logo: brand1 },
  { name: "E-Venue", website: "https://www.tesla.com", logo: brand1 },
  { name: "E-Plan", website: "https://www.eplan.com", logo: brand1 },
  { name: "E-Farm", website: "https://www.microsoft.com", logo: brand1 },
  { name: "E-Direct", website: "https://www.apple.com", logo: brand1 },
  { name: "E-Stores", website: "https://www.amazon.com", logo: brand1 },
  { name: "E-Venue", website: "https://www.tesla.com", logo: brand1 },
];

const CompanySection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Trigger animation only once when it comes into view
    });
  }, []);

  return (
    <div className="bg-gray-200 mt-7 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center pb-12">
        <h2 className="text-3xl font-bold text-gray-800">Our Premium Brands</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {companies.map((company, index) => (
          <motion.a
            key={index}
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-white p-4 shadow-md rounded-lg transition-all border border-gray-200 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            data-aos="fade-up" // AOS fade-up animation
            data-aos-delay={index * 100} // Delay each animation based on the index
          >
            <img src={company.logo} alt={company.name} className="w-24 h-auto" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default CompanySection;
