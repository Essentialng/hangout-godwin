import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { Map, Share,} from "@mui/icons-material";
import { Button} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Rate } from 'antd';
import Avatar from "../assets/images (7).png"; 
import { motion } from "framer-motion";
import loadingAnimanation from '../assets/Animation - 1742465657045.json';
import Lottie from "lottie-react";


export default function HangoutOverview() {

  const { slug } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [views, setViews] = useState();
  const [reviews, setReviews] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  


  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}/lovers-places/${slug}/`);
        if (response.status === 200) {
          setPlace(response.data);
          console.log('data res', response.data)
          setImages(response.data.images || []);
          setViews(response.data.view_count || []);
          console.log('view count', response.data.view_count);

        }
      } catch (error) {
        console.log("Error fetching place details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [slug]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}get-loverplace-reviews/${slug}/`);
        setReviews(response.data);
        console.log('reviews', response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };
  if (loading) {
    return (
        
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Lottie animationData={loadingAnimanation} loop className="w-40 h-40" />
      </div>
    );
  }

  if (!place) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500"></p>
      </div>
    );
  }

//   review ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]



  const handleFinish = async (values) => {
      const userId = localStorage.getItem("user_id"); 
      const token = localStorage.getItem("auth_token"); 
      
  
      if (!userId) {
          return alert("User is not logged in.");
      }
  
      try {
        
  
          const response = await axios.post(
            `${API_ROUTE}post-loverplace-review/${slug}/review/`,
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

  const averageRating = reviews.length > 0
  ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  : 0;

    const ratings = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach((review) => {
    ratings[review.rating] = (ratings[review.rating] || 0) + 1;
    });

  return (
    <div className=" md:pl-20 md:pr-20 mx-auto mt-10 sm:pr-40 pr-5 pl-5 bg-white mb-20">
      <div className="max-w-6xl mx-auto mt-10 bg-white mb-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{place.name}</h1>
      <p className="text-gray-600 mb-4 flex items-center text-lg">
        <LocationOnOutlinedIcon className="mr-2 text-red-500" /> {place.location}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {images.length > 0 && (
          <img
            src={`${API_ROUTE}${images[0]?.image}`}
            alt="Main View"
            className="w-full h-96 object-cover shadow-xl rounded-xl"
          />
        )}
        <div className="grid grid-cols-2 gap-2">
          {images.slice(1, 5).map((img, index) => (
            <img
              key={index}
              src={`${API_ROUTE}${img?.image}`}
              alt={`Gallery Image ${index + 1}`}
              className="rounded-xl object-cover w-full h-44 shadow-lg"
            />
          ))}
          {images.length > 4 && (
            <button
            onClick={() => navigate(`/loverplaceoverviewpiz/${slug}`)}

            
              className="absolute bottom-10 border border-gray-800 right-15 hover:border-white  cursor-pointer hover:bg-orange-600 hover:text-white bg-white bg-opacity-50 text-black px-4 py-2 rounded-md text-lg"
            >
             <ViewHeadlineIcon/> Show all photos
            </button>
          )}
        </div>
      </div>
      
    </div>
    {/* Rating & Views */}
    <div className="flex items-center space-x-4 mb-4">
       
        <p className="text-gray-700"><VisibilityIcon className="text-gray-400"/> {views} views</p>
        <button
          onClick={handleShare}
          className="flex items-center hover:bg-gray-200 p-3 cursor-pointer hover:rounded text-blue-500 hover:text-blue-700"
        >
          <Share className="mr-2 " /> Share
        </button>
      </div>

      {/* About Section */}
      <div className="mt-6 p-6 bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">About {place.name}</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {place.about}
        </p>
      </div>

      {/* Overview */}
      <div className="mt-6 p-6 bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Descriptions</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{place.description}</p>
      </div>

      {/* Event Highlights */}
      <div className="mt-6 p-6 bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Event Highlights</h2>
        <ul className="list-disc ml-6 text-gray-700 text-lg">
          🔥 {place.highlight}
          
        </ul>
      </div>

      {/* Best Times to Visit */}
      <div className="mt-6 p-6 bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Best Times to Visit</h2>
        <ul className="list-disc ml-6 text-gray-700 text-lg">
          ✔️ {place.best_times}
        </ul>
      </div>

      {/* Map Button */}
      <button
        onClick={() =>
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              place.location
            )}`,
            "_blank"
          )
        }
        className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all flex items-center gap-2 text-lg shadow-md"
      >
        <Map /> View in Map
      </button>
      {/* Review Section ************************************************/}
      <div className="mt-10">
        <h2 className="text-black text-3xl mb-5 font-bold">Customer Reviews ({reviews.length})</h2>
        
        {/* Overall Rating Breakdown */}
        <div className="bg-gray-100 p-6 rounded-md mb-6">
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
      
        {/* Customer Reviews List */}
        {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="border-2 border-gray-300 p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
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
      
      </div>
      
      {/* Review Submission Form ************************************************/}
      <div className="max-w-lg bg-gray-100 mt-8 p-8 rounded-2xl shadow-xl border border-gray-300">
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
          className=" p-6 rounded-xl "
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
    </div>
  );
}