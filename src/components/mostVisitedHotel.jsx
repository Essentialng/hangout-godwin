import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { LocationOn, Visibility } from "@mui/icons-material";
import hotel1 from "../assets/ecohotel.png";
import hotel2 from "../assets/1865104_740x550.jpg";
import hotel3 from "../assets/ecohotel.png";
import hotel4 from "../assets/61088366.jpg";
import hotel5 from "../assets/439499370.jpg";

const hotels = [
  {
    id: 1,
    name: "EKO Hotels and Suite",
    location: "Lagos, Nigeria",
    visits: "1,945",
    price: "₦150,000",
    image: hotel1,
  },
  {
    id: 2,
    name: "Autograph",
    location: "Lagos, Nigeria",
    visits: "2,143",
    price: "₦150,000",
    image: hotel4,
  },
  {
    id: 3,
    name: "EKO Hotels and Suite",
    location: "Lagos, Nigeria",
    visits: "1,945",
    price: "₦150,000",
    image: hotel2,
  },
  {
    id: 4,
    name: "Lotter Hotel",
    location: "Lagos, Nigeria",
    visits: "1,945",
    price: "₦150,000",
    image: hotel3,
  },
  {
    id: 5,
    name: "Suite",
    location: "Lagos, Nigeria",
    visits: "1,945",
    price: "₦150,000",
    image: hotel5,
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const MostVisitedHotels = () => {
  return (
    <div className="w-full px-6 py-10 max-w-7xl mx-auto bg-[#3A1D0E] text-white rounded-lg">
      {/* Header */}
      <div className="flex justify-start items-center mb-6">
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-md">
          <span className="text-red-500 text-3xl">●</span>
          <p className="text-lg font-semibold text-black">Most Visited</p>
        </div>
        <button className="bg-orange-500 gap-3 ml-2 text-white px-4 py-2 rounded-md font-semibold">Hotels</button>
      </div>

      {/* Carousel */}
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="px-2"
      >
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white text-gray-900 shadow-lg rounded-xl overflow-hidden">
            <img src={hotel.image} alt={hotel.name} className="w-full h-56 object-cover" />
            <div className="p-3">
              <h3 className="text-xl font-bold">{hotel.name}</h3>
              <p className="text-gray-600 flex items-center">
                <LocationOn className="text-orange-500 mr-1" /> {hotel.location}
              </p>
              <div className="flex justify-between items-center mt-3">
              <p className="text-gray-500 flex items-center">
                  <Visibility className="text-gray-500 mr-1" /> {hotel.visits} Visits
                </p>
                <div className="">
               
                <p className="text-2xl font-semibold"><span className="text-sm">From</span> {hotel.price}</p>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MostVisitedHotels;
