// import React, { useState } from "react";
// import WelcomeModal from "../components/welcomeModal";
// import Hero from '../components/hero';
// import EssentialBrand from '../components/essentialBrand';
// import Herro2 from '../components/herro2';
// import NewListing from '../components/newListing';
// import FunPlace from '../components/funPlace';
// import LiveEvent from '../components/liveEvent';
// import KidShow from '../components/kidShow';
// import MostVisitedHotel from '../components/mostVisitedHotel';
// import Gym from '../components/gym';
// import ServiceProviders from '../components/serviceProviders';
// import VenueBanner from '../components/venueBanner';
// import EventTickets from '../components/eventTicket';
// import EventBanner from '../components/eventBanner';
// import EssentialListBrand from '../components/essentialListBrand';
// import HotelsNewListing from '../pages/hotelsNewListing';
// import HappeningNow from "./happening_now_events";
// import Ads from '../pages/adsEvent';
// import Evenue from '../components/evenue';
// import Efood from '../components/efood';
// import EDrinkPage from "../components/edrinks";
// import { useTranslation } from "react-i18next";



// const Home = () => {
//   const { t } = useTranslation();

//   const [showModal, setShowModal] = useState(true);

//   return (
//     <div>
//       {/* {showModal && <WelcomeModal onClose={() => setShowModal(false)} />} */}
      
//       <Hero/>
//       <EssentialBrand/> 
 
     
//       <div className="text-center py-10 px-4 sm:px-6">
//       <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-snug">
//         {t("home.heading")} <span className="text-orange-500 text-7xl md:text-8xl font-black italic tracking-wide">e</span>, {t("home.subheading")}
//       </h2>
//       <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
//         {t("home.description")}
//       </p>
//         {/* <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-500 max-w-3xl mx-auto px-2 sm:px-4">
//           Experience a new way to <strong>discover, connect, and hang out</strong> with like-minded people. From vibrant social events to exclusive gatherings, we're bringing the future of hangouts right to your fingertips. <strong>Explore. Connect. Enjoy.</strong>
//         </p> */}
//       </div>
//       <Ads />
//       <Herro2/>
  
//       <HotelsNewListing />
//       {/* <NewListing/> */}
//       <FunPlace/>
//       <LiveEvent/>
    
//       {/* <MostVisitedHotel/> */}
//       <HappeningNow />  
    
//       <KidShow/> 
//       <Gym/> 
     
//       <Efood/> 
//       <EDrinkPage/>
//       <Evenue/>
      
//       <ServiceProviders/>
     
//       <VenueBanner/>
//       <EventTickets/>
//       <EventBanner/>
//       <EssentialListBrand/>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import WelcomeModal from "../components/welcomeModal";
import Hero from '../components/hero';
import EssentialBrand from '../components/essentialBrand';
import Herro2 from '../components/herro2';
import NewListing from '../components/newListing';
import FunPlace from '../components/funPlace';
import LiveEvent from '../components/liveEvent';
import KidShow from '../components/kidShow';
import MostVisitedHotel from '../components/mostVisitedHotel';
import Gym from '../components/gym';
import ServiceProviders from '../components/serviceProviders';
import VenueBanner from '../components/venueBanner';
import EventTickets from '../components/eventTicket';
import EventBanner from '../components/eventBanner';
import EssentialListBrand from '../components/essentialListBrand';
import HotelsNewListing from '../pages/hotelsNewListing';
import HappeningNow from "./happening_now_events";
import Ads from '../pages/adsEvent';
import Evenue from '../components/evenue';
import Efood from '../components/efood';
import EDrinkPage from "../components/edrinks";
import { useTranslation } from "react-i18next";
import FloatingMessageButton from '../components/FloatingMessageButton';
import ExploreCompanions from "../components/exploreCompanions";
import Hotel from "./ehotel";

const Home = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  // Auto-detect user location on page load
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            setLocationLoading(false);
            console.log("📍 Auto-detected location:", latitude, longitude);
            
            // Store in localStorage for other pages to use
            localStorage.setItem('userLocation', JSON.stringify({ 
              lat: latitude, 
              lng: longitude,
              timestamp: Date.now()
            }));
          },
          (error) => {
            console.error("Geolocation error:", error);
            let errorMessage = "";
            
            switch(error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = "Location access denied. Some features may be limited.";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information unavailable.";
                break;
              case error.TIMEOUT:
                errorMessage = "Location request timed out.";
                break;
              default:
                errorMessage = "Unable to get your location.";
            }
            
            setLocationError(errorMessage);
            setLocationLoading(false);
            
            // Try to get cached location
            const cached = localStorage.getItem('userLocation');
            if (cached) {
              const cachedLocation = JSON.parse(cached);
              // Use cached if less than 1 hour old
              if (Date.now() - cachedLocation.timestamp < 3600000) {
                setUserLocation({ lat: cachedLocation.lat, lng: cachedLocation.lng });
                console.log("📍 Using cached location:", cachedLocation);
              }
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // Cache for 5 minutes
          }
        );
      } else {
        setLocationError("Geolocation is not supported by your browser.");
        setLocationLoading(false);
      }
    };

    // Small delay to ensure page is loaded
    const timer = setTimeout(() => {
      getUserLocation();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Optional: Show a subtle loading indicator while getting location */}
      {locationLoading && (
        <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-3 py-1 rounded-full text-xs shadow-lg animate-pulse">
          📍 Detecting your location...
        </div>
      )}
      
      {/* Optional: Show error message if location fails */}
      {locationError && !locationLoading && (
        <div className="fixed bottom-4 right-4 z-50 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs shadow-lg">
          ⚠️ {locationError}
        </div>
      )}

      <Hero userLocation={userLocation} locationLoading={locationLoading} />
      <EssentialBrand /> 
 
      <div className="text-center py-10 px-4 sm:px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-snug">
          {t("home.heading")} <span className="text-orange-500 text-7xl md:text-8xl font-black italic tracking-wide">e</span>, {t("home.subheading")}
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
          {t("home.description")}
        </p>
      </div>
      
      <Ads />
      <Herro2 userLocation={userLocation} />
      <HotelsNewListing userLocation={userLocation} />
      <Hotel />
      <FunPlace userLocation={userLocation} />
      <LiveEvent userLocation={userLocation} />
      <HappeningNow userLocation={userLocation} />  
      <KidShow userLocation={userLocation} /> 
      <ExploreCompanions />
      <Gym userLocation={userLocation} /> 
      <Efood /> 
      <EDrinkPage />
      <Evenue />
      <ServiceProviders userLocation={userLocation} />
      <VenueBanner />
      <EventTickets />
      <EventBanner />
      <EssentialListBrand />

       <FloatingMessageButton />
    </div>
  );
};

export default Home;
