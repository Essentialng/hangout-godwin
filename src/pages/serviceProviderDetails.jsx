import React, { useState, useEffect } from 'react';
import { Email, LocationOn, Phone, Verified } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { API_ROUTE } from '../ApisConf/api_config';
import { Box, TextField, Button ,IconButton, Divider, Alert} from "@mui/material";
import { Form, Input, Rate,  message } from 'antd';
import Avatar from "../assets/images (7).png"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ShareIcon from '@mui/icons-material/Share'; 
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailIcon from '@mui/icons-material/Mail';




const ServiceProviderProfile = () => {
  const { slug } = useParams();
  const [provider, setProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [openHours, setOpenHours] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [email, setUserMail] = useState("");
  const [UID, setUserID] = useState("");
  const [PID, setProviderID] = useState("");
  const [username, setUserName] = useState("");

  useEffect(() => {
    const fetchProviderDetails = async () => {
      if (!slug) return Alert('Slug not provided');
      try {
        const res = await axios.get(`${API_ROUTE}/service-providers/${slug}`);
        if (res.status === 200) setProvider(res.data);
        const data = res.data;
        setOpenHours(data.opening_hours);
        console.log('provider id', data.created_by);
        setProviderID(data.created_by)
      } catch (error) {
        console.error('Error fetching providers details:', error);
      }
    };
    fetchProviderDetails();
  }, [slug]);


  /// review
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_ROUTE}reviews/${slug}/`);
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

  const handleFinish = async (values) => {
    const userId = localStorage.getItem("user_id"); 
    const token = localStorage.getItem("auth_token"); 
    

    if (!userId) {
        return alert("User is not logged in.");
    }

    try {
      

        const response = await axios.post(
          `${API_ROUTE}post-review/${slug}/review/`,
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

// Fetch and set user data
useEffect(() => {
  const storedUserData = localStorage.getItem("user_data");
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    console.log('user_data:', userData);
    console.log('First Name:', userData.first_name);
    setUserMail(userData.email);
    setUserName(`${userData.first_name} ${userData.last_name}`);
    setUserID(userData.id);
  }
}, []);


const handleSendMessage = async () => {
  if (!username || !email || !phone || !message) {
    
    toast.error("Please fill in all fields before submitting!", { position: "top-right", autoClose: 3000 });
    return;
  }
  try {
    const token = localStorage.getItem('auth_token');

    const res = await axios.post(
      `${API_ROUTE}notify/`,
      {
        title: 'Make-up',
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
const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Make-Up',
      text: message,
      url: window.location.href, 
    })
    .then(() => console.log('Property shared successfully'))
    .catch((error) => console.error('Error sharing product:', error));
  } else {
   
    const shareUrl = `https://twitter.com/intent/tweet?text=Check out this product: ${title}&url=${window.location.href}`;
    window.open(shareUrl, '_blank');
  }
};

  if (!provider) return <div className="text-center text-gray-500 py-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl">
     
      <div className="flex flex-col md:flex-row gap-6 items-start bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl shadow-md">
        {provider.images?.length > 0 && (
          <img 
            src={provider.images[0]?.image} 
            alt={provider.name} 
            className="rounded-2xl w-full md:w-72 h-75 object-cover shadow-lg border border-gray-200"
          />
        )}
        <div className="flex-1">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
            {provider.name} 
            <Verified className="text-teal-500" />
          </h2>
          <p className="text-lg text-gray-600">{provider.profession}</p>
          <p className="flex items-center gap-2 text-gray-500 mt-1">
            <LocationOn className="text-gray-400" /> {provider.location}
          </p>
          <p className="flex items-center gap-2 text-gray-500">
            <Email className="text-gray-400" /> {provider.email}
          </p>
          <p className="flex items-center gap-2 text-gray-500">
            <Phone className="text-gray-400" /> {provider.phone}
          </p>
          <p className="text-gray-700 mt-3">{provider.bio}</p>
          <div className="mt-4 flex gap-4">
          <Button
                      onClick={() => handleShare('General')}
                      startIcon={<ShareIcon />}
                      color="primary"
                      variant="contained"
                    >
                      Share
                      <div style={{ display: 'flex', marginLeft: 10 }}>
                        <IconButton onClick={() => handleShare('Facebook')} style={{ backgroundColor: '#3b5998', color: '#fff', margin: 5 }}>
                          <FacebookIcon />
                        </IconButton>
                        <IconButton onClick={() => handleShare('WhatsApp')} style={{ backgroundColor: '#25D366', color: '#fff', margin: 5 }}>
                          <WhatsAppIcon />
                        </IconButton>
                       
                      
                      </div>
                    </Button>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="border border-teal-500 text-teal-500 px-6 py-3 rounded-lg shadow-md hover:bg-teal-50 transition-all">
              Send a Message
            </button>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Send a Message</h2>
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
                onClick={() => { handleSendMessage(); }}
              >Send</button>
            </div>
          </div>
        </div>
      )}

       {/* Opening Hours */}
      <div className="mt-8 p-6 max-w-2xl bg-gray-100 rounded-2xl border border-gray-200">
        <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m9-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Opening Hours
        </h3>
        <ul className="mt-3 space-y-4 text-lg text-gray-700">
          {Array.isArray(openHours) && openHours.length > 0 &&
            openHours.map((serviceHour, index) => (
              <li key={index} className="flex justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <span className="font-medium text-gray-900">{serviceHour.day}</span>
                <span className="text-orange-500 font-semibold">{serviceHour.open_time} - {serviceHour.close_time}</span>
              </li>
          ))}
        </ul>
      </div>

      {/* Gallery Section */}
      <div className="mt-8 mb-5">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Job Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {provider.images?.slice(1).map((img, index) => (
            <img key={index} src={img.image} alt="Gallery" className="w-full h-40 object-cover rounded-lg shadow-md" />
          ))}
        </div>
      </div>
      <div className="rounded bg-white p-6 mt-5">
      {/* Review Section */}  
    <div className=''>
    <h2 className="text-black text-3xl mb-5 font-bold mt-5">Top feedback ({reviews.length})</h2>
    {reviews.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {reviews.map((review) => (
            <li key={review.id} className="border p-4 rounded-md">
              <p style={{fontSize:17, textTransform:'capitalize'}} className="text-gray-500 mt-3 flex flex-wrap">
                <strong className="mr-2">
                  <img
                      src={Avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full "
                    />
                  
                  </strong> 
                  {review.user_name} 
                
              </p>
              <p className="flex items-center text-gray-500 mt-3">
               
                <Rate value={review.rating} disabled className="ml-2" />
                <strong className="ml-4"> Rating:</strong> {review.rating} / 5
              </p>
              <p className="text-gray-500 mt-3">
              {review.comment}
              </p>
              
              <p className="text-gray-500 text-sm mt-3">
                <strong>On: </strong>
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No reviews for this product yet, be the first to review</p>
      )}

    </div>
    <div className="max-w-md mt-5 mb-5 p-6 bg-gray-100 rounded-md">
      <h2 className="text-xl font-semibold mb-2 bg-green text-black">Rate and Review this Product</h2>
      <p className="text-gray-700 mb-5">Share your thoughts with other customers</p>
      <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            className="space-y-4"
        >
            <Form.Item
                style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5,marginTop:10 }}
                name="rating"
                label="Rating"
                rules={[{ required: true, message: 'Please provide a rating' }]}
            >
                <Rate />
            </Form.Item>
            <Form.Item
                name="comment"
                label="Comment"
                rules={[{ required: true, message: 'Please provide a comment' }]}
            >
                <Input.TextArea
                    rows={4}
                    placeholder="Write your review here..."
                    className="rounded-md"
                />
            </Form.Item>
            <Form.Item>
                <Button
                    style={{ backgroundColor: 'orange', color: '#fff' }}
                    type="primary"
                    htmlType="submit"
                    block
                >
                    Submit Review
                </Button>
            </Form.Item>
        </Form>
    </div>
</div>
 {/* Toast Container for notifications */}
 <ToastContainer />
    </div>
  );
};

export default ServiceProviderProfile;
