import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";

export default function HangoutOverview() {
  const { slug } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}/lovers-places/${slug}/`);
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
    <div className="max-w-7xl mx-auto p-5 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 text-center">
        {place.name} Gallery
      </h1>
      
      {/* Responsive Image Gallery */}
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