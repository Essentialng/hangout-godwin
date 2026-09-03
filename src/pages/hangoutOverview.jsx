import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { 
  Map, 
  Share, 
  LocationOn, 
  AccessTime, 
  Language, 
  CalendarToday, 
  Navigation, 
  DirectionsCar, 
  DirectionsWalk, 
  DirectionsBike,
  PlayCircle,
  PauseCircle,
  VolumeUp,
  VolumeOff,
} from "@mui/icons-material";
import { Box, TextField, Button, IconButton, Divider, Alert, Chip, CircularProgress } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Rate } from 'antd';
import Avatar from "../assets/images (7).png";
import { motion } from "framer-motion";

export default function HangoutOverview() {
  const { slug } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [views, setViews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [openHours, setOpenHours] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratings, setRatings] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [travelTimes, setTravelTimes] = useState(null);
  const [travelMode, setTravelMode] = useState('driving');
  
  // Video states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const TRAVEL_SPEEDS = {
    driving: 50,
    walking: 5,
    cycling: 15
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const calculateTravelTime = (distanceKm, mode) => {
    const speed = TRAVEL_SPEEDS[mode];
    const timeHours = distanceKm / speed;
    const timeMinutes = Math.round(timeHours * 60);
    
    if (timeMinutes < 1) return "< 1 min";
    if (timeMinutes < 60) return `${timeMinutes} min`;
    const hours = Math.floor(timeMinutes / 60);
    const mins = timeMinutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Get full video URL
  const getFullVideoUrl = (videoPath) => {
    if (!videoPath) return null;
    // If it's already a full URL, return as is
    if (videoPath.startsWith('http://') || videoPath.startsWith('https://')) {
      return videoPath;
    }
    // If it starts with /media/, append to API_ROUTE
    if (videoPath.startsWith('/media/')) {
      // Remove the leading slash if API_ROUTE already has it
      const baseUrl = API_ROUTE.endsWith('/') ? API_ROUTE.slice(0, -1) : API_ROUTE;
      return `${baseUrl}${videoPath}`;
    }
    // If it doesn't start with /, add it
    if (!videoPath.startsWith('/')) {
      const baseUrl = API_ROUTE.endsWith('/') ? API_ROUTE.slice(0, -1) : API_ROUTE;
      return `${baseUrl}/${videoPath}`;
    }
    return videoPath;
  };

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.log('Play error:', err);
          setVideoError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
      setVideoDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setVideoProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    console.error('Video failed to load');
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation && place && place.latitude && place.longitude) {
      const dist = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        parseFloat(place.latitude),
        parseFloat(place.longitude)
      );
      setDistance(Math.round(dist * 10) / 10);
      setTravelTimes({
        driving: calculateTravelTime(dist, 'driving'),
        walking: calculateTravelTime(dist, 'walking'),
        cycling: calculateTravelTime(dist, 'cycling')
      });
    }
  }, [userLocation, place]);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}/hangout-places/${slug}/`);
        if (response.status === 200) {
          setPlace(response.data);
          setImages(response.data.images || []);
          setViews(response.data.view_count || 0);
          setOpenHours(response.data.opening_hours || []);
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
        const response = await axios.get(`${API_ROUTE}get-hangout-reviews/${slug}/`);
        const reviewData = response.data;
        setReviews(reviewData);

        if (reviewData.length > 0) {
          const avg = reviewData.reduce((sum, review) => sum + review.rating, 0) / reviewData.length;
          setAverageRating(avg);

          const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
          reviewData.forEach((review) => {
            ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
          });
          setRatings(ratingCounts);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleFinish = async (values) => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("auth_token");

    if (!userId) {
      toast.error("Please login to submit a review");
      return;
    }

    try {
      const response = await axios.post(
        `${API_ROUTE}post-hangout-review/${slug}/review/`,
        {
          rating: values.rating,
          comment: values.comment
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 201) {
        toast.success("Review submitted successfully!");
        form.resetFields();
        const res = await axios.get(`${API_ROUTE}get-hangout-reviews/${slug}/`);
        setReviews(res.data);
      }
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
      console.error("Error submitting review:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <CircularProgress className="text-orange-500" />
          <p className="mt-4 text-gray-600 font-medium">Loading place details...</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-500">Place not found</p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Get full video URL
  const videoUrl = getFullVideoUrl(place.video_url || place.video);
  const hasVideo = videoUrl && !videoUrl.includes('null') && videoUrl !== 'null';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-20 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <span className="cursor-pointer hover:text-orange-500" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-orange-500" onClick={() => navigate('/HangoutPlaces')}>Hangout Places</span>
          <span>/</span>
          <span className="text-orange-500 font-medium truncate">{place.name}</span>
        </nav>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm mb-6"
      >
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{place.name}</h1>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="flex items-center text-gray-600">
                <LocationOnOutlinedIcon className="text-orange-500 mr-1" />
                <span className="text-base">{place.location || 'Location not specified'}</span>
              </div>
              
              {distance !== null && userLocation && (
                <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg">
                  <Navigation className="text-orange-500" fontSize="small" />
                  <span className="text-sm font-semibold text-gray-700">
                    {distance < 1 ? `${Math.round(distance * 1000)}m away` : `${distance}km away`}
                  </span>
                </div>
              )}
              
              {hasVideo && (
                <div className="flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-lg">
                  <PlayCircle className="text-red-500" fontSize="small" />
                  <span className="text-sm font-semibold text-red-600">🎬 Video Available</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
              <VisibilityIcon className="text-gray-500 mr-1" fontSize="small" />
              <span className="text-sm font-medium">{views} views</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <Share fontSize="small" className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Share</span>
            </button>
            {place.category && (
              <Chip 
                label={place.category.name}
                className="bg-orange-500 text-white font-medium"
              />
            )}
          </div>
        </div>

        {distance !== null && userLocation && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-gray-600">Travel Time:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg">
                  <DirectionsCar fontSize="small" className="text-green-600" />
                  <span className="text-sm font-medium">{travelTimes?.driving}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg">
                  <DirectionsWalk fontSize="small" className="text-blue-600" />
                  <span className="text-sm font-medium">{travelTimes?.walking}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-lg">
                  <DirectionsBike fontSize="small" className="text-purple-600" />
                  <span className="text-sm font-medium">{travelTimes?.cycling}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Video Section */}
      {hasVideo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative bg-black aspect-video">
              {!videoError ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  src={videoUrl}
                  poster={place.video_thumbnail ? getFullVideoUrl(place.video_thumbnail) : (images[0]?.image ? `${API_ROUTE}${images[0]?.image}` : undefined)}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={handleVideoError}
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white">
                    <PlayCircle className="text-4xl text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-400">Video unavailable</p>
                    <p className="text-xs text-gray-500 mt-1">The video could not be loaded</p>
                  </div>
                </div>
              )}
              
              {/* Video Controls Overlay - Only show if no error */}
              {!videoError && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  {/* Progress Bar */}
                  <div 
                    className="w-full h-1 bg-gray-600 rounded-full mb-3 cursor-pointer"
                    onClick={(e) => {
                      if (videoRef.current) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width;
                        videoRef.current.currentTime = x * videoRef.current.duration;
                      }
                    }}
                  >
                    <div 
                      className="h-full bg-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-orange-500 transition-colors"
                      >
                        {isPlaying ? (
                          <PauseCircle fontSize="large" />
                        ) : (
                          <PlayCircle fontSize="large" />
                        )}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-orange-500 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeOff fontSize="medium" />
                        ) : (
                          <VolumeUp fontSize="medium" />
                        )}
                      </button>
                      <span className="text-white text-sm">
                        {videoRef.current && !isNaN(videoRef.current.currentTime) ?
                          `${Math.floor(videoRef.current.currentTime / 60)}:${String(Math.floor(videoRef.current.currentTime % 60)).padStart(2, '0')}` 
                          : '0:00'}
                        / 
                        {videoRef.current && !isNaN(videoRef.current.duration) && isFinite(videoRef.current.duration) ?
                          `${Math.floor(videoRef.current.duration / 60)}:${String(Math.floor(videoRef.current.duration % 60)).padStart(2, '0')}`
                          : '0:00'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs bg-orange-500/80 px-3 py-1 rounded-full">
                         Short Video
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.length > 0 && (
            <div className="relative h-96 overflow-hidden rounded-2xl shadow-md">
              <img
                src={`${API_ROUTE}${images[0]?.image}`}
                alt={place.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            {images.slice(1, 5).map((img, index) => (
              <div key={index} className="relative h-46 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={`${API_ROUTE}${img?.image}`}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
            {images.length > 4 && (
              <button
                onClick={() => navigate(`/hangoutoverviewpiz/${slug}`)}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition flex items-center gap-2 font-medium"
              >
                <ViewHeadlineIcon fontSize="small" />
                View All Photos
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {place.about && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">About {place.name}</h2>
              <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                {place.about}
              </div>
            </motion.div>
          )}

          {place.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed text-base">{place.description}</p>
            </motion.div>
          )}

          {place.highlight && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Highlights</h2>
              <div className="flex items-start gap-3">
                <span className="text-orange-500 text-2xl">🔥</span>
                <p className="text-gray-700 leading-relaxed text-base">{place.highlight}</p>
              </div>
            </motion.div>
          )}

          {place.best_times && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Best Times to Visit</h2>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-2xl">✔️</span>
                <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {place.best_times}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews ({reviews.length})</h2>
            
            {reviews.length > 0 ? (
              <>
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                      <div className="flex items-center justify-center mt-1">
                        <Rate value={averageRating} disabled className="text-yellow-500" />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{reviews.length} reviews</p>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const percentage = reviews.length > 0 ? ((ratings[star] || 0) / reviews.length) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-600 w-12">{star} ★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 w-10">{Math.round(percentage)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition">
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={Avatar} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full border-2 border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{review.user_name}</p>
                          <p className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Rate value={review.rating} disabled className="text-yellow-500 text-sm" />
                        <span className="text-xs text-gray-600">{review.rating}/5</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            )}

            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
              <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                  name="rating"
                  label="Your Rating"
                  rules={[{ required: true, message: 'Please rate this place' }]}
                >
                  <Rate className="text-yellow-500 text-2xl" />
                </Form.Item>

                <Form.Item
                  name="comment"
                  label="Your Review"
                  rules={[{ required: true, message: 'Please write your review' }]}
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="Share your experience..."
                    className="rounded-lg border-gray-200"
                  />
                </Form.Item>

                <Button 
                  type="primary" 
                  htmlType="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg"
                >
                  Submit Review
                </Button>
              </Form>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm sticky top-24"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Location Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <LocationOn className="text-orange-500 mt-0.5" fontSize="small" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-sm text-gray-600">{place.location || 'Not specified'}</p>
                </div>
              </div>

              {place.latitude && place.longitude && (
                <div className="flex items-start gap-3">
                  <LocationOn className="text-orange-500 mt-0.5" fontSize="small" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Coordinates</p>
                    <p className="text-sm text-gray-600">
                      {parseFloat(place.latitude).toFixed(4)}, {parseFloat(place.longitude).toFixed(4)}
                    </p>
                  </div>
                </div>
              )}

              {distance !== null && userLocation && (
                <div className="flex items-start gap-3">
                  <Navigation className="text-orange-500 mt-0.5" fontSize="small" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Distance</p>
                    <p className="text-sm text-gray-600">
                      {distance < 1 ? `${Math.round(distance * 1000)} meters` : `${distance} km`}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        🚗 {travelTimes?.driving}
                      </span>
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        🚶 {travelTimes?.walking}
                      </span>
                      <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                        🚲 {travelTimes?.cycling}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {openHours && openHours.length > 0 && (
                <div className="flex items-start gap-3">
                  <AccessTime className="text-orange-500 mt-0.5" fontSize="small" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Opening Hours</p>
                    <div className="space-y-1 mt-1">
                      {openHours.map((hour, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{hour.day}</span>
                          <span className="font-medium text-gray-800">{hour.open_time} - {hour.close_time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {place.created_at && (
                <div className="flex items-start gap-3">
                  <CalendarToday className="text-orange-500 mt-0.5" fontSize="small" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Added</p>
                    <p className="text-sm text-gray-600">{new Date(place.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>

            <Divider className="my-4" />

            <div className="space-y-3">
              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      place.location || `${place.latitude},${place.longitude}`
                    )}`,
                    "_blank"
                  )
                }
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Map fontSize="small" />
                View on Google Maps
              </button>

              {place.website_link_1 && (
                <button
                  onClick={() => window.open(place.website_link_1, "_blank")}
                  className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Language fontSize="small" />
                  Visit Website
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}