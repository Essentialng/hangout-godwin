import React, { useState, useEffect } from 'react';

const HotelDetail = ({ hotelId }) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    name: '',
    email: '',
    phone: ''
  });

  const API_URL = `https://backend.ehotels.ng/api/lists/hotels?per_page=100`;

  useEffect(() => {
    fetchHotelDetails();
  }, [hotelId]);

  const fetchHotelDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Find the specific hotel by ID
      const foundHotel = data.data?.find(h => h.id === parseInt(hotelId));
      
      if (!foundHotel) {
        throw new Error('Hotel not found');
      }
      
      setHotel(foundHotel);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching hotel details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingInput = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with your booking API
    alert(`Booking request sent for ${hotel?.hotel_name}!\nCheck-in: ${bookingData.checkIn}\nCheck-out: ${bookingData.checkOut}\nWe'll contact you at ${bookingData.email}`);
    setShowBookingForm(false);
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
    
    return {
      landmark: matchedLandmark.name,
      distance: matchedLandmark.distance,
      time: matchedLandmark.time
    };
  };

  const formatDescription = (description) => {
    if (!description) return 'No description available.';
    // Remove markdown formatting and convert to HTML
    let formatted = description
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\r\n\r\n/g, '</p><p>')
      .replace(/\r\n/g, '<br/>');
    
    return <div dangerouslySetInnerHTML={{ __html: `<p>${formatted}</p>` }} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-red-800">Error Loading Property</h2>
          <p className="mt-2 text-red-600">{error || 'Hotel not found'}</p>
          {/* <button
            onClick={() => window.}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Go Back
          </button> */}
        </div>
      </div>
    );
  }

  const nearbyInfo = getNearbyInfo(hotel.street_address);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Properties
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
       
        <div className="mb-8">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{hotel.hotel_name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{hotel.city}, {hotel.state}, {hotel.country}</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{hotel.street_address}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {hotel.is_verified && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                {hotel.property_type?.replace('e-', '').replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden bg-gray-200 h-96">
                {hotel.photos && hotel.photos.length > 0 ? (
                  <img
                    src={hotel.photos[selectedImage]?.photo_path}
                    alt={hotel.hotel_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-300 to-purple-400">
                    <svg className="w-24 h-24 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {hotel.photos?.slice(0, 4).map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative rounded-xl overflow-hidden bg-gray-200 h-28 lg:h-24 hover:opacity-80 transition ${
                    selectedImage === idx ? 'ring-2 ring-purple-600' : ''
                  }`}
                >
                  <img
                    src={photo.photo_path}
                    alt={`${hotel.hotel_name} - ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl mb-2">🛎️</div>
                <div className="text-sm text-gray-500">Check-in</div>
                <div className="font-semibold text-gray-800">
                  {new Date(hotel.check_in_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl mb-2">🚪</div>
                <div className="text-sm text-gray-500">Check-out</div>
                <div className="font-semibold text-gray-800">
                  {new Date(hotel.check_out_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl mb-2">🏠</div>
                <div className="text-sm text-gray-500">Rooms</div>
                <div className="font-semibold text-gray-800">{hotel.number_of_rooms}</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm text-gray-500">Status</div>
                <div className="font-semibold text-green-600 capitalize">{hotel.status}</div>
              </div>
            </div>

            {/* Nearby Location */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📍 Location & Accessibility</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl">✈️</div>
                  <div>
                    <div className="text-sm text-gray-500">Nearest Airport</div>
                    <div className="font-semibold">{hotel.closest_airport || 'Not specified'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl">🚗</div>
                  <div>
                    <div className="text-sm text-gray-500">Distance to {nearbyInfo.landmark}</div>
                    <div className="font-semibold">{nearbyInfo.distance} km • {nearbyInfo.time} min drive</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 About This Property</h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed">
                {formatDescription(hotel.description)}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">✨ Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hotel.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-6">
              {hotel.cancellation_policy && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">❌ Cancellation Policy</h2>
                  <div className="text-gray-600 leading-relaxed">
                    {formatDescription(hotel.cancellation_policy)}
                  </div>
                </div>
              )}
              
              {hotel.refund_policy && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">💰 Refund Policy</h2>
                  <div className="text-gray-600 leading-relaxed">
                    {formatDescription(hotel.refund_policy)}
                  </div>
                </div>
              )}
              
              {hotel.booking_conditions && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">📋 Booking Conditions</h2>
                  <div className="text-gray-600 leading-relaxed">
                    {formatDescription(hotel.booking_conditions)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-100">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    ₦{hotel.platform_fee_rate ? parseInt(hotel.platform_fee_rate).toLocaleString() : 'Contact'}
                  </div>
                  <div className="text-sm text-gray-500">platform fee per stay</div>
                  {hotel.discount && parseFloat(hotel.discount) > 0 && (
                    <div className="mt-2 inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                      Save {hotel.discount}%!
                    </div>
                  )}
                </div>

                {!showBookingForm ? (
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition transform hover:scale-105"
                  >
                    Book Now
                  </button>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                      <input
                        type="date"
                        name="checkIn"
                        required
                        value={bookingData.checkIn}
                        onChange={handleBookingInput}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                      <input
                        type="date"
                        name="checkOut"
                        required
                        value={bookingData.checkOut}
                        onChange={handleBookingInput}
                        min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                        <input
                          type="number"
                          name="guests"
                          required
                          min="1"
                          max="20"
                          value={bookingData.guests}
                          onChange={handleBookingInput}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
                        <input
                          type="number"
                          name="rooms"
                          required
                          min="1"
                          max={hotel.number_of_rooms}
                          value={bookingData.rooms}
                          onChange={handleBookingInput}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={bookingData.name}
                        onChange={handleBookingInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={bookingData.email}
                        onChange={handleBookingInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={bookingData.phone}
                        onChange={handleBookingInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Cancel
                    </button>
                  </form>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M6 4h12M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                    <span>No payment needed to book</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Secure booking</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">Contact Property</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{hotel.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{hotel.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;