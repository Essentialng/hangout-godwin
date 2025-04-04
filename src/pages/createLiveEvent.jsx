import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";

const EventPostForm = () => {
  const [uid, setUserID] = useState('');
  const [categories, setCategories] = useState([]); // Stores categories from API
  const [formData, setFormData] = useState({
    event_title: "",
    caption: "",
    location: "",
    event_date_time: "",
    about: "",
    organizer_name: "",
    category_id: '',  // Use category_id instead of category
    image: null,
    video: null,
  });

  // Fetch categories from API
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_id") {
      setFormData((prev) => ({
        ...prev,
        category_id: parseInt(value, 10) || "", // Ensure it's an integer
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0], // Ensure the file is stored correctly
      }));
    }
  };
  
  // Submit form data
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
    formDataToSend.append("created_by", uid); // Ensure correct user ID
    formDataToSend.append("category_id", formData.category_id); // Correct field name

    const cat_ID = formData.category_id;
    console.log('cat_D', cat_ID);

    console.log("Image File:", formData.image);
    console.log("Video File:", formData.video);


    if (formData.image) {
      formDataToSend.append("image", formData.image); // Ensure field name matches backend
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

      alert("Event posted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting event:", error.response?.data);
      alert("Failed to post event.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Post an Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="event_title"
          value={formData.event_title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="caption"
          value={formData.caption}
          onChange={handleChange}
          placeholder="Caption"
          className="w-full p-2 border rounded"
        ></textarea>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="datetime-local"
          name="event_date_time"
          value={formData.event_date_time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="About Event"
          className="w-full p-2 border rounded"
          required
        ></textarea>

        <input
          type="text"
          name="organizer_name"
          value={formData.organizer_name}
          onChange={handleChange}
          placeholder="Organizer Name"
          className="w-full p-2 border rounded"
        />

        {/* Category Dropdown */}
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />


        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Post Event
        </button>
      </form>
    </div>
  );
};

export default EventPostForm;

