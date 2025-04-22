import { ArrowLeft, ArrowRight } from "lucide-react";
import tourismImg from "../assets/travel-solo-woman_gettyimages.png";
import sightSeeingImg from "../assets/fe34dbaef46f19df93bc76eb5372f0f1.jpg";
import hotelsImg from "../assets/Hotel_Bristol_w_Warszawie.png";
import beachImg from "../assets/image (58).png";
import parksImg from "../assets/image (59).png";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Tourism", image: tourismImg },
  { name: "Sight Seeing", image: sightSeeingImg },
  { name: "Exquisite Hotels", image: hotelsImg },
  { name: "Beach", image: beachImg },
  { name: "Parks", image: parksImg },
];

const FunPlaces = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full text-center py-10 px-4">
      {/* Categories */}
      <div
        onClick={() => navigate(`/HangoutPlaces`)}
        className="flex justify-center gap-6 flex-wrap mt-3 md:mt-4"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative w-60 h-75 md:w-72 md:h-80 rounded-lg overflow-hidden shadow-lg mb-6"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 text-sm md:text-lg font-semibold">
              {cat.name}
            </div>
          </div>
        ))}
      </div>  
    </div>
  );
};

export default FunPlaces;
