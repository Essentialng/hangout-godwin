import React, { useState } from "react";
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



const Home = () => {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      {/* {showModal && <WelcomeModal onClose={() => setShowModal(false)} />} */}
      
      <Hero/>
      <EssentialBrand/> 
 
     
      <div className="text-center py-10 px-4 sm:px-6">
      <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-snug">
        {t("home.heading")} <span className="text-orange-500 text-7xl md:text-8xl font-black italic tracking-wide">e</span>, {t("home.subheading")}
      </h2>
      <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
        {t("home.description")}
      </p>
        {/* <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-500 max-w-3xl mx-auto px-2 sm:px-4">
          Experience a new way to <strong>discover, connect, and hang out</strong> with like-minded people. From vibrant social events to exclusive gatherings, we're bringing the future of hangouts right to your fingertips. <strong>Explore. Connect. Enjoy.</strong>
        </p> */}
      </div>
      <Ads />
      <Herro2/>
  
      <HotelsNewListing />
      {/* <NewListing/> */}
      <FunPlace/>
      <LiveEvent/>
    
      {/* <MostVisitedHotel/> */}
      <HappeningNow />  
    
      <KidShow/> 
      <Gym/> 
     
      <Efood/> 
      <EDrinkPage/>
      <Evenue/>
      
      <ServiceProviders/>
     
      <VenueBanner/>
      <EventTickets/>
      <EventBanner/>
      <EssentialListBrand/>
    </div>
  );
};

export default Home;
