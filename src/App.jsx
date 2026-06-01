import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import HangoutPlaces from './pages/hangoutPlaces';
import Gym from './components/gym';
import LoversPlaces from './pages/loversPlaces';
import SearchResults from './pages/searchResults';
import Golive from './pages/go_live';
import HangoutShowcase from './pages/hangoutShowcase';
import AboutUs from './pages/aboutUs';
import LounchPage from './pages/lounchPage';
import HotelsNewListing from './pages/hotelsNewListing';
import Hotelnewlist from './pages/hotelnewlist';
import SignIn from './pages/authentications/SignIn';
import SignUp from './pages/authentications/SignUp';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Hero from './components/hero';
import Herro2 from './components/herro2';
import PostEvent from './pages/postEvent';
import ListEvent from './pages/listEvent';
import ContactUs from './pages/contactUs';
import ResetPassword from './pages/changePassword';
import Userdasboard from './pages/Userdasboard';
import ServiceProviderDetails from './pages/serviceProviderDetails';
import Hangout from './pages/hangout';
import Lovershangout from './pages/lovershangout';
import ServiceProvidersHome from './pages/serviceProvidersHome';
import HangoutOverview from './pages/hangoutOverview';
import Hangoutoverviewpiz from './pages/hangoutoverviewpiz';
import Loverplaceoverviewpiz from './pages/loverplaceoverviewpiz';
import LoversplaceOverview from './pages/loversplaceOverview';
import EssentialListBrand from './components/essentialListBrand';
import LiveEventDetails from './pages/liveEventDetails';
import LiveEventDetails2 from './pages/liveEventDetails2';
import CreateLiveEvent from './pages/createLiveEvent';
import Live from "./pages/live_event";
import TermsOfService from "./pages/termsOfService";
import HappeningNow from './pages/happening_now_events';
import Ads from './pages/adsEvent';
import AdsSub from './pages/ads_scription';
import Evenue from './components/evenue';
import Efood from './components/efood';
import EventPostSelection from './pages/eventPostSelection';
import CreateOrganizerEvent from './pages/createOrganizerEvent';
import EDrinkPage from './components/edrinks';
import './i18n'; 
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './pages/languageSwitch';
import Hotel from './pages/ehotel';
import EHotelDetail from './pages/eHotelDetail';

function App() {

  
  return (
  
<Router>
      <ConditionalHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/EDrinkPage" element={<EDrinkPage />} />
        <Route path="/AdsSub" element={<AdsSub />} />
        <Route path="/Efood" element={<Efood />} />
        <Route path="/LanguageSwitcher" element={<LanguageSwitcher />} />
        <Route path="/CreateOrganizerEvent" element={<CreateOrganizerEvent />} />
        <Route path="/EventPostSelection" element={<EventPostSelection />} />
        <Route path="/Evenue" element={<Evenue />} />
        <Route path="/live" element={<Live />} />
        <Route path="/Ads" element={<Ads />} />
        <Route path="/CreateLiveEvent" element={<CreateLiveEvent />} />
        <Route path="/HappeningNow" element={<HappeningNow />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
        <Route path="/LiveEventDetails/:slug" element={<LiveEventDetails />} />
        <Route path="/LiveEventDetails2/:slug" element={<LiveEventDetails2 />} />
        <Route path="/Hangout/:slug" element={<Hangout />} />
        <Route path="/HangoutOverview/:slug" element={<HangoutOverview />} />
        <Route path="/LoversplaceOverview/:slug" element={<LoversplaceOverview />} />
        <Route path="/EssentialListBrand" element={<EssentialListBrand />} />
        <Route path="/Lovershangout/:slug" element={<Lovershangout />} />
        <Route path="/hangoutoverviewpiz/:slug" element={<Hangoutoverviewpiz />} />
        <Route path="/loverplaceoverviewpiz/:slug" element={<Loverplaceoverviewpiz />} />
        <Route path="/HotelsNewListing" element={<HotelsNewListing />} />
        <Route path="/ServiceProviderDetails" element={<ServiceProviderDetails/>} />
        <Route path="/change-password/:uid/:token/" element={<ResetPassword />} />
        <Route path="/PostEvent" element={<PostEvent />} />
        <Route path="/Gym" element={<Gym />} />
        <Route path="/Userdasboard" element={<Userdasboard />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/HangoutShowcase" element={<HangoutShowcase />} />
        <Route path="/Golive" element={<Golive />} />
        <Route path="/LounchPage" element={<LounchPage />} />
        <Route path="/LoversPlaces" element={<LoversPlaces />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/herro2" element={<Herro2 />} />
        <Route path="/Hotelnewlist/:slug" element={<Hotelnewlist />} />
        <Route path="/SearchResults" element={<SearchResults />} />
        <Route path="/HangoutPlaces" element={<HangoutPlaces />} />
        <Route path="/ListEvent" element={<ListEvent />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/ServiceProvidersHome" element={<ServiceProvidersHome />} />
        <Route path="/ServiceProviderDetails/:slug" element={<ServiceProviderDetails />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/HotelDetail" element={<EHotelDetail />} />
      </Routes>
      <Footer />
    </Router>


    
  );
}

function ConditionalHeader() {
  const location = useLocation();

  // List of routes where the header should be hidden
  const hideHeaderRoutes = ['/signin', '/signup', '/forgotpassword'];

  if (hideHeaderRoutes.includes(location.pathname.toLowerCase())) {
    return null;
  }

  return <Navbar />;
}

export default App;
