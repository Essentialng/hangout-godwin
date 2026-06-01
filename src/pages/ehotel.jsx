// import React, { useState, useEffect } from 'react';
// import HotelDetail from './eHotelDetail'

// const Hotel = () => {
//   const [allHotels, setAllHotels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedHotelId, setSelectedHotelId] = useState(null);

//   const API_URL = 'https://backend.ehotels.ng/api/lists/hotels';

//   useEffect(() => {
//     fetchAllHotels();
//   }, []);

//   const fetchAllHotels = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Fetch first page to get total pages
//       const firstResponse = await fetch(`${API_URL}?per_page=6&page=1`);
//       if (!firstResponse.ok) {
//         throw new Error(`HTTP error! status: ${firstResponse.status}`);
//       }
//       const firstData = await firstResponse.json();
//       const totalPages = firstData.meta?.total_pages || 1;
      
//       // Fetch all pages
//       const allPromises = [];
//       for (let page = 1; page <= totalPages; page++) {
//         allPromises.push(fetch(`${API_URL}?per_page=6&page=${page}`).then(res => res.json()));
//       }
      
//       const allData = await Promise.all(allPromises);
      
//       // Combine all hotels from all pages
//       let allHotelsData = [];
//       allData.forEach(data => {
//         if (data.data && Array.isArray(data.data)) {
//           allHotelsData = [...allHotelsData, ...data.data];
//         }
//       });
      
//       // Filter to only show short stay properties
//       const shortStayHotels = allHotelsData.filter(
//         hotel => hotel.property_type === 'e-short_stay'
//       );
      
//       setAllHotels(shortStayHotels);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching hotels:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to calculate distance and travel time based on address
//   const getNearbyInfo = (address) => {
//     // Extract location keywords from address
//     const locationKeywords = address?.toLowerCase() || '';
    
//     // Define nearby landmarks and their distances in Lagos
//     const landmarks = [
//       { name: 'MMIA Airport', keywords: ['airport', 'mmia', 'international airport'], distance: 2.5, time: 8 },
//       { name: 'Ikeja City Mall', keywords: ['ikeja city mall', 'mall', 'shopping'], distance: 1.2, time: 4 },
//       { name: 'Computer Village', keywords: ['computer village', 'ikeja'], distance: 1.8, time: 6 },
//       { name: 'Lagos State Secretariat', keywords: ['alausa', 'secretariat', 'government'], distance: 2.0, time: 7 },
//       { name: 'Lagos Airport', keywords: ['airport', 'ajao estate', 'mmia'], distance: 3.0, time: 10 }
//     ];
    
//     // Find matching landmark
//     let matchedLandmark = landmarks[0];
//     for (const landmark of landmarks) {
//       if (landmark.keywords.some(keyword => locationKeywords.includes(keyword))) {
//         matchedLandmark = landmark;
//         break;
//       }
//     }
    
//     // Generate random but reasonable nearby info if no match found
//     if (!matchedLandmark) {
//       const randomDist = (Math.random() * 3 + 0.5).toFixed(1);
//       const randomTime = Math.floor(randomDist * 3.5);
//       return {
//         landmark: 'city center',
//         distance: randomDist,
//         time: randomTime
//       };
//     }
    
//     return {
//       landmark: matchedLandmark.name,
//       distance: matchedLandmark.distance,
//       time: matchedLandmark.time
//     };
//   };

//   const getPropertyTypeBadge = (type) => {
//     const types = {
//       'e-hotel': 'bg-blue-100 text-blue-800',
//       'e-apartment': 'bg-green-100 text-green-800',
//       'e-short_stay': 'bg-blue-100  text-blue-800',
//       'e-budget': 'bg-orange-100 text-orange-800',
//     };
//     return types[type] || 'bg-gray-100 text-gray-800';
//   };

//   const formatPropertyType = (type) => {
//     if (!type) return 'Property';
//     return type.replace('e-', '').replace('_', ' ').toUpperCase();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//           <p className="mt-4 text-gray-600">Loading short stay properties...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
//           <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h2 className="mt-4 text-xl font-semibold text-red-800">Error Loading Properties</h2>
//           <p className="mt-2 text-red-600">{error}</p>
//           <button
//             onClick={() => fetchAllHotels()}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-800 to-blue-800 text-white py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Short Stay Properties</h1>
//           <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
//             Perfect for business trips, layovers, and quick getaways. Comfort and convenience at your fingertips.
//           </p>
//         </div>
//       </div>

//       {/* Hotels Grid */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">Available Short Stays</h2>
//             <p className="text-gray-500 mt-1">
//               Showing {allHotels.length} short stay properties
//             </p>
//           </div>
//         </div>

//         {allHotels.length === 0 ? (
//           <div className="text-center py-12">
//             <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//             </svg>
//             <p className="text-gray-500 text-lg mt-4">No short stay properties found.</p>
//             <p className="text-gray-400">Check back later for new listings!</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {allHotels.map((hotel) => {
//               const nearbyInfo = getNearbyInfo(hotel.street_address);
              
