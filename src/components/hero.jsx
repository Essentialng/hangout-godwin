
import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import homeHero from "../assets/maxresdefault888.jpg";
import homeHero2 from "../assets/e-hangout_2.png"; 
import homeHero3 from "../assets/y2O4cqtylhP8.png"; 
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_ROUTE } from "../ApisConf/api_config";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const [location, setLocation] = useState("Nigeria");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResult, setSearchResultdata] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  
  const slides = [
    { image: homeHero, title: "Discover Amazing Places", subtitle: "Find the best hangout spots in your city" },
    { image: homeHero2, title: "Night Life & Entertainment", subtitle: "Experience the vibrant night culture" },
    { image: homeHero3, title: "Food & Dining", subtitle: "Explore top-rated restaurants and cafes" },
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const fetchSuggestions = async () => {
    if (!query) {
      alert("Please enter a search term");
      return;
    }

    try {
      const response = await fetch(`${API_ROUTE}global-search/?q=${query}`);
      const data = await response.json();
      
      const combinedSuggestions = [...data.hangout_places];

      setSuggestions(combinedSuggestions);
      setShowDropdown(combinedSuggestions.length > 0);
      console.log("Fetched suggestions:", combinedSuggestions);

    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const handleSelection = (selectedSlug) => {
    setSearchResultdata(selectedSlug);
    console.log("User selected:", selectedSlug);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 2) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const redirect = () => {
    if (!searchResult) {
      console.log('no search result found');
    } else {
      navigate(`/hangout/${searchResult}`);
      console.log('print valid result', searchResult);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion.name);
    setShowDropdown(false);
  };

  const popularsearches = [
    { key: 'mostsearch.Lounges', slug: 'Lounges' },
    { key: 'mostsearch.Restaurants', slug: 'restaurants' },
    { key: 'mostsearch.Night Clubs', slug: 'night-clubs' },
    { key: 'mostsearch.Museums', slug: 'museums' },
    { key: 'mostsearch.Beaches', slug: 'beaches' },
    { key: 'mostsearch.Shopping malls', slug: 'shopping-malls' },
    { key: 'mostsearch.Poolside', slug: 'comedey-shows' },
    { key: 'mostsearch.Bars', slug: 'bars' },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Slides Container =============*/}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-110'
            }`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: `scale(${currentSlide === index ? '1' : '1.1'})`,
              transition: 'transform 8s ease-out, opacity 1s ease-in-out',
            }}
          >
          
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            
            <div className={`absolute bottom-20 left-0 right-0 text-center transform transition-all duration-700 delay-300 ${
              currentSlide === index 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            }`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-200">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

    
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
        <div className="text-center w-full max-w-6xl mx-auto">
         
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl mx-auto leading-tight text-white drop-shadow-2xl">
              {t("hero.title")}{" "}
              <span className="text-yellow-400 inline-block">
                <Typewriter
                  words={t("hero.typed", { returnObjects: true })}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={60}
                  delaySpeed={2000}
                />
              </span>
            </h1>
          </div>

          <div className="animate-fade-in-up animation-delay-200">
            <p className="text-base sm:text-lg md:text-xl mt-4 text-white/90 drop-shadow-lg">
              {t("hero.description")}
            </p>

            {/* Location Dropdown ======================*/}
            <div className="mt-6 inline-block">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full shadow-lg font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105">
                {t("hero.location")} 
              </button>
            </div>
          </div>

         
          <div className="animate-fade-in-up animation-delay-400 relative mt-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center w-full max-w-3xl mx-auto shadow-2xl p-1 hover:shadow-xl transition-shadow duration-300">
            <input
              type="text"
              placeholder={t("hero.placeholder")}
              className="w-full p-4 pl-6 pr-20 rounded-full outline-none text-gray-700 placeholder-gray-400 text-base sm:text-lg bg-transparent"
              value={query}
              onChange={handleInputChange}
            />
            <button
              onClick={redirect}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 cursor-pointer transition-all duration-300 px-5 sm:px-7 py-3 text-white rounded-full flex items-center gap-2 shadow-lg transform hover:scale-105"
            >
              <Search size={20} className="text-white" />
              <span className="hidden sm:inline font-medium">{t("hero.search")}</span>
            </button>

            {/* Search Suggestions Dropdown */}
            {showDropdown && (
              <ul className="absolute left-0 top-full mt-3 w-full bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-80 overflow-y-auto z-50 animate-slide-down">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, idx) => (
                    <li
                      key={suggestion.id}
                      className="flex flex-col p-4 transition-all duration-300 cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 group"
                      onClick={() => {
                        handleSelectSuggestion(suggestion);
                        handleSelection(suggestion.slug);
                      }}
                    >
                      <span className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {suggestion.name}
                      </span>
                      {suggestion.location && (
                        <span className="text-sm text-gray-500 mt-1">{suggestion.location}</span>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="p-5 text-center text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

    
          <div className="animate-fade-in-up animation-delay-600 mt-8 text-white">
            <p className="text-sm sm:text-base font-medium mb-3 text-white/90">
              {t('hero.popular')}
            </p>
            <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-2 justify-center flex-wrap">
              {popularsearches.map((datalist, index) => (
                <div key={index}>
                  <h3 
                    onClick={() => navigate(`/hangout/${datalist.slug}`)}
                    className="bg-white/20 backdrop-blur-sm cursor-pointer text-white px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-white/30 hover:scale-105 transition-all duration-300 text-sm font-medium"
                  >
                    {t(datalist.key)}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsAnimating(false);
              }, 300);
            }}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index 
                ? 'w-10 h-2.5 bg-yellow-400 shadow-lg' 
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Previous/Next Buttons */}
      <button
        onClick={() => {
          setIsAnimating(true);
          setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setIsAnimating(false);
          }, 300);
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => {
          setIsAnimating(true);
          setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setIsAnimating(false);
          }, 300);
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
