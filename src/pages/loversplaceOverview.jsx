// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { API_ROUTE } from "../ApisConf/api_config";
// import { Map, Share, ThumbUp, ThumbDown, Flag, Star } from "@mui/icons-material";
// import { Button, Avatar as MuiAvatar, Chip } from "@mui/material";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import { useNavigate } from "react-router-dom";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Form, Input, Rate, Empty } from 'antd';
// import Avatar from "../assets/images (7).png"; 
// import { motion, AnimatePresence } from "framer-motion";
// import loadingAnimanation from '../assets/Animation - 1742465657045.json';
// import Lottie from "lottie-react";
// import { Star as StarFilled, StarBorder } from "@mui/icons-material";

// export default function HangoutOverview() {
//   const { slug } = useParams();
//   const [place, setPlace] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [images, setImages] = useState([]);
//   const [views, setViews] = useState();
//   const [reviews, setReviews] = useState([]);
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [sortBy, setSortBy] = useState("newest");
//   const [hoveredRating, setHoveredRating] = useState(0);

//   useEffect(() => {
//     const fetchPlaceDetails = async () => {
//       try {
//         const response = await axios.get(`${API_ROUTE}lovers-places/${slug}/`);
//         if (response.status === 200) {
//           setPlace(response.data);
//           setImages(response.data.images || []);
//           setViews(response.data.view_count || []);
//         }
//       } catch (error) {
//         console.log("Error fetching place details", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlaceDetails();
//   }, [slug]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`https://backend.ehangouts.com/get-loverplace-reviews/${slug}/`);
//         //const response = await axios.get(`${API_ROUTE}get-loverplace-reviews/${slug}/`);
//         setReviews(response.data);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     fetchReviews();
//   }, [slug]);

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     toast.success("Link copied to clipboard!", { position: "top-right", autoClose: 3000 });
//   };

//   // Review submission
//   const handleFinish = async (values) => {
//     const userId = localStorage.getItem("user_id");
//     const token = localStorage.getItem("auth_token");

//     if (!userId) {
//       toast.error("Please login to submit a review", { position: "top-right" });
//       return;
//     }

//     if (!values.rating) {
//       toast.warning("Please select a rating", { position: "top-right" });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await axios.post(
//         `${API_ROUTE}post-loverplace-review/${slug}/review/`,
//         {
//           rating: values.rating,
//           comment: values.comment
//         },
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//             "Content-Type": "application/json"
//           }
//         }
//       );

