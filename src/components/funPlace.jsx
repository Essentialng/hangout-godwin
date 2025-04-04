import { ArrowLeft, ArrowRight } from "lucide-react";
import tourismImg from "../assets/travel-solo-woman_gettyimages.png";
import sightSeeingImg from "../assets/fe34dbaef46f19df93bc76eb5372f0f1.jpg";
import hotelsImg from "../assets/Hotel_Bristol_w_Warszawie.png";
import parksImg from "../assets/image (59).png";
import resortImg from "../assets/abfeef437d2bc142ff6b6e45976c07a5.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Tourism", image: tourismImg },
  { name: "Sight Seeing", image: sightSeeingImg },
  { name: "Exquisite Hotels", image: hotelsImg },
  { name: "Parks", image: parksImg },
];

const FunPlaces = () => {
  const navigate = useNavigate();

  const redirect = () => {
    window.scroll(0, 0);
    navigate(`/HangoutPlaces`);
  };

  return (
    <div className="w-full text-center py-10 mt-10">
      <h2 className="text-3xl font-bold mb-6">Fun Places with Family and Friends</h2>

      {/* Categories - Scrollable on Mobile */}
      <div 
        onClick={redirect} 
        className="flex gap-6 px-4 mt-3 md:mt-4 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="relative w-60 h-60 md:w-72 md:h-72 rounded-lg overflow-hidden shadow-lg flex-shrink-0"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 text-lg font-semibold">
              {cat.name}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Resort */}
      <div className="relative mt-10 w-full mx-auto overflow-hidden">
        <img src={resortImg} alt="Resort" className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black/40 "></div>

        <motion.button
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={redirect}
          className="absolute bottom-6 cursor-pointer left-1/2 -translate-x-1/2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform hover:scale-105"
        >
          View Place
        </motion.button>
      </div>
    </div>
  );
};

export default FunPlaces;
