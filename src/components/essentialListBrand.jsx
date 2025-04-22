import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles
import brand1 from "../assets/2390316s.jpg";
import brand2 from "../assets/direct.jpg";
import brand3 from "../assets/plan.jpg";
import brand4 from "../assets/stores.jpg";
import brand5 from "../assets/efarms.jpg";
import brand6 from "../assets/medical.jpg";
import brand7 from "../assets/venue.jpg";
import brand8 from "../assets/verify.jpg";
import brand9 from "../assets/schools.jpg";
import brand10 from "../assets/fixed.jpg";
import brand11 from "../assets/drinks.jpg";
import brand12 from "../assets/foods.jpg";
import brand13 from "../assets/legal.jpg";
import brand14 from "../assets/student.jpg";
import brand15 from "../assets/drive.jpg";
import brand16 from "../assets/jobs.jpg";
import { motion } from "framer-motion";
import LaunchIcon from '@mui/icons-material/Launch';

const companies = [
  { name: "E-Direct", website: "https://edirect.ng/", logo: brand2, desc: "E-Direct connects businesses and individuals across Africa, enabling seamless and efficient exchanges for all your needs." },
  { name: "E-Plan", website: "https://etimeplan.com/", logo: brand3, desc: "E-Plan empowers farmers with modern tools and solutions to optimize their agricultural practices for greater yields." },
  { name: "E-Stores", website: "", logo: brand4, desc: "E-Stores is a trusted online marketplace for verified business and consumer connections, providing quality and secure transactions." },
  { name: "E-Farms", website: "", logo: brand5, desc: "E-Farms brings farm products directly to your door, making it easier for consumers to access fresh, locally-grown food." },
  { name: "E-Medicals", website: "", logo: brand6, desc: "E-Medicals provides a comprehensive directory of healthcare services and medical supplies for both individuals and businesses." },
  { name: "E-Venue", website: "https://www.eplan.com", logo: brand7, desc: "E-Venue simplifies event planning with a curated list of the best venues for every occasion, from corporate events to personal celebrations." },
  { name: "E-Verify", website: "", logo: brand8, desc: "E-Verify offers a reliable platform to verify the authenticity of products and services, ensuring peace of mind for all parties involved." },
  { name: "E-Schools", website: "", logo: brand9, desc: "E-Schools connects students and educators with resources for remote learning, enhancing education accessibility globally." },
  { name: "E-Fixed", website: "", logo: brand10, desc: "E-Fixed is your trusted e-commerce platform for finding high-quality products at competitive prices with fast and secure delivery." },
  { name: "E-Drinks", website: "", logo: brand11, desc: "E-Drinks is your one-stop-shop for all your beverage needs, offering premium drinks for every event or personal enjoyment." },
  { name: "E-Food", website: "https://www.eplan.com", logo: brand12, desc: "E-Food offers a curated selection of gourmet food products, perfect for events, gifting, or personal indulgence." },
  { name: "E-Legal", website: "", logo: brand13, desc: "E-Legal provides businesses and individuals with expert legal services, offering consultations and resources for all legal matters." },
  { name: "E-Student", website: "", logo: brand14, desc: "E-Student connects students with educational resources, internships, and job opportunities to enhance their academic and career prospects." },
  { name: "E-Drive", website: "", logo: brand15, desc: "E-Drive helps you find the best deals on car rentals, enabling you to rent vehicles for both short-term and long-term needs." },
  { name: "E-Jobs", website: "", logo: brand16, desc: "E-Jobs connects job seekers with top employers across various industries, making the hiring process faster and more efficient." },
];

const CompanySection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Trigger animation only once when it comes into view
    });
  }, []);

  return (
    <div style={{ borderTopLeftRadius: 20 }} className="bg-gradient-to-r from-gray-100 to-gray-300 mt-12 py-10 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto text-center pb-10 px-2">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
      Our Premium Brands
    </h2>
    <p className="text-sm sm:text-base text-gray-600 mt-3">
      Explore the top businesses and services with trusted connections.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto px-2">
    {companies.map((company, index) => (
      <motion.a
        key={index}
        href={company.website}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center bg-white p-6 sm:p-8 shadow-xl rounded-2xl transition-all transform hover:shadow-2xl hover:scale-105 border border-transparent hover:border-gray-400"
        whileHover={{ scale: 1.05 }}
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        <img src={company.logo} alt={company.name} className="h-20 w-20 object-contain mb-4" />
        <div className="text-center">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center justify-center gap-1">
            {company.name} {company.website && <LaunchIcon fontSize="small" />}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">{company.desc}</p>
        </div>
      </motion.a>
    ))}
  </div>
</div>

  );
};

export default CompanySection;
