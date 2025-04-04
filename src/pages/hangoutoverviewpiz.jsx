import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { useNavigate } from "react-router-dom";

export default function HangoutOverview() {
  const { slug } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}/hangout-places/${slug}/`);
        if (response.status === 200) {
          setPlace(response.data);
          setImages(response.data.images || []);
        }
      } catch (error) {
        console.log("Error fetching place details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500">Place not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl p-5 mx-auto bg-white">
      {/* Image Gallery */}
      <h1 className="md:text-4xl text-3xl font-bold text-center p-5 mt-5 mx-auto font-bold text-gray-900 mb-2">{place.name} Gallary</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={`${API_ROUTE}${img?.image}`}
              alt={`Gallery Image ${index + 1}`}
              className="rounded-lg object-cover w-full h-60 sm:h-80 md:h-96"
            />
          ))}
        </div>
      </div>
    
  );
}