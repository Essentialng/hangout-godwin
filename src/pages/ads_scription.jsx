import { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
} from "@mui/material";
import {
  
  Button,
 DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import SensorsIcon from "@mui/icons-material/Sensors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "antd";
import banner2 from "../assets/6eb024893ca8d69c7e1ed16821b0e8bd.png";
import Partners from '../components/essentialBrand';
const PAYMENT_PK = import.meta.env.VITE_PAYMENT_API_KEY
import { useNavigate } from "react-router-dom";
const API_EXCHANGE_RATE = import.meta.env.VITE_EXCHANGE_RATE_API_KEY
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';

const AdsSub = () => {

  // converter start here from Niara to USD ///////////////////////////////////////// 

  const API_KEY = `${API_EXCHANGE_RATE}`;
  const USD_AMOUNT = 64;

  const [convertedAmount, setConvertedAmount] = useState(null);
  const [userCurrency, setUserCurrency] = useState("USD");
  const [countryName, setCountryName] = useState("Your Country");
  const [countryCode, setCountryCode] = useState("US");
  const [paymentMethod, setPaymentMethod] = useState("USD");
  const [ngnAmount, setNgnAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Format currency nicely
  const formatCurrency = (value, currency) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);

  // Cache helper
  const cacheRate = (currency, rate) => {
    const cacheData = {
      rate,
      timestamp: Date.now(),
    };
    localStorage.setItem(`rate_${currency}`, JSON.stringify(cacheData));
  };

  const getCachedRate = (currency) => {
    const cache = localStorage.getItem(`rate_${currency}`);
    if (!cache) return null;

    const { rate, timestamp } = JSON.parse(cache);
    const oneDay = 1000 * 60 * 60 * 24;
    if (Date.now() - timestamp < oneDay) {
      return rate;
    }
    return null;
  };

  // Payment method based on country
  const getPaymentMethod = (countryCode) => {
    const paystackCountries = ["NG", "GH", "ZA"]; // Example: Nigeria, Ghana, South Africa
    return paystackCountries.includes(countryCode) ? "Paystack" : "Flutterwave";
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const locRes = await fetch("https://ipapi.co/json/");
        const locData = await locRes.json();

        const currency = locData.currency;
        const country = locData.country_name;
        const code = locData.country_code;

        setUserCurrency(currency);
        setCountryName(country);
        setCountryCode(code);
        setPaymentMethod(getPaymentMethod(code));

        // Convert USD to local currency
        if (currency !== "USD") {
          const cachedRate = getCachedRate(currency);
          if (cachedRate) {
            const converted = (USD_AMOUNT * cachedRate).toFixed(2);
            setConvertedAmount(converted);
            setNgnAmount(converted);
          } else {
            const rateRes = await fetch(
              `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/${currency}`
            );
            const rateData = await rateRes.json();
            const rate = rateData.conversion_rate;

            const converted = (USD_AMOUNT * rate).toFixed(2);
            setConvertedAmount(converted);
            setNgnAmount(converted);
            cacheRate(currency, rate);
          }
        }
      } catch (error) {
        console.error("Error fetching info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);


  // 


  const API_KEY2 = `${API_EXCHANGE_RATE}`;
  const USD_AMOUNT2 = 318;

  const [convertedAmount2, setConvertedAmount2] = useState(null);
  const [userCurrency2, setUserCurrency2] = useState("USD");
  const [countryName2, setCountryName2] = useState("Your Country");
  const [countryCode2, setCountryCode2] = useState("US");
  const [paymentMethod2, setPaymentMethod2] = useState("USD");
  const [ngnAmount2, setNgnAmount2] = useState(null);
  const [loading2, setLoading2] = useState(true);

  // Format currency nicely
  const formatCurrency2 = (value, currency) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);

  // Cache helper
  const cacheRate2 = (currency, rate) => {
    const cacheData = {
      rate,
      timestamp: Date.now(),
    };
    localStorage.setItem(`rate_${currency}`, JSON.stringify(cacheData));
  };

  const getCachedRate2 = (currency) => {
    const cache = localStorage.getItem(`rate_${currency}`);
    if (!cache) return null;

    const { rate, timestamp } = JSON.parse(cache);
    const oneDay = 1000 * 60 * 60 * 24;
    if (Date.now() - timestamp < oneDay) {
      return rate;
    }
    return null;
  };

  // Payment method based on country
  const getPaymentMethod2 = (countryCode) => {
    const paystackCountries = ["NG", "GH", "ZA"]; // Example: Nigeria, Ghana, South Africa
    return paystackCountries.includes(countryCode) ? "Paystack" : "Flutterwave";
  };

  const supportedPaystackMethods = ["NG", "GH", "ZA"]; // Nigeria, Ghana (example)
  const isPaystackSupported = supportedPaystackMethods.includes('Paystack');


  useEffect(() => {
    const fetchUserInfo2 = async () => {
      try {
        const locRes = await fetch("https://ipapi.co/json/");
        const locData = await locRes.json();

        const currency = locData.currency;
        const country = locData.country_name;
        const code = locData.country_code;

        setUserCurrency2(currency);
        setCountryName2(country);
        setCountryCode2(code);
        setPaymentMethod2(getPaymentMethod2(code));

        // Convert USD to local currency
        if (currency !== "USD") {
          const cachedRate = getCachedRate2(currency);
          if (cachedRate) {
            const converted = (USD_AMOUNT2 * cachedRate).toFixed(2);
            setConvertedAmount2(converted);
            setNgnAmount2(converted);
          } else {
            const rateRes = await fetch(
              `https://v6.exchangerate-api.com/v6/${API_KEY2}/pair/USD/${currency}`
            );
            const rateData = await rateRes.json();
            const rate = rateData.conversion_rate;

            const converted = (USD_AMOUNT2 * rate).toFixed(2);
            setConvertedAmount2(converted);
            setNgnAmount2(converted);
            cacheRate2(currency, rate);
          }
        }
      } catch (error) {
        console.error("Error fetching info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo2();
  }, []);


  /// converter end
  const navigate = useNavigate();
  const [channelId, setChannelId] = useState("");
  const [channelId2, setChannelIdIput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserID] = useState([]);
  const [open, setOpen] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [user, setUser] = useState(null);
  // Define plan details
  const plans = {
    Basic: {
      name: "Basic Plan",
      amount: convertedAmount,
      
    },
    Premium: {
      name: "Premium Plan",
      amount: convertedAmount2,
    },
  };
// Check if the user is logged in from localStorage
useEffect(() => {
  const storedUserData = localStorage.getItem("user_data");
  if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      const parsedData = JSON.parse(storedUserData);
      setUserID(parsedData.uid);
      console.log('user_email', parsedData.id);
     
  }
}, []);
  const openPopup = (plan) => {
    setSelectedPlan(plan);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  

  const [openPopupLogin, setOpenPopup] = useState(false);
  const handleClosePopup = () => {
    setOpenPopup(false);
   
    navigate("/SignIn"); 
  };
  const handlePayment = (amount) => {
    if (!user) {
      setOpenPopup(true); window.scrollTo(0,0);
    } else {
      // Convert amount to Kobo (Paystack requires the amount in Kobo)
      const amountInKobo = parseInt(amount.replace(/,/g, '')) * 100;
  
      // Calculate a random charge between 1.5% and 3%
      const chargePercentage = 1.5 + Math.random() * (2 - 1.5); 
      const chargeAmount = Math.round((amountInKobo * chargePercentage) / 100);
  
      // Total amount including Paystack charge
      const totalAmount = amountInKobo + chargeAmount;
  
      const paystack = window.PaystackPop.setup({
        key: `${PAYMENT_PK}`,
        email: user.email, // Use the logged-in user's email
        amount: totalAmount, // Paystack requires amount in kobo (including charge)
        currency: "NGN",
        callback: function (response) {
          alert("Payment was successful! Reference: " + response.reference);
  
          // Handle backend request separately
          // axios
          //   .post(`${API_ROUTE}/payments/create/`, {
          //     user: userId, // Ensure userId is defined
          //     amount: totalAmount, // Send total amount (including charge)
          //     transaction_id: response.reference,
          //   })
          //   .then((res) => {
          //     if (res.status === 201) {
          //       console.log("Payment was successful", res.data);
          //       window.scrollTo(0, 0);
          //       navigate("/Createproduct");
          //     } else {
          //       console.log("Error saving payment to DB.");
          //     }
          //   })
          //   .catch((error) => {
          //     console.error("Error processing payment:", error);
          //   });
            navigate("/CreateLiveEvent");
            window.scrollTo(0,0);
        },
        onClose: function () {
          alert("Payment window closed");
        },
      });
  
      paystack.openIframe();
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center bg-white">
  {/* Live Streaming Area */}
  <div className="relative w-full">
    <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
      {/* Background Image */}
      <img
     
        src={banner2}
        alt="Live Streaming"
        className="w-full h-full object-cover bg-white"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-10">
        <h2 className="text-4xl mt-3 md:text-7xl font-bold leading-tight">
         Reach 8M+ <br /> with Hangout Ads
        </h2>
    
        <p className="mt-2 text-lg md:text-xl max-w-xl">
          Promote your events with sponsored listings on top spots across Hangout
        </p>

        <button
        onClick={()=>{
          window.scrollBy(0, 500);


        }}
          className="mt-6 bg-orange-600 cursor-pointer hover:bg-orange-700 px-5 md:px-8 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
         
        >
          Get Started Now
        </button>
      </div>
    </div>
  </div>

  {/* <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: 12 }}>
      <h2>🌍 Post Your Event</h2>
      <p>
        <strong>Base price:</strong> {formatCurrency(USD_AMOUNT, "USD")}
      </p>

      {!loading && convertedAmount && (
        <p>
          ≈ {formatCurrency(convertedAmount, userCurrency)} in {countryName}
          
        </p>
      )}

      {!loading && (
        <p>
          Payment method: <strong>{paymentMethod}</strong>
        </p>
      )}

      {loading && <p>Loading your location and rate...</p>}
    </div> */}
{/* 
  <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "10px", maxWidth: "300px" }}>
      <h3>🎉 Post Your Event</h3>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>${USD_AMOUNT} USD</p>
      {!loading && (
        <p style={{ color: "#555" }}>≈ ₦{ngnAmount} NGN (live rate)</p>
      )}
      {loading && <p>Checking exchange rate...</p>}
    </div> */}

  {/* YouTube Channel ID Modal */}
  <Dialog open={open} onClose={() => setOpen(false)}>
    <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] md:w-[450px] text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        <SensorsIcon
          style={{ fontSize: 40, color: "red" }}
          className="text-4xl"
        />{" "}
        Go Live on Hangout
      </h1>
      <Divider />
      <p className="text-gray-600 mb-2">
        Broadcast your events and engage with your audience.
      </p>

      {isLoading ? (
        <p className="text-gray-500 animate-pulse">Loading...</p>
      ) : channelId ? (
        <>
          <p className="text-gray-600 mb-4">Your Channel is linked.</p>
          <button
            onClick={handleGoLive}
            className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 w-full"
          >
            🚀 Proceed to Live Streaming
          </button>
        </>
      ) : (
        <>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter YouTube Channel ID"
            value={channelId2 || ""}
            onChange={(e) => setChannelIdIput(e.target.value)}
            className="mt-4"
          />
          <button
            onClick={handleSaveChannelId}
            className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-700 transition-transform transform hover:scale-105 w-full"
          >
            💾 Link Channel & Proceed
          </button>
        </>
      )}
    </div>
  </Dialog>

  <div className="mx-auto px-6 py-16 bg-white">
  <div className="text-center mb-12">
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
      Reach More People, Get More Bookings
    </h1>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
      Want your event to stand out? With <span className="font-semibold text-orange-600">Hangout Ads</span>, you can feature your listings in the most visible places — including search results, homepage banners, category highlights, and more.
    </p>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
      <strong>Geo-target your audience</strong> in 90+ cities across the US, UK, Canada, Australia, and Africa to reach the right people at the right time.
    </p>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      Whether you're hosting a party, conference, or family hangout, our powerful ad tools ensure more eyes on your event and more attendees through the door.
    </p>
   
    <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
  </div>

  <div className="grid md:grid-cols-3 gap-8 text-center">
    <div className="border border-gray-300 rounded-xl border border-gray-200  p-6 shadow hover:shadow-md transition duration-300">
      <AccountTreeIcon style={{fontSize:60}} className="mb-5"/>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Featured Listings</h3>
      <p className="text-gray-600">
        Appear at the top of search results and get discovered first by attendees looking for events like yours.
      </p>
    </div>
    <div className="border border-gray-300 rounded-xl border border-gray-200 p-6 shadow hover:shadow-md transition duration-300">
      <SendToMobileIcon style={{fontSize:60}} className="mt-auto text-center mb-5"/>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Mobile + Web Visibility</h3>
      <p className="text-gray-600">
        Your event gets featured across Hangout’s web platform and mobile apps, boosting your impressions and RSVPs.
      </p>
    </div>
    <div className="border border-gray-300 rounded-xl border border-gray-200  p-6 shadow hover:shadow-md transition duration-300">
      <OfflinePinIcon style={{fontSize:60}} className=" mb-5"/>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Real Results</h3>
      <p className="text-gray-600">
        Events promoted with Hangout Ads see up to <span className="font-bold text-blue-600">30% more attendance</span> compared to unlisted ones.
      </p>
    </div>
  </div>

  
</div>


  <div className="bg-white py-16 px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
    {/* Left Text Section */}
    <div>
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">GET BETTER RESULTS</h2>
      <p className="text-gray-600 mb-8">See your ads perform better on the best event marketing platform</p>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Drive more clicks</h3>
          <p className="text-gray-700">
            Boost visibility and engagement for your events with <span className="font-semibold underline">Hangout Ads</span>. 
            Our platform is designed to help you reach the right audience at the right time—resulting in up to 30% higher click-through rates compared to traditional Facebook Ads*. 
            Whether you're hosting a casual meetup, social hangout, or large-scale gathering, Hangout Ads ensures your event gets the attention it deserves.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Set campaign goals</h3>
          <p className="text-gray-700">
            Pick a goal for your ad, like maximizing your reach or driving more clicks to your event, and our platform will automatically optimize for the best results.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Make the most of your ad budget</h3>
          <p className="text-gray-700">
            The effective cost per click (eCPC) is now over 30% cheaper. Our smart ad system changes bid prices in real-time to help you get the best value for your ads.
          </p>
        </div>
      </div>
    </div>

    {/* Right Image/Stat Section */}
    <div className="gap-4">
      <img
        src="https://eventbrite-s3.s3.us-east-1.amazonaws.com/marketing/landingpages/assets/2025/rebrand/l/eventbrite-ads/a--sq-img--00.png"
        alt="Event 1"
        className="rounded-xl object-cover w-full h-full"
      />
    </div>
  </div>

<div className="max-w-6xl mx-auto p-6 md:p-12 bg-gradient-to-br from-gray-200 to-gray-200 rounded-2xl mb-20">
  <h2 className="text-4xl text-center font-extrabold text-gray-900 mb-4">
    Kickstart Your Campaign with an Exclusive Offer
  </h2>

  <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8 text-lg">
    Select a plan that fits your goals and budget. Launch your first ad campaign and unlock bonus credits when you hit the spend target—fueling even more growth.
    <span className="text-sm block text-gray-500 mt-2 italic">*Terms and conditions apply.</span>
  </p>

  <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Offer A - Basic */}
        <div className="border border-gray-200 rounded-2xl bg-white p-8 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]">
        <div className="text-center mb-8">
  <span className="block text-xs text-gray-400 tracking-widest uppercase mb-1">
    Basic Plan
  </span>

  <span className="block text-5xl font-bold text-blue-600">
    {formatCurrency(USD_AMOUNT, "USD")}
  </span>

  {!loading && convertedAmount && (
    <div className="inline-block mt-3 px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-full shadow-sm">
      ≈ {formatCurrency(convertedAmount, userCurrency)} in {countryName}
    </div>
  )}
</div>

          <p className="text-gray-700 text-center text-base mb-6">
            Spend <span className="font-semibold text-blue-600">{formatCurrency(convertedAmount, userCurrency)} </span> within 
            <span className="font-semibold text-blue-600"> 21 days</span> of signing up to receive your bonus credit.
          </p>
          {!isPaystackSupported && (
            <button
            onClick={() => openPopup('Basic')}
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
          >
            🚀 Get Started
          </button>
          )}
          
          {!loading && (
        <p className="mx-auto justify-center items-center text-center mt-2 text-gray-500">
          Payment method: <strong  className="mx-auto justify-center item-center text-center">{paymentMethod2}</strong>
        </p>
      )}
        </div>

        {/* Offer B - Premium */}
        <div className="border border-gray-200 rounded-2xl bg-white p-8 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] relative">
          <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-bl-xl uppercase tracking-wide">
            Recommended
          </span>
          <div className="text-center mb-8">
              <span className="block text-xs text-gray-400 tracking-widest uppercase mb-1">
                Premium Plan
              </span>

              <span className="block text-5xl font-bold text-blue-600">
                {formatCurrency(USD_AMOUNT2, "USD")}
              </span>

              {!loading && convertedAmount2 && (
                <div className="inline-block mt-3 px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-full shadow-sm">
                  ≈ {formatCurrency(convertedAmount2, userCurrency2)} in {countryName}
                </div>
              )}
            </div>

          <p className="text-gray-700 text-center text-base mb-6">
            Spend <span className="font-semibold text-blue-600">
            {formatCurrency2(convertedAmount2, userCurrency2)}
              </span> within 
            <span className="font-semibold text-blue-600"> 3 Months</span> of signing up to unlock your bonus credit.
          </p>
          
          <button
            onClick={() => openPopup('Premium')}
            className="w-full bg-orange-600 text-white py-3 mx-auto rounded-xl font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
          >
            🌟 Activate Premium
          </button>
          {!loading && (
            <p className="mx-auto justify-center items-center text-center mt-2 text-gray-500">
              Payment method: <strong  className="mx-auto justify-center item-center text-center">{paymentMethod2}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && selectedPlan && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl p-8 max-w-3xl w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl overflow-y-auto max-h-[80vh]">
      <h2 className="text-2xl font-semibold text-center mb-4">
        You are about to pay for the {plans[selectedPlan].name}
      </h2>
      <p className="text-center text-lg mb-6">
        You are about to pay <span className="font-bold text-blue-600">{plans[selectedPlan].amount.toLocaleString()}</span> to publish your event.
      </p>

      {/* Added content for better understanding */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">What's included with this payment?</h3>
        <ul className="list-inside list-disc text-gray-700">
          <li>Complete event listing on our platform</li>
          <li>Exposure to potential attendees and participants</li>
          <li>Targeted promotion within relevant categories</li>
          <li>Exclusive access to our event publishing tools</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Why are you being charged?</h3>
        <p className="text-gray-700">
          The amount covers the cost of publishing your event and promoting it within our platform. Your payment will ensure your event reaches the right audience, maximizing visibility and engagement.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">What happens after payment?</h3>
        <p className="text-gray-700">
          Once the payment is completed, your event will be live on our platform and visible to all potential attendees. You will receive a confirmation email with further instructions to manage and track your event's performance.
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={closePopup}
          className="bg-gray-300 text-gray-700 py-2 px-6 rounded-xl hover:bg-gray-400 transition-all duration-200"
        >
          Cancel
        </button>
        <button
         onClick={() => handlePayment(plans[selectedPlan].amount.toLocaleString())}
          className="bg-orange-600 text-white py-2 px-6 rounded-xl hover:bg-orange-700 transition-all duration-200"
        >
         Poceed to payment
        </button>
      </div>
    </div>
  </div>
)}

</div>
</div>

  <Partners className=""/>
  <div className="mt-10"></div>
  
  <Dialog open={openPopupLogin} onClose={handleClosePopup}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <p>Please log in to continue with the payment process.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Login Now
          </Button>
        </DialogActions>
      </Dialog>
  <ToastContainer />
</div>

  );
};

export default AdsSub;

