import React from "react";
import homeHero from "../assets/c9573fa2d7c71ec84844439b80e9019b.jfif";
import deco from "../assets/f3c512b73b5bc7d6efb41d26f867e811.jpg";
import Event from "../assets/63fd2e9cbbe1833b3022071c771419a2.jfif";
import Choreographers from "../assets/d131b92fe316d74579e487d042731cb2.jfif";
import Designers from "../assets/89b4e2dd4cd480f176283ebc2ad9e577.jfif";
import Makeup from "../assets/b1d8df042d8c810d0c0e41aa79297a62.jfif";
import { useNavigate } from "react-router-dom";

const services = [
  { name: "Photographer/ Videographer", image: homeHero },
  { name: "Decorators", image: deco },
  { name: "Event Planners", image: Event },
  { name: "Choreographers", image: Choreographers },
  { name: "Designers", image: Designers },
  { name: "Makeup Artist", image: Makeup },
 
];

const ServiceProviders = () => {
const navigate = useNavigate();
const redirect =() =>{
  navigate('/ServiceProvidersHome');
  window.scrollTo(10.0);
}

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex flex-row justify-between items-center p-6">
  <h2 className="text-3xl font-bold text-gray-800">Service Providers</h2>
  
  <button 
    onClick={redirect} 
    className="bg-orange-600 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-700 transition duration-300"
  >
    Explore
  </button>
</div>

      <div className="flex flex-wrap justify-center gap-6 mt-3">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={service.image}
              alt={service.name}
              className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
            />
            <p className="text-center mt-2 text-sm font-medium">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProviders;
