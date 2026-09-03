import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  Verified, 
  Sparkles, 
  Users, 
  Loader,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  ArrowRight
} from "lucide-react";
import axios from "axios";

const HangoutPartnerFinder = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);

  // Rotating text words
  const rotatingWords = [
    "Soulmate",
    "Adventure Buddy",
    "Dinner Date",
    "Travel Partner",
    "Movie Mate",
    "Gym Partner",
    "Coffee Lover",
    "Dance Partner",
    "Study Buddy",
    "Foodie Friend",
    "Concert Goer",
    "Beach Buddy"
  ];

  const [wordIndex, setWordIndex] = useState(0);

  // Rotating text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Fetch profiles from API
  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.edate.ng/api/discover/global/?category=all&offset=0&limit=50&gender=all&min_age=18&max_age=99'
      );
      
      if (response.data && response.data.results) {
        const validProfiles = response.data.results.filter(profile => 
          profile.profile_image && 
          (profile.full_name || profile.nick_name || profile.username)
        );
        setProfiles(validProfiles);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isAutoPlaying && profiles.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === profiles.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, profiles.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === profiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openProfileModal = (profile) => {
    setSelectedProfile(profile);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProfileModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setSelectedProfile(null);
  };

  // Get visible profiles (current + 2 on each side)
  const getVisibleProfiles = () => {
    if (profiles.length === 0) return [];
    
    const visible = [];
    const total = profiles.length;
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + total) % total;
      visible.push({
        ...profiles[index],
        position: i,
        isActive: i === 0
      });
    }
    return visible;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 rounded-3xl">
        <Loader className="animate-spin text-pink-500" size={48} />
        <p className="mt-4 text-gray-600 font-medium">Finding amazing people...</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="py-20 text-center bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 rounded-3xl">
        <Users size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500">No profiles available at the moment.</p>
        <p className="text-sm text-gray-400">Check back later!</p>
      </div>
    );
  }

  const visibleProfiles = getVisibleProfiles();

  return (
    <div className="w-full">
     
     {/* Section Header with Rolling Text */}
<div className="text-center mb-10">
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 flex-wrap px-4">

      <span className="whitespace-nowrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Find Your</span>
      <span className="relative inline-block min-w-[280px] sm:min-w-[220px] md:min-w-[360px] lg:min-w-[400px] text-center h-[1.4em]">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="absolute left-0 right-0 inline-block bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 bg-clip-text text-transparent font-bold whitespace-nowrap"
            style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              lineHeight: '1.4',
              display: 'inline-block',
              width: '100%',
              textAlign: 'center',
              letterSpacing: '0.5px'
            }}
          >
            {rotatingWords[wordIndex]}
          </motion.span>
        </AnimatePresence>
       
        <span 
          className="invisible font-bold whitespace-nowrap"
          style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            lineHeight: '1.4'
          }}
        >
          {rotatingWords[0]}
        </span>
      </span>
     
    </h2>
    <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto flex items-center justify-center gap-2 flex-wrap mt-3 px-4">
      <span>Connect with amazing people on E-Date.</span>
      <motion.span
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="flex items-center"
      >
        <ArrowRight size={18} className="text-pink-500" />
      </motion.span>
      <span>Chat, meet, and explore together!</span>
    </p>
  </motion.div>
