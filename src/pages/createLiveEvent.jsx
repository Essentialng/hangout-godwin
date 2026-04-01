import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { motion } from 'framer-motion';
import successAnimation from '../assets/Animation - 1743917678990.json'; 
import Lottie from "lottie-react";


const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
    <motion.div
      className="bg-white rounded-lg p-6 w-1/3 text-center animate-move-in"
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Lottie animationData={successAnimation} loop={false} className="mx-auto mb-4 w-1/2" />
      <h3 className="text-xl font-semibold mb-4">Event Posted Successfully!</h3>
      <p>Your event has been successfully posted and is now visible to attendees.</p>
      <button
        onClick={onClose}
        className="mt-4 cursor-pointer px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200"
      >
        Close
      </button>
    </motion.div>
  </div>
);

const EventPostForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uid, setUserID] = useState('');
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    event_title: "",
    caption: "",
    location: "",
    event_date_time: "",
    about: "",
    vip_price: "",
    price: "",
    early_bird_price: "",
    organizer_name: "",
    category_id: '',
    image: null,
    video: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('auth_token');
      try {
        const response = await axios.get(`${API_ROUTE}live-event-categories/`, {
          headers: { Authorization: `Token ${token}` }
        });
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error.response?.data);
      }
    };

    const fetchUserData = () => {
      const storedUserData = localStorage.getItem("user_data");
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUserID(userData.id);
      }
    };

    fetchUserData();
    fetchCategories();
  }, []);

  
  const formatPrice = (value) => {
    const cleanedValue = value.replace(/[^\d.]/g, '');
    const parts = cleanedValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    
    return cleanedValue;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "category_id") {
      setFormData((prev) => ({
        ...prev,
        category_id: parseInt(value, 10) || "",
      }));
    } else if (name === "price" || name === "vip_price" || name === "early_bird_price") {
      
      setFormData((prev) => ({
        ...prev,
        [name]: formatPrice(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: file,
      }));

     
      if (e.target.name === "image") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

 
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImagePreview(null);
   
    const fileInput = document.getElementById('image');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!uid) {
      console.log("No user ID found.");
      alert("Please log in to post an event.");
      return;
    }

    if (!formData.image) {
      alert("Please select an image for your event.");
      return;
    }

    setLoading(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append("event_title", formData.event_title);
    formDataToSend.append("caption", formData.caption);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("event_date_time", formData.event_date_time);
    formDataToSend.append("about", formData.about);
    formDataToSend.append("organizer_name", formData.organizer_name);
    
    
    formDataToSend.append("vip_price", formData.vip_price);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("early_bird_price", formData.early_bird_price);
    
    formDataToSend.append("created_by", uid);
    formDataToSend.append("category_id", formData.category_id);
  
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    if (formData.video) {
      formDataToSend.append("video", formData.video);
    }
  
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.post(
        `${API_ROUTE}live-events/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );
  
  
      setFormData({
        event_title: "",
        caption: "",
        location: "",
        event_date_time: "",
        about: "",
        vip_price: "",
        price: "",
        early_bird_price: "",
        organizer_name: "",
        category_id: "",
        image: null,
        video: null,
      });
      setImagePreview(null);
  
      setShowSuccessModal(true);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting event:", error.response?.data);
      alert("Failed to post event. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-orange-50 border border-orange-200 mt-10 mb-20 rounded-2xl shadow-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Create Your Event</h2>
        <p className="text-center text-gray-600 mb-8 text-lg">Share your amazing event with the world. Fill in the details below to get started.</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Event Title */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label htmlFor="event_title" className="block text-lg font-semibold text-gray-800 mb-2">Event Title *</label>
            <input
              type="text"
              name="event_title"
              id="event_title"
              value={formData.event_title}
              onChange={handleChange}
              placeholder="e.g., Annual Tech Conference 2024"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
              required
            />
            <p className="text-sm text-gray-500 mt-2">Choose a catchy and descriptive title that will attract attendees</p>
          </div>

          {/* Caption */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label htmlFor="caption" className="block text-lg font-semibold text-gray-800 mb-2">Short Description</label>
            <textarea
              name="caption"
              id="caption"
              value={formData.caption}
              onChange={handleChange}
              placeholder="A brief, engaging summary of your event..."
              rows="3"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
            ></textarea>
            <p className="text-sm text-gray-500 mt-2">This short description appears in event listings and previews</p>
          </div>

          {/* Pricing Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Ticket Pricing</h3>
            <p className="text-sm text-gray-500 mb-4">Enter prices without commas (e.g., 1000 instead of 1,000)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Standard Price */}
              <div>
                <label htmlFor="price" className="block font-medium text-gray-700 mb-2">Standard Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">₦</span>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="1000"
                    className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Regular ticket price for your event</p>
              </div>

              {/* VIP Price */}
              <div>
                <label htmlFor="vip_price" className="block font-medium text-gray-700 mb-2">VIP Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">₦</span>
                  <input
                    type="text"
                    name="vip_price"
                    id="vip_price"
                    value={formData.vip_price}
                    onChange={handleChange}
                    placeholder="2500"
                    className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Premium experience with extra benefits</p>
              </div>

              {/* Early Bird Price */}
              <div>
                <label htmlFor="early_bird_price" className="block font-medium text-gray-700 mb-2">Early Bird Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">₦</span>
                  <input
                    type="text"
                    name="early_bird_price"
                    id="early_bird_price"
                    value={formData.early_bird_price}
                    onChange={handleChange}
                    placeholder="750"
                    className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Limited time discount for early registrations</p>
              </div>
            </div>
          </div>

          {/* Location & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <label htmlFor="location" className="block text-lg font-semibold text-gray-800 mb-2">Event Location *</label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Convention Center, Lagos"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                required
              />
              <p className="text-sm text-gray-500 mt-2">Where your event will take place</p>
            </div>

            {/* Event Date & Time */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <label htmlFor="event_date_time" className="block text-lg font-semibold text-gray-800 mb-2">Event Date & Time *</label>
              <input
                type="datetime-local"
                name="event_date_time"
                id="event_date_time"
                value={formData.event_date_time}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                required
              />
              <p className="text-sm text-gray-500 mt-2">When your event will happen</p>
            </div>
          </div>

          {/* About Event */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label htmlFor="about" className="block text-lg font-semibold text-gray-800 mb-2">Event Details *</label>
            <textarea
              name="about"
              id="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Describe your event in detail... What can attendees expect? What makes this event special?"
              rows="5"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
              required
            ></textarea>
            <p className="text-sm text-gray-500 mt-2">Provide comprehensive information about your event agenda, speakers, activities, etc.</p>
          </div>

          {/* Organizer & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organizer Name */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <label htmlFor="organizer_name" className="block text-lg font-semibold text-gray-800 mb-2">Organizer Name</label>
              <input
                type="text"
                name="organizer_name"
                id="organizer_name"
                value={formData.organizer_name}
                onChange={handleChange}
                placeholder="Your organization or company name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
              />
              <p className="text-sm text-gray-500 mt-2">Who is organizing this event?</p>
            </div>

            {/* Category */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <label htmlFor="category_id" className="block text-lg font-semibold text-gray-800 mb-2">Event Category *</label>
              <select
                name="category_id"
                id="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-2">Choose the category that best fits your event</p>
            </div>
          </div>

          {/* Image Upload with Preview */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label htmlFor="image" className="block text-lg font-semibold text-gray-800 mb-2">Event Image *</label>
            
            {imagePreview ? (
              <div className="mb-4">
                <p className="text-sm text-green-600 mb-2">Image selected ✅</p>
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Event preview" 
                    className="w-64 h-48 object-cover rounded-lg border-2 border-green-500 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition duration-200"
                  >
                    ×
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Click the × button to remove this image</p>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition duration-200 hover:border-orange-300 hover:bg-orange-50">
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                <label 
                  htmlFor="image" 
                  className="cursor-pointer block"
                >
                  <div className="text-orange-500 text-4xl mb-2">📸</div>
                  <p className="text-gray-600 font-medium">Click to upload event image</p>
                  <p className="text-sm text-gray-500 mt-1">JPEG, PNG, WEBP (Max 5MB)</p>
                </label>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">Upload a high-quality image that represents your event</p>
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-4 cursor-pointer text-white font-bold text-lg rounded-lg transition duration-300 shadow-lg hover:shadow-xl ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting Event...
                </div>
              ) : (
                ' Post Event'
              )}
            </button>
          </motion.div>

          {/* Loading Overlay */}
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                <div className="flex items-center justify-center mb-4">
                  <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">Creating your event...</p>
                <p className="text-sm text-gray-500 mt-1">Please wait while we process your event</p>
              </div>
            </div>
          )}
        </form>
      </motion.div>
      
      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
    </div>
  );
};

export default EventPostForm;