//       if (response.status === 201) {
//         toast.success("Review submitted successfully! 🎉", { position: "top-right", autoClose: 3000 });
//         form.resetFields();
//         // Refresh reviews
//         //const updatedReviews = await axios.get(`${API_ROUTE}get-loverplace-reviews/${slug}/`);
//         const updatedReviews = await axios.get(`https://backend.ehangouts.com/get-loverplace-reviews/${slug}/`);
//         setReviews(updatedReviews.data);
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       toast.error(error.response?.data?.detail || "Failed to submit review. Please try again.", {
//         position: "top-right",
//         autoClose: 4000
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Sort reviews
//   const getSortedReviews = () => {
//     const sorted = [...reviews];
//     switch (sortBy) {
//       case "newest":
//         return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//       case "oldest":
//         return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
//       case "highest":
//         return sorted.sort((a, b) => b.rating - a.rating);
//       case "lowest":
//         return sorted.sort((a, b) => a.rating - b.rating);
//       default:
//         return sorted;
//     }
//   };

//   // Calculate statistics
//   const averageRating = reviews.length > 0
//     ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
//     : 0;

//   const ratings = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
//   reviews.forEach((review) => {
//     ratings[review.rating] = (ratings[review.rating] || 0) + 1;
//   });

//   const sortedReviews = getSortedReviews();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <Lottie animationData={loadingAnimanation} loop className="w-40 h-40" />
//       </div>
//     );
//   }

//   if (!place) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <p className="text-lg font-semibold text-red-500">Place not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="md:pl-20 md:pr-20 mx-auto mt-10 sm:pr-40 pr-5 pl-5 bg-white mb-20">
//       <div className="max-w-6xl mx-auto mt-10 bg-white mb-20">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2">{place.name}</h1>
//         <p className="text-gray-600 mb-4 flex items-center text-lg">
//           <LocationOnOutlinedIcon className="mr-2 text-red-500" /> {place.location}
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
//           {images.length > 0 && (
//             <img
//               src={`${API_ROUTE}${images[0]?.image}`}
//               alt="Main View"
//               className="w-full h-96 object-cover shadow-xl rounded-xl"
//             />
//           )}
//           <div className="grid grid-cols-2 gap-2">
//             {images.slice(1, 5).map((img, index) => (
//               <img
//                 key={index}
//                 src={`${API_ROUTE}${img?.image}`}
//                 alt={`Gallery Image ${index + 1}`}
//                 className="rounded-xl object-cover w-full h-44 shadow-lg"
//               />
//             ))}
//             {images.length > 4 && (
//               <button
//                 onClick={() => navigate(`/loverplaceoverviewpiz/${slug}`)}
//                 className="absolute bottom-10 border border-gray-800 right-15 hover:border-white cursor-pointer hover:bg-orange-600 hover:text-white bg-white bg-opacity-50 text-black px-4 py-2 rounded-md text-lg"
//               >
//                 <ViewHeadlineIcon /> Show all photos
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Rating & Views */}
//       <div className="flex items-center space-x-4 mb-4">
//         <p className="text-gray-700"><VisibilityIcon className="text-gray-400" /> {views} views</p>
//         <button
//           onClick={handleShare}
//           className="flex items-center hover:bg-gray-200 p-3 cursor-pointer hover:rounded text-blue-500 hover:text-blue-700"
//         >
//           <Share className="mr-2" /> Share
//         </button>
//       </div>

//       {/* About Section */}
//       <div className="mt-6 p-6 bg-gray-50 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold text-gray-900 mb-3">About {place.name}</h2>
//         <p className="text-gray-700 text-lg leading-relaxed">{place.about}</p>
//       </div>

//       {/* Overview */}
//       <div className="mt-6 p-6 bg-gray-50 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold text-gray-900 mb-3">Descriptions</h2>
//         <p className="text-gray-700 text-lg leading-relaxed">{place.description}</p>
//       </div>

//       {/* Event Highlights */}
//       <div className="mt-6 p-6 bg-gray-50 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold text-gray-900 mb-3">Event Highlights</h2>
//         <ul className="list-disc ml-6 text-gray-700 text-lg">
//           🔥 {place.highlight}
//         </ul>
//       </div>

//       {/* Best Times to Visit */}
//       <div className="mt-6 p-6 bg-gray-50 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold text-gray-900 mb-3">Best Times to Visit</h2>
//         <ul className="list-disc ml-6 text-gray-700 text-lg">
//           ✔️ {place.best_times}
//         </ul>
//       </div>

//       {/* Map Button */}
//       <button
//         onClick={() =>
//           window.open(
//             `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.location)}`,
//             "_blank"
//           )
//         }
//         className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all flex items-center gap-2 text-lg shadow-md"
//       >
//         <Map /> View in Map
//       </button>

//       {/* ==================== REVIEW SECTION ==================== */}
//       <div className="mt-16 border-t-2 border-gray-200 pt-10">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900">
//               Customer Reviews
//               <span className="ml-3 text-lg font-normal text-gray-500">
//                 ({reviews.length} reviews)
//               </span>
//             </h2>
//           </div>
//           {reviews.length > 0 && (
//             <div className="flex items-center gap-3">
//               <label className="text-sm text-gray-600 font-medium">Sort by:</label>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               >
//                 <option value="newest">Newest</option>
//                 <option value="oldest">Oldest</option>
//                 <option value="highest">Highest Rating</option>
//                 <option value="lowest">Lowest Rating</option>
//               </select>
//             </div>
//           )}
//         </div>

//         {/* Rating Summary Card */}
//         {reviews.length > 0 ? (
//           <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-sm border border-orange-100 mb-10">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {/* Overall Rating */}
//               <div className="flex flex-col items-center justify-center">
//                 <div className="text-6xl font-bold text-gray-900">
//                   {averageRating.toFixed(1)}
//                 </div>
//                 <Rate value={averageRating} disabled className="text-2xl mt-2" />
//                 <span className="text-sm text-gray-500 mt-1">
//                   {reviews.length} reviews
//                 </span>
//               </div>

//               {/* Rating Breakdown */}
//               <div className="col-span-2">
//                 {[5, 4, 3, 2, 1].map((star) => {
//                   const count = ratings[star] || 0;
//                   const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
//                   return (
//                     <div key={star} className="flex items-center gap-3 mb-2">
//                       <span className="w-12 text-sm font-medium text-gray-700">
//                         {star} ★
//                       </span>
//                       <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${percentage}%` }}
//                           transition={{ duration: 0.8, ease: "easeOut" }}
//                           className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
//                           style={{ width: `${percentage}%` }}
//                         />
//                       </div>
//                       <span className="w-12 text-sm text-gray-600 text-right">
//                         {count}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 mb-10">
//             <div className="text-6xl mb-4">💬</div>
//             <h3 className="text-2xl font-semibold text-gray-700">No Reviews Yet</h3>
//             <p className="text-gray-500 mt-2">Be the first to share your experience!</p>
//           </div>
//         )}

//         {/* Reviews List */}
//         <AnimatePresence>
//           {sortedReviews.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {sortedReviews.map((review, index) => (
//                 <motion.div
//                   key={review.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05, duration: 0.4 }}
//                   whileHover={{ y: -4, transition: { duration: 0.2 } }}
//                   className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={review.user_avatar || Avatar}
//                         alt={review.user_name}
//                         className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
//                       />
//                       <div>
//                         <p className="font-semibold text-gray-900 text-lg">
//                           {review.user_name}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {new Date(review.created_at).toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'long',
//                             day: 'numeric'
//                           })}
//                         </p>
//                       </div>
//                     </div>
//                     <Chip
//                       label={`${review.rating} ★`}
//                       size="small"
//                       sx={{
//                         backgroundColor: '#FF6B35',
//                         color: 'white',
//                         fontWeight: 'bold',
//                         fontSize: '14px'
//                       }}
//                     />
//                   </div>

//                   <div className="mt-3">
//                     <Rate value={review.rating} disabled className="text-sm" />
//                   </div>

//                   <p className="text-gray-700 mt-3 leading-relaxed text-base">
//                     "{review.comment}"
//                   </p>

//                   <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
//                     <div className="flex items-center gap-3">
//                       <button className="flex items-center gap-1 text-gray-400 hover:text-green-500 transition text-sm">
//                         <ThumbUp className="text-sm" />
//                         <span>Helpful</span>
//                       </button>
//                       <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition text-sm">
//                         <ThumbDown className="text-sm" />
//                       </button>
//                     </div>
//                     <button className="text-gray-400 hover:text-red-500 transition text-sm flex items-center gap-1">
//                       <Flag className="text-sm" />
//                       <span>Report</span>
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           ) : null}
//         </AnimatePresence>

