import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Globe, 
  Star, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  Heart, 
  Shield, 
  Award,
  ChevronRight,
  Sparkles,
  Clock,
  Video,
  Coffee,
  Music,
  Camera,
  Bike,
  Plane,
  ExternalLink,
  Filter,
  Search,
  X,
  Loader
} from "lucide-react";
import axios from "axios";
import { API_ROUTE } from "../ApisConf/api_config";
import { useNavigate } from "react-router-dom";

const ExploreCompanions = () => {
  const [companions, setCompanions] = useState([]);
  const [filteredCompanions, setFilteredCompanions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

 
  const categories = [
    { id: "all", name: "All Companions", icon: <Users size={18} />, color: "from-gray-500 to-gray-600" },
    { id: "travel", name: "Travel Buddies", icon: <Plane size={18} />, color: "from-blue-500 to-cyan-500" },
    { id: "dining", name: "Dining Partners", icon: <Coffee size={18} />, color: "from-orange-500 to-red-500" },
    { id: "adventure", name: "Adventure", icon: <Bike size={18} />, color: "from-green-500 to-emerald-500" },
    { id: "events", name: "Event Goers", icon: <Calendar size={18} />, color: "from-purple-500 to-pink-500" },
    { id: "photography", name: "Photography", icon: <Camera size={18} />, color: "from-indigo-500 to-blue-500" },
    { id: "music", name: "Music Lovers", icon: <Music size={18} />, color: "from-red-500 to-orange-500" }
  ];

  useEffect(() => {
    fetchCompanions();
  }, []);

  useEffect(() => {
    filterCompanions();
  }, [selectedCategory, searchTerm, companions]);

  const fetchCompanions = async () => {
    setLoading(true);
    try {
     
      const mockCompanions = [
        {
          id: 1,
          name: "Sarah Johnson",
          age: 28,
          location: "New York, USA",
          bio: "Adventure seeker and food lover. Looking for travel companions to explore hidden gems!",
          interests: ["Travel", "Photography", "Hiking", "Food"],
          rating: 4.9,
          totalTrips: 24,
          languages: ["English", "Spanish"],
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
          coverImage: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600",
          category: "travel",
          companionWebsite: "https://example.com/sarah",
          availability: "Available",
          responseTime: "< 1 hour",
          verified: true,
          pricePerDay: 89,
          reviews: 156
        },
        {
          id: 2,
          name: "Michael Chen",
          age: 32,
          location: "San Francisco, USA",
          bio: "Tech enthusiast who loves hiking and exploring new cultures. Let's create memories together!",
          interests: ["Technology", "Hiking", "Photography", "Culture"],
          rating: 4.8,
          totalTrips: 18,
          languages: ["English", "Mandarin"],
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
          category: "adventure",
          companionWebsite: "https://example.com/michael",
          availability: "Available",
          responseTime: "< 2 hours",
          verified: true,
          pricePerDay: 75,
          reviews: 98
        },
        {
          id: 3,
          name: "Emma Rodriguez",
          age: 26,
          location: "Barcelona, Spain",
          bio: "Foodie and art lover. Join me for tapas tours and museum visits around Europe!",
          interests: ["Food", "Art", "Music", "History"],
          rating: 5.0,
          totalTrips: 32,
          languages: ["English", "Spanish", "French"],
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          coverImage: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600",
          category: "dining",
          companionWebsite: "https://example.com/emma",
          availability: "Booked",
          responseTime: "< 30 min",
          verified: true,
          pricePerDay: 95,
          reviews: 203
        },
        {
          id: 4,
          name: "David Kim",
          age: 35,
          location: "Tokyo, Japan",
          bio: "Professional photographer offering guided tours to the most instagrammable spots in Tokyo!",
          interests: ["Photography", "Technology", "Culture", "Food"],
          rating: 4.9,
          totalTrips: 45,
          languages: ["English", "Japanese"],
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
          coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600",
          category: "photography",
          companionWebsite: "https://example.com/david",
          availability: "Available",
          responseTime: "< 1 hour",
          verified: true,
          pricePerDay: 120,
          reviews: 312
        },
        {
          id: 5,
          name: "Lisa Thompson",
          age: 29,
          location: "London, UK",
          bio: "Music festival enthusiast! Looking for concert buddies and music event partners.",
          interests: ["Music", "Events", "Dancing", "Socializing"],
          rating: 4.7,
          totalTrips: 15,
          languages: ["English"],
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
          coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600",
          category: "music",
          companionWebsite: "https://example.com/lisa",
          availability: "Available",
          responseTime: "< 2 hours",
          verified: false,
          pricePerDay: 65,
          reviews: 67
        },
        {
          id: 6,
          name: "James Wilson",
          age: 31,
          location: "Sydney, Australia",
          bio: "Extreme sports lover. Surfing, skydiving, bungee jumping - let's do it all!",
          interests: ["Adventure", "Sports", "Nature", "Fitness"],
          rating: 4.9,
          totalTrips: 28,
          languages: ["English"],
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
          category: "adventure",
          companionWebsite: "https://example.com/james",
          availability: "Available",
          responseTime: "< 1 hour",
          verified: true,
          pricePerDay: 110,
          reviews: 178
        },
        {
          id: 7,
          name: "Sofia Patel",
          age: 27,
          location: "Dubai, UAE",
          bio: "Luxury travel curator. Join me for exclusive dining experiences and city tours.",
          interests: ["Luxury", "Food", "Shopping", "Architecture"],
          rating: 5.0,
          totalTrips: 22,
          languages: ["English", "Hindi", "Arabic"],
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
          coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
          category: "travel",
          companionWebsite: "https://example.com/sofia",
          availability: "Booked",
          responseTime: "< 30 min",
          verified: true,
          pricePerDay: 150,
          reviews: 245
        },
        {
          id: 8,
          name: "Marcus Brown",
          age: 33,
          location: "Cape Town, South Africa",
          bio: "Wildlife photographer and nature guide. Let's explore the beauty of Africa together!",
          interests: ["Photography", "Nature", "Wildlife", "Adventure"],
          rating: 4.9,
          totalTrips: 38,
          languages: ["English", "Afrikaans"],
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
          coverImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600",
          category: "photography",
          companionWebsite: "https://example.com/marcus",
          availability: "Available",
          responseTime: "< 1 hour",
          verified: true,
          pricePerDay: 130,
          reviews: 289
        }
      ];

      setTimeout(() => {
        setCompanions(mockCompanions);
        setFilteredCompanions(mockCompanions);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching companions:", error);
      setLoading(false);
    }
  };

  const filterCompanions = () => {
    let filtered = companions;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(companion => companion.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(companion =>
        companion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        companion.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        companion.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        companion.interests.some(interest => 
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredCompanions(filtered);
  };

  const handleExploreClick = (companionWebsite) => {
    window.open(companionWebsite, '_blank', 'noopener,noreferrer');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const CategoryButton = ({ category }) => {
    const isActive = selectedCategory === category.id;
    return (
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedCategory(category.id)}
        className={`relative px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
          isActive
            ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
        }`}
      >
        {category.icon}
        {category.name}
        {isActive && (
          <motion.div
            layoutId="activeCategory"
            className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white"
      >
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 bg-cover bg-bottom"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22%3E%3Cpath fill=%22%23ffffff%22 fill-opacity=%220.1%22 d=%22M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z%22%3E%3C/path%3E%3C/svg%3E")'
            }}
          ></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
         
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Explore Companions
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
          >
            Connect with amazing companions and make your journeys unforgettable
          </motion.p>
         
        </div>
        
        {/* Animated wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,69.3C672,64,768,64,864,69.3C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
        {/* manin =======*/}
         {/* Main Content */}
      <div style={{marginTop:-90}} className="max-w-7xl mx-auto">
        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
         
          
        
        </motion.div>

        {/* Results Count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-gray-600"
        >
         
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader size={48} className="text-purple-600" />
            </motion.div>
          </div>
        ) : (
          /* Companions Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredCompanions.map((companion) => (
                <motion.div
                  key={companion.id}
                  variants={cardVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  onMouseEnter={() => setHoveredCard(companion.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                 
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={companion.coverImage}
                      alt={companion.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    
                    {companion.verified && (
                      <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                        <Shield size={12} />
                        Verified
                      </div>
                    )}
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      {companion.rating}
                    </div>

                    {/* Avatar */}
                    <div className="absolute -bottom-8 left-4 mb-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-white"
                      >
                        <img
                          src={companion.avatar}
                          alt={companion.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-10 p-5">
                    {/* Name and Age */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{companion.name}</h3>
                        <p className="text-sm text-gray-500">{companion.age} years • {companion.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">${companion.pricePerDay}</p>
                        <p className="text-xs text-gray-500">per day</p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 text-sm mt-3 line-clamp-2">{companion.bio}</p>

                   

                   

                    {/* Explore Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleExploreClick(companion.companionWebsite)}
                      className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                    >
                      Explore Companion
                      <ExternalLink size={16} />
                    </motion.button>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    initial={false}
                    animate={{ opacity: hoveredCard === companion.id ? 0.1 : 0 }}
                    style={{
                      background: "radial-gradient(circle at center, rgba(139,92,246,0.3), transparent)"
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredCompanions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No companions found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-4 text-purple-600 hover:text-purple-700 font-semibold"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

       

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-6 text-white/90">Join thousands of travelers who found their perfect companion</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg"
          >
            Become a Companion
            <ChevronRight size={18} />
          </motion.button>
        </motion.div>
      </div>
      </motion.div>

     
    </div>
  );
};

export default ExploreCompanions;