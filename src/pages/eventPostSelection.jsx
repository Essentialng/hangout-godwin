import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customUserImg from '../assets/FeaturedImage_650x400_illustration01.png';
import customUserImg1 from '../assets/1680968943_kartinki-pibig-info-p-marketolog-kartinki-dlya-prezentatsii-arti-78.png';

const EventSelect = () => {
  const navigate = useNavigate();

  const handleCustomEventClick = () => {
    window.scrollTo(0,0)
    navigate("/CreateLiveEvent");
  };

  const handleOrganizerEventClick = () => {
    window.scrollTo(0,0)
    navigate("/CreateOrganizerEvent");
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-blue-100 to-purple-100">

      <div className="max-w-6xl mx-auto p-8 md:p-16 rounded-3xl shadow-2xl bg-white mb-20">
        <h2 className="text-5xl text-center font-extrabold text-gray-900 mb-8">
          Post Your Event and Boost Your Reach
        </h2>

        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-12 text-lg">
          Choose the appropriate option to post your event:
          <br />
          - **Free Event**: Post your event as a custom user without any charge.
          <br />
          - **Organizer Event**: If you're an organizer, get more visibility and features by posting your event on the premium platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          
          {/* Custom User - Free Event */}
          <div
            onClick={handleCustomEventClick}
            className="cursor-pointer border border-gray-300 rounded-3xl bg-white p-8 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.03]">
            
            {/* Custom User Image */}
            <img 
              src={customUserImg} 
              alt="Custom User Event" 
              className="w-full h-48 object-cover rounded-t-3xl mb-6" 
            />

            <div className="text-center mb-6">
              <span className="block text-sm text-gray-500 uppercase tracking-widest">Post as Custom User</span>
              <span className="block text-4xl font-extrabold text-blue-600 mt-2">Free</span>
            </div>
            <p className="text-gray-700 text-center text-base mb-6">
              As a custom user, you can post your event free of charge. Enjoy a no-cost option to promote your event and get the word out!
            </p>
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-2xl font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300">
              🚀 Post Free Event
            </button>
          </div>

          {/* Organizer - Premium Event */}
          <div
            onClick={handleOrganizerEventClick}
            className="cursor-pointer border border-gray-300 rounded-3xl bg-white p-8 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.03] relative">
            
            {/* Organizer Image */}
            <img 
              src={customUserImg1}
              alt="Organizer Event" 
              className="w-full h-48 object-cover rounded-t-3xl mb-6" 
            />

            <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-bl-xl uppercase tracking-wide">
              Recommended
            </span>
            <div className="text-center mb-6">
              <span className="block text-sm text-gray-500 uppercase tracking-widest">Post as Organizer</span>
              <span className="block text-4xl font-extrabold text-blue-600 mt-2">Organizer</span>
            </div>
            <p className="text-gray-700 text-center text-base mb-6">
              Organizers can post events with enhanced visibility and premium features. Get your event to a wider audience with powerful tools.
            </p>
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-2xl font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300">
              🌟 Post Organizer Event
            </button>
          </div>
        </div>
      </div>

      {/* Optional Information Section */}
      <div className="text-center max-w-4xl mx-auto p-8 rounded-3xl mb-12">
  <h3 className="text-5xl font-bold text-gray-800 mb-6">Why Post Your Event with Us?</h3>
  <p className="text-gray-700 text-lg mb-8">
    By posting your event on our platform, you gain access to a large audience. Whether you're hosting a local event or a large conference, our platform helps you reach people who are actively looking for exciting events to attend.
  </p>
  
  {/* List of Benefits */}
  <div className="flex flex-wrap justify-center gap-12 mb-8">
    {/* Benefit 1 */}
    <div className="flex items-center space-x-3 max-w-sm">
      <span className="text-4xl">💥</span>
      <span className="text-lg text-gray-600">Increased exposure for your event</span>
    </div>
    
    {/* Benefit 2 */}
    <div className="flex items-center space-x-3 max-w-sm">
      <span className="text-4xl">🔍</span>
      <span className="text-lg text-gray-600">Easy-to-use platform for fast event creation</span>
    </div>
    
    {/* Benefit 3 */}
    <div className="flex items-center space-x-3 max-w-sm">
      <span className="text-4xl">🚀</span>
      <span className="text-lg text-gray-600">Premium features for organizers to boost visibility</span>
    </div>
    
    
    <div className="flex items-center  space-x-3 max-w-sm">
      <span className="text-4xl">📅</span>
      <span className="text-lg text-gray-600">Flexible event scheduling and management tools</span>
    </div>
    
   
    <div className="flex items-center space-x-3 max-w-sm">
      <span className="text-4xl">📈</span>
      <span className="text-lg text-gray-600">Advanced analytics for tracking your event's success</span>
    </div>
  </div>
</div>


      <div className="mt-10"></div>
    </div>
  );
};

export default EventSelect;
