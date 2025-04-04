import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Bed, Bath, Users, Heart, Filter } from "lucide-react";

const properties = [
  {
    id: 1,
    image: "https://ik.imagekit.io/tvlk/image/imageResource/2024/06/21/1718957715688-26316a3442d27400e8a6919f75237573.jpeg?tr=q-75", // Replace with actual image URL
    title: "Well Furnished Apartment",
    location: "100 Smart Street, LA, USA",
    listedBy: "John Doberman",
    price: "$1000 - $5000",
    type: "Apartment on Rent",
    period: "For Long Period: 1 - 2 Years",
    beds: 3,
    baths: 2,
    guests: 6,
    lat: 6.4541, 
    lng: 3.3947,
  },
  {
    id: 2,
    image: "https://bynder.onthebeach.co.uk/cdn-cgi/image/width=1400,quality=70,fit=cover,format=auto,height=933/m/4a9d6c8c5f714e6/original/Xoria-Deluxe-Hotel.jpg", // Replace with actual image URL
    title: "Large Room with Attached Bathroom",
    location: "36 Cambert Street, LA, USA",
    listedBy: "Harry",
    price: "$1000 - $5000",
    type: "Home Room on Rent",
    period: "For Short Period: 3 - 5 Months",
    beds: 5,
    baths: 2,
    guests: 6,
    lat: 6.4281, // VI latitude
    lng: 3.4215,
  },
  {
    id: 3,
    image: "https://images.trvl-media.com/lodging/66000000/65730000/65726800/65726788/3f0189bc.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill", // Replace with actual image URL
    title: "Large Room with Attached Bathroom",
    location: "36 Cambert Street, LA, USA",
    listedBy: "Harry",
    price: "$1000 - $5000",
    type: "Home Room on Rent",
    period: "For Short Period: 3 - 5 Months",
    beds: 5,
    baths: 2,
    guests: 6,
    lat: 6.4281, // VI latitude
    lng: 3.4215,
  },
];

const SearchResults = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
        <h1 className="text-2xl font-semibold">10 Results Found</h1>
        <div className="flex">
        
        </div>
        </div>
        
        <button className="flex items-center px-4 py-2 border rounded-md bg-white shadow-md">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </button>
      </div>

      {/* Results + Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Listings */}
        <div className="col-span-2 space-y-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img src={property.image} alt={property.title} className="w-full h-100 object-cover" />
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">Listed by {property.listedBy}</p>
                <h2 className="text-lg font-semibold">{property.title}</h2>
                <p className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" /> {property.location}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-gray-700">
                  <span className="flex items-center"><Bed className="w-4 h-4 mr-1" /> {property.beds}</span>
                  <span className="flex items-center"><Bath className="w-4 h-4 mr-1" /> {property.baths}</span>
                  <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {property.guests}</span>
                </div>
                <p className="text-gray-700 mt-2">{property.type}</p>
                <p className="text-gray-500">{property.period}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="hidden lg:block rounded-lg overflow-hidden">
          <MapContainer center={[34.0522, -118.2437]} zoom={13} className="h-[500px] w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {properties.map((property) => (
              <Marker key={property.id} position={[property.lat, property.lng]}>
                <Popup>
                  <div className="text-center">
                    <img src={property.image} alt={property.title} className="w-32 h-20 object-cover rounded-md" />
                    <p className="font-semibold">{property.title}</p>
                    <p>{property.location}</p>
                    <p className="text-gray-700">{property.price}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
