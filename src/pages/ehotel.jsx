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
          <p className="mt-4 text-gray-600">Loading properties...</p>
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
          <h2 className="mt-4 text-xl font-semibold text-red-800">Something went wrong</h2>
          <p className="mt-2 text-red-600">{error}</p>
          <button
            onClick={() => fetchAllHotels()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Short Stay Properties</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Perfect for business trips, layovers, or quick getaways.
          </p>
        </div>
      </div>

      {/* Hotel listings */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Available Short Stays</h2>
            <p className="text-gray-500 text-sm mt-1">
              {allHotels.length} properties found
            </p>
          </div>
        </div>

        {allHotels.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-20 w-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-gray-500 mt-4">No properties available right now.</p>
            <p className="text-gray-400 text-sm">Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allHotels.map((hotel) => {
              const nearbyInfo = getNearbyInfo(hotel.street_address);
              
              return (
                <div
                  key={hotel.id}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-200">
                    {hotel.photos && hotel.photos.length > 0 ? (
                      <img
                        src={hotel.photos[0].photo_path}
                        alt={hotel.hotel_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-300 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getPropertyTypeBadge(hotel.property_type)}`}>
                        {formatPropertyType(hotel.property_type)}
                      </span>
                    </div>

                    {hotel.last_minute_deal === 1 && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 text-xs font-medium rounded bg-red-500 text-white">
                          Last Minute
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-1">
                      {hotel.hotel_name}
                    </h3>

                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{hotel.city}, {hotel.state}</span>
                    </div>

                    <div className="text-xs text-blue-600 mb-2">
                      {nearbyInfo.distance}km to {nearbyInfo.landmark} · {nearbyInfo.time}min drive
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{hotel.number_of_rooms} rooms</span>
                    </div>

                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    )}

                    <button 
                      onClick={() => navigateToEHotel(hotel.slug)}
                      className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
                    >
                      Book on eHotels
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