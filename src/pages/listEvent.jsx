import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ListEvent() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    cityCountry: "",
    googleMaps: "",
    phone: "",
    whatsapp: "",
    website: "",
    openingHours: "",
    entryFee: "",
    specialOffers: "",
    images: [],
    video: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-2xl rounded-2xl mt-12">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">List Your Hangout Spot</h2>
      
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-700">Basic Information</h3>
        <input type="text" name="name" placeholder="Hangout Spot Name" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <select name="category" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
          <option>Select Category</option>
          {["Restaurant", "Park", "Club", "Beach", "Concert", "Festival", "Exhibition", "Conference", "Sporting Event", "Workshop", "Networking Event", "Theater", "Movie Premiere", "Food Tasting", "Yoga Retreat", "Tech Meetup", "Art Gallery", "Charity Event", "Nightlife", "Comedy Show"].map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
      </div>

      <div className="space-y-6 mt-6">
        <h3 className="text-2xl font-semibold text-gray-700">Location Details</h3>
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="cityCountry" placeholder="City & Country" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="googleMaps" placeholder="Google Maps Link" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="space-y-6 mt-6">
        <h3 className="text-2xl font-semibold text-gray-700">Contact Information</h3>
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="whatsapp" placeholder="WhatsApp (if applicable)" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="website" placeholder="Website or Social Media Links" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="space-y-6 mt-6">
        <h3 className="text-2xl font-semibold text-gray-700">Availability & Pricing</h3>
        <input type="text" name="openingHours" placeholder="Opening & Closing Hours" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="entryFee" placeholder="Entry Fee (if any)" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="specialOffers" placeholder="Special Offers/Discounts" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="space-y-6 mt-6">
        <h3 className="text-2xl font-semibold text-gray-700">Media Uploads</h3>
        <input type="file" multiple onChange={handleFileChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="video" placeholder="YouTube Video Link" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>

      <motion.button whileHover={{ scale: 1.05 }} className="mt-8 w-full bg-blue-600 text-white py-4 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition">
        Submit
      </motion.button>
    </div>
  );
}
