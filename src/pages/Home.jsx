import React, { useState } from "react";
import WelcomeModal from "../components/welcomeModal"; // Import the popup component
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

const Home = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      {/* {showModal && <WelcomeModal onClose={() => setShowModal(false)} />} */}
      
      <Hero/>
      <EssentialBrand/>
      <Herro2/>
      <HotelsNewListing />
      {/* <NewListing/> */}
      <FunPlace/>
      <LiveEvent/>
    
      {/* <MostVisitedHotel/> */}
      <HappeningNow />  
    
      <KidShow/> 
      <Gym/>
      <ServiceProviders/>
      <VenueBanner/>
      <EventTickets/>
      <EventBanner/>
      <EssentialListBrand/>
    </div>
  );
};

export default Home;
