import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/hangout.png";
import Avatar from "../assets/images (7).png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  


  useEffect(() => {
    // Check if to
    const token = localStorage.getItem("auth_token");
    console.log('token')
    console.log(token)
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  const handleSignin = () => navigate("/Signin");
  const handleSignout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    setIsLoggedIn(false);
    navigate("/");
  };

  const dashboard =()=> navigate("/Userdasboard");

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hangout Places", path: "/HangoutPlaces" },
    { name: "Lovers Place", path: "/loversPlaces" },
    { name: "Live Events", path: "/Live" },
    { name: "Showcase", path: "/HangoutShowcase" },
    { name: "Go-Live", path: "/Golive" },
    { name: "About", path: "/AboutUs" },
    { name: "For Business", path: "/PostEvent" },
  ];

  return (
    <nav className="bg-yellow-500">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src={Logo} alt="Hangout Logo" className="w-22" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-black font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.path}
                className="text-red-600 font-bold hover:text-gray-700 transition duration-300"
                style={{ fontSize: 19 }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
              <div className="relative group cursor-pointer x-50">
              <img
              onClick={dashboard}
                src={Avatar} 
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300 transition duration-300 hover:shadow-md"
              />
             
            </div>
            
          ) : (
            <button
              onClick={handleSignin}
              className="bg-white border border-black px-4 py-1 rounded-md transition duration-300 hover:bg-black hover:text-white"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-yellow-500 mt-2 p-4 space-y-3"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.path}
                className="block text-black text-lg font-medium hover:text-gray-700 transition duration-300"
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}

            {/* Mobile Profile Avatar or Login Button */}
            <div className="flex flex-col space-y-3 mt-4">
              {isLoggedIn ? (
                <button
                  onClick={handleSignout}
                  className="text-red-600 font-bold hover:underline"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleSignin}
                  className="bg-white border border-black px-4 py-2 rounded-md transition duration-300 hover:bg-black hover:text-white"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
