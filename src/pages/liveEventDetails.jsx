import React, { useState, useEffect} from 'react';
import { FaCalendarAlt, FaStar, FaEye } from "react-icons/fa";
import QRCode from "react-qr-code";
import logo from "../assets/hangout.png";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { API_ROUTE } from '../ApisConf/api_config';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Rate } from 'antd';
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "../assets/images (7).png"; 
import { Share,} from "@mui/icons-material";
const apiKey2 = import.meta.env.VITE_API_KEY

export default function EventDetails() {
 
  const rating = 4.5; 
  const navigate = useNavigate();

  const { slug } = useParams();
  const [livedata, setliveEvents] = useState([]);
  const [caption, setCaption] = useState([]);
  const [location, setlocation] = useState([]);
  const [date, setDate] = useState([]);
  const [about, setAbout] = useState([]);
  const [organizer_name, setOrganizer_name] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideo] = useState([]);
  const [liveEvents, setliveEventData] = useState([]);
  const [views, setliveView] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const retrieveLiveEvent=async()=>{

      try {
        const token = localStorage.getItem('auth_token')
          const res = await axios.get(`${API_ROUTE}/live-events/${slug}`, {
                  headers: {
                      Authorization: `Token ${token}`, 
                  },
              })

      
        if (res.status === 200 || res.status === 201) {
          console.log('sigle fetch data', res.data);
          setliveEvents(res.data.event_title);
          setCaption(res.data.caption);
          setlocation(res.data.location);
          setDate(res.data.event_date_time);
          setAbout(res.data.about);
          setOrganizer_name(res.data.organizer_name);
          setImages(res.data.image);
          setVideo(res.data.video);
          setliveView(res.data.view_count);
          
          console.log('imga data', res.data.image)
        }
        
      } catch (error) {
        console.log('cannot fetch', error);
      }

    }
    retrieveLiveEvent();
  },[])
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    const updateDate = () => {
      const eventTime = new Date(date);
      const now = new Date();

      const diffInSeconds = Math.floor((eventTime - now) / 1000);

      if (diffInSeconds <= 0) {
        setFormattedDate("Happening Now");
        return;
      }

      const days = Math.floor(diffInSeconds / 86400);
      const hours = Math.floor((diffInSeconds % 86400) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      setFormattedDate(
        `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m ${seconds}s`
      );
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const formattedDate2 = useMemo(() => {
    if (!date) return "";
    return new Date(date).toLocaleString("en-US", {
      weekday: "long", // e.g., Thursday
      year: "numeric",
      month: "long", // e.g., March
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // AM/PM format
    });
  }, [date]);


  useEffect(()=>{
      const retrieveLiveEvent2=async()=>{
  
        try {

   const token = localStorage.getItem('auth_token')
          const res = await axios.get(`${API_ROUTE}/live-events/`, {
                  headers: {
                      Authorization: `Token ${token}`, 
                  },
              })
          // const res = await axios.get(`${API_ROUTE}live-events/`);
          if (res.status === 200 || res.status === 201) {
            // console.log('res data', res.data);
            setliveEventData(res.data);
            
          }
          
        } catch (error) {
          console.log('cannot fetch', error);
        }
  
      }
      retrieveLiveEvent2();
    },[])


  const apiKey = `${apiKey2}`; 
  const userlocation = location; 
  
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${userlocation}`;

  const sharePlace = () => {
    const shareUrl = `${window.location.origin}/hotelnewlist/${slug}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}get-live-event-reviews/${slug}/`);
        setReviews(response.data);
        //console.log('reviews', response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [slug]);
    const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

    const ratings = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach((review) => {
      ratings[review.rating] = (ratings[review.rating] || 0) + 1;
    });

  const handleFinish = async (values) => {
      const userId = localStorage.getItem("user_id"); 
      const token = localStorage.getItem("auth_token"); 
      
  
      if (!userId) {
          return alert("User is not logged in.");
      }
  
      try {
        
  
          const response = await axios.post(
            `${API_ROUTE}post-hotel-review/${slug}/review/`,
            {
                rating: values.rating,
                comment: values.comment
            },
            {
                headers: {
                    Authorization: `Token ${token}`, // ✅ Include authentication token
                    "Content-Type": "application/json"
                }
            }
        );
  
          if (response.status === 201) {
            toast.success("Review submitted successfully!", { position: "top-right", autoClose: 3000 });
           console.log('sucessful sent review')
              form.resetFields();
          } else {
            toast.error('Failed to submit the review. Please try again.', { position: "top-right", autoClose: 3000 });
            console.log('cannot sent reviews')
          }
      } catch (error) {
          console.error("Error submitting review:", error.response?.data || error.message);
  
          toast.error('An error occurred while submitting the review or cannot send review twice', { position: "top-right", autoClose: 3000 });
      }
  };
  
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Event Header */}
        
       <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
                {images?.length > 0 ? (
                  <img
                    src={images}
                    alt='j'
                    className="w-full h-full object-cover"
                 />
                ) : videos ? (
                  <video
                    src={videos}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <p className="text-gray-500">No Media Available</p>
                  </div>
                )}
              </div>
          <div className="bg-white border border-gray-300  p-6 rounded-xl md:w-2/5">
            {/* Event Title */}
            <h2 className="text-2xl font-bold text-gray-900">{livedata}</h2>

            {/* Event Caption (Only if available) */}
            {caption && (
              <p className="text-gray-600 mt-2">{caption.slice(0, 100) + "..."}</p>
            )}

            {/* Date & Location */}
            <div className="flex flex-col gap-3 mt-4">
              <p className="text-gray-700 flex items-center font-semibold">
                <FaCalendarAlt className="mr-2 text-orange-500" /> {date}
              </p>

              <div className="flex items-center text-gray-700">
                <LocationOnOutlinedIcon className="text-red-500 mr-2" />
                <p>{location}</p>
              </div>
            </div>

            {/* Views & Ratings */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center text-gray-700">
                <FaEye className="mr-2 text-lg text-gray-500" />
                <span className="text-lg font-semibold">{views} views</span>
              </div>

              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={`text-lg ${
                      index < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-800">{rating}/5</span>
              </div>
            </div>

            {/* Time Left */}
            <p className="flex items-center bg-black text-white text-lg font-bold py-2 px-4 rounded-xl mt-6 w-fit">
              <AccessTimeFilledIcon style={{ color: "red" }} className="mr-2" /> {formattedDate} Left
            </p>

            {/* CTA Button */}
            <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-orange-600 transition duration-300">
              Reserve a Spot
            </button>
          </div>

        </div>
              
        <dvi>
          <button
                        onClick={sharePlace}
                        className="flex items-center px-4 mt-4 py-2 text-blue-500 hover:text-blue-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                      >
                        <Share className="w-5 h-5 mr-2" /> Share and Invite
                      </button>
        </dvi>
        {/* About the Event *****************************/}
        {about && (
            <div className="mt-10">
            <h3 className="text-xl font-semibold">About the Event</h3>
            <p className="text-gray-700 mt-3">
            {about}
            </p>
          </div>
        )}

        {/* Event Guide */}
        {date && (
            <div className="mt-10">
            <h3 className="text-xl font-semibold">Date and Time</h3>
            <div className="flex gap-6 mt-3">
              <div className="border border-gray-200 bg-white p-4 rounded ">
                <p className="text-gray-600">{formattedDate2}</p>
              </div>
            </div>
          </div>
        )}

        {/* Venue */}
        {location && (
            <div className="mt-10">
            <h3 className="text-xl font-semibold">Event Venue</h3>
            <div className="border border-gray-200 p-4 rounded mt-3 bg-white">
              <p className="font-semibold">{location.slice(0,10)+ '...'}</p>
              <p className="text-gray-600">
                {location}
              </p>
              {/* map address location */}
              </div>
          </div>
        )}
        {location && (
            <div className="mt-10">
           
            <div className="border border-gray-200 p-4 rounded mt-3 bg-white">
              {/* map address location */}
              <div className=" ">
                  <h1 className="text-3xl font-bold ">Map Location</h1>
                </div>
                <div className="relative w-full h-[400px] mt-5 overflow-hidden border border-gray-300">
                  <iframe
                    title="Google Map"
                    width="100%"
                    height="100%"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapUrl}
                  ></iframe>
                </div>
              
            </div>
          </div>
        )}
        {organizer_name && (
            <div className="mt-10">
            <h3 className="text-xl font-semibold">Organized by</h3>
            <div className="border border-gray-200 p-4 rounded mt-3 bg-white">
              <p className="text-gray-600">
                {organizer_name}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* QR Code Section */}
      <div className="bg-orange-700 p-10 flex flex-col md:flex-row justify-between items-center mt-10">
  {/* Left Side Content */}
  <div className="max-w-lg text-center md:text-left">
    <img className="w-40 cursor-pointer mb-4" src={logo} alt="Logo" />
    <h2 className="text-4xl text-white font-bold leading-snug">
      The best of events, movies, dining, and everything you love.
    </h2>
    <p className="mt-2 text-lg text-white">
      Find your next plan on Essential NG
    </p>
  </div>

  {/* Right Side QR Code Section */}
  <div className="flex flex-col items-center bg-white p-6 md:p-10 rounded-xl shadow-lg mt-6 md:mt-0">
    <QRCode value="https://edirect.ng.com" size={200} />
    <p className="mt-4 text-xl font-semibold text-gray-900 text-center">
      Scan to download other e-Apps
    </p>
  </div>
</div>

{/* Review Section ************************************************/}
<div className="mt-10 p-20">
  <h2 className="text-black text-3xl mb-5 p-10 font-bold">Top Rating and Reviews ({reviews.length})</h2>
  {/* Customer Reviews List */}
  {reviews.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {reviews.map((review) => (
      <div 
        key={review.id} 
        className="border-2 border-gray-300 p-6 rounded-2xl bg-white hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex items-center mb-4">
          <img 
            src={Avatar} 
            alt="Profile" 
            className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm mr-4"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900">{review.user_name}</p>
            <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="flex items-center text-yellow-500 text-lg mb-3">
          <Rate value={review.rating} disabled />
          <span className="ml-2 text-gray-700 font-medium">{review.rating} / 5</span>
        </div>

        <p className="text-gray-700 leading-relaxed italic">"{review.comment}"</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-green-500 font-semibold text-sm">Verified Member</span>
          <button className="text-gray-500 text-sm hover:text-red-500 transition">Report</button>
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-600 text-center text-lg font-medium">
    No reviews yet. Be the first to review.
  </p>
)}

{/* Overall Rating Breakdown */}
<div className="bg-white p-6 border border-gray-200 lg:w-200 rounded-md mb-6 mt-10">
    <div className="flex items-center mb-3">
      <span className="text-2xl font-bold text-gray-900">
        {averageRating.toFixed(1)}
      </span>
      <Rate value={averageRating} disabled className="ml-2 text-yellow-500" />
      <span className="ml-2 text-gray-600">out of 5</span>
    </div>
    <p className="text-gray-600">{reviews.length} global ratings</p>

    {/* Star Rating Progress Bars */}
    {[5, 4, 3, 2, 1].map((star) => {
      const percentage = ((ratings[star] || 0) / reviews.length) * 100;
      return (
        <div key={star} className="flex items-center mt-2">
          <span className="w-12 text-gray-800">{star} star</span>
          <div className="w-full h-3 bg-gray-300 rounded-md ml-2">
            <div
              className="h-3 bg-orange-500 rounded-md"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="w-10 text-right text-gray-700">{Math.round(percentage)}%</span>
        </div>
      );
    })}
  </div>

</div>

{/* Review Submission Form ************************************************/}
<div className="max-w-lg mt-8 ml-20 p-8 bg-white rounded-2xl border border-gray-300">
  {/* Title */}
  <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
    <span className="text-orange-500 text-3xl mr-2">★</span> Rate & Review <span className="ml-1 text-orange-600">{name}</span>
  </h2>
  
  <p className="text-gray-600 mb-6">Your feedback helps others make informed decisions. Share your experience!</p>

  {/* Review Form */}
  <Form 
    form={form} 
    layout="vertical" 
    onFinish={handleFinish} 
    className="bg-gray-100 p-6 rounded-xl shadow-md"
  >
    {/* Rating Input */}
    <Form.Item
      name="rating"
      label={<span className="font-medium text-gray-800">Your Rating</span>}
      rules={[{ required: true, message: 'Please provide a rating' }]}
    >
      <div className="bg-white p-4 rounded-lg border border-gray-300 flex justify-center shadow-sm">
        <Rate className="text-yellow-500 text-2xl" />
      </div>
    </Form.Item>

    {/* Comment Input */}
    <Form.Item
      name="comment"
      label={<span className="font-medium text-gray-800">Your Review</span>}
      rules={[{ required: true, message: 'Please provide a comment' }]}
    >
      <Input.TextArea
        rows={4}
        placeholder="Write your honest review here..."
        className="p-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition shadow-sm bg-white"
      />
    </Form.Item>

    {/* Submit Button */}
    <Form.Item>
      <Button 
        type="primary" 
        htmlType="submit" 
        block 
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
      >
        Submit Review
      </Button>
    </Form.Item>
  </Form>
</div>

{/* other events *********************/}
<div className="mt-20 w-full px-6">
  {/* Section Title */}
  <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
    Other Events You May Like
  </h1>

  {/* Event Cards Wrapper */}
  <div className="flex gap-6 overflow-x-auto whitespace-nowrap px-4 mx-auto justify-center items-center mb-20">
    {liveEvents.map((event, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.03 }}
        className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl"
      >
        {/* Event Image or Video */}
        <div className="relative w-full h-52 rounded-t-lg overflow-hidden">
          {event.image?.length > 0 ? (
            <img
              src={event.image}
              alt={event.event_title}
              className="w-full h-full object-cover"
            />
          ) : event.video ? (
            <video
              src={event.video}
              className="w-full h-full object-cover"
              controls
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">No Media Available</p>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800">{event.event_title}</h3>
          <p className="text-gray-600 flex items-center gap-2 text-sm mt-2">
            <FaCalendarAlt className="text-yellow-500" /> {event.event_date_time}
          </p>

          {/* Button */}
          <button
            onClick={() => navigate(`/LiveEventDetails2/${event.slug}`)}
            className="mt-5 w-full border border-orange-700 cursor-pointer  text-orange-700 hover:bg-orange-600 hover:text-white px-6 py-2 rounded-md font-semibold transition-all hover:opacity-90"
          >
            View Event
          </button>
        </div>
      </motion.div>
    ))}
  </div>
</div>


    </div>
  );
}
