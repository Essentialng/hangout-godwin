import React, { useEffect, useState } from "react";
import fancyImg from '../assets/7.gif';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useNavigate } from "react-router-dom";

const flashSales = [
  {
    title: "Music Concert - Live in Lagos",
    price: "₦ 19,500",
    oldPrice: "₦ 41,000",
    discount: "-52%",
    stockLeft: "Time left",
    image: "https://assets.simplotel.com/simplotel/image/upload/x_0,y_129,w_1034,h_775,r_0,c_crop,q_90,fl_progressive/w_750,f_auto,c_fit/s-hotels-jamaica/dsbv",
  },
  {
    title: "Art Exhibition - Contemporary Arts",
    price: "₦ 3,299",
    oldPrice: "₦ 9,000",
    discount: "-63%",
    stockLeft: "Time left",
    image: "https://nowplayingutah.com/wp-content/uploads/sites/nowplayingutah.com/images/2022/07/venue-featured-experience-event-center-1657648813.jpeg",
  },
  {
    title: "Dance Show - All Styles Dance Battle",
    price: "₦ 4,270",
    oldPrice: "₦ 8,007",
    discount: "-47%",
    stockLeft: "Time left",
    image: "https://escapismbars.co.uk/wp-content/uploads/2023/04/Hero-slider-1.jpg",
  },
  {
    title: "Food Festival - Taste of Africa",
    price: "₦ 14,500",
    oldPrice: "₦ 24,000",
    discount: "-40%",
    stockLeft: "Time left",
    image: "https://cdn.cluboenologique.com/wp-content/uploads/2022/10/14163128/paradis-barcelona.jpg",
  },
  {
    title: "Comedy Night - Laughter Unlimited",
    price: "₦ 4,415",
    oldPrice: "₦ 6,320",
    discount: "-30%",
    stockLeft: "Time left",
    image: "https://austin.culturemap.com/media-library/bar-of-the-year-tiki-tatsu-ya.jpg?id=29818042&width=2000&height=1500&quality=65&coordinates=0%2C0%2C0%2C0",
  },
  {
    title: "Film Premiere - Red Carpet Event",
    price: "₦ 24,900",
    oldPrice: "₦ 27,031",
    discount: "-8%",
    stockLeft: "Time left",
    image: "https://assets.simplotel.com/simplotel/image/upload/x_0,y_129,w_1034,h_775,r_0,c_crop,q_90,fl_progressive/w_750,f_auto,c_fit/s-hotels-jamaica/dsbv",
  },
  {
    title: "Stand-up Comedy - Fun & Laughs",
    price: "₦ 4,270",
    oldPrice: "₦ 8,007",
    discount: "-47%",
    stockLeft: "Time left",
    image: "https://escapismbars.co.uk/wp-content/uploads/2023/04/Hero-slider-1.jpg",
  },
  {
    title: "Music Festival - Dance & Beats",
    price: "₦ 14,500",
    oldPrice: "₦ 24,000",
    discount: "-40%",
    stockLeft: "Time left",
    image: "https://cdn.cluboenologique.com/wp-content/uploads/2022/10/14163128/paradis-barcelona.jpg",
  },
  {
    title: "Fashion Show - Glamour & Style",
    price: "₦ 4,415",
    oldPrice: "₦ 6,320",
    discount: "-30%",
    stockLeft: "Time left",
    image: "https://austin.culturemap.com/media-library/bar-of-the-year-tiki-tatsu-ya.jpg?id=29818042&width=2000&height=1500&quality=65&coordinates=0%2C0%2C0%2C0",
  },
];


const Ads = ({ initialSeconds = 3600}) => {
  

    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hrs = Math.floor((seconds % (24 * 3600)) / 3600) + 4000;  // Adding 30 to hours
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(days)}d : ${String(hrs).padStart(2, '0')}h : ${String(mins).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
};

  return (

    <div className="bg-gray-50 text-white p-4">
      <div style={{borderTopLeftRadius:10, borderTopRightRadius:10, }} className="flex bg-orange-600 p-4 justify-between items-center mb-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>⚡</span> Most Visited Events
        </h2>
        <div className="font-semibold text-white">
      Time Left: <span className="font-mono">{formatTime(timeLeft)}</span>
    </div >
        <a onClick={()=>navigate('/Ads')} href="#" className="text-sm underline hover:text-gray-200">See All</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
       

            <div className="bg-white text-black rounded-lg overflow-hidden shadow hover:shadow-lg transition-all">
            <img
              src={fancyImg}
              alt='img'
              className="w-full h-50 object-cover"
            />
            <div className="p-3 space-y-1">
              <h3 className="text-1xl font-semibold line-clamp-2">Spots everyone's talking about </h3>
            
              <div className="text-gray-400">Discover trending places to chill and connect.</div>
             
              
             
            </div>
          </div>
        
        {flashSales.map((item, index) => (
          <div key={index} className="bg-white cursor-pointer text-black rounded-lg overflow-hidden shadow hover:shadow-lg transition-all relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-36 object-cover"
          />
          
          {/* Heart icon at top left */}
          <div className="absolute bg-green-600/70 w-13 h-4 text-center shadow rounded-xl top-2 right-2 flex items-center justify-center">
            <span style={{fontSize:12}} className="text-white text-xs font-semibold">Verified</span>
            </div>

        
          <div className="p-3 space-y-1">
            <h3 className="text-sm font-semibold line-clamp-2">{item.title}</h3>
            <div className="flex items-center space-x-2">
              <div className="text-gray-500 text-sm">From</div>
              <div className="text-red-600 font-bold text-xl">{item.price}</div>
            </div>
        
            <div className="text-gray-500 line-through text-sm">{item.oldPrice}</div>
            <div className="text-green-600 text-sm font-semibold">{item.discount}</div>
            <div className="text-xs text-gray-600">{item.stockLeft}</div>
            <div className="w-full h-1 bg-gray-200 rounded overflow-hidden">
              <div className="bg-orange-500 h-full" style={{ width: `${Math.min(100, parseInt(item.stockLeft))}%` }}></div>
            </div>
          </div>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default Ads;
