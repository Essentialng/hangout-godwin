import React, { useState, useEffect} from "react";
import { MapPin, Phone } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import Bed from '../assets/icons/bed.png';
import Lounch from '../assets/icons/Group 1.png';
import Cars from '../assets/icons/Vector (1).png';
import Pet from '../assets/icons/Vector.png';
import { Form, Input, Rate } from 'antd';
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "../assets/images (7).png"; 
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Share,} from "@mui/icons-material";
const apiKey2 = import.meta.env.VITE_API_KEY;
import { FaUtensils, FaSwimmingPool, FaWifi, FaDumbbell, FaSpa } from 'react-icons/fa';

const HotelListing = () => {

  const amenityIcons = {
    "Restaurant": <FaUtensils />,
    "Refrigerator": <FaSwimmingPool />,
    "Wifi": <FaWifi />,
    "Garden view": <FaDumbbell />,
    "Pool": <FaSpa />,
  };

  const { slug } = useParams();
  const [hotellisting, setHotelListing] = useState([]);
    const [single, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [desc, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [savety, setSafetyAndHygiene] = useState('');
    const [room, setRoom] = useState('');
    const [pet, setPetAllow] = useState('');
    const [shortStayPrice, setShort_stay_price] = useState('');
    const [longStayPrice, setlong_stay_price] = useState('');
    const [hasconference, sethas_conference_hall] = useState('');
    const [checkin, setcheck_in_time] = useState('');
    const [checkout, setcheck_out_time] = useState('');
    const [aminities, setamenities] = useState('');
    const [images, setImages] = useState('');
    const [reviews, setReviews] = useState([]);
    const [views, setViews] = useState([]);
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setUserMail] = useState("");
    const [username, setUserName] = useState("");
    const [PID, setUserID] = useState("");
    


    // Fetch and set user data
    useEffect(() => {
      const storedUserData = localStorage.getItem("user_data");
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        console.log('user_data:', userData);
        console.log('First Name:', userData.first_name);
    
        setUserMail(userData.email);
        setUserName(`${userData.first_name} ${userData.last_name}`); // Combine first and last name
        setUserID(userData.id);
      }
    }, []);

    useEffect(() => {
      const fetchHotelBySlug = async () => {
        try {
          const response = await axios.get(`${API_ROUTE}/hotels/${slug}/`);
          if (response.status === 200) {
            setHotels(response.data);
            console.log('hotel fetch base on slug', response.data)
            const data = response.data;
            console.log('user_iddd',data.created_by)
            setName(data.name);
            setDescription(data.description);
            setLocation(data.location);
            setSafetyAndHygiene(data.safety_and_hygiene);
            setRoom(data.rooms_available);
            setPetAllow(data.pets_allowed);
            setShort_stay_price(data.short_stay_price);
            setlong_stay_price(data.long_stay_price);
            sethas_conference_hall(data.has_conference_hall);
            setcheck_in_time(data.check_in_time);
            setcheck_out_time(data.check_out_time);
            setamenities(data.amenities);
            setImages(data.images);
            setViews(data.view_count || []);
            
            console.log('hotel name', data.name)
          } else {
            setError("Hotel not found");
          }
        } catch (error) {
          console.error("Error fetching hotel data", error);
          setError("Error fetching hotel details");
        } finally {
          setLoading(false);
        }
      };
  
      fetchHotelBySlug();
    }, [slug]);

    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await axios.get(`${API_ROUTE}gethotel-reviews/${slug}/`);
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
      const handleSendMessage2 = async () => {

        
        if ( !username || !email || !phone || !message) {
          
          toast.error("Please Login and fill in all fields before submitting!", { position: "top-right", autoClose: 3000 });
          return;
        }
        try {
          const token = localStorage.getItem('auth_token');
      
          const res = await axios.post(
            `${API_ROUTE}notify/`,
            {
              title: `Booking ${name}`,
              created_by: PID,
              email: email,
              phone: phone,
              message: message,
              sender_name: username,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
      
          if (res.status === 201) {
            toast.success("Message sent successfully!", { position: "top-right", autoClose: 3000 });
            setIsModalOpen(false)
            setMessage('');
            setPhone('')
          } else {
            console.log("Error sending message");
          }
        } catch (error) {
          console.log("Error sending message", error);
        }
      };
    const apiKey = `${apiKey2}`; 
    const userlocation = location; 
  
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${userlocation}`;

  const sharePlace = () => {
    const shareUrl = `${window.location.origin}/hotelnewlist/${slug}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");


    
  };
  return (
    <div className="mx-auto bg-white p-6"> 
      
      {/* Hotel Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First image as the main image */}
        {Array.isArray(images) && images.length > 0 && (
          <img 
            src={images[0]?.image} 
            alt="Hotel" 
            className="rounded-2xl w-full h-96 object-cover shadow-lg"
          />
        )}

        {/* Other images in a grid */}
        <div className="grid grid-cols-2 gap-3">
          {Array.isArray(images) && images.length > 1 &&
            images.slice(1).map((img, index) => (
              <img 
                key={index} 
                src={img?.image} 
                alt={`Hotel Image ${index + 1}`} 
                className="rounded object-cover w-full h-44 shadow-md"
              />
            ))
          }
        </div>
      </div>
      
      {/* Hotel Details */}
      <div className="p-8 bg-white">
        <div>
        <div className="flex justify-between items-start gap-6 p-4 bg-white rounded-lg">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{name}</h2>
            <p className="text-gray-500 flex items-center mt-2">
              <MapPin className="w-5 h-5 mr-2 text-yellow-500" /> {location}
            </p>
          
          </div>

          <div className="flex items-center gap-4">
            <p className="text-gray-700 flex items-center">
              <VisibilityIcon className="w-5 h-5 text-gray-400 mr-1" /> {views} views
            </p>
            
            <button
              onClick={sharePlace}
              className="flex items-center px-4 py-2 text-blue-500 hover:text-blue-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <Share className="w-5 h-5 mr-2" /> Share
            </button>
          </div>
        </div>
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl p-3 font-bold mb-4">Book {name}</h2>
            
            <input 
            value={phone}
            placeholder='Enter your currect phone number'
            onChange={(e)=> setPhone(e.target.value)}
            className="w-full h-12 p-3 border border-gray-300 rounded-md mb-4"

            />
            <textarea 
              className="w-full h-32 p-3 border border-gray-300 rounded-md"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end gap-2">
              <button 
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                onClick={() => setIsModalOpen(false)}
              >Cancel</button>
              <button 
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
                onClick={() => { handleSendMessage2(); }}
              >Send</button>
            </div>
          </div>
        </div>
      )}
        
        {/* Features */}
        <div className="flex gap-8 p-6">
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center text-gray-700">
              <div className="p-3 bg-gray-100 rounded-lg flex flex-col items-center">
                <img src={Bed} alt="Lounge" className="mx-auto p-3" />
                <div className="mt-2">{room} Room(s)</div>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg flex flex-col items-center">
                <img src={Lounch} alt="Lounge" className="mx-auto p-3" />
                <div className="mt-2">Car park</div>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg flex flex-col items-center">
                <img src={Cars} alt="Lounge" className="mx-auto p-3" />
                <div className="mt-2">{hasconference} Conference Hall</div>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg flex flex-col items-center">
                <img src={Pet} alt="Lounge" className="mx-auto p-3" />
                <div className="mt-2">{pet} Pets Allowed</div>
              </div>
            </div>

            {/* Description */}
            <h1 className="text-3xl font-bold text-black mt-6 mb-4">Hotel Descriptions</h1>
            <p className="text-gray-700 leading-relaxed">
             
            {desc}
            </p>
            <div className=" mt-5">
                {/* Offered Amenities Section */}
                <h2 className="text-2xl font-semibold text-gray-900">Offered Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-gray-700">
    

                <div className="flex flex-wrap gap-3 mt-2">
                  {aminities?.split(",").map((item, index) => {
                    const trimmedItem = item.trim();
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span className="text-base">
                          {amenityIcons[trimmedItem] || ''} 
                        </span>
                        <span>{trimmedItem}</span>
                      </div>
                    );
                  })}
                </div>

                   
                   
                </div>
                

                {/* Safety and Hygiene Section */}
                <h2 className="text-2xl font-semibold text-gray-900 mt-8">Safety and Hygiene</h2>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4 text-gray-700">
                    <div className="flex items-center space-x-3">
                
                    <span>{savety}</span>
                    </div>
                   
                </div>
                </div>
                
                {/* map address location */}
                <div className="mt-10 ">
                  <h1 className="text-4xl font-bold ">Map Locations</h1>
                </div>
                <div className="relative w-full h-[400px] mt-5 rounded-2xl overflow-hidden shadow-lg border border-gray-300">
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
<div className="max-w-lg mt-8 p-8 bg-gray-100 rounded-2xl shadow-xl border border-gray-300">
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
    className="bg-gray-100 p-6 rounded-xl"
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
          
          
          {/* Pricing & Reservation ***********************************************************/}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white p-8 rounded-2xl shadow w-full border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900">₦ {shortStayPrice ? Number(shortStayPrice).toLocaleString('en-US'): '0'} - ₦ {longStayPrice ? Number(longStayPrice).toLocaleString('en-US'): '0'}</h3>
              <br></br>
              <hr className="text-gray-200 p-4"></hr>
              <p className="text-gray-400">
                Short Stay: ₦{shortStayPrice ? Number(shortStayPrice).toLocaleString('en-US') : '0'} | 
                Long: ₦{longStayPrice ? Number(longStayPrice).toLocaleString('en-US') : '0'}
              </p>

             
              <button
               onClick={() => setIsModalOpen(true)} 
               className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition duration-300 shadow-md">
                Reserve Now
              </button>
              {/* Contact */}
              {/* <div className="bg-white p-6 rounded-2xl mt-4 flex items-center justify-between">
                <button className="flex items-center border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300 w-full">
                  <Phone className="mr-2 text-yellow-500" /> Contact Hotel
                </button>
              </div> */}
            </div>
          </div>
        </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HotelListing;