//         {/* Review Submission Form */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mt-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-200 p-8"
//         >
//           <div className="flex items-center gap-3 mb-6">
//             <div className="p-3 bg-orange-100 rounded-full">
//               <StarFilled className="text-orange-500 text-2xl" />
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900">Share Your Experience</h3>
//               <p className="text-gray-500 text-sm">Help others by sharing your honest review</p>
//             </div>
//           </div>

//           <Form form={form} layout="vertical" onFinish={handleFinish}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <Form.Item
//                   name="rating"
//                   label={<span className="font-semibold text-gray-700">Your Rating</span>}
//                   rules={[{ required: true, message: 'Please rate this place' }]}
//                 >
//                   <div className="bg-white p-4 rounded-xl border border-gray-200">
//                     <Rate
//                       className="text-3xl"
//                       onChange={(value) => setHoveredRating(value)}
//                       onHoverChange={setHoveredRating}
//                     />
//                     {hoveredRating > 0 && (
//                       <span className="ml-3 text-lg font-semibold text-orange-500">
//                         {hoveredRating} {hoveredRating === 1 ? 'Star' : 'Stars'}
//                       </span>
//                     )}
//                   </div>
//                 </Form.Item>
//               </div>

//               <div>
//                 <Form.Item
//                   name="comment"
//                   label={<span className="font-semibold text-gray-700">Your Review</span>}
//                   rules={[
//                     { required: true, message: 'Please write your review' },
//                     { min: 10, message: 'Please write at least 10 characters' }
//                   ]}
//                 >
//                   <Input.TextArea
//                     rows={4}
//                     placeholder="Tell us about your experience..."
//                     className="p-4 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
//                     maxLength={500}
//                     showCount
//                   />
//                 </Form.Item>
//               </div>
//             </div>

