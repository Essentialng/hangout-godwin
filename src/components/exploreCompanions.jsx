import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Star, 
  Shield,
  ChevronRight,
  Loader,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExploreCompanions = () => {
  const [companions, setCompanions] = useState([]);
  const [filteredCompanions, setFilteredCompanions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All Companions", icon: <Users size={18} /> },
    { id: "travel", name: "Travel Buddies", icon: <Users size={18} /> },
    { id: "dining", name: "Dining Partners", icon: <Users size={18} /> },
    { id: "adventure", name: "Adventure", icon: <Users size={18} /> },
    { id: "events", name: "Event Goers", icon: <Users size={18} /> },
    { id: "photography", name: "Photography", icon: <Users size={18} /> },
    { id: "music", name: "Music Lovers", icon: <Users size={18} /> }
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
          name: "Amara Okafor",
          age: 28,
          location: "Lagos, Nigeria",
          bio: "Adventure seeker and food lover. Looking for travel companions to explore hidden gems across Nigeria.",
          interests: ["Travel", "Photography", "Hiking", "Food"],
          rating: 4.9,
          totalTrips: 24,
          languages: ["English", "Igbo", "Yoruba"],
          avatar: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Amara_La_Negra_Dec_2018.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
          coverImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600",
          category: "travel",
          companionWebsite: "https://example.com/amara",
          availability: "Available",
          responseTime: "< 1 hour",
          verified: true,
          pricePerDay: 45000,
          reviews: 156
        },
        {
          id: 2,
          name: "Chidi Okonkwo",
          age: 32,
          location: "Abuja, Nigeria",
          bio: "Tech enthusiast who loves hiking and exploring new cultures. Let's create memories together.",
          interests: ["Technology", "Hiking", "Photography", "Culture"],
          rating: 4.8,
          totalTrips: 18,
          languages: ["English", "Igbo", "Hausa"],
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          coverImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600",
          category: "adventure",
          companionWebsite: "https://example.com/chidi",
          availability: "Available",
          responseTime: "< 2 hours",
          verified: true,
          pricePerDay: 35000,
          reviews: 98
        },
        {
          id: 3,
          name: "Ngozi Eze",
          age: 26,
          location: "Port Harcourt, Nigeria",
          bio: "Foodie and art lover. Join me for tours and museum visits across Nigeria.",
          interests: ["Food", "Art", "Music", "History"],
          rating: 5.0,
          totalTrips: 32,
          languages: ["English", "Igbo", "French"],
          avatar: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=150",
          coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600",
          category: "dining",
          companionWebsite: "https://example.com/ngozi",
          availability: "Booked",
          responseTime: "< 30 min",
          verified: true,
          pricePerDay: 50000,
          reviews: 203
        },
        {
          id: 4,
          name: "Tunde Adeyemi",
          age: 35,
          location: "Ibadan, Nigeria",
          bio: "Professional photographer offering guided tours to the most photogenic spots in Nigeria.",
          interests: ["Photography", "Technology", "Culture", "Food"],
          rating: 4.9,
          totalTrips: 45,
          languages: ["English", "Yoruba"],
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
          coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
          category: "photography",
          companionWebsite: "https://example.com/tunde",
          availability: "Available",
          responseTime: "< 1 hour",
          verified: true,
          pricePerDay: 55000,
          reviews: 312
        },
        {
          id: 5,
          name: "Zainab Abdullah",
          age: 29,
          location: "Kano, Nigeria",
          bio: "Music festival enthusiast looking for concert buddies and music event partners.",
          interests: ["Music", "Events", "Dancing", "Socializing"],
          rating: 4.7,
          totalTrips: 15,
          languages: ["English", "Hausa", "Arabic"],
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
          coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
          category: "music",
          companionWebsite: "https://example.com/zainab",
          availability: "Available",
          responseTime: "< 2 hours",
          verified: false,
          pricePerDay: 30000,
          reviews: 67
        },
        {
          id: 6,
          name: "Emeka Nwosu",
          age: 31,
          location: "Enugu, Nigeria",
          bio: "Extreme sports lover. Surfing, hiking, and adventure - let's do it all across Nigeria.",
          interests: ["Adventure", "Sports", "Nature", "Fitness"],
          rating: 4.9,
          totalTrips: 28,
          languages: ["English", "Igbo"],
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
          coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
          category: "adventure",
          companionWebsite: "https://example.com/emeka",
          availability: "Available",
          responseTime: "< 1 hour",
          verified: true,
          pricePerDay: 48000,
          reviews: 178
        },
        {
          id: 7,
          name: "Chioma Obi",
          age: 27,
          location: "Lagos, Nigeria",
          bio: "Luxury travel curator offering exclusive dining experiences and city tours across Nigeria.",
          interests: ["Luxury", "Food", "Shopping", "Architecture"],
          rating: 5.0,
          totalTrips: 22,
          languages: ["English", "Igbo", "Yoruba"],
          avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150",
          coverImage: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600",
          category: "travel",
          companionWebsite: "https://example.com/chioma",
          availability: "Booked",
          responseTime: "< 30 min",
          verified: true,
          pricePerDay: 65000,
          reviews: 245
        },
        {
          id: 8,
          name: "Oluwaseun Adebayo",
          age: 33,
          location: "Lagos, Nigeria",
          bio: "Wildlife photographer and nature guide exploring the beauty of Nigeria's landscapes.",
          interests: ["Photography", "Nature", "Wildlife", "Adventure"],
          rating: 4.9,
          totalTrips: 38,
          languages: ["English", "Yoruba"],
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
          category: "photography",
          companionWebsite: "https://example.com/oluwaseun",
          availability: "Available",
          responseTime: "< 1 hour",
          verified: true,
          pricePerDay: 52000,
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
    hidden: { opacity: 0, y: 20 },
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

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const CategoryButton = ({ category }) => {
    const isActive = selectedCategory === category.id;
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedCategory(category.id)}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 ${
          isActive
            ? "bg-[#ff5e08] text-white shadow"
            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
        }`}
      >
        {category.icon}
        {category.name}
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#ff5e08] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Explore Companions
          </h1>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto">
            Connect with companions and make your journeys unforgettable
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <CategoryButton key={category.id} category={category} />
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader size={40} className="text-[#ff5e08]" />
            </motion.div>
          </div>
        ) : (
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
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition"
                  onMouseEnter={() => setHoveredCard(companion.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={companion.coverImage}
                      alt={companion.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {companion.verified && (
                      <div className="absolute top-3 left-3 bg-[#ffffff] text-black px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                        <Shield size={12} />
                        Verified
                      </div>
                    )}
                    
                   

                    <div className="absolute -bottom-8 left-4">
                      <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-white">
                        <img
                          src={companion.avatar}
                          alt={companion.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{companion.name}</h3>
                        <p className="text-sm text-gray-500">{companion.age} years • {companion.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#ff5e08]">{formatCurrency(companion.pricePerDay)}00</p>
                        <p className="text-xs text-gray-500">per day</p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{companion.bio}</p>

                    <button
                      onClick={() => handleExploreClick(companion.companionWebsite)}
                      className="w-full mt-4 bg-[#ff5e08] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[#e85500] transition"
                    >
                      Explore Companion
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredCompanions.length === 0 && (
          <div className="text-center py-20">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No companions found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-4 text-[#ff5e08] hover:text-[#e85500] font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        <div className="mt-16 bg-[#ff5e08] rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to Start Your Journey?</h2>
          <p className="mb-4 text-orange-100">Join thousands of travelers who found their perfect companion</p>
          <button className="bg-white text-[#ff5e08] px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition">
            Become a Companion
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreCompanions;