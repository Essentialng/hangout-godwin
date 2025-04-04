import { ArrowLeft, ArrowRight } from "lucide-react";
import tourismImg from "../assets/0453b3e8c35dbe5291a15ddbe96a519e.png";
import sightSeeingImg from "../assets/dd3e6bd4dcf1aa9c9659b47cd588e9c2.png";
import hotelsImg from "../assets/ecf6e9406c18de245b7799eb48e7f477.png";
import beachImg from "../assets/ca7276551d2fb5acaa6f3777ea62a9c4.png";
import parksImg from "../assets/ebdd9094646bf2cf6f174f09e0fd5a6d.png";

const categories = [
  { name: "Amusement Parks", image: tourismImg },
  { name: "Beach", image: sightSeeingImg },
  { name: "Pool", image: hotelsImg },
  { name: "Water Falls", image: beachImg },
  { name: "Shopping Mall", image: parksImg },
];

const Kids = () => {
  return (
    <div className="w-full text-center py-10">
      <h2 className="text-3xl font-bold mb-6">Events For Kids</h2>

      {/* Categories */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 mt-3">
        {categories.map((cat, index) => (
          <div key={index} className="relative min-w-[180px] md:w-60 h-60 rounded-lg overflow-hidden shadow-lg">
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 w-full bg-black/50 text-white py-2 text-lg font-semibold">
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kids;
