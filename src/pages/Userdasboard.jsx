import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,Typography } from "@mui/material";
import { FaCog, FaSignOutAlt, FaHome, FaTrash } from "react-icons/fa";
import { API_ROUTE } from "../ApisConf/api_config";
import avata from '../assets/profile.jpg';
import { Edit, Explore } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bannerImage from "../assets/maxresdefault.jpg"; 
import banner from "../assets/y2O4cqtylhP8.png"
import banner2 from "../assets/maxresdefault (1).png"
import banner3 from "../assets/Sauriersaal_des_NHM_Wien.png"

const UserDashboard = () => {
  const [email, setUserMail] = useState("");
  const [UID, setUserID] = useState("");
  const [username, setUserName] = useState("");
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openPopup3, setOpenPopup3] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [notification, setNotifications] = useState('');


const places =[
  { 
    title: "Beach hangout", 
    desc: "Relax and soak up the sun at a scenic beach destination.", 
    img: bannerImage || "https://www.cluburlaub.de/db_images/anlagen/1178/1178_2_20200518123139.jpg"
  },
  { 
    title: "Outdoor Adventure", 
    desc: "Escape the ordinary and embrace the thrill of nature with exciting outdoor adventures", 
    img: banner2
  },
  { 
    title: "Private Boat Rides", 
    desc: "Experience the ultimate relaxation and adventure on a private boat ride", 
    img: banner
  }
]
  

  const handleDeleteDialogOpen = (id) => {
    setDeleteProductId(id);
    setDeleteDialogOpen(true);
  };

  

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteProductId(null);
  };

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
   
  });

 

  useEffect(() => {
    // Fetch the user's profile data on load
    const token = localStorage.getItem("auth_token");
    if (token) {
      axios
        .get(`${API_ROUTE}/profile/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  const fetchNotifications = async () => {
    console.log('ud', UID)

    const token = localStorage.getItem("auth_token");
    if (!token) return; // Exit if no token found
  
    try {
      const response = await axios.get(`${API_ROUTE}get-notification/${UID}/`, {
        headers: { Authorization: `Token ${token}` }, // Pass token in headers
      });
  
      if (response.status === 200) {
        setNotifications(response.data);
        console.log("notification_data", response.data);
      }
    } catch (error) {
      console.log("notification_data error", error);
    }
  };
  
  useEffect(() => {
    if (!UID) return; // Ensure UID is available before making request
    fetchNotifications(UID, setNotifications);
  }, [UID]); // Include UID in dependency array

  const handleSave = () => {
    const token = localStorage.getItem("auth_token");
    

    if (token) {
      axios
      .put(`${API_ROUTE}/profile/`, profile, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setIsEditing(false);
        setLoading(false);
        toast.success('Your Profile was Updated Successfully!',{position:'top-center', autoClose:3000});
        setOpenPopup3(false);
        setOpenPopup2(false); 
      })
      .catch((err) => {
        console.error(err);
        toast.error("An Error occured while updating, please try again", {position:'top-left',autoClose:3000})
        alert("An error occurred while updating your profile.");
        setLoading(false);

      });
    }
  
  };
  
// Fetch and set user data
  useEffect(() => {
    const storedUserData = localStorage.getItem("user_data");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log('user_dataaaaa',userData);
      console.log('user_dataaaaa firstname',userData.user);
      setUserMail(userData.email);
      setUserName(userData.username);
      setUserID(userData.id);
    }
  }, []);

  const handleLogout = () => setOpenPopup(true);
  const handleEditProfile = () => setOpenPopup2(true);
  const handleEditProfile3 = () => setOpenPopup3(true);

  const handleLogoutConfirm = () => {
    localStorage.clear();
    navigate("/SignIn");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#dee3ed]">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-white shadow-lg p-5">
        <div className="text-center py-5">
          <img
            src={avata}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <p className="text-2xl font-semibold mt-2">{profile.first_name + ' ' + profile.last_name} </p>
          <p className="text-gray-400">{profile.email}</p>
        </div>
        <ul className="mt-4 text-gray-700">
          <li
            className={`py-3 px-4 cursor-pointer hover:bg-grey-200  rounded flex items-center ${
              activeTab === "home" && "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <FaHome className="mr-3" /> Dashboard
          </li>
          <li
            className={`py-3 px-4 cursor-pointer hover:bg-grey-200 rounded flex items-center ${
              activeTab === "profile" && "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaCog className="mr-3" /> Account Information
          </li>
          <li
            className={`py-3 px-4 cursor-pointer  rounded flex items-center ${
              activeTab === "message" && "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("message")}
          >
            <FaHome className="mr-3" /> Messages
          </li>
          <li
            className="py-3 px-4 cursor-pointer hover:bg-grey-200 rounded-full flex items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 p-8">
      {activeTab === "home" && (
  <div className="px-6 py-4">
    <h1 className="text-3xl font-extrabold mb-6 text-gray-900">
      Welcome, {profile.first_name} {profile.last_name}! 👋
    </h1>

    {/* Profile Section */}
    <div className="bg-white p-6 shadow-md rounded-lg flex items-center gap-6">
      <img
        src={avata}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
      />
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {profile.first_name} {profile.last_name}
        </h2>
        <p className="text-gray-600">{profile.email}</p>
        <button
         onClick={() => setActiveTab("profile")} 
         className="mt-3 flex items-center px-5 py-2 border border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-all">
          <Edit className="mr-2" /> Edit Profile
        </button>
      </div>
    </div>

    {/* Explore Hangout Places */}
    <div className="mt-10">
    

  <h2 className="text-3xl font-bold text-gray-900 mb-6">🌍 Explore Hangout Places</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {places.map((place, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div className="relative group">
            <img
              src={place.img}
              alt={place.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-opacity-10 rounded-t-2xl" />
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {place.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{place.desc}</p>
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => navigate("/HangoutPlaces")}
                className="w-44 flex items-center justify-center px-5 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all duration-300"
              >
                <Explore className="mr-2 h-5 w-5" /> Explore Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
</div>
    
  </div>
)}

        {activeTab === "profile" && (
          <section
            style={{
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
            }}
            className="rounded-"
          >
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Your Account Information</h2>
                <p className="text-gray-600">Update your profile details</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center mb-6">
                  <img
                    src={avata}
                    alt="Profile"
                    className="w-34 h-34 rounded-full border-2 border-gray-300 mb-4"
                  />
                  {/* <button
                    className="text-sm text-blue-600 hover:underline"
                  
                  >
                    My Profile
                  </button> */}
                </div>
                
            
                <div className="space-y-4 ">
                  <TextField
                    label="Fist Name"
                    fullWidth
                    variant="outlined"
                    value={profile.first_name } 
                    
                  />
                  <TextField
                    style={{marginTop:20}}
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                    value={profile.last_name} 
                    
                  />
                  
                  <TextField
                  style={{marginTop:20}}
                  className="mt-5"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    value={profile.email}
                  
                  />
                  <Button
                    style={{marginTop:20, backgroundColor:'#f54b02'}}
                    variant="contained"
                   
                    fullWidth
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
              {/* <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                  Registered on: <span className="font-medium">01 Jan 2025</span>
                </p>
              </div> */}
            </div>
          </section>
)}

{activeTab === "message" && (
  <section className="bg-white rounded-xl shadow-lg p-6">
  <div className="w-full bg-white rounded-xl p-5 overflow-hidden">
    <div className="text-center p-6">
      <h2 className="text-3xl font-bold text-gray-900">Messages & Notifications</h2>
    </div>

    {notification.length === 0 ? (
      <p className="text-gray-500 text-xl text-center py-8">Welcome to the Hangout! We're happy to have you here.</p>
    ) : (
      notification.map((notify_me, index) => (
        <div key={index} className="bg-white p-2 rounded-xl shadow-md mb-4 border border-gray-200">
          {/* Notification Card */}
          <div className="p-5 bg-gray-50 rounded-xl flex flex-col space-y-4">
            {/* Sender Details */}
           

            {/* Notification Content */}
            <div>
              <p className="text-lg font-bold text-gray-900">{notify_me.title}</p>
              <p className="text-gray-700 text-sm leading-relaxed">Send By: {notify_me.sender_name}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{notify_me.message}</p>
            </div>

            {/* Timestamp & Phone */}
            <div className="flex justify-between items-center text-gray-500 text-xs">
              <p>{new Date(notify_me.sent_at).toLocaleString()}</p>
              <p className="flex items-center space-x-1">
                <span role="img" aria-label="phone">📞</span>
                <span className="text-gray-700 font-medium">{notify_me.phone}</span>
              </p>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</section>

)}
      </div>
      
      
      {/* Edit Product Dialog */}
      {editProduct && (
        <Dialog open={true} onClose={() => setEditProduct(null)}>
          <DialogTitle>Edit your Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              margin="dense"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />
            <TextField
              label="Price"
              fullWidth
              margin="dense"
              value={editProduct.current_price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, current_price: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditProduct(null)}>Cancel</Button>
            <Button  color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Logout Confirmation */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to log out?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog 
            open={openPopup2} 
            onClose={() => setOpenPopup2(false)}
            sx={{ '& .MuiDialog-paper': { padding: 3, borderRadius: 2, minWidth: 400 } }}
          >
            <DialogTitle sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
              Edit Profile
            </DialogTitle>
            
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', mb: 1 }}>
                Fill in all the fields to update your profile
              </Typography>

              <TextField
                label="Full Name"
                fullWidth
                variant="outlined"
                value={profile.first_name}
                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
              />
              <TextField
                label="Full Name"
                fullWidth
                variant="outlined"
                value={profile.last_name}
                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
              />

              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-between', paddingX: 3, paddingBottom: 2 }}>
              <Button onClick={() => setOpenPopup2(false)} variant="outlined" color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSave} variant="contained" color="success">
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
       <ToastContainer />
    </div>
    
  );
};

export default UserDashboard;