</div>

      {/* Carousel Container */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden py-12 px-4 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 rounded-3xl shadow-inner"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>

        {/* Profiles Carousel */}
        <div className="flex justify-center items-center gap-4 md:gap-6 min-h-[400px]">
          {visibleProfiles.map((profile, index) => {
            const isActive = profile.isActive;
            const displayName = profile.full_name || profile.nick_name || profile.username || 'User';
            const roleDisplay = profile.role_display || profile.type || '';
            const isVerified = profile.is_verified || false;
            
            // Calculate scale and opacity based on position
            const getTransform = () => {
              const position = profile.position;
              if (position === 0) return { scale: 1, opacity: 1, zIndex: 10, translateX: 0 };
              if (Math.abs(position) === 1) return { scale: 0.85, opacity: 0.7, zIndex: 5, translateX: position * 60 };
              if (Math.abs(position) === 2) return { scale: 0.7, opacity: 0.4, zIndex: 1, translateX: position * 120 };
              return { scale: 0.5, opacity: 0, zIndex: 0, translateX: 0 };
            };

            const transform = getTransform();

            return (
              <motion.div
                key={profile.user_id || profile.id || index}
                className="absolute cursor-pointer transition-all duration-500 ease-in-out"
                style={{
                  width: '280px',
                  transform: `translateX(${transform.translateX}px) scale(${transform.scale})`,
                  opacity: transform.opacity,
                  zIndex: transform.zIndex,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                initial={false}
                animate={{
                  scale: transform.scale,
                  opacity: transform.opacity,
                  x: transform.translateX,
                }}
                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
                onClick={() => isActive && openProfileModal(profile)}
                onMouseEnter={() => setHoveredIndex(profile.user_id)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                  isActive ? 'hover:shadow-2xl hover:scale-105' : ''
                } ${isActive ? 'ring-4 ring-pink-400 ring-opacity-50' : ''}`}>
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={profile.profile_image}
                      alt={displayName}
                      className="w-full h-full object-cover transition duration-500 hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=No+Image';
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Verified Badge */}
                    {isVerified && (
                      <div className="absolute top-3 right-3 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                        <Verified size={16} />
                      </div>
                    )}
                    
                    {/* Role Badge */}
                    {roleDisplay && isActive && (
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                        {roleDisplay}
                      </div>
                    )}
                    
                    {/* Age Badge */}
                    {profile.age && isActive && (
                      <div className="absolute bottom-3 right-3 bg-pink-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg">
                        {profile.age} yrs
                      </div>
                    )}

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        Online
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-gray-900 text-base truncate">
                      {displayName}
                    </h3>
                    {profile.country && (
                      <p className="text-xs text-gray-500 truncate flex items-center justify-center gap-1 mt-0.5">
                        <MapPin size={12} />
                        {profile.country}
                      </p>
                    )}
                    {profile.bio && isActive && (
                      <p className="text-xs text-gray-400 truncate mt-1.5">
                        {profile.bio.slice(0, 40)}
                      </p>
                    )}
                    
                    {/* Interest Chips */}
                    {profile.interests && profile.interests.length > 0 && isActive && (
                      <div className="flex flex-wrap justify-center gap-1 mt-2">
                        {profile.interests.slice(0, 3).map((interest, idx) => (
                          <span key={idx} className="bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full text-[10px] font-medium">
                            {interest}
                          </span>
                        ))}
                        {profile.interests.length > 3 && (
                          <span className="text-[10px] text-gray-400">+{profile.interests.length - 3}</span>
                        )}
                      </div>
                    )}
                    
                    {/* Connect Button (only for active card) */}
                    {isActive && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openProfileModal(profile);
                        }}
                        className="mt-3 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                      >
                        <Heart size={16} />
                        Connect Now
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {profiles.slice(0, 10).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex % 10
                  ? 'w-8 h-2.5 bg-pink-500'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to profile ${index + 1}`}
            />
          ))}
          {profiles.length > 10 && (
            <span className="text-xs text-gray-400 ml-2">+{profiles.length - 10}</span>
          )}
        </div>

        {/* Profile Counter */}
        <div className="text-center mt-4 text-sm text-gray-500">
          <span className="font-semibold text-pink-600">{profiles.length}</span> amazing people waiting to connect
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-8">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://edate.ng"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle size={22} />
          Start Chatting Now
         
        </motion.a>
        <p className="text-sm text-gray-500 mt-5 mb-19">
          Join thousands of people finding meaningful connections
        </p>
      </div>

      {/* Profile Detail Modal */}
      <AnimatePresence>
        {showModal && selectedProfile && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closeProfileModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeProfileModal}
                className="absolute right-4 top-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition shadow-lg"
                style={{ position: 'sticky', float: 'right', marginTop: '12px', marginRight: '12px' }}
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Profile Image */}
              <div className="relative">
                <img
                  src={selectedProfile.profile_image}
                  alt={selectedProfile.full_name || selectedProfile.username}
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=No+Image';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Verified Badge */}
                {selectedProfile.is_verified && (
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-lg">
                    <Verified size={16} />
                    Verified
                  </div>
                )}
                
                {/* Role Badge */}
                {selectedProfile.role_display && (
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium">
                    {selectedProfile.role_display}
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedProfile.full_name || selectedProfile.nick_name || selectedProfile.username}
                    </h2>
                    {selectedProfile.age && (
                      <p className="text-gray-600">{selectedProfile.age} years old</p>
                    )}
                  </div>
                  {selectedProfile.relationship_type && (
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
                      {selectedProfile.relationship_type.replace('_', ' ')}
                    </span>
                  )}
                </div>

                {/* Location & Gender */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProfile.country && (
                    <div className="flex items-center gap-1.5 text-gray-600 text-sm bg-gray-100 px-3 py-1.5 rounded-full">
                      <MapPin size={14} />
                      {selectedProfile.country}
                    </div>
                  )}
                  {selectedProfile.gender && (
                    <div className="flex items-center gap-1.5 text-gray-600 text-sm bg-gray-100 px-3 py-1.5 rounded-full">
                      <Users size={14} />
                      {selectedProfile.gender}
                    </div>
                  )}
                  {selectedProfile.availability && (
                    <div className="flex items-center gap-1.5 text-green-600 text-sm bg-green-50 px-3 py-1.5 rounded-full">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      {selectedProfile.availability.replace('_', ' ')}
                    </div>
                  )}
                </div>

                {/* Bio */}
                {selectedProfile.bio && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">About</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{selectedProfile.bio}</p>
                  </div>
                )}

                {/* Expectations */}
                {selectedProfile.expectations && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Looking For</h3>
                    <p className="text-gray-600 text-sm">{selectedProfile.expectations}</p>
                  </div>
                )}

                {/* Interests */}
                {selectedProfile.interests && selectedProfile.interests.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.interests.map((interest, idx) => (
                        <span key={idx} className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-medium">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Connect Button */}
                <a
                  href="https://edate.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all mt-4"
                >
                  <MessageCircle size={20} />
                  Chat on E-Date
                  <Heart size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HangoutPartnerFinder;