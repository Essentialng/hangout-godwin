import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import {motion} from 'framer-motion';
import successAnimation from '../assets/Animation - 1743917678990.json'; 
import Lottie from "lottie-react";

// Modal component
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
      <p>Your event has been successfully posted.</p>
      <button
        onClick={onClose}
        className="mt-4 cursor-pointer px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
      >
        Close
      </button>
    </motion.div>
  </div>
);

const EventPostForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uid, setUserID] = useState('');
  const [categories, setCategories] = useState([]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category_id") {
      setFormData((prev) => ({
        ...prev,
        category_id: parseInt(value, 10) || "",
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
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uid) {
      console.log("No user ID found.");
      return;
    }
  
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
  
      // Reset the form after successful post
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
  
      setShowSuccessModal(true);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting event:", error.response?.data);
      alert("Failed to post event.");
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-200 mt-10 mb-20 rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Post an Event for Free</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Event Title */}
        <div>
          <label htmlFor="event_title" className="block text-lg font-medium text-gray-700 mb-2">Event Title</label>
          <input
            type="text"
            name="event_title"
            id="event_title"
            value={formData.event_title}
            onChange={handleChange}
            placeholder="Enter the event title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-200"
            required
          />
        </div>

        {/* Caption */}
        <div>
          <label htmlFor="caption" className="block text-lg font-medium text-gray-700 mb-2">Caption</label>
          <textarea
            name="caption"
            id="caption"
            value={formData.caption}
            onChange={handleChange}
            placeholder="Enter a short caption about the event"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-200"
          ></textarea>
        </div>

        {/* Pricing Inputs */}
        <div className="flex gap-6">
          {/* Standard Price */}
          <div className="w-1/3">
            <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-2">Standard Price</label>
            <input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter standard price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-200"
            />
          </div>

          {/* VIP Price */}
          <div className="w-1/3">
            <label htmlFor="vip_price" className="block text-lg font-medium text-gray-700 mb-2">VIP Price</label>
            <input
              type="text"
              name="vip_price"
              id="vip_price"
              value={formData.vip_price}
              onChange={handleChange}
              placeholder="Enter VIP price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-200"
            />
          </div>

          {/* Early Bird Price */}
          <div className="w-1/3">
            <label htmlFor="early_bird_price" className="block text-lg font-medium text-gray-700 mb-2">Early Bird Price</label>
            <input
              type="text"
              name="early_bird_price"
              id="early_bird_price"
              value={formData.early_bird_price}
              onChange={handleChange}
              placeholder="Enter early bird price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-200"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-lg font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter the event location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-200"
            required
          />
        </div>

        {/* Event Date & Time */}
        <div>
          <label htmlFor="event_date_time" className="block text-lg font-medium text-gray-700 mb-2">Event Date & Time</label>
          <input
            type="datetime-local"
            name="event_date_time"
            id="event_date_time"
            value={formData.event_date_time}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-200"
            required
          />
        </div>

        {/* About Event */}
        <div>
          <label htmlFor="about" className="block text-lg font-medium text-gray-700 mb-2">About the Event</label>
          <textarea
            name="about"
            id="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Enter a description of the event"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-200"
            required
          ></textarea>
        </div>

        {/* Organizer Name */}
        <div>
          <label htmlFor="organizer_name" className="block text-lg font-medium text-gray-700 mb-2">Organizer Name</label>
          <input
            type="text"
            name="organizer_name"
            id="organizer_name"
            value={formData.organizer_name}
            onChange={handleChange}
            placeholder="Enter the organizer's name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-200"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category_id" className="block text-lg font-medium text-gray-700 mb-2">Category</label>
          <select
            name="category_id"
            id="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-200"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">Upload Event Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-200"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full p-3 cursor-pointer bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition duration-200"
          >
            Post Event
          </button>
        </div>
      </form>
      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
    </div>
  );
};

export default EventPostForm;
