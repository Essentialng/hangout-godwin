import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import homeHero from "../assets/home_herro.png";
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
  const { t } = useTranslation();

  const navigate = useNavigate();

  // Fetch search suggestions from the backend
  const fetchSuggestions = async () => {
    if (!query) {
      alert("Please enter a search term");
      return;
    }

    try {
      const response = await fetch(`${API_ROUTE}global-search/?q=${query}`);
      const data = await response.json();
      
      // Extract relevant suggestions from API response
      const combinedSuggestions = [...data.hangout_places];

      setSuggestions(combinedSuggestions);
      setShowDropdown(combinedSuggestions.length > 0);
      console.log("Fetched suggestions:", combinedSuggestions);

    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
};

// Function to handle selection
const handleSelection = (selectedSlug) => {
    setSearchResultdata(selectedSlug);
    console.log("User selected:", selectedSlug);
};


  // Handle input change and fetch suggestions
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

    const redirect =()=>{
      if (!searchResult) {
        console.log('no search result found');}else{navigate(`/hangout/${searchResult}`);console.log('print valid result', searchResult);
      }
      
     
    }
  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion.name);
    setShowDropdown(false);
  };

  const popularsearches = [
    {
      key: 'mostsearch.Lounges', slug: 'launches',
    },
    {
      key: 'mostsearch.Restaurants', slug: 'restaurants',
    },
    {
      key: 'mostsearch.Night Clubs', slug: 'night-clubs',
    },
    {
      key: 'mostsearch.Museums', slug: 'museums',
    },
    {
      key: 'mostsearch.Beaches', slug: 'beaches',
    },
    {
      key: 'mostsearch.Shopping malls', slug: 'shopping-malls',
    },
    {
      key: 'mostsearch.Poolside', slug: 'comedey-shows',
    },
    {
      key: 'mostsearch.Bars', slug: 'bars',
    },
]
  return (
    <div
      className="relative w-full p-15 bg-cover bg-center flex flex-col items-center justify-center text-white px-4"
      style={{ backgroundImage: `url(${homeHero})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center w-full px-4 sm:px-8 lg:px-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-4xl mx-auto leading-tight">
        {t("hero.title")}{" "}
          <span className="text-yellow-400">
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
       <div>
           <p className="text-base sm:text-lg md:text-xl mt-2">
           {t("hero.description")}
        </p>

        {/* Location Dropdown */}
        <div className="mt-4 inline-block">
          <button className="bg-yellow-400 text-black px-5 py-3 rounded-md shadow-md font-medium text-sm sm:text-base">
            {t("hero.location")} ▼
          </button>
        </div>
       </div>
        {/* Search Bar with Dropdown Suggestions */}
        <div className="relative mt-6 bg-white rounded-full flex items-center w-full max-w-4xl mx-auto shadow-lg p-1">
          <input
          
            type="text"
             placeholder={t("hero.placeholder")}
            //placeholder="Seach hangout places by name or by locations... "
            className="w-full p-4 pl-6 pr-20 rounded-full outline-none text-gray-700 placeholder-gray-400 text-base sm:text-lg"
            value={query}
            onChange={handleInputChange}
          />
          <button
            // onClick={fetchSuggestions}
           onClick={redirect}
           
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-400 cursor-pointer transition-all duration-300 px-4 sm:px-6 py-3 text-white rounded-full flex items-center gap-2 shadow-md text-sm sm:text-lg"
          >
            <Search size={20} className="text-white" />
            <span className="hidden sm:inline font-medium"> {t("hero.search")}</span>
          </button>

          {/* Search Suggestions Dropdown */}
          {showDropdown && (
            <ul className="absolute left-0 top-full mt-2 w-full bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="flex flex-col p-3 transition-all duration-300 cursor-pointer hover:bg-gray-100 hover:text-orange-300"
                    
                    onClick={()=>{
                      handleSelectSuggestion(suggestion);
                      handleSelection(suggestion.slug)

                    }}
                  >
                    <span className="text-lg font-semibold text-gray-900">{suggestion.name}</span>
                    {suggestion.location && (
                      <span className="text-sm text-gray-500 mt-1">{suggestion.location}</span>
                    )}
                  </li>
                ))
              ) : (
                <li className="p-4 text-center text-gray-500">No results found</li>
              )}
            </ul>
          )}

        </div>
       
        {/* Popular Searches */}
        <div className="mt-6 text-white text-left w-full max-w-4xl mx-auto">
          <p className="text-sm sm:text-base font-medium mb-2"> {t('hero.popular')}</p>
          <div className="flex gap-3 overflow-x-auto whitespace-nowrap">

            {popularsearches.map((datalist, index) =>(
              <div key={index}>
                  
                  <h3 
                  onClick={() =>navigate(`/hangout/${datalist.slug}`)}
                   className="bg-white/20 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/30 transition-all">
                    {t(datalist.key)}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