//             <Form.Item>
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full md:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
//                   isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-orange-600 hover:to-orange-700'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <StarFilled />
//                     Submit Review
//                   </>
//                 )}
//               </motion.button>
//             </Form.Item>
//           </Form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { Map, Share, ThumbUp, ThumbDown, Flag, Star } from "@mui/icons-material";
import { Button, Avatar as MuiAvatar, Chip } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Rate, Empty } from 'antd';
import Avatar from "../assets/images (7).png"; 
import { motion, AnimatePresence } from "framer-motion";
import loadingAnimanation from '../assets/Animation - 1742465657045.json';
import Lottie from "lottie-react";
import { Star as StarFilled, StarBorder } from "@mui/icons-material";

export default function HangoutOverview() {
  const { slug } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [views, setViews] = useState();
  const [reviews, setReviews] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}lovers-places/${slug}/`);
        if (response.status === 200) {
          setPlace(response.data);
          setImages(response.data.images || []);
          setViews(response.data.view_count || []);
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
        const response = await axios.get(`https://backend.ehangouts.com/get-loverplace-reviews/${slug}/`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!", { position: "top-right", autoClose: 3000 });
  };

  // ✅ FIXED: Review submission with proper URL and error handling
  const handleFinish = async (values) => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("auth_token");

    // Debug logging
    console.log("=== Review Submission Debug ===");
    console.log("Slug:", slug);
    console.log("User ID:", userId);
    console.log("Token:", token);
    console.log("Rating:", values.rating);
    console.log("Comment:", values.comment);

    if (!userId) {
      toast.error("Please login to submit a review", { position: "top-right" });
      return;
    }

    if (!token) {
      toast.error("Authentication token missing. Please login again.", { position: "top-right" });
      return;
    }

    if (!values.rating) {
      toast.warning("Please select a rating", { position: "top-right" });
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ CORRECT URL - use API_ROUTE with proper formatting
      const url = `${API_ROUTE}post-loverplace-review/${slug}/review/`;
      console.log("Posting to URL:", url);
      
      const response = await axios.post(
        url,
        {
          rating: values.rating,
          comment: values.comment
        },
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 201 || response.status === 200) {
        toast.success("Review submitted successfully! 🎉", { 
          position: "top-right", 
          autoClose: 3000 
        });
        form.resetFields();
        setHoveredRating(0);
        
        // Refresh reviews
        const updatedReviews = await axios.get(`https://backend.ehangouts.com/get-loverplace-reviews/${slug}/`);
        setReviews(updatedReviews.data);
      }
    } catch (error) {
      console.error("=== Error Submitting Review ===");
      console.error("Error object:", error);
      
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        console.error("Response headers:", error.response.headers);
        
        if (error.response.status === 401) {
          toast.error("Please login again to submit a review", {
            position: "top-right",
            autoClose: 4000
          });
        } else if (error.response.status === 400) {
          toast.error(error.response.data?.detail || "You have already reviewed this place or invalid data", {
            position: "top-right",
            autoClose: 4000
          });
        } else if (error.response.status === 404) {
          toast.error("Place not found. Please refresh and try again.", {
            position: "top-right",
            autoClose: 4000
          });
        } else {
          toast.error(error.response.data?.detail || "Failed to submit review. Please try again.", {
            position: "top-right",
            autoClose: 4000
          });
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server. Please check your connection.", {
          position: "top-right",
          autoClose: 4000
        });
      } else {
        console.error("Error setting up request:", error.message);
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 4000
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sort reviews
  const getSortedReviews = () => {
    const sorted = [...reviews];
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case "highest":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  };

  // Calculate statistics
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const ratings = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((review) => {
    ratings[review.rating] = (ratings[review.rating] || 0) + 1;
  });

  const sortedReviews = getSortedReviews();

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
        <p className="text-lg font-semibold text-red-500">Place not found</p>
      </div>
    );
  }

  return (
    <div className="md:pl-20 md:pr-20 mx-auto mt-10 sm:pr-40 pr-5 pl-5 bg-white mb-20">
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
                className="absolute bottom-10 border border-gray-800 right-15 hover:border-white cursor-pointer hover:bg-orange-600 hover:text-white bg-white bg-opacity-50 text-black px-4 py-2 rounded-md text-lg"
              >
                <ViewHeadlineIcon /> Show all photos
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Rating & Views */}
      <div className="flex items-center space-x-4 mb-4">
        <p className="text-gray-700"><VisibilityIcon className="text-gray-400" /> {views} views</p>
        <button
          onClick={handleShare}
          className="flex items-center hover:bg-gray-200 p-3 cursor-pointer hover:rounded text-blue-500 hover:text-blue-700"
        >
          <Share className="mr-2" /> Share
        </button>
      </div>

      {/* About Section */}
      <div className="mt-6 p-6 bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">About {place.name}</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{place.about}</p>
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
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.location)}`,
            "_blank"
          )
        }
        className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all flex items-center gap-2 text-lg shadow-md"
      >
        <Map /> View in Map
      </button>

      {/* ==================== REVIEW SECTION ==================== */}
      <div className="mt-16 border-t-2 border-gray-200 pt-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Customer Reviews
              <span className="ml-3 text-lg font-normal text-gray-500">
                ({reviews.length} reviews)
              </span>
            </h2>
          </div>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          )}
        </div>

        {/* Rating Summary Card */}
        {reviews.length > 0 ? (
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-sm border border-orange-100 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Overall Rating */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>
                <Rate value={averageRating} disabled className="text-2xl mt-2" />
                <span className="text-sm text-gray-500 mt-1">
                  {reviews.length} reviews
                </span>
              </div>

              {/* Rating Breakdown */}
              <div className="col-span-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratings[star] || 0;
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3 mb-2">
                      <span className="w-12 text-sm font-medium text-gray-700">
                        {star} ★
                      </span>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-12 text-sm text-gray-600 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 mb-10">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-2xl font-semibold text-gray-700">No Reviews Yet</h3>
            <p className="text-gray-500 mt-2">Be the first to share your experience!</p>
          </div>
        )}

        {/* Reviews List */}
        <AnimatePresence>
          {sortedReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.user_avatar || Avatar}
                        alt={review.user_name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">
                          {review.user_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <Chip
                      label={`${review.rating} ★`}
                      size="small"
                      sx={{
                        backgroundColor: '#FF6B35',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div className="mt-3">
                    <Rate value={review.rating} disabled className="text-sm" />
                  </div>

                  <p className="text-gray-700 mt-3 leading-relaxed text-base">
                    "{review.comment}"
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-gray-400 hover:text-green-500 transition text-sm">
                        <ThumbUp className="text-sm" />
                        <span>Helpful</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition text-sm">
                        <ThumbDown className="text-sm" />
                      </button>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition text-sm flex items-center gap-1">
                      <Flag className="text-sm" />
                      <span>Report</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : null}
        </AnimatePresence>

        {/* Review Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-200 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 rounded-full">
              <StarFilled className="text-orange-500 text-2xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Share Your Experience</h3>
              <p className="text-gray-500 text-sm">Help others by sharing your honest review</p>
            </div>
          </div>

          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Form.Item
                  name="rating"
                  label={<span className="font-semibold text-gray-700">Your Rating</span>}
                  rules={[{ required: true, message: 'Please rate this place' }]}
                >
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <Rate
                      className="text-3xl"
                      onChange={(value) => setHoveredRating(value)}
                      onHoverChange={setHoveredRating}
                    />
                    {hoveredRating > 0 && (
                      <span className="ml-3 text-lg font-semibold text-orange-500">
                        {hoveredRating} {hoveredRating === 1 ? 'Star' : 'Stars'}
                      </span>
                    )}
                  </div>
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  name="comment"
                  label={<span className="font-semibold text-gray-700">Your Review</span>}
                  rules={[
                    { required: true, message: 'Please write your review' },
                    { min: 10, message: 'Please write at least 10 characters' }
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Tell us about your experience..."
                    className="p-4 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    maxLength={500}
                    showCount
                  />
                </Form.Item>
              </div>
            </div>

            <Form.Item>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-orange-600 hover:to-orange-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <StarFilled />
                    Submit Review
                  </>
                )}
              </motion.button>
            </Form.Item>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}