//               return (
//                 <div
//                   key={hotel.id}
//                   className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
//                 >
//                   {/* Image Section */}
//                   <div className="relative h-56 overflow-hidden">
//                     {hotel.photos && hotel.photos.length > 0 ? (
//                       <img
//                         src={hotel.photos[0].photo_path}
//                         alt={hotel.hotel_name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
//                         <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                         </svg>
//                       </div>
//                     )}

//                     {/* Badges */}
//                     <div className="absolute top-3 left-3 flex gap-2">
//                       <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${getPropertyTypeBadge(hotel.property_type)}`}>
//                         {formatPropertyType(hotel.property_type)}
//                       </span>
//                       {hotel.last_minute_deal === 1 && (
//                         <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-red-500 text-white animate-pulse">
//                           Last Minute Deal
//                         </span>
//                       )}
//                       {hotel.is_verified && (
//                         <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-yellow-500 text-white">
//                           ✓ Verified
//                         </span>
//                       )}
//                     </div>

//                     {/* Short Stay Badge */}
//                     <div className="absolute top-3 right-3">
//                       <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-lg">
//                         ⚡ Short Stay
//                       </span>
//                     </div>

//                     {/* Stats */}
//                     <div className="absolute bottom-3 right-3 flex gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
//                       {hotel.views_count > 0 && (
//                         <span className="text-xs text-white flex items-center gap-1">
//                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                           </svg>
//                           {hotel.views_count}
//                         </span>
//                       )}
//                       {hotel.likes_count > 0 && (
//                         <span className="text-xs text-white flex items-center gap-1">
//                           <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                           </svg>
//                           {hotel.likes_count}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Content Section */}
//                   <div className="p-5">
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
//                         {hotel.hotel_name}
//                       </h3>
//                       {hotel.discount && parseFloat(hotel.discount) > 0 && (
//                         <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
//                           {hotel.discount}% OFF
//                         </span>
//                       )}
//                     </div>

//                     {/* Nearby Location Info - Converted to km and minutes */}
//                     <div className="flex items-center gap-3 mb-3 bg-blue-50 p-2 rounded-lg">
//                       <div className="flex items-center text-blue-700 text-sm">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="font-medium">{nearbyInfo.distance} km</span>
//                       </div>
//                       <div className="w-px h-4 bg-blue-300"></div>
//                       <div className="flex items-center text-blue-700 text-sm">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         <span className="font-medium">{nearbyInfo.time} min drive</span>
//                       </div>
//                       <div className="text-xs text-blue-600 ml-auto">
//                         to {nearbyInfo.landmark}
//                       </div>
//                     </div>

//                     <div className="flex items-center text-gray-500 text-sm mb-3">
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                       </svg>
//                       <span>{hotel.number_of_rooms} Rooms</span>
//                     </div>

//                     <div className="mb-4">
//                       <div className="flex flex-wrap gap-2">
//                         <span className="text-xs text-gray-600">🛎️ Check-in: {new Date(hotel.check_in_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                         <span className="text-xs text-gray-600">🚪 Check-out: {new Date(hotel.check_out_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                       </div>
//                     </div>

//                     {hotel.amenities && hotel.amenities.length > 0 && (
//                       <div className="mb-4">
//                         <div className="flex flex-wrap gap-1">
//                           {hotel.amenities.slice(0, 4).map((amenity, idx) => (
//                             <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
//                               {amenity}
//                             </span>
//                           ))}
//                           {hotel.amenities.length > 4 && (
//                             <span className="text-xs text-gray-500">+{hotel.amenities.length - 4} more</span>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {/* Ideal For Section */}
//                     <div className="mb-4 p-2 bg-purple-50 rounded-lg">
//                       <p className="text-xs text-purple-700 font-medium">✨ Ideal for:</p>
//                       <p className="text-xs text-purple-600">Business trips • Layovers • Quick getaways</p>
//                     </div>

//                     <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                       <div>
//                         <span className="text-xs text-gray-500">from</span>
//                         <p className="text-lg font-bold text-purple-600">
//                           ₦{hotel.platform_fee_rate ? parseInt(hotel.platform_fee_rate).toLocaleString() : 'Contact'}
//                         </p>
//                         <span className="text-xs text-gray-500">platform fee</span>
//                       </div>
// <button 
//   onClick={() => setSelectedHotelId(hotel.id)}
//   className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm"
// >
//   View Details
// </button>

//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//         {selectedHotelId && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
//             <div className="min-h-screen">
//             <HotelDetail hotelId={selectedHotelId} />
//             </div>
//         </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Hotel;


import React, { useState, useEffect } from 'react';

const Hotel = () => {
  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://backend.ehotels.ng/api/lists/hotels';

  useEffect(() => {
    fetchAllHotels();
  }, []);

  const fetchAllHotels = async () => {
    setLoading(true);
    setError(null);
    try {
     
      const firstResponse = await fetch(`${API_URL}?per_page=6&page=1`);
      if (!firstResponse.ok) {
        throw new Error(`HTTP error! status: ${firstResponse.status}`);
      }
      const firstData = await firstResponse.json();
      const totalPages = firstData.meta?.total_pages || 1;
      
      
      const allPromises = [];
      for (let page = 1; page <= totalPages; page++) {
        allPromises.push(fetch(`${API_URL}?per_page=6&page=${page}`).then(res => res.json()));
      }
      
      const allData = await Promise.all(allPromises);
      
      
      let allHotelsData = [];
      allData.forEach(data => {
        if (data.data && Array.isArray(data.data)) {
          allHotelsData = [...allHotelsData, ...data.data];
        }
      });
      
     
      const shortStayHotels = allHotelsData.filter(
        hotel => hotel.property_type === 'e-short_stay'
      );
      
      setAllHotels(shortStayHotels);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };


  const getNearbyInfo = (address) => {
    const locationKeywords = address?.toLowerCase() || '';
    
    const landmarks = [
      { name: 'MMIA Airport', keywords: ['airport', 'mmia', 'international airport'], distance: 2.5, time: 8 },
      { name: 'Ikeja City Mall', keywords: ['ikeja city mall', 'mall', 'shopping'], distance: 1.2, time: 4 },
      { name: 'Computer Village', keywords: ['computer village', 'ikeja'], distance: 1.8, time: 6 },
      { name: 'Lagos State Secretariat', keywords: ['alausa', 'secretariat', 'government'], distance: 2.0, time: 7 },
      { name: 'Lagos Airport', keywords: ['airport', 'ajao estate', 'mmia'], distance: 3.0, time: 10 }
    ];
    
    let matchedLandmark = landmarks[0];
    for (const landmark of landmarks) {
      if (landmark.keywords.some(keyword => locationKeywords.includes(keyword))) {
        matchedLandmark = landmark;
        break;
      }
    }
    
    if (!matchedLandmark) {
      const randomDist = (Math.random() * 3 + 0.5).toFixed(1);
      const randomTime = Math.floor(randomDist * 3.5);
      return {
        landmark: 'city center',
        distance: randomDist,
        time: randomTime
      };
    }
    
    return {
      landmark: matchedLandmark.name,
      distance: matchedLandmark.distance,
      time: matchedLandmark.time
    };
  };

  const getPropertyTypeBadge = (type) => {
    const types = {
      'e-hotel': 'bg-blue-100 text-blue-800',
      'e-apartment': 'bg-blue-100 text-blue-800',
      'e-short_stay': 'bg-blue-100 text-blue-800',
      'e-budget': 'bg-blue-100 text-blue-800',
    };
    return types[type] || 'bg-gray-100 text-gray-800';
  };

  const formatPropertyType = (type) => {
    if (!type) return 'Property';
    return type.replace('e-', '').replace('_', ' ').toUpperCase();
  };

  const navigateToEHotel = (hotelSlug) => {
   
    window.open(`https://ehotels.ng/hotel/${hotelSlug}/details/`, '_blank');
  };
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading short stay properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-red-800">Error Loading Properties</h2>
          <p className="mt-2 text-red-600">{error}</p>
          <button
            onClick={() => fetchAllHotels()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Short Stay Properties</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Perfect for business trips, layovers, and quick getaways. Comfort and convenience at your fingertips.
          </p>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Available Short Stays</h2>
            <p className="text-gray-500 mt-1">
              Showing {allHotels.length} short stay properties
            </p>
          </div>
        </div>

        {allHotels.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-gray-500 text-lg mt-4">No short stay properties found.</p>
            <p className="text-gray-400">Check back later for new listings!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allHotels.map((hotel) => {
              const nearbyInfo = getNearbyInfo(hotel.street_address);
              
              return (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    {hotel.photos && hotel.photos.length > 0 ? (
                      <img
                        src={hotel.photos[0].photo_path}
                        alt={hotel.hotel_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${getPropertyTypeBadge(hotel.property_type)}`}>
                        {formatPropertyType(hotel.property_type)}
                      </span>
                      {hotel.last_minute_deal === 1 && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-red-500 text-white animate-pulse">
                          Last Minute
                        </span>
                      )}
                    </div>

                    {/* Short Stay Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-lg">
                        ⚡ Short Stay
                      </span>
                    </div>
                  </div>

                  {/* Content Section - Simplified */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                      {hotel.hotel_name}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="line-clamp-1">{hotel.city}, {hotel.state}</span>
                    </div>

                    {/* Distance Info */}
                    <div className="flex items-center gap-2 mb-3 text-xs text-blue-600">
                      <span>📍 {nearbyInfo.distance}km to {nearbyInfo.landmark}</span>
                      <span>•</span>
                      <span>🚗 {nearbyInfo.time}min drive</span>
                    </div>

                    {/* Rooms and Price */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>{hotel.number_of_rooms} rooms</span>
                      </div>
                      
                    </div>

                    {/* Top Amenities - Simplified */}
                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Book Now Button */}
                    <button 
                      onClick={() => navigateToEHotel(hotel.slug)}
                      className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <span>Book Now on eHotels</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotel;