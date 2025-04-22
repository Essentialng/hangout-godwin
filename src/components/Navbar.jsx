import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/hangout.png";
import Avatar from "../assets/images (7).png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignin = () => navigate("/Signin");

  const handleSignout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const dashboard = () => navigate("/Userdasboard");
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { key: "nav.home", path: "/" },
    { key: "nav.hangout", path: "/HangoutPlaces" },
    { key: "nav.lovers", path: "/loversPlaces" },
    { key: "nav.live", path: "/Live" },
    { key: "nav.showcase", path: "/HangoutShowcase" },
    { key: "nav.golive", path: "/Golive" },
    { key: "nav.business", path: "/PostEvent" },
  ];

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <nav className="bg-yellow-500 relative z-50">
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
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-2">
          <select
            onChange={handleLanguageChange}
            className="bg-white text-gray-700 p-1 rounded-md"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
          </select>

          {isLoggedIn ? (
            <div className="relative group cursor-pointer">
              <img
                onClick={dashboard}
                src={Avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            </div>
          ) : (
            <button
              onClick={handleSignin}
              className="bg-black text-white px-4 py-2 rounded"
            >
              {t("nav.signin")}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
      {isOpen && (
  <motion.ul
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="md:hidden flex flex-col space-y-4 bg-yellow-400 rounded-b-xl shadow-lg px-6 py-6"
  >
    {navLinks.map((link, index) => (
      <li key={index}>
        <a
          href={link.path}
          className="block text-red-700 font-semibold text-lg hover:text-red-900 transition duration-300"
          onClick={() => setIsOpen(false)}
        >
          {t(link.key)}
        </a>
      </li>
    ))}

    <li className="pt-2">
      <label className="text-gray-700 font-medium text-sm mb-1 block">🌐 {t("nav.language")}</label>
      <select
        onChange={handleLanguageChange}
        className="w-full bg-white text-gray-700 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
      </select>
    </li>

    <li className="pt-4">
      {isLoggedIn ? (
        <div
          onClick={dashboard}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <img
            src={Avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <span className="text-gray-800 font-medium">Dashboard</span>
        </div>
      ) : (
        <button
          onClick={handleSignin}
          className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          {t("nav.signin")}
        </button>
      )}
    </li>
  </motion.ul>
)}

      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
