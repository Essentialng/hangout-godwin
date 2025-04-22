import { FaBuilding, FaSearch } from "react-icons/fa";
import banner2 from "../assets/evenue.jpg";
import homeHero from "../assets/overlay-white.png";

const ExploreVenues = () => {
  return (

    <div
     style={{ backgroundImage: `url(${homeHero})` }}
     className="bg-white py-16 px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
    {/* Left Text Section */}
    <div>
      <h2 className="text-4xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"> Discover Event <br/>Venues for Rent</h2>
      

      <div className="space-y-8">
          <p style={{fontSize:17}} className="text-xl text-gray-700 mb-4 p-6">
        Looking for the perfect space for your event? Whether you're planning a wedding, conference, or party, our venues offer the perfect setting. Explore now to discover spaces that can help make your event a success and unlock new revenue opportunities.
      </p>
      </div>
      <a href="">
        <button
           className="mt-6 bg-orange-600 text-white cursor-pointer hover:bg-orange-700 px-5 md:px-8 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
                  
            >
          Visit E-Venue
        </button>
      </a>
    </div>

    {/* Right Image/Stat Section */}
    <div className="gap-4">
      <img
        src={banner2}
        alt="Event 1"
        className="rounded-xl object-cover w-full "
      />
    </div>
  </div>
    
    // <div className="bg-gradient-to-r from-blue-100 to-indigo-200 py-20 px-6">
    //   {/* Section Title */}
    //   <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
    //     Explore Venues to Rent for Your Event
    //   </h1>
      
    //   {/* Description */}
    //   <p className="text-xl text-gray-700 text-center mb-12">
    //     Looking for the perfect space for your event? Whether you're planning a wedding, conference, or party, our venues offer the perfect setting. Explore now to discover spaces that can help make your event a success and unlock new revenue opportunities.
    //   </p>

    //   {/* CTA Buttons */}
    //   <div className="flex justify-center gap-6 mb-16">
    //     <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 transition-all">
    //       <FaSearch className="mr-2" /> Explore Venues
    //     </button>
    //     <button className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all">
    //       <FaBuilding className="mr-2" /> List Your Venue
    //     </button>
    //   </div>

    //   {/* Featured Venues Section */}
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    //     {/* Example Venue Cards */}
    //     {[1, 2, 3].map((_, index) => (
    //       <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-all">
    //         {/* Venue Image */}
    //         <div className="h-48 bg-gray-300 rounded-lg overflow-hidden mb-6">
    //           <img
    //             src={`https://source.unsplash.com/random/800x600?venue,events`}
    //             alt="Venue"
    //             className="w-full h-full object-cover"
    //           />
    //         </div>

    //         {/* Venue Details */}
    //         <h3 className="text-xl font-semibold text-gray-800 mb-2">Luxury Hall for Weddings</h3>
    //         <p className="text-gray-600 text-sm mb-4">Capacity: 500 guests | Location: Downtown</p>

    //         {/* CTA Button */}
    //         <button className="bg-orange-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-500 transition-all w-full">
    //           Check Details
    //         </button>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default ExploreVenues;
