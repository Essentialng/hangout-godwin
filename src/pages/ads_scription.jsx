// // // import { useState, useEffect } from "react";
// // // import {
// // //   Dialog,
// // //   TextField,
// // // } from "@mui/material";
// // // import {
  
// // //   Button,
// // //  DialogTitle, DialogContent, DialogActions
// // // } from '@mui/material';
// // // import SensorsIcon from "@mui/icons-material/Sensors";
// // // import { ToastContainer } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";
// // // import { Divider } from "antd";
// // // import banner2 from "../assets/6eb024893ca8d69c7e1ed16821b0e8bd.png";
// // // import Partners from '../components/essentialBrand';
// // // const PAYMENT_PK = import.meta.env.VITE_PAYMENT_API_KEY
// // // import { useNavigate } from "react-router-dom";
// // // const API_EXCHANGE_RATE = import.meta.env.VITE_EXCHANGE_RATE_API_KEY
// // // import AccountTreeIcon from '@mui/icons-material/AccountTree';
// // // import SendToMobileIcon from '@mui/icons-material/SendToMobile';
// // // import OfflinePinIcon from '@mui/icons-material/OfflinePin';

// // // const AdsSub = () => {

// // //   // converter start here from Niara to USD ///////////////////////////////////////// 

// // //   const API_KEY = `${API_EXCHANGE_RATE}`;
// // //   const USD_AMOUNT = 64;

// // //   const [convertedAmount, setConvertedAmount] = useState(null);
// // //   const [userCurrency, setUserCurrency] = useState("USD");
// // //   const [countryName, setCountryName] = useState("Your Country");
// // //   const [countryCode, setCountryCode] = useState("US");
// // //   const [paymentMethod, setPaymentMethod] = useState("USD");
// // //   const [ngnAmount, setNgnAmount] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   // Format currency nicely
// // //   const formatCurrency = (value, currency) =>
// // //     new Intl.NumberFormat(undefined, {
// // //       style: "currency",
// // //       currency,
// // //       maximumFractionDigits: 2,
// // //     }).format(value);

// // //   // Cache helper
// // //   const cacheRate = (currency, rate) => {
// // //     const cacheData = {
// // //       rate,
// // //       timestamp: Date.now(),
// // //     };
// // //     localStorage.setItem(`rate_${currency}`, JSON.stringify(cacheData));
// // //   };

// // //   const getCachedRate = (currency) => {
// // //     const cache = localStorage.getItem(`rate_${currency}`);
// // //     if (!cache) return null;

// // //     const { rate, timestamp } = JSON.parse(cache);
// // //     const oneDay = 1000 * 60 * 60 * 24;
// // //     if (Date.now() - timestamp < oneDay) {
// // //       return rate;
// // //     }
// // //     return null;
// // //   };

// // //   // Payment method based on country
// // //   const getPaymentMethod = (countryCode) => {
// // //     const paystackCountries = ["NG", "GH", "ZA"];
// // //     return paystackCountries.includes(countryCode) ? "Paystack" : "Flutterwave";
// // //   };

// // //   useEffect(() => {
// // //     const fetchUserInfo = async () => {
// // //       try {
// // //         const locRes = await fetch("https://ipapi.co/json/");
// // //         const locData = await locRes.json();

// // //         const currency = locData.currency;
// // //         const country = locData.country_name;
// // //         const code = locData.country_code;

// // //         setUserCurrency(currency);
// // //         setCountryName(country);
// // //         setCountryCode(code);
// // //         setPaymentMethod(getPaymentMethod(code));

// // //         // Convert USD to local currency
// // //         if (currency !== "USD") {
// // //           const cachedRate = getCachedRate(currency);
// // //           if (cachedRate) {
// // //             const converted = (USD_AMOUNT * cachedRate).toFixed(2);
// // //             setConvertedAmount(converted);
// // //             setNgnAmount(converted);
// // //           } else {
// // //             const rateRes = await fetch(
// // //               `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/${currency}`
// // //             );
// // //             const rateData = await rateRes.json();
// // //             const rate = rateData.conversion_rate;

// // //             const converted = (USD_AMOUNT * rate).toFixed(2);
// // //             setConvertedAmount(converted);
// // //             setNgnAmount(converted);
// // //             cacheRate(currency, rate);
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching info", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchUserInfo();
// // //   }, []);


// // //   // 


// // //   const API_KEY2 = `${API_EXCHANGE_RATE}`;
// // //   const USD_AMOUNT2 = 318;

// // //   const [convertedAmount2, setConvertedAmount2] = useState(null);
// // //   const [userCurrency2, setUserCurrency2] = useState("USD");
// // //   const [countryName2, setCountryName2] = useState("Your Country");
// // //   const [countryCode2, setCountryCode2] = useState("US");
// // //   const [paymentMethod2, setPaymentMethod2] = useState("USD");
// // //   const [ngnAmount2, setNgnAmount2] = useState(null);
// // //   const [loading2, setLoading2] = useState(true);

// // //   // Format currency nicely
// // //   const formatCurrency2 = (value, currency) =>
// // //     new Intl.NumberFormat(undefined, {
// // //       style: "currency",
// // //       currency,
// // //       maximumFractionDigits: 2,
// // //     }).format(value);

// // //   // Cache helper
// // //   const cacheRate2 = (currency, rate) => {
// // //     const cacheData = {
// // //       rate,
// // //       timestamp: Date.now(),
// // //     };
// // //     localStorage.setItem(`rate_${currency}`, JSON.stringify(cacheData));
// // //   };

// // //   const getCachedRate2 = (currency) => {
// // //     const cache = localStorage.getItem(`rate_${currency}`);
// // //     if (!cache) return null;

// // //     const { rate, timestamp } = JSON.parse(cache);
// // //     const oneDay = 1000 * 60 * 60 * 24;
// // //     if (Date.now() - timestamp < oneDay) {
// // //       return rate;
// // //     }
// // //     return null;
// // //   };

// // //   // Payment method based on country
// // //   const getPaymentMethod2 = (countryCode) => {
// // //     const paystackCountries = ["NG", "GH", "ZA"]; 
// // //     return paystackCountries.includes(countryCode) ? "Paystack" : "Flutterwave";
// // //   };

// // //   const supportedPaystackMethods = ["NG", "GH", "ZA"]; 
// // //   const isPaystackSupported = supportedPaystackMethods.includes('Paystack');


// // //   useEffect(() => {
// // //     const fetchUserInfo2 = async () => {
// // //       try {
// // //         const locRes = await fetch("https://ipapi.co/json/");
// // //         const locData = await locRes.json();

// // //         const currency = locData.currency;
// // //         const country = locData.country_name;
// // //         const code = locData.country_code;

// // //         setUserCurrency2(currency);
// // //         setCountryName2(country);
// // //         setCountryCode2(code);
// // //         setPaymentMethod2(getPaymentMethod2(code));

// // //         // Convert USD to local currency
// // //         if (currency !== "USD") {
// // //           const cachedRate = getCachedRate2(currency);
// // //           if (cachedRate) {
// // //             const converted = (USD_AMOUNT2 * cachedRate).toFixed(2);
// // //             setConvertedAmount2(converted);
// // //             setNgnAmount2(converted);
// // //           } else {
// // //             const rateRes = await fetch(
// // //               `https://v6.exchangerate-api.com/v6/${API_KEY2}/pair/USD/${currency}`
// // //             );
// // //             const rateData = await rateRes.json();
// // //             const rate = rateData.conversion_rate;

// // //             const converted = (USD_AMOUNT2 * rate).toFixed(2);
// // //             setConvertedAmount2(converted);
// // //             setNgnAmount2(converted);
// // //             cacheRate2(currency, rate);
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching info", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchUserInfo2();
// // //   }, []);


// // //   /// converter end
// // //   const navigate = useNavigate();
// // //   const [channelId, setChannelId] = useState("");
// // //   const [channelId2, setChannelIdIput] = useState("");
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [userId, setUserID] = useState([]);
// // //   const [open, setOpen] = useState(false);

// // //   const [isPopupOpen, setIsPopupOpen] = useState(false);
// // //   const [selectedPlan, setSelectedPlan] = useState(null);
// // //   const [user, setUser] = useState(null);
// // //   // Define plan details
// // //   const plans = {
// // //     Basic: {
// // //       name: "Basic Plan",
// // //       amount: convertedAmount,
      
// // //     },
// // //     Premium: {
// // //       name: "Premium Plan",
// // //       amount: convertedAmount2,
// // //     },
// // //   };
// // // // Check if the user is logged in from localStorage
// // // useEffect(() => {
// // //   const storedUserData = localStorage.getItem("user_data");
// // //   if (storedUserData) {
// // //       setUser(JSON.parse(storedUserData));
// // //       const parsedData = JSON.parse(storedUserData);
// // //       setUserID(parsedData.uid);
// // //       console.log('user_email', parsedData.id);
     
// // //   }
// // // }, []);
// // //   const openPopup = (plan) => {
// // //     setSelectedPlan(plan);
// // //     setIsPopupOpen(true);
// // //   };

// // //   const closePopup = () => {
// // //     setIsPopupOpen(false);
// // //   };
  

// // //   const [openPopupLogin, setOpenPopup] = useState(false);
// // //   const handleClosePopup = () => {
// // //     setOpenPopup(false);
   
// // //     navigate("/SignIn"); 
// // //   };
// // //   const handlePayment = (amount) => {
// // //     if (!user) {
// // //       setOpenPopup(true); window.scrollTo(0,0);
// // //     } else {
// // //       // Convert amount to Kobo (Paystack requires the amount in Kobo)
// // //       const amountInKobo = parseInt(amount.replace(/,/g, '')) * 100;
  
// // //       // Calculate a random charge between 1.5% and 3%
// // //       const chargePercentage = 1.5 + Math.random() * (2 - 1.5); 
// // //       const chargeAmount = Math.round((amountInKobo * chargePercentage) / 100);
  
// // //       // Total amount including Paystack charge
// // //       const totalAmount = amountInKobo + chargeAmount;
  
// // //       const paystack = window.PaystackPop.setup({
// // //         key: `${PAYMENT_PK}`,
// // //         email: user.email, // Use the logged-in user's email
// // //         amount: totalAmount, // Paystack requires amount in kobo (including charge)
// // //         currency: "NGN",
// // //         callback: function (response) {
// // //           alert("Payment was successful! Reference: " + response.reference);
  
// // //           // Handle backend request separately
// // //           // axios
// // //           //   .post(`${API_ROUTE}/payments/create/`, {
// // //           //     user: userId, // Ensure userId is defined
// // //           //     amount: totalAmount, // Send total amount (including charge)
// // //           //     transaction_id: response.reference,
// // //           //   })
// // //           //   .then((res) => {
// // //           //     if (res.status === 201) {
// // //           //       console.log("Payment was successful", res.data);
// // //           //       window.scrollTo(0, 0);
// // //           //       navigate("/Createproduct");
// // //           //     } else {
// // //           //       console.log("Error saving payment to DB.");
// // //           //     }
// // //           //   })
// // //           //   .catch((error) => {
// // //           //     console.error("Error processing payment:", error);
// // //           //   });
// // //             navigate("/CreateLiveEvent");
// // //             window.scrollTo(0,0);
// // //         },
// // //         onClose: function () {
// // //           alert("Payment window closed");
// // //         },
// // //       });
  
// // //       paystack.openIframe();
// // //     }
// // //   };
  

// // //   return (
// // //     <div className="flex flex-col items-center justify-center bg-white">
// // //   {/* Live Streaming Area */}
// // //   <div className="relative w-full">
// // //     <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
// // //       {/* Background Image */}
// // //       <img
     
// // //         src={banner2}
// // //         alt="Live Streaming"
// // //         className="w-full h-full object-cover bg-white"
// // //       />
// // //       <div className="absolute inset-0 bg-black/50"></div>

// // //       {/* Main Content */}
// // //       <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-10">
// // //         <h2 className="text-4xl mt-3 md:text-7xl font-bold leading-tight">
// // //          Reach 8M+ <br /> with Hangout Ads
// // //         </h2>
    
// // //         <p className="mt-2 text-lg md:text-xl max-w-xl">
// // //           Promote your events with sponsored listings on top spots across Hangout
// // //         </p>

// // //         <button
// // //         onClick={()=>{
// // //           window.scrollBy(0, 500);


// // //         }}
// // //           className="mt-6 bg-orange-600 cursor-pointer hover:bg-orange-700 px-5 md:px-8 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
         
// // //         >
// // //           Get Started Now
// // //         </button>
// // //       </div>
// // //     </div>
// // //   </div>

// // //   {/* <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: 12 }}>
// // //       <h2>🌍 Post Your Event</h2>
// // //       <p>
// // //         <strong>Base price:</strong> {formatCurrency(USD_AMOUNT, "USD")}
// // //       </p>

// // //       {!loading && convertedAmount && (
// // //         <p>
// // //           ≈ {formatCurrency(convertedAmount, userCurrency)} in {countryName}
          
// // //         </p>
// // //       )}

// // //       {!loading && (
// // //         <p>
// // //           Payment method: <strong>{paymentMethod}</strong>
// // //         </p>
// // //       )}

// // //       {loading && <p>Loading your location and rate...</p>}
// // //     </div> */}
// // // {/* 
// // //   <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "10px", maxWidth: "300px" }}>
// // //       <h3>🎉 Post Your Event</h3>
// // //       <p style={{ fontSize: "20px", fontWeight: "bold" }}>${USD_AMOUNT} USD</p>
// // //       {!loading && (
// // //         <p style={{ color: "#555" }}>≈ ₦{ngnAmount} NGN (live rate)</p>
// // //       )}
// // //       {loading && <p>Checking exchange rate...</p>}
// // //     </div> */}

// // //   {/* YouTube Channel ID Modal */}
// // //   <Dialog open={open} onClose={() => setOpen(false)}>
// // //     <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] md:w-[450px] text-center">
// // //       <h1 className="text-2xl font-bold text-gray-900 mb-2">
// // //         <SensorsIcon
// // //           style={{ fontSize: 40, color: "red" }}
// // //           className="text-4xl"
// // //         />{" "}
// // //         Go Live on Hangout
// // //       </h1>
// // //       <Divider />
// // //       <p className="text-gray-600 mb-2">
// // //         Broadcast your events and engage with your audience.
// // //       </p>

// // //       {isLoading ? (
// // //         <p className="text-gray-500 animate-pulse">Loading...</p>
// // //       ) : channelId ? (
// // //         <>
// // //           <p className="text-gray-600 mb-4">Your Channel is linked.</p>
// // //           <button
// // //             onClick={handleGoLive}
// // //             className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 w-full"
// // //           >
// // //             🚀 Proceed to Live Streaming
// // //           </button>
// // //         </>
// // //       ) : (
// // //         <>
// // //           <TextField
// // //             fullWidth
// // //             variant="outlined"
// // //             label="Enter YouTube Channel ID"
// // //             value={channelId2 || ""}
// // //             onChange={(e) => setChannelIdIput(e.target.value)}
// // //             className="mt-4"
// // //           />
// // //           <button
// // //             onClick={handleSaveChannelId}
// // //             className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-700 transition-transform transform hover:scale-105 w-full"
// // //           >
// // //             💾 Link Channel & Proceed
// // //           </button>
// // //         </>
// // //       )}
// // //     </div>
// // //   </Dialog>

// // //   <div className="mx-auto px-6 py-16 bg-white">
// // //   <div className="text-center mb-12">
// // //     <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
// // //       Reach More People, Get More Bookings
// // //     </h1>
// // //     <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
// // //       Want your event to stand out? With <span className="font-semibold text-orange-600">Hangout Ads</span>, you can feature your listings in the most visible places — including search results, homepage banners, category highlights, and more.
// // //     </p>
// // //     <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
// // //       <strong>Geo-target your audience</strong> in 90+ cities across the US, UK, Canada, Australia, and Africa to reach the right people at the right time.
// // //     </p>
// // //     <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
// // //       Whether you're hosting a party, conference, or family hangout, our powerful ad tools ensure more eyes on your event and more attendees through the door.
// // //     </p>
   
// // //     <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
// // //   </div>

// // //   <div className="grid md:grid-cols-3 gap-8 text-center">
// // //     <div className="border border-gray-300 rounded-xl border border-gray-200  p-6 shadow hover:shadow-md transition duration-300">
// // //       <AccountTreeIcon style={{fontSize:60}} className="mb-5"/>
// // //       <h3 className="text-xl font-bold text-gray-800 mb-2">Featured Listings</h3>
// // //       <p className="text-gray-600">
// // //         Appear at the top of search results and get discovered first by attendees looking for events like yours.
// // //       </p>
// // //     </div>
// // //     <div className="border border-gray-300 rounded-xl border border-gray-200 p-6 shadow hover:shadow-md transition duration-300">
// // //       <SendToMobileIcon style={{fontSize:60}} className="mt-auto text-center mb-5"/>
// // //       <h3 className="text-xl font-bold text-gray-800 mb-2">Mobile + Web Visibility</h3>
// // //       <p className="text-gray-600">
// // //         Your event gets featured across Hangout’s web platform and mobile apps, boosting your impressions and RSVPs.
// // //       </p>
// // //     </div>
// // //     <div className="border border-gray-300 rounded-xl border border-gray-200  p-6 shadow hover:shadow-md transition duration-300">
// // //       <OfflinePinIcon style={{fontSize:60}} className=" mb-5"/>
// // //       <h3 className="text-xl font-bold text-gray-800 mb-2">Real Results</h3>
// // //       <p className="text-gray-600">
// // //         Events promoted with Hangout Ads see up to <span className="font-bold text-blue-600">30% more attendance</span> compared to unlisted ones.
// // //       </p>
// // //     </div>
// // //   </div>

  
// // // </div>


// // //   <div className="bg-white py-16 px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
// // //     {/* Left Text Section */}
// // //     <div>
// // //       <h2 className="text-4xl font-extrabold text-gray-900 mb-4">GET BETTER RESULTS</h2>
// // //       <p className="text-gray-600 mb-8">See your ads perform better on the best event marketing platform</p>

// // //       <div className="space-y-8">
// // //         <div>
// // //           <h3 className="text-lg font-semibold text-gray-900">Drive more clicks</h3>
// // //           <p className="text-gray-700">
// // //             Boost visibility and engagement for your events with <span className="font-semibold underline">Hangout Ads</span>. 
// // //             Our platform is designed to help you reach the right audience at the right time—resulting in up to 30% higher click-through rates compared to traditional Facebook Ads*. 
// // //             Whether you're hosting a casual meetup, social hangout, or large-scale gathering, Hangout Ads ensures your event gets the attention it deserves.
// // //           </p>
// // //         </div>

// // //         <div>
// // //           <h3 className="text-lg font-semibold text-gray-900">Set campaign goals</h3>
// // //           <p className="text-gray-700">
// // //             Pick a goal for your ad, like maximizing your reach or driving more clicks to your event, and our platform will automatically optimize for the best results.
// // //           </p>
// // //         </div>

// // //         <div>
// // //           <h3 className="text-lg font-semibold text-gray-900">Make the most of your ad budget</h3>
// // //           <p className="text-gray-700">
// // //             The effective cost per click (eCPC) is now over 30% cheaper. Our smart ad system changes bid prices in real-time to help you get the best value for your ads.
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>

// // //     {/* Right Image/Stat Section */}
// // //     <div className="gap-4">
// // //       <img
// // //         src="https://eventbrite-s3.s3.us-east-1.amazonaws.com/marketing/landingpages/assets/2025/rebrand/l/eventbrite-ads/a--sq-img--00.png"
// // //         alt="Event 1"
// // //         className="rounded-xl object-cover w-full h-full"
// // //       />
// // //     </div>
// // //   </div>

// // // <div className="max-w-6xl mx-auto p-6 md:p-12 bg-gradient-to-br from-gray-200 to-gray-200 rounded-2xl mb-20">
// // //   <h2 className="text-4xl text-center font-extrabold text-gray-900 mb-4">
// // //     Kickstart Your Campaign with an Exclusive Offer
// // //   </h2>

// // //   <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8 text-lg">
// // //     Select a plan that fits your goals and budget. Launch your first ad campaign and unlock bonus credits when you hit the spend target—fueling even more growth.
// // //     <span className="text-sm block text-gray-500 mt-2 italic">*Terms and conditions apply.</span>
// // //   </p>

// // //   <div>
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
// // //         {/* Offer A - Basic */}
// // //         <div className="border border-gray-200 rounded-2xl bg-white p-8 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]">
// // //         <div className="text-center mb-8">
// // //   <span className="block text-xs text-gray-400 tracking-widest uppercase mb-1">
// // //     Basic Plan
// // //   </span>

// // //   <span className="block text-5xl font-bold text-blue-600">
// // //     {formatCurrency(USD_AMOUNT, "USD")}
// // //   </span>

// // //   {!loading && convertedAmount && (
// // //     <div className="inline-block mt-3 px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-full shadow-sm">
// // //       ≈ {formatCurrency(convertedAmount, userCurrency)} in {countryName}
// // //     </div>
// // //   )}
// // // </div>

// // //           <p className="text-gray-700 text-center text-base mb-6">
// // //             Spend <span className="font-semibold text-blue-600">{formatCurrency(convertedAmount, userCurrency)} </span> within 
// // //             <span className="font-semibold text-blue-600"> 21 days</span> of signing up to receive your bonus credit.
// // //           </p>
// // //           {!isPaystackSupported && (
// // //             <button
// // //             onClick={() => openPopup('Basic')}
// // //             className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
// // //           >
// // //             Get Started
// // //           </button>
// // //           )}
          
// // //           {!loading && (
// // //         <p className="mx-auto justify-center items-center text-center mt-2 text-gray-500">
// // //           Payment method: <strong  className="mx-auto justify-center item-center text-center">{paymentMethod2}</strong>
// // //         </p>
// // //       )}
// // //         </div>

// // //         {/* Offer B - Premium */}
// // //         <div className="border border-gray-200 rounded-2xl bg-white p-8 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] relative">
// // //           <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-bl-xl uppercase tracking-wide">
// // //             Recommended
// // //           </span>
// // //           <div className="text-center mb-8">
// // //               <span className="block text-xs text-gray-400 tracking-widest uppercase mb-1">
// // //                 Premium Plan
// // //               </span>

// // //               <span className="block text-5xl font-bold text-blue-600">
// // //                 {formatCurrency(USD_AMOUNT2, "USD")}
// // //               </span>

// // //               {!loading && convertedAmount2 && (
// // //                 <div className="inline-block mt-3 px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-full shadow-sm">
// // //                   ≈ {formatCurrency(convertedAmount2, userCurrency2)} in {countryName}
// // //                 </div>
// // //               )}
// // //             </div>

// // //           <p className="text-gray-700 text-center text-base mb-6">
// // //             Spend <span className="font-semibold text-blue-600">
// // //             {formatCurrency2(convertedAmount2, userCurrency2)}
// // //               </span> within 
// // //             <span className="font-semibold text-blue-600"> 3 Months</span> of signing up to unlock your bonus credit.
// // //           </p>
          
// // //           <button
// // //             onClick={() => openPopup('Premium')}
// // //             className="w-full bg-orange-600 text-white py-3 mx-auto rounded-xl font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
// // //           >
// // //             Activate Premium
// // //           </button>
// // //           {!loading && (
// // //             <p className="mx-auto justify-center items-center text-center mt-2 text-gray-500">
// // //               Payment method: <strong  className="mx-auto justify-center item-center text-center">{paymentMethod2}</strong>
// // //             </p>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Popup Modal */}
// // //       {isPopupOpen && selectedPlan && (
// // //   <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
// // //     <div className="bg-white rounded-xl p-8 max-w-3xl w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl overflow-y-auto max-h-[80vh]">
// // //       <h2 className="text-2xl font-semibold text-center mb-4">
// // //         You are about to pay for the {plans[selectedPlan].name}
// // //       </h2>
// // //       <p className="text-center text-lg mb-6">
// // //         You are about to pay <span className="font-bold text-blue-600">{plans[selectedPlan].amount.toLocaleString()}</span> to publish your event.
// // //       </p>

// // //       {/* Added content for better understanding */}
// // //       <div className="mb-6">
// // //         <h3 className="text-lg font-semibold">What's included with this payment?</h3>
// // //         <ul className="list-inside list-disc text-gray-700">
// // //           <li>Complete event listing on our platform</li>
// // //           <li>Exposure to potential attendees and participants</li>
// // //           <li>Targeted promotion within relevant categories</li>
// // //           <li>Exclusive access to our event publishing tools</li>
// // //         </ul>
// // //       </div>

// // //       <div className="mb-6">
// // //         <h3 className="text-lg font-semibold">Why are you being charged?</h3>
// // //         <p className="text-gray-700">
// // //           The amount covers the cost of publishing your event and promoting it within our platform. Your payment will ensure your event reaches the right audience, maximizing visibility and engagement.
// // //         </p>
// // //       </div>

// // //       <div className="mb-6">
// // //         <h3 className="text-lg font-semibold">What happens after payment?</h3>
// // //         <p className="text-gray-700">
// // //           Once the payment is completed, your event will be live on our platform and visible to all potential attendees. You will receive a confirmation email with further instructions to manage and track your event's performance.
// // //         </p>
// // //       </div>

// // //       <div className="flex justify-center gap-4">
// // //         <button
// // //           onClick={closePopup}
// // //           className="bg-gray-300 text-gray-700 py-2 px-6 rounded-xl hover:bg-gray-400 transition-all duration-200"
// // //         >
// // //           Cancel
// // //         </button>
// // //         <button
// // //          onClick={() => handlePayment(plans[selectedPlan].amount.toLocaleString())}
// // //           className="bg-orange-600 text-white py-2 px-6 rounded-xl hover:bg-orange-700 transition-all duration-200"
// // //         >
// // //          Poceed to payment
// // //         </button>
// // //       </div>
// // //     </div>
// // //   </div>
// // // )}

// // // </div>
// // // </div>

// // //   <Partners className=""/>
// // //   <div className="mt-10"></div>
  
// // //   <Dialog open={openPopupLogin} onClose={handleClosePopup}>
// // //         <DialogTitle>Login Required</DialogTitle>
// // //         <DialogContent>
// // //           <p>Please log in to continue with the payment process.</p>
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={handleClosePopup} color="primary">
// // //             Login Now
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //   <ToastContainer />
// // // </div>

// // //   );
// // // };

// // // export default AdsSub;


// // import { useState, useEffect } from "react";
// // import {
// //   Dialog,
// //   TextField,
// //   Button,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions
// // } from "@mui/material";
// // import { motion } from "framer-motion";
// // import SensorsIcon from "@mui/icons-material/Sensors";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { Divider } from "antd";
// // import banner2 from "../assets/6eb024893ca8d69c7e1ed16821b0e8bd.png";
// // import Partners from '../components/essentialBrand';
// // import { useNavigate } from "react-router-dom";
// // import AccountTreeIcon from '@mui/icons-material/AccountTree';
// // import SendToMobileIcon from '@mui/icons-material/SendToMobile';
// // import OfflinePinIcon from '@mui/icons-material/OfflinePin';
// // import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// // import PeopleIcon from '@mui/icons-material/People';
// // import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// // import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// // const PAYMENT_PK = import.meta.env.VITE_PAYMENT_API_KEY;
// // const API_EXCHANGE_RATE = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

// // const AdsSub = () => {
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(true);
// //   const [user, setUser] = useState(null);
// //   const [userId, setUserID] = useState([]);
// //   const [isPopupOpen, setIsPopupOpen] = useState(false);
// //   const [selectedPlan, setSelectedPlan] = useState(null);
// //   const [openPopupLogin, setOpenPopup] = useState(false);

// //   // Currency and location state
// //   const [userCurrency, setUserCurrency] = useState("USD");
// //   const [countryName, setCountryName] = useState("Your Country");
// //   const [countryCode, setCountryCode] = useState("US");
// //   const [paymentMethod, setPaymentMethod] = useState("Paystack");
  
// //   // Plan amounts
// //   const BASIC_USD = 64;
// //   const PREMIUM_USD = 318;
  
// //   // Converted amounts
// //   const [basicAmount, setBasicAmount] = useState(null);
// //   const [premiumAmount, setPremiumAmount] = useState(null);
// //   const [basicAmountNGN, setBasicAmountNGN] = useState(null);
// //   const [premiumAmountNGN, setPremiumAmountNGN] = useState(null);

// //   // Format currency
// //   const formatCurrency = (value, currency) => {
// //     if (!value) return `$0.00`;
// //     return new Intl.NumberFormat(undefined, {
// //       style: "currency",
// //       currency: currency || "USD",
// //       maximumFractionDigits: 2,
// //     }).format(value);
// //   };

// //   // Cache helper
// //   const cacheRate = (currency, rate) => {
// //     const cacheData = { rate, timestamp: Date.now() };
// //     localStorage.setItem(`rate_${currency}`, JSON.stringify(cacheData));
// //   };

// //   const getCachedRate = (currency) => {
// //     const cache = localStorage.getItem(`rate_${currency}`);
// //     if (!cache) return null;
// //     const { rate, timestamp } = JSON.parse(cache);
// //     const oneDay = 1000 * 60 * 60 * 24;
// //     if (Date.now() - timestamp < oneDay) return rate;
// //     return null;
// //   };

// //   // Get payment method based on country
// //   // const getPaymentMethod = (countryCode) => {
// //   //   const paystackCountries = ["NG", "GH", "ZA", "KE"];
// //   //   return paystackCountries.includes(countryCode) ? "Paystack" : "Flutterwave";
// //   // };


// //   // Paystack official countries (businesses registered here)
// // const paystackCountries = ["NG", "GH", "ZA", "KE", "CI"];

// // // Flutterwave covers nearly all other countries globally
// // const flutterwaveCountries = [
// //   // Africa
// //   "SN", "UG", "TZ", "RW", "MW", "EG", "CM", "ET",
// //   // Europe
// //   "GB", "FR", "DE", "ES", "IT", "NL", "AT", "BE", "CH", "DK", "FI", "GR", "IE", "NO", "PT", "SE",
// //   // Americas
// //   "US", "CA"
// //   // ... and many more
// // ];

// // const getPaymentMethod = (countryCode) => {
// //   // Prefer Paystack in countries where it's officially available
// //   if (paystackCountries.includes(countryCode)) {
// //     return "Paystack";
// //   }
  
// //   // Fallback to Flutterwave for all other countries
// //   // Flutterwave operates in 30+ African countries + US/UK/Europe
// //   return "Flutterwave";
// // };

// //   // Fetch user info and currency conversion
// //   useEffect(() => {
// //     const fetchUserInfo = async () => {
// //       try {
// //         const locRes = await fetch("https://ipapi.co/json/");
// //         const locData = await locRes.json();

// //         const currency = locData.currency || "USD";
// //         const country = locData.country_name || "United States";
// //         const code = locData.country_code || "US";

// //         setUserCurrency(currency);
// //         setCountryName(country);
// //         setCountryCode(code);
// //         setPaymentMethod(getPaymentMethod(code));

// //         // Convert both amounts
// //         const convertAmount = async (usdAmount) => {
// //           if (currency === "USD") {
// //             return { converted: usdAmount, ngn: usdAmount * 1600 }; // Fallback rate
// //           }

// //           const cachedRate = getCachedRate(currency);
// //           let rate = cachedRate;

// //           if (!rate) {
// //             const rateRes = await fetch(
// //               `https://v6.exchangerate-api.com/v6/${API_EXCHANGE_RATE}/pair/USD/${currency}`
// //             );
// //             const rateData = await rateRes.json();
// //             rate = rateData.conversion_rate;
// //             if (rate) cacheRate(currency, rate);
// //           }

// //           const converted = usdAmount * rate;
// //           const ngnAmount = usdAmount * 1600; // Keep NGN as reference
// //           return { converted, ngn: ngnAmount };
// //         };

// //         const basic = await convertAmount(BASIC_USD);
// //         const premium = await convertAmount(PREMIUM_USD);

// //         setBasicAmount(basic.converted);
// //         setBasicAmountNGN(basic.ngn);
// //         setPremiumAmount(premium.converted);
// //         setPremiumAmountNGN(premium.ngn);

// //       } catch (error) {
// //         console.error("Error fetching info:", error);
// //         // Fallback values
// //         setBasicAmount(BASIC_USD);
// //         setPremiumAmount(PREMIUM_USD);
// //         setBasicAmountNGN(BASIC_USD * 1600);
// //         setPremiumAmountNGN(PREMIUM_USD * 1600);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserInfo();
// //   }, []);

// //   // Check user login status
// //   useEffect(() => {
// //     const storedUserData = localStorage.getItem("user_data");
// //     if (storedUserData) {
// //       const parsedData = JSON.parse(storedUserData);
// //       setUser(parsedData);
// //       setUserID(parsedData.uid);
// //       console.log('User logged in:', parsedData.email);
// //     }
// //   }, []);

// //   // Plan details with dynamic amounts
// //   const getPlanDetails = (plan) => {
// //     const plans = {
// //       Basic: {
// //         name: "Basic Plan",
// //         description: "Perfect for small events and local gatherings",
// //         usdAmount: BASIC_USD,
// //         localAmount: basicAmount,
// //         ngnAmount: basicAmountNGN,
// //         currency: userCurrency,
// //         features: [
// //           "Featured listing for 7 days",
// //           "500+ targeted impressions",
// //           "Basic analytics dashboard",
// //           "Email support",
// //           "Social media promotion"
// //         ],
// //         bonus: "Spend within 21 days to get $20 bonus credit"
// //       },
// //       Premium: {
// //         name: "Premium Plan",
// //         description: "Ideal for large events and maximum exposure",
// //         usdAmount: PREMIUM_USD,
// //         localAmount: premiumAmount,
// //         ngnAmount: premiumAmountNGN,
// //         currency: userCurrency,
// //         features: [
// //           "Featured listing for 30 days",
// //           "5000+ targeted impressions",
// //           "Advanced analytics dashboard",
// //           "Priority support",
// //           "Multi-platform promotion",
// //           "Geo-targeted advertising",
// //           "Social media boost"
// //         ],
// //         bonus: "Spend within 3 months to get $100 bonus credit"
// //       }
// //     };
// //     return plans[plan];
// //   };

// //   const openPopup = (plan) => {
// //     if (!user) {
// //       setOpenPopup(true);
// //       return;
// //     }
// //     setSelectedPlan(plan);
// //     setIsPopupOpen(true);
// //   };

// //   const closePopup = () => {
// //     setIsPopupOpen(false);
// //     setSelectedPlan(null);
// //   };

// //   const handleClosePopup = () => {
// //     setOpenPopup(false);
// //     navigate("/SignIn");
// //   };

// //   const handlePayment = (plan) => {
// //     const planDetails = getPlanDetails(plan);
// //     const amount = planDetails.localAmount || planDetails.usdAmount;
    
// //     // Use the appropriate payment gateway based on country
// //     if (paymentMethod === "Paystack" && countryCode === "NG") {
// //       // Paystack requires amount in kobo (NGN)
// //       const amountInNGN = planDetails.ngnAmount || amount * 1600;
// //       const amountInKobo = Math.round(amountInNGN * 100);
      
// //       // Add Paystack charge (1.5% + 50 NGN)
// //       const charge = Math.round(amountInKobo * 0.015) + 5000;
// //       const totalAmount = amountInKobo + charge;

// //       const paystack = window.PaystackPop.setup({
// //         key: PAYMENT_PK,
// //         email: user?.email || "user@example.com",
// //         amount: totalAmount,
// //         currency: "NGN",
// //         callback: function (response) {
// //           toast.success(`Payment successful! Reference: ${response.reference}`);
// //           navigate("/CreateLiveEvent");
// //           window.scrollTo(0, 0);
// //         },
// //         onClose: function () {
// //           toast.info("Payment window closed");
// //         },
// //       });
// //       paystack.openIframe();
// //     } else {
// //       // Flutterwave or other payment gateway
// //       // Implement Flutterwave payment here
// //       toast.info(`Processing ${plan} payment with ${paymentMethod}`);
// //       navigate("/CreateLiveEvent");
// //       window.scrollTo(0, 0);
// //     }
// //   };

// //   // Animation variants
// //   const fadeInUp = {
// //     initial: { opacity: 0, y: 30 },
// //     animate: { opacity: 1, y: 0 },
// //     transition: { duration: 0.6 }
// //   };

// //   const staggerContainer = {
// //     animate: {
// //       transition: {
// //         staggerChildren: 0.1
// //       }
// //     }
// //   };

// //   const scaleOnHover = {
// //     whileHover: { scale: 1.05 },
// //     transition: { duration: 0.2 }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center bg-white overflow-x-hidden">
// //       {/* Hero Section with Animation */}
// //       <motion.div 
// //         className="relative w-full"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ duration: 0.8 }}
// //       >
// //         <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
// //           <img
// //             src={banner2}
// //             alt="Live Streaming"
// //             className="w-full h-full object-cover"
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

// //           <motion.div 
// //             className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-10"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.3, duration: 0.8 }}
// //           >
// //             <motion.h2 
// //               className="text-4xl md:text-7xl font-bold leading-tight"
// //               initial={{ scale: 0.9 }}
// //               animate={{ scale: 1 }}
// //               transition={{ delay: 0.5, duration: 0.5 }}
// //             >
// //               Reach 8M+ <br /> with Hangout Ads
// //             </motion.h2>
        
// //             <motion.p 
// //               className="mt-4 text-lg md:text-xl max-w-xl text-gray-200"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ delay: 0.7, duration: 0.5 }}
// //             >
// //               Promote your events with sponsored listings on top spots across Hangout
// //             </motion.p>

// //             <motion.button
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.95 }}
// //               onClick={() => window.scrollBy(0, 600)}
// //               className="mt-8 bg-orange-600 hover:bg-orange-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg flex items-center transition-all duration-300"
// //             >
// //               Get Started Now
// //               <TrendingUpIcon className="ml-2" />
// //             </motion.button>
// //           </motion.div>
// //         </div>
// //       </motion.div>

// //       {/* Info Section */}
// //       <motion.div 
// //         className="mx-auto px-6 py-16 bg-white max-w-7xl"
// //         initial={{ opacity: 0 }}
// //         whileInView={{ opacity: 1 }}
// //         viewport={{ once: true }}
// //         transition={{ duration: 0.8 }}
// //       >
// //         <motion.div 
// //           className="text-center mb-12"
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //         >
// //           <motion.h1 
// //             className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
// //             initial={{ scale: 0.9 }}
// //             whileInView={{ scale: 1 }}
// //             viewport={{ once: true }}
// //           >
// //             Reach More People, Get More Bookings
// //           </motion.h1>
// //           <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
// //             Want your event to stand out? With <span className="font-semibold text-orange-600">Hangout Ads</span>, you can feature your listings in the most visible places — including search results, homepage banners, category highlights, and more.
// //           </p>
// //           <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
// //             <strong>Geo-target your audience</strong> in 90+ cities across the US, UK, Canada, Australia, and Africa to reach the right people at the right time.
// //           </p>
// //           <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
// //             Whether you're hosting a party, conference, or family hangout, our powerful ad tools ensure more eyes on your event and more attendees through the door.
// //           </p>
// //           <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
// //         </motion.div>

// //         <motion.div 
// //           className="grid md:grid-cols-3 gap-8"
// //           variants={staggerContainer}
// //           initial="initial"
// //           whileInView="animate"
// //           viewport={{ once: true }}
// //         >
// //           {[
// //             { icon: AccountTreeIcon, title: "Featured Listings", desc: "Appear at the top of search results and get discovered first by attendees looking for events like yours." },
// //             { icon: SendToMobileIcon, title: "Mobile + Web Visibility", desc: "Your event gets featured across Hangout's web platform and mobile apps, boosting your impressions and RSVPs." },
// //             { icon: OfflinePinIcon, title: "Real Results", desc: "Events promoted with Hangout Ads see up to 30% more attendance compared to unlisted ones." }
// //           ].map((item, index) => (
// //             <motion.div
// //               key={index}
// //               variants={fadeInUp}
// //               whileHover={{ y: -10, transition: { duration: 0.2 } }}
// //               className="border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
// //             >
// //               <item.icon style={{ fontSize: 60 }} className="text-orange-500 mb-4" />
// //               <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
// //               <p className="text-gray-600 leading-relaxed">{item.desc}</p>
// //             </motion.div>
// //           ))}
// //         </motion.div>
// //       </motion.div>

// //       {/* Results Section */}
// //       <motion.div 
// //         className="bg-white py-16 px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center max-w-7xl"
// //         initial={{ opacity: 0, x: -50 }}
// //         whileInView={{ opacity: 1, x: 0 }}
// //         viewport={{ once: true }}
// //         transition={{ duration: 0.8 }}
// //       >
// //         <motion.div>
// //           <motion.h2 
// //             className="text-4xl font-extrabold text-gray-900 mb-4"
// //             initial={{ opacity: 0 }}
// //             whileInView={{ opacity: 1 }}
// //             viewport={{ once: true }}
// //           >
// //             GET BETTER RESULTS
// //           </motion.h2>
// //           <p className="text-gray-600 mb-8 text-lg">See your ads perform better on the best event marketing platform</p>

// //           <div className="space-y-8">
// //             {[
// //               { title: "Drive more clicks", desc: "Boost visibility and engagement for your events with Hangout Ads. Our platform is designed to help you reach the right audience at the right time—resulting in up to 30% higher click-through rates." },
// //               { title: "Set campaign goals", desc: "Pick a goal for your ad, like maximizing your reach or driving more clicks to your event, and our platform will automatically optimize for the best results." },
// //               { title: "Make the most of your ad budget", desc: "The effective cost per click (eCPC) is now over 30% cheaper. Our smart ad system changes bid prices in real-time to help you get the best value for your ads." }
// //             ].map((item, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, x: -20 }}
// //                 whileInView={{ opacity: 1, x: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ delay: index * 0.2 }}
// //                 whileHover={{ x: 10 }}
// //               >
// //                 <h3 className="text-lg font-semibold text-gray-900 flex items-center">
// //                   <CheckCircleIcon className="text-orange-500 mr-2" />
// //                   {item.title}
// //                 </h3>
// //                 <p className="text-gray-700 ml-8">{item.desc}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </motion.div>

// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.9 }}
// //           whileInView={{ opacity: 1, scale: 1 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.6 }}
// //         >
// //           <img
// //             src="https://eventbrite-s3.s3.us-east-1.amazonaws.com/marketing/landingpages/assets/2025/rebrand/l/eventbrite-ads/a--sq-img--00.png"
// //             alt="Event"
// //             className="rounded-xl object-cover w-full h-full shadow-2xl"
// //           />
// //         </motion.div>
// //       </motion.div>

// //       {/* Pricing Section */}
// //       <motion.div 
// //         className="max-w-7xl mx-auto p-6 md:p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-20"
// //         initial={{ opacity: 0, y: 50 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         viewport={{ once: true }}
// //         transition={{ duration: 0.8 }}
// //       >
// //         <motion.h2 
// //           className="text-4xl text-center font-extrabold text-gray-900 mb-4"
// //           initial={{ scale: 0.9 }}
// //           whileInView={{ scale: 1 }}
// //           viewport={{ once: true }}
// //         >
// //           Kickstart Your Campaign with an Exclusive Offer
// //         </motion.h2>

// //         <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8 text-lg">
// //           Select a plan that fits your goals and budget. Launch your first ad campaign and unlock bonus credits when you hit the spend target—fueling even more growth.
// //           <span className="text-sm block text-gray-500 mt-2 italic">*Terms and conditions apply.</span>
// //         </p>

// //         {loading ? (
// //           <div className="text-center py-20">
// //             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
// //             <p className="mt-4 text-gray-600">Loading pricing information...</p>
// //           </div>
// //         ) : (
// //           <motion.div 
// //             className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
// //             variants={staggerContainer}
// //             initial="initial"
// //             whileInView="animate"
// //             viewport={{ once: true }}
// //           >
// //             {['Basic', 'Premium'].map((plan) => {
// //               const details = getPlanDetails(plan);
// //               const isPremium = plan === 'Premium';
              
// //               return (
// //                 <motion.div
// //                   key={plan}
// //                   variants={fadeInUp}
// //                   whileHover={{ y: -15, transition: { duration: 0.3 } }}
// //                   className={`border-2 rounded-2xl p-8 transition-all duration-300 relative ${
// //                     isPremium 
// //                       ? 'border-orange-500 bg-gradient-to-br from-white to-orange-50 shadow-2xl' 
// //                       : 'border-gray-200 bg-white shadow-lg hover:shadow-2xl'
// //                   }`}
// //                 >
// //                   {isPremium && (
// //                     <span className="absolute -top-3 right-8 bg-orange-500 text-white text-sm font-bold py-1 px-4 rounded-full uppercase tracking-wide shadow-lg">
// //                       Best Value
// //                     </span>
// //                   )}
                  
// //                   <div className="text-center mb-6">
// //                     <span className="block text-sm text-gray-500 tracking-widest uppercase mb-1">
// //                       {details.name}
// //                     </span>
// //                     <span className="block text-5xl font-bold text-orange-600">
// //                       {formatCurrency(details.localAmount || details.usdAmount, details.currency)}
// //                     </span>
// //                     <div className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
// //                       ≈ {formatCurrency(details.usdAmount, "USD")} USD
// //                     </div>
// //                     <p className="text-sm text-gray-500 mt-1">
// //                       Payment via {paymentMethod}
// //                     </p>
// //                   </div>

// //                   <p className="text-gray-600 text-center text-sm mb-4">
// //                     {details.description}
// //                   </p>

// //                   <div className="mb-6">
// //                     <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
// //                       <LocalOfferIcon className="text-orange-500 mr-2" />
// //                       What's included:
// //                     </h4>
// //                     <ul className="space-y-2">
// //                       {details.features.map((feature, idx) => (
// //                         <li key={idx} className="flex items-start text-gray-600 text-sm">
// //                           <CheckCircleIcon className="text-green-500 mr-2 text-sm mt-0.5" />
// //                           {feature}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>

// //                   <div className="bg-blue-50 p-3 rounded-lg mb-6">
// //                     <p className="text-sm text-blue-800 flex items-start">
// //                       <PeopleIcon className="text-blue-600 mr-2" />
// //                       <span>{details.bonus}</span>
// //                     </p>
// //                   </div>

// //                   <motion.button
// //                     whileHover={{ scale: 1.02 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     onClick={() => openPopup(plan)}
// //                     className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
// //                       isPremium
// //                         ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl'
// //                         : 'bg-gray-800 text-white hover:bg-gray-900'
// //                     }`}
// //                   >
// //                     {user ? 'Get Started' : 'Login to Proceed'}
// //                   </motion.button>
// //                 </motion.div>
// //               );
// //             })}
// //           </motion.div>
// //         )}
// //       </motion.div>

// //       <Partners />

// //       {/* Payment Popup */}
// //       {isPopupOpen && selectedPlan && (
// //         <motion.div 
// //           className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //         >
// //           <motion.div 
// //             className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
// //             initial={{ scale: 0.8, y: 50 }}
// //             animate={{ scale: 1, y: 0 }}
// //             transition={{ type: "spring", damping: 25 }}
// //           >
// //             <div className="flex justify-between items-start mb-4">
// //               <h2 className="text-2xl font-bold text-gray-900">
// //                 Confirm Your Payment
// //               </h2>
// //               <button onClick={closePopup} className="text-gray-400 hover:text-gray-600 text-2xl">
// //                 ×
// //               </button>
// //             </div>

// //             {(() => {
// //               const details = getPlanDetails(selectedPlan);
// //               const displayAmount = details.localAmount || details.usdAmount;
// //               const displayCurrency = details.currency || 'USD';
              
// //               return (
// //                 <>
// //                   <div className="bg-orange-50 p-6 rounded-xl mb-6">
// //                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
// //                       {details.name}
// //                     </h3>
// //                     <p className="text-3xl font-bold text-orange-600">
// //                       {formatCurrency(displayAmount, displayCurrency)}
// //                     </p>
// //                     <p className="text-sm text-gray-500">
// //                       ≈ {formatCurrency(details.usdAmount, "USD")} USD
// //                     </p>
// //                     <p className="text-sm text-gray-500 mt-1">
// //                       Payment Method: <strong>{paymentMethod}</strong>
// //                     </p>
// //                   </div>

// //                   <div className="mb-6">
// //                     <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //                       What's included with this payment?
// //                     </h3>
// //                     <ul className="space-y-1">
// //                       {details.features.map((feature, idx) => (
// //                         <li key={idx} className="flex items-start text-gray-600">
// //                           <CheckCircleIcon className="text-green-500 mr-2 text-sm mt-0.5" />
// //                           {feature}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>

// //                   <div className="bg-blue-50 p-4 rounded-xl mb-6">
// //                     <h3 className="text-lg font-semibold text-blue-800 mb-1">
// //                       Why are you being charged?
// //                     </h3>
// //                     <p className="text-blue-700 text-sm">
// //                       This payment covers your event listing, promotion across our platform, and access to our publishing tools. Your event will reach thousands of potential attendees.
// //                     </p>
// //                   </div>

// //                   <div className="bg-green-50 p-4 rounded-xl mb-6">
// //                     <h3 className="text-lg font-semibold text-green-800 mb-1">
// //                       What happens after payment?
// //                     </h3>
// //                     <p className="text-green-700 text-sm">
// //                       Your event will go live immediately. You'll receive a confirmation email with instructions to manage and track your event's performance.
// //                     </p>
// //                   </div>

// //                   <div className="flex flex-col sm:flex-row justify-center gap-4">
// //                     <button
// //                       onClick={closePopup}
// //                       className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
// //                     >
// //                       Cancel
// //                     </button>
// //                     <motion.button
// //                       whileHover={{ scale: 1.05 }}
// //                       whileTap={{ scale: 0.95 }}
// //                       onClick={() => handlePayment(selectedPlan)}
// //                       className="px-8 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all duration-200 shadow-lg"
// //                     >
// //                       Proceed to Payment
// //                     </motion.button>
// //                   </div>
// //                 </>
// //               );
// //             })()}
// //           </motion.div>
// //         </motion.div>
// //       )}

// //       {/* Login Required Dialog */}
// //       <Dialog open={openPopupLogin} onClose={handleClosePopup}>
// //         <DialogTitle className="text-2xl font-bold text-gray-800">
// //           Login Required
// //         </DialogTitle>
// //         <DialogContent>
// //           <p className="text-gray-600">
// //             Please log in to continue with the payment process and unlock all features.
// //           </p>
// //         </DialogContent>
// //         <DialogActions className="p-4">
// //           <Button onClick={handleClosePopup} variant="contained" color="primary">
// //             Login Now
// //           </Button>
// //           <Button onClick={() => setOpenPopup(false)} color="secondary">
// //             Cancel
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       <ToastContainer position="top-right" autoClose={5000} />
// //     </div>
// //   );
// // };

// // export default AdsSub;


// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   TextField,
//   Button,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Divider } from "antd";
// import banner2 from "../assets/6eb024893ca8d69c7e1ed16821b0e8bd.png";
// import Partners from '../components/essentialBrand';
// import { useNavigate } from "react-router-dom";
// import AccountTreeIcon from '@mui/icons-material/AccountTree';
// import SendToMobileIcon from '@mui/icons-material/SendToMobile';
// import OfflinePinIcon from '@mui/icons-material/OfflinePin';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import PeopleIcon from '@mui/icons-material/People';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import PaymentIcon from '@mui/icons-material/Payment';
// import CloseIcon from '@mui/icons-material/Close';

// const PAYMENT_PK = import.meta.env.VITE_PAYMENT_API_KEY;
// const API_EXCHANGE_RATE = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

// const AdsSub = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [userId, setUserID] = useState([]);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [openPopupLogin, setOpenPopup] = useState(false);
//   const [selectedCurrency, setSelectedCurrency] = useState("NGN");
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Currency and location state
//   const [userCurrency, setUserCurrency] = useState("NGN");
//   const [countryName, setCountryName] = useState("Nigeria");
//   const [countryCode, setCountryCode] = useState("NG");
  
//   // Plan amounts in USD
//   const BASIC_USD = 64;
//   const PREMIUM_USD = 318;
  
//   // Converted amounts
//   const [basicAmount, setBasicAmount] = useState(null);
//   const [premiumAmount, setPremiumAmount] = useState(null);
//   const [exchangeRate, setExchangeRate] = useState(1600);

//   // Load Paystack script
//   useEffect(() => {
//     const loadPaystackScript = () => {
//       if (!window.PaystackPop) {
//         const script = document.createElement('script');
//         script.src = 'https://js.paystack.co/v1/inline.js';
//         script.async = true;
//         document.body.appendChild(script);
//       }
//     };
//     loadPaystackScript();
//   }, []);

//   // Format currency
//   const formatCurrency = (value, currency) => {
//     if (!value) return `$0.00`;
//     return new Intl.NumberFormat(undefined, {
//       style: "currency",
//       currency: currency || "USD",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(value);
//   };

//   // Cache helper
//   const cacheRate = (currency, rate) => {
//     const cacheData = { rate, timestamp: Date.now() };
//     localStorage.setItem(`rate_${currency}`, JSON.stringify(cacheData));
//   };

//   const getCachedRate = (currency) => {
//     const cache = localStorage.getItem(`rate_${currency}`);
//     if (!cache) return null;
//     const { rate, timestamp } = JSON.parse(cache);
//     const oneDay = 1000 * 60 * 60 * 24;
//     if (Date.now() - timestamp < oneDay) return rate;
//     return null;
//   };

//   // Fetch user info and currency conversion
//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const locRes = await fetch("https://ipapi.co/json/");
//         const locData = await locRes.json();

//         const currency = locData.currency || "NGN";
//         const country = locData.country_name || "Nigeria";
//         const code = locData.country_code || "NG";

//         setUserCurrency(currency);
//         setCountryName(country);
//         setCountryCode(code);
        
//         // Set default currency based on country
//         if (code === "NG") {
//           setSelectedCurrency("NGN");
//         } else {
//           setSelectedCurrency("USD");
//         }

//         // Get exchange rate
//         let rate = getCachedRate("NGN");
//         if (!rate) {
//           const rateRes = await fetch(
//             `https://v6.exchangerate-api.com/v6/${API_EXCHANGE_RATE}/pair/USD/NGN`
//           );
//           const rateData = await rateRes.json();
//           rate = rateData.conversion_rate || 1600;
//           cacheRate("NGN", rate);
//         }
//         setExchangeRate(rate);

//         // Calculate amounts
//         setBasicAmount(BASIC_USD * rate);
//         setPremiumAmount(PREMIUM_USD * rate);

//       } catch (error) {
//         console.error("Error fetching info:", error);
//         // Fallback values
//         setExchangeRate(1600);
//         setBasicAmount(BASIC_USD * 1600);
//         setPremiumAmount(PREMIUM_USD * 1600);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   // Check user login status
//   useEffect(() => {
//     const storedUserData = localStorage.getItem("user_data");
//     if (storedUserData) {
//       const parsedData = JSON.parse(storedUserData);
//       setUser(parsedData);
//       setUserID(parsedData.uid);
//       console.log('User logged in:', parsedData.email);
//     }
//   }, []);

//   // Get plan details
//   const getPlanDetails = (plan) => {
//     const plans = {
//       Basic: {
//         name: "Basic Plan",
//         description: "Perfect for small events and local gatherings",
//         usdAmount: BASIC_USD,
//         ngnAmount: basicAmount,
//         features: [
//           "Featured listing for 7 days",
//           "500+ targeted impressions",
//           "Basic analytics dashboard",
//           "Email support",
//           "Social media promotion"
//         ],
//         bonus: "Spend within 21 days to get $20 bonus credit"
//       },
//       Premium: {
//         name: "Premium Plan",
//         description: "Ideal for large events and maximum exposure",
//         usdAmount: PREMIUM_USD,
//         ngnAmount: premiumAmount,
//         features: [
//           "Featured listing for 30 days",
//           "5000+ targeted impressions",
//           "Advanced analytics dashboard",
//           "Priority support",
//           "Multi-platform promotion",
//           "Geo-targeted advertising",
//           "Social media boost"
//         ],
//         bonus: "Spend within 3 months to get $100 bonus credit"
//       }
//     };
//     return plans[plan];
//   };

//   // Get the amount to display based on selected currency
//   const getDisplayAmount = (plan) => {
//     const details = getPlanDetails(plan);
//     if (selectedCurrency === "NGN") {
//       return {
//         amount: details.ngnAmount,
//         currency: "NGN",
//         symbol: "₦"
//       };
//     } else {
//       return {
//         amount: details.usdAmount,
//         currency: "USD",
//         symbol: "$"
//       };
//     }
//   };

//   const openPopup = (plan) => {
//     console.log("Opening popup for plan:", plan);
//     console.log("User:", user);
    
//     if (!user) {
//       setOpenPopup(true);
//       return;
//     }
//     setSelectedPlan(plan);
//     setIsPopupOpen(true);
//     console.log("Popup should be open now");
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedPlan(null);
//     setIsProcessing(false);
//   };

//   const handleClosePopup = () => {
//     setOpenPopup(false);
//     navigate("/SignIn");
//   };

//   const handlePayment = (plan) => {
//     console.log("Processing payment for plan:", plan);
//     console.log("Selected currency:", selectedCurrency);
    
//     setIsProcessing(true);
    
//     const details = getPlanDetails(plan);
    
//     let amountInKobo;
//     let currency;
    
//     if (selectedCurrency === "NGN") {
//       // Pay in NGN
//       amountInKobo = Math.round(details.ngnAmount * 100);
//       currency = "NGN";
//     } else {
//       // Pay in USD - Paystack allows USD payments too
//       amountInKobo = Math.round(details.usdAmount * 100);
//       currency = "USD";
//     }

//     // Add Paystack charge (1.5% + 50 NGN or equivalent)
//     const charge = Math.round(amountInKobo * 0.015) + (selectedCurrency === "NGN" ? 5000 : 50);
//     const totalAmount = amountInKobo + charge;

//     console.log(`Total amount: ${totalAmount} ${currency}`);

//     // Check if Paystack is available
//     if (!window.PaystackPop) {
//       toast.error("Paystack is not loaded. Please refresh the page.");
//       setIsProcessing(false);
//       return;
//     }

//     const paystack = window.PaystackPop.setup({
//       key: PAYMENT_PK,
//       email: user?.email || "user@example.com",
//       amount: totalAmount,
//       currency: currency,
//       callback: function (response) {
//         console.log("Payment successful:", response);
//         toast.success(`Payment successful! Reference: ${response.reference}`);
//         closePopup();
//         setTimeout(() => {
//           navigate("/CreateLiveEvent");
//           window.scrollTo(0, 0);
//         }, 2000);
//       },
//       onClose: function () {
//         console.log("Payment window closed");
//         toast.info("Payment window closed");
//         setIsProcessing(false);
//       },
//     });
//     paystack.openIframe();
//   };

//   // Animation variants
//   const fadeInUp = {
//     initial: { opacity: 0, y: 30 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   const staggerContainer = {
//     animate: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-white overflow-x-hidden">
//       {/* Hero Section with Animation */}
//       <motion.div 
//         className="relative w-full"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
//           <img
//             src={banner2}
//             alt="Live Streaming"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

//           <motion.div 
//             className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-10"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//             <motion.h2 
//               className="text-4xl md:text-7xl font-bold leading-tight"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//             >
//               Reach 8M+ <br /> with Hangout Ads
//             </motion.h2>
        
//             <motion.p 
//               className="mt-4 text-lg md:text-xl max-w-xl text-gray-200"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.7, duration: 0.5 }}
//             >
//               Promote your events with sponsored listings on top spots across Hangout
//             </motion.p>

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => window.scrollBy(0, 600)}
//               className="mt-8 bg-orange-600 hover:bg-orange-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg flex items-center transition-all duration-300"
//             >
//               Get Started Now
//               <TrendingUpIcon className="ml-2" />
//             </motion.button>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Info Section */}
//       <motion.div 
//         className="mx-auto px-6 py-16 bg-white max-w-7xl"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.div 
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <motion.h1 
//             className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
//             initial={{ scale: 0.9 }}
//             whileInView={{ scale: 1 }}
//             viewport={{ once: true }}
//           >
//             Reach More People, Get More Bookings
//           </motion.h1>
//           <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
//             Want your event to stand out? With <span className="font-semibold text-orange-600">Hangout Ads</span>, you can feature your listings in the most visible places — including search results, homepage banners, category highlights, and more.
//           </p>
//           <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
//             <strong>Geo-target your audience</strong> in 90+ cities across the US, UK, Canada, Australia, and Africa to reach the right people at the right time.
//           </p>
//           <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
//             Whether you're hosting a party, conference, or family hangout, our powerful ad tools ensure more eyes on your event and more attendees through the door.
//           </p>
//           <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
//         </motion.div>

//         <motion.div 
//           className="grid md:grid-cols-3 gap-8"
//           variants={staggerContainer}
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//         >
//           {[
//             { icon: AccountTreeIcon, title: "Featured Listings", desc: "Appear at the top of search results and get discovered first by attendees looking for events like yours." },
//             { icon: SendToMobileIcon, title: "Mobile + Web Visibility", desc: "Your event gets featured across Hangout's web platform and mobile apps, boosting your impressions and RSVPs." },
//             { icon: OfflinePinIcon, title: "Real Results", desc: "Events promoted with Hangout Ads see up to 30% more attendance compared to unlisted ones." }
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               variants={fadeInUp}
//               whileHover={{ y: -10, transition: { duration: 0.2 } }}
//               className="border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
//             >
//               <item.icon style={{ fontSize: 60 }} className="text-orange-500 mb-4" />
//               <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
//               <p className="text-gray-600 leading-relaxed">{item.desc}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>

//       {/* Results Section */}
//       <motion.div 
//         className="bg-white py-16 px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center max-w-7xl"
//         initial={{ opacity: 0, x: -50 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.div>
//           <motion.h2 
//             className="text-4xl font-extrabold text-gray-900 mb-4"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//           >
//             GET BETTER RESULTS
//           </motion.h2>
//           <p className="text-gray-600 mb-8 text-lg">See your ads perform better on the best event marketing platform</p>

//           <div className="space-y-8">
//             {[
//               { title: "Drive more clicks", desc: "Boost visibility and engagement for your events with Hangout Ads. Our platform is designed to help you reach the right audience at the right time—resulting in up to 30% higher click-through rates compared to traditional Facebook Ads*." },
//               { title: "Set campaign goals", desc: "Pick a goal for your ad, like maximizing your reach or driving more clicks to your event, and our platform will automatically optimize for the best results." },
//               { title: "Make the most of your ad budget", desc: "The effective cost per click (eCPC) is now over 30% cheaper. Our smart ad system changes bid prices in real-time to help you get the best value for your ads." }
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.2 }}
//                 whileHover={{ x: 10 }}
//               >
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                   <CheckCircleIcon className="text-orange-500 mr-2" />
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-700 ml-8">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <img
//             src="https://eventbrite-s3.s3.us-east-1.amazonaws.com/marketing/landingpages/assets/2025/rebrand/l/eventbrite-ads/a--sq-img--00.png"
//             alt="Event"
//             className="rounded-xl object-cover w-full h-full shadow-2xl"
//           />
//         </motion.div>
//       </motion.div>

//       {/* Currency Selection Card */}
//       <motion.div 
//         className="w-full max-w-3xl mx-auto px-6 mb-8"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//       >
//         <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg border border-orange-200">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <CurrencyExchangeIcon className="text-orange-600" style={{ fontSize: 36 }} />
//               <div>
//                 <h3 className="text-lg font-bold text-gray-800">Select Payment Currency</h3>
//                 <p className="text-sm text-gray-600">
//                   Pay in NGN or USD with Paystack
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setSelectedCurrency("NGN")}
//                 className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
//                   selectedCurrency === "NGN"
//                     ? "bg-orange-600 text-white shadow-lg scale-105"
//                     : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
//                 }`}
//               >
//                 <span>🇳🇬</span> ₦ NGN
//               </button>
//               <button
//                 onClick={() => setSelectedCurrency("USD")}
//                 className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
//                   selectedCurrency === "USD"
//                     ? "bg-orange-600 text-white shadow-lg scale-105"
//                     : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
//                 }`}
//               >
//                 <span>🇺🇸</span> $ USD
//               </button>
//             </div>
//           </div>
          
//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-600">
//               {selectedCurrency === "NGN" 
//                 ? `💳 Pay in Nigerian Naira (₦) - Rate: 1 USD = ₦${Math.round(exchangeRate).toLocaleString()}`
//                 : `💳 Pay in US Dollars ($) - International payment accepted`
//               }
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Pricing Section */}
//       <motion.div 
//         className="max-w-7xl mx-auto p-6 md:p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-20"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.h2 
//           className="text-4xl text-center font-extrabold text-gray-900 mb-4"
//           initial={{ scale: 0.9 }}
//           whileInView={{ scale: 1 }}
//           viewport={{ once: true }}
//         >
//           Kickstart Your Campaign with an Exclusive Offer
//         </motion.h2>

//         <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8 text-lg">
//           Select a plan that fits your goals and budget. Launch your first ad campaign and unlock bonus credits when you hit the spend target—fueling even more growth.
//           <span className="text-sm block text-gray-500 mt-2 italic">*Terms and conditions apply.</span>
//         </p>

//         {loading ? (
//           <div className="text-center py-20">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading pricing information...</p>
//           </div>
//         ) : (
//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
//             variants={staggerContainer}
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true }}
//           >
//             {['Basic', 'Premium'].map((plan) => {
//               const details = getPlanDetails(plan);
//               const displayInfo = getDisplayAmount(plan);
//               const isPremium = plan === 'Premium';
              
//               return (
//                 <motion.div
//                   key={plan}
//                   variants={fadeInUp}
//                   whileHover={{ y: -15, transition: { duration: 0.3 } }}
//                   className={`border-2 rounded-2xl p-8 transition-all duration-300 relative ${
//                     isPremium 
//                       ? 'border-orange-500 bg-gradient-to-br from-white to-orange-50 shadow-2xl' 
//                       : 'border-gray-200 bg-white shadow-lg hover:shadow-2xl'
//                   }`}
//                 >
//                   {isPremium && (
//                     <span className="absolute -top-3 right-8 bg-orange-500 text-white text-sm font-bold py-1 px-4 rounded-full uppercase tracking-wide shadow-lg">
//                       Best Value
//                     </span>
//                   )}
                  
//                   <div className="text-center mb-6">
//                     <span className="block text-sm text-gray-500 tracking-widest uppercase mb-1">
//                       {details.name}
//                     </span>
//                     <span className="block text-5xl font-bold text-orange-600">
//                       {displayInfo.symbol}{displayInfo.amount?.toLocaleString() || '0'}
//                     </span>
//                     <div className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
//                       {selectedCurrency === "NGN" 
//                         ? `≈ $${details.usdAmount} USD`
//                         : `≈ ₦${Math.round(details.ngnAmount).toLocaleString()} NGN`
//                       }
//                     </div>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Paying in {selectedCurrency} via Paystack
//                     </p>
//                   </div>

//                   <p className="text-gray-600 text-center text-sm mb-4">
//                     {details.description}
//                   </p>

//                   <div className="mb-6">
//                     <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
//                       <LocalOfferIcon className="text-orange-500 mr-2" />
//                       What's included:
//                     </h4>
//                     <ul className="space-y-2">
//                       {details.features.map((feature, idx) => (
//                         <li key={idx} className="flex items-start text-gray-600 text-sm">
//                           <CheckCircleIcon className="text-green-500 mr-2 text-sm mt-0.5" />
//                           {feature}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="bg-blue-50 p-3 rounded-lg mb-6">
//                     <p className="text-sm text-blue-800 flex items-start">
//                       <PeopleIcon className="text-blue-600 mr-2" />
//                       <span>{details.bonus}</span>
//                     </p>
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => openPopup(plan)}
//                     className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
//                       isPremium
//                         ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl'
//                         : 'bg-gray-800 text-white hover:bg-gray-900'
//                     }`}
//                   >
//                     <PaymentIcon style={{ fontSize: 20 }} />
//                     {user ? `Pay with Paystack` : 'Login to Proceed'}
//                   </motion.button>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         )}
//       </motion.div>

//       <Partners />
//       <div className="mt-10"></div>

//       {/* Payment Popup - Using AnimatePresence for better animation */}
//       <AnimatePresence>
//         {isPopupOpen && selectedPlan && (
//           <motion.div 
//             className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closePopup}
//           >
//             <motion.div 
//               className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
//               initial={{ scale: 0.8, y: 50, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.8, y: 50, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={closePopup}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <CloseIcon />
//               </button>

//               <div className="mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   Confirm Your Payment
//                 </h2>
//               </div>

//               {(() => {
//                 const details = getPlanDetails(selectedPlan);
//                 const displayInfo = getDisplayAmount(selectedPlan);
                
//                 return (
//                   <>
//                     <div className="bg-orange-50 p-6 rounded-xl mb-6">
//                       <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                         {details.name} - {selectedCurrency}
//                       </h3>
//                       <p className="text-3xl font-bold text-orange-600">
//                         {displayInfo.symbol}{displayInfo.amount?.toLocaleString()}
//                       </p>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {selectedCurrency === "NGN" 
//                           ? `≈ $${details.usdAmount} USD`
//                           : `≈ ₦${Math.round(details.ngnAmount).toLocaleString()} NGN`
//                         }
//                       </p>
//                       <p className="text-sm text-green-600 mt-1 font-medium">
//                         ✅ Payment via Paystack ({selectedCurrency})
//                       </p>
//                     </div>

//                     <div className="mb-6">
//                       <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                         What's included with this payment?
//                       </h3>
//                       <ul className="space-y-1">
//                         {details.features.map((feature, idx) => (
//                           <li key={idx} className="flex items-start text-gray-600">
//                             <CheckCircleIcon className="text-green-500 mr-2 text-sm mt-0.5" />
//                             {feature}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <div className="bg-blue-50 p-4 rounded-xl mb-6">
//                       <h3 className="text-lg font-semibold text-blue-800 mb-1">
//                         💳 Payment Details
//                       </h3>
//                       <ul className="text-blue-700 text-sm space-y-1">
//                         <li>• Payment Gateway: <strong>Paystack</strong></li>
//                         <li>• Currency: <strong>{selectedCurrency}</strong></li>
//                         <li>• Secure SSL encrypted transaction</li>
//                         <li>• Supports all major cards (Visa, Mastercard, Verve)</li>
//                         {selectedCurrency === "NGN" && (
//                           <li>• Local payment methods: Bank Transfer, USSD, QR Code</li>
//                         )}
//                       </ul>
//                     </div>

//                     <div className="bg-green-50 p-4 rounded-xl mb-6">
//                       <h3 className="text-lg font-semibold text-green-800 mb-1">
//                         What happens after payment?
//                       </h3>
//                       <p className="text-green-700 text-sm">
//                         Your event will go live immediately. You'll receive a confirmation email with instructions to manage and track your event's performance.
//                       </p>
//                     </div>

//                     <div className="flex flex-col sm:flex-row justify-center gap-4">
//                       <button
//                         onClick={closePopup}
//                         className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
//                         disabled={isProcessing}
//                       >
//                         Cancel
//                       </button>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => handlePayment(selectedPlan)}
//                         disabled={isProcessing}
//                         className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg flex items-center gap-2 ${
//                           isProcessing 
//                             ? 'bg-gray-400 cursor-not-allowed' 
//                             : 'bg-orange-600 text-white hover:bg-orange-700'
//                         }`}
//                       >
//                         {isProcessing ? (
//                           <>
//                             <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//                             Processing...
//                           </>
//                         ) : (
//                           <>
//                             <PaymentIcon />
//                             Pay {displayInfo.symbol}{displayInfo.amount?.toLocaleString()} via Paystack
//                           </>
//                         )}
//                       </motion.button>
//                     </div>
//                   </>
//                 );
//               })()}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Login Required Dialog */}
//       <Dialog open={openPopupLogin} onClose={handleClosePopup}>
//         <DialogTitle className="text-2xl font-bold text-gray-800">
//           Login Required
//         </DialogTitle>
//         <DialogContent>
//           <p className="text-gray-600">
//             Please log in to continue with the payment process and unlock all features.
//           </p>
//         </DialogContent>
//         <DialogActions className="p-4">
//           <Button onClick={handleClosePopup} variant="contained" color="primary">
//             Login Now
//           </Button>
//           <Button onClick={() => setOpenPopup(false)} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <ToastContainer position="top-right" autoClose={5000} />
//     </div>
//   );
// };

// export default AdsSub;


// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   TextField,
//   Button,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Divider } from "antd";
// import banner2 from "../assets/6eb024893ca8d69c7e1ed16821b0e8bd.png";
// import Partners from '../components/essentialBrand';
// import { useNavigate } from "react-router-dom";
// import AccountTreeIcon from '@mui/icons-material/AccountTree';
// import SendToMobileIcon from '@mui/icons-material/SendToMobile';
// import OfflinePinIcon from '@mui/icons-material/OfflinePin';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import PeopleIcon from '@mui/icons-material/People';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import PaymentIcon from '@mui/icons-material/Payment';
// import CloseIcon from '@mui/icons-material/Close';

// const PAYMENT_PK = import.meta.env.VITE_PAYMENT_API_KEY;
// const API_EXCHANGE_RATE = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

// const AdsSub = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [userId, setUserID] = useState([]);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [openPopupLogin, setOpenPopup] = useState(false);
//   const [selectedCurrency, setSelectedCurrency] = useState("NGN");
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Currency and location state
//   const [userCurrency, setUserCurrency] = useState("NGN");
//   const [countryName, setCountryName] = useState("Nigeria");
//   const [countryCode, setCountryCode] = useState("NG");
  
//   // Plan amounts in USD
//   const BASIC_USD = 64;
//   const PREMIUM_USD = 318;
  
//   // Converted amounts
//   const [basicAmount, setBasicAmount] = useState(null);
//   const [premiumAmount, setPremiumAmount] = useState(null);
//   const [exchangeRate, setExchangeRate] = useState(1600);

//   // Load Paystack script
//   useEffect(() => {
//     const loadPaystackScript = () => {
//       if (!window.PaystackPop) {
//         const script = document.createElement('script');
//         script.src = 'https://js.paystack.co/v1/inline.js';
//         script.async = true;
//         document.body.appendChild(script);
//       }
//     };
//     loadPaystackScript();
//   }, []);

//   // Format currency
//   const formatCurrency = (value, currency) => {
//     if (!value) return `$0.00`;
//     return new Intl.NumberFormat(undefined, {
//       style: "currency",
//       currency: currency || "USD",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(value);
//   };

//   // Cache helper
//   const cacheRate = (currency, rate) => {
//     const cacheData = { rate, timestamp: Date.now() };
//     localStorage.setItem(`rate_${currency}`, JSON.stringify(cacheData));
//   };

//   const getCachedRate = (currency) => {
//     const cache = localStorage.getItem(`rate_${currency}`);
//     if (!cache) return null;
//     const { rate, timestamp } = JSON.parse(cache);
//     const oneDay = 1000 * 60 * 60 * 24;
//     if (Date.now() - timestamp < oneDay) return rate;
//     return null;
//   };

//   // Fetch user info and currency conversion
//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const locRes = await fetch("https://ipapi.co/json/");
//         const locData = await locRes.json();

//         const currency = locData.currency || "NGN";
//         const country = locData.country_name || "Nigeria";
//         const code = locData.country_code || "NG";

//         setUserCurrency(currency);
//         setCountryName(country);
//         setCountryCode(code);
        
//         // Set default currency based on country
//         if (code === "NG") {
//           setSelectedCurrency("NGN");
//         } else {
//           setSelectedCurrency("USD");
//         }

//         // Get exchange rate
//         let rate = getCachedRate("NGN");
//         if (!rate) {
//           const rateRes = await fetch(
//             `https://v6.exchangerate-api.com/v6/${API_EXCHANGE_RATE}/pair/USD/NGN`
//           );
//           const rateData = await rateRes.json();
//           rate = rateData.conversion_rate || 1600;
//           cacheRate("NGN", rate);
//         }
//         setExchangeRate(rate);

//         // Calculate amounts
//         setBasicAmount(BASIC_USD * rate);
//         setPremiumAmount(PREMIUM_USD * rate);

//       } catch (error) {
//         console.error("Error fetching info:", error);
//         // Fallback values
//         setExchangeRate(1600);
//         setBasicAmount(BASIC_USD * 1600);
//         setPremiumAmount(PREMIUM_USD * 1600);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   // Check user login status
//   useEffect(() => {
//     const storedUserData = localStorage.getItem("user_data");
//     if (storedUserData) {
//       const parsedData = JSON.parse(storedUserData);
//       setUser(parsedData);
//       setUserID(parsedData.uid);
//       console.log('User logged in:', parsedData.email);
//     }
//   }, []);

//   // Get plan details
//   const getPlanDetails = (plan) => {
//     const plans = {
//       Basic: {
//         name: "Basic Plan",
//         description: "Perfect for small events and local gatherings",
//         usdAmount: BASIC_USD,
//         ngnAmount: basicAmount,
//         features: [
//           "Featured listing for 7 days",
//           "500+ targeted impressions",
//           "Basic analytics dashboard",
//           "Email support",
//           "Social media promotion"
//         ],
//         bonus: "Spend within 21 days to get $20 bonus credit"
//       },
//       Premium: {
//         name: "Premium Plan",
//         description: "Ideal for large events and maximum exposure",
//         usdAmount: PREMIUM_USD,
//         ngnAmount: premiumAmount,
//         features: [
//           "Featured listing for 30 days",
//           "5000+ targeted impressions",
//           "Advanced analytics dashboard",
//           "Priority support",
//           "Multi-platform promotion",
//           "Geo-targeted advertising",
//           "Social media boost"
//         ],
//         bonus: "Spend within 3 months to get $100 bonus credit"
//       }
//     };
//     return plans[plan];
//   };

//   // Get the amount to display based on selected currency
//   const getDisplayAmount = (plan) => {
//     const details = getPlanDetails(plan);
//     if (selectedCurrency === "NGN") {
//       return {
//         amount: details.ngnAmount,
//         currency: "NGN",
//         symbol: "₦"
//       };
//     } else {
//       return {
//         amount: details.usdAmount,
//         currency: "USD",
//         symbol: "$"
//       };
//     }
//   };

//   const openPopup = (plan) => {
//     console.log("Opening popup for plan:", plan);
//     console.log("User:", user);
    
//     if (!user) {
//       setOpenPopup(true);
//       return;
//     }
//     setSelectedPlan(plan);
//     setIsPopupOpen(true);
//     console.log("Popup should be open now");
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedPlan(null);
//     setIsProcessing(false);
//   };

//   const handleClosePopup = () => {
//     setOpenPopup(false);
//     navigate("/SignIn");
//   };

//   const handlePayment = (plan) => {
//     console.log("Processing payment for plan:", plan);
//     console.log("Selected currency:", selectedCurrency);
    
//     setIsProcessing(true);
    
//     const details = getPlanDetails(plan);
    
//     let amountInKobo;
//     let currency;
    
//     if (selectedCurrency === "NGN") {
//       // Pay in NGN
//       amountInKobo = Math.round(details.ngnAmount * 100);
//       currency = "NGN";
//     } else {
//       // Pay in USD - Paystack allows USD payments too
//       amountInKobo = Math.round(details.usdAmount * 100);
//       currency = "USD";
//     }

//     // Add Paystack charge (1.5% + 50 NGN or equivalent)
//     const charge = Math.round(amountInKobo * 0.015) + (selectedCurrency === "NGN" ? 5000 : 50);
//     const totalAmount = amountInKobo + charge;

//     console.log(`Total amount: ${totalAmount} ${currency}`);

//     // Check if Paystack is available
//     if (!window.PaystackPop) {
//       toast.error("Paystack is not loaded. Please refresh the page.");
//       setIsProcessing(false);
//       return;
//     }

//     const paystack = window.PaystackPop.setup({
//       key: PAYMENT_PK,
//       email: user?.email || "user@example.com",
//       amount: totalAmount,
//       currency: currency,
//       callback: function (response) {
//         console.log("Payment successful:", response);
//         toast.success(`Payment successful! Reference: ${response.reference}`);
//         closePopup();
//         setTimeout(() => {
//           navigate("/CreateLiveEvent");
//           window.scrollTo(0, 0);
//         }, 2000);
//       },
//       onClose: function () {
//         console.log("Payment window closed");
//         toast.info("Payment window closed");
//         setIsProcessing(false);
//       },
//     });
//     paystack.openIframe();
//   };

//   // Animation variants
//   const fadeInUp = {
//     initial: { opacity: 0, y: 30 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   const staggerContainer = {
//     animate: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-white overflow-x-hidden">
//       {/* Hero Section with Animation */}
//       <motion.div 
//         className="relative w-full"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
//           <img
//             src={banner2}
//             alt="Live Streaming"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

//           <motion.div 
//             className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-10"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//             <motion.h2 
//               className="text-4xl md:text-7xl font-bold leading-tight"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//             >
//               Reach 8M+ <br /> with Hangout Ads
//             </motion.h2>
        
//             <motion.p 
//               className="mt-4 text-lg md:text-xl max-w-xl text-gray-200"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.7, duration: 0.5 }}
//             >
//               Promote your events with sponsored listings on top spots across Hangout
//             </motion.p>

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => window.scrollBy(0, 600)}
//               className="mt-8 bg-orange-600 hover:bg-orange-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg flex items-center transition-all duration-300"
//             >
//               Get Started Now
//               <TrendingUpIcon className="ml-2" />
//             </motion.button>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Info Section */}
//       <motion.div 
//         className="mx-auto px-6 py-16 bg-white max-w-7xl"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.div 
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <motion.h1 
//             className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
//             initial={{ scale: 0.9 }}
//             whileInView={{ scale: 1 }}
//             viewport={{ once: true }}
//           >
//             Reach More People, Get More Bookings
//           </motion.h1>
//           <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
//             Want your event to stand out? With <span className="font-semibold text-orange-600">Hangout Ads</span>, you can feature your listings in the most visible places — including search results, homepage banners, category highlights, and more.
//           </p>
//           <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
//             <strong>Geo-target your audience</strong> in 90+ cities across the US, UK, Canada, Australia, and Africa to reach the right people at the right time.
//           </p>
//           <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
//             Whether you're hosting a party, conference, or family hangout, our powerful ad tools ensure more eyes on your event and more attendees through the door.
//           </p>
//           <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
//         </motion.div>

//         <motion.div 
//           className="grid md:grid-cols-3 gap-8"
//           variants={staggerContainer}
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//         >
//           {[
//             { icon: AccountTreeIcon, title: "Featured Listings", desc: "Appear at the top of search results and get discovered first by attendees looking for events like yours." },
//             { icon: SendToMobileIcon, title: "Mobile + Web Visibility", desc: "Your event gets featured across Hangout's web platform and mobile apps, boosting your impressions and RSVPs." },
//             { icon: OfflinePinIcon, title: "Real Results", desc: "Events promoted with Hangout Ads see up to 30% more attendance compared to unlisted ones." }
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               variants={fadeInUp}
//               whileHover={{ y: -10, transition: { duration: 0.2 } }}
//               className="border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
//             >
//               <item.icon style={{ fontSize: 60 }} className="text-orange-500 mb-4" />
//               <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
//               <p className="text-gray-600 leading-relaxed">{item.desc}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>

//       {/* Results Section */}
//       <motion.div 
//         className="bg-white py-16 px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center max-w-7xl"
//         initial={{ opacity: 0, x: -50 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.div>
//           <motion.h2 
//             className="text-4xl font-extrabold text-gray-900 mb-4"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//           >
//             GET BETTER RESULTS
//           </motion.h2>
//           <p className="text-gray-600 mb-8 text-lg">See your ads perform better on the best event marketing platform</p>

//           <div className="space-y-8">
//             {[
//               { title: "Drive more clicks", desc: "Boost visibility and engagement for your events with Hangout Ads. Our platform is designed to help you reach the right audience at the right time—resulting in up to 30% higher click-through rates compared to traditional Facebook Ads*." },
//               { title: "Set campaign goals", desc: "Pick a goal for your ad, like maximizing your reach or driving more clicks to your event, and our platform will automatically optimize for the best results." },
//               { title: "Make the most of your ad budget", desc: "The effective cost per click (eCPC) is now over 30% cheaper. Our smart ad system changes bid prices in real-time to help you get the best value for your ads." }
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.2 }}
//                 whileHover={{ x: 10 }}
//               >
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                   <CheckCircleIcon className="text-orange-500 mr-2" />
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-700 ml-8">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <img
//             src="https://eventbrite-s3.s3.us-east-1.amazonaws.com/marketing/landingpages/assets/2025/rebrand/l/eventbrite-ads/a--sq-img--00.png"
//             alt="Event"
//             className="rounded-xl object-cover w-full h-full shadow-2xl"
//           />
//         </motion.div>
//       </motion.div>

//       {/* Currency Selection Card */}
//       <motion.div 
//         className="w-full max-w-3xl mx-auto px-6 mb-8"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//       >
//         <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg border border-orange-200">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <CurrencyExchangeIcon className="text-orange-600" style={{ fontSize: 36 }} />
//               <div>
//                 <h3 className="text-lg font-bold text-gray-800">Select Payment Currency</h3>
//                 <p className="text-sm text-gray-600">
//                   Pay in NGN or USD with Paystack
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setSelectedCurrency("NGN")}
//                 className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
//                   selectedCurrency === "NGN"
//                     ? "bg-orange-600 text-white shadow-lg scale-105"
//                     : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
//                 }`}
//               >
//                 <span>🇳🇬</span> ₦ NGN
//               </button>
//               <button
//                 onClick={() => setSelectedCurrency("USD")}
//                 className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
//                   selectedCurrency === "USD"
//                     ? "bg-orange-600 text-white shadow-lg scale-105"
//                     : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
//                 }`}
//               >
//                 <span>🇺🇸</span> $ USD
//               </button>
//             </div>
//           </div>
          
//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-600">
//               {selectedCurrency === "NGN" 
//                 ? `💳 Pay in Nigerian Naira (₦) - Rate: 1 USD = ₦${Math.round(exchangeRate).toLocaleString()}`
//                 : `💳 Pay in US Dollars ($) - International payment accepted`
//               }
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Pricing Section */}
//       <motion.div 
//         className="max-w-7xl mx-auto p-6 md:p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-20"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.h2 
//           className="text-4xl text-center font-extrabold text-gray-900 mb-4"
//           initial={{ scale: 0.9 }}
//           whileInView={{ scale: 1 }}
//           viewport={{ once: true }}
//         >
//           Kickstart Your Campaign with an Exclusive Offer
//         </motion.h2>

//         <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8 text-lg">
//           Select a plan that fits your goals and budget. Launch your first ad campaign and unlock bonus credits when you hit the spend target—fueling even more growth.
//           <span className="text-sm block text-gray-500 mt-2 italic">*Terms and conditions apply.</span>
//         </p>

//         {loading ? (
//           <div className="text-center py-20">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading pricing information...</p>
//           </div>
//         ) : (
//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
//             variants={staggerContainer}
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true }}
//           >
//             {['Basic', 'Premium'].map((plan) => {
//               const details = getPlanDetails(plan);
//               const displayInfo = getDisplayAmount(plan);
//               const isPremium = plan === 'Premium';
              
//               return (
//                 <motion.div
//                   key={plan}
//                   variants={fadeInUp}
//                   whileHover={{ y: -15, transition: { duration: 0.3 } }}
//                   className={`border-2 rounded-2xl p-8 transition-all duration-300 relative ${
//                     isPremium 
//                       ? 'border-orange-500 bg-gradient-to-br from-white to-orange-50 shadow-2xl' 
//                       : 'border-gray-200 bg-white shadow-lg hover:shadow-2xl'
//                   }`}
//                 >
//                   {isPremium && (
//                     <span className="absolute -top-3 right-8 bg-orange-500 text-white text-sm font-bold py-1 px-4 rounded-full uppercase tracking-wide shadow-lg">
//                       Best Value
//                     </span>
//                   )}
                  
//                   <div className="text-center mb-6">
//                     <span className="block text-sm text-gray-500 tracking-widest uppercase mb-1">
//                       {details.name}
//                     </span>
//                     <span className="block text-5xl font-bold text-orange-600">
//                       {displayInfo.symbol}{displayInfo.amount?.toLocaleString() || '0'}
//                     </span>
//                     <div className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
//                       {selectedCurrency === "NGN" 
//                         ? `≈ $${details.usdAmount} USD`
//                         : `≈ ₦${Math.round(details.ngnAmount).toLocaleString()} NGN`
//                       }
//                     </div>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Paying in {selectedCurrency} via Paystack
//                     </p>
//                   </div>

//                   <p className="text-gray-600 text-center text-sm mb-4">
//                     {details.description}
//                   </p>

//                   <div className="mb-6">
//                     <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
//                       <LocalOfferIcon className="text-orange-500 mr-2" />
//                       What's included:
//                     </h4>
//                     <ul className="space-y-2">
//                       {details.features.map((feature, idx) => (
//                         <li key={idx} className="flex items-start text-gray-600 text-sm">
//                           <CheckCircleIcon className="text-green-500 mr-2 text-sm mt-0.5" />
//                           {feature}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="bg-blue-50 p-3 rounded-lg mb-6">
//                     <p className="text-sm text-blue-800 flex items-start">
//                       <PeopleIcon className="text-blue-600 mr-2" />
//                       <span>{details.bonus}</span>
//                     </p>
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => openPopup(plan)}
//                     className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
//                       isPremium
//                         ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl'
//                         : 'bg-gray-800 text-white hover:bg-gray-900'
//                     }`}
//                   >
//                     <PaymentIcon style={{ fontSize: 20 }} />
//                     {user ? `Pay with Paystack` : 'Login to Proceed'}
//                   </motion.button>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         )}
//       </motion.div>

//       <Partners />
//       <div className="mt-10"></div>

//       {/* Payment Popup - Using AnimatePresence for better animation */}
//       <AnimatePresence>
//         {isPopupOpen && selectedPlan && (
//           <motion.div 
//             className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closePopup}
//           >
//             <motion.div 
//               className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
//               initial={{ scale: 0.8, y: 50, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.8, y: 50, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={closePopup}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <CloseIcon />
//               </button>

//               <div className="mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   Confirm Your Payment
//                 </h2>
//               </div>

//               {(() => {
//                 const details = getPlanDetails(selectedPlan);
//                 const displayInfo = getDisplayAmount(selectedPlan);
                
//                 return (
//                   <>
//                     <div className="bg-orange-50 p-6 rounded-xl mb-6">
//                       <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                         {details.name} - {selectedCurrency}
//                       </h3>
//                       <p className="text-3xl font-bold text-orange-600">
//                         {displayInfo.symbol}{displayInfo.amount?.toLocaleString()}
//                       </p>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {selectedCurrency === "NGN" 
//                           ? `≈ $${details.usdAmount} USD`
//                           : `≈ ₦${Math.round(details.ngnAmount).toLocaleString()} NGN`
//                         }
//                       </p>
//                       <p className="text-sm text-green-600 mt-1 font-medium">
//                         ✅ Payment via Paystack ({selectedCurrency})
//                       </p>
//                     </div>

//                     <div className="mb-6">
//                       <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                         What's included with this payment?
//                       </h3>
//                       <ul className="space-y-1">
//                         {details.features.map((feature, idx) => (
//                           <li key={idx} className="flex items-start text-gray-600">
//                             <CheckCircleIcon className="text-green-500 mr-2 text-sm mt-0.5" />
//                             {feature}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <div className="bg-blue-50 p-4 rounded-xl mb-6">
//                       <h3 className="text-lg font-semibold text-blue-800 mb-1">
//                         Payment Details
//                       </h3>
//                       <ul className="text-blue-700 text-sm space-y-1">
//                         <li>• Payment Gateway: <strong>Paystack</strong></li>
//                         <li>• Currency: <strong>{selectedCurrency}</strong></li>
//                         <li>• Secure SSL encrypted transaction</li>
//                         <li>• Supports all major cards (Visa, Mastercard, Verve)</li>
//                         {selectedCurrency === "NGN" && (
//                           <li>• Local payment methods: Bank Transfer, USSD, QR Code</li>
//                         )}
//                       </ul>
//                     </div>

//                     <div className="bg-green-50 p-4 rounded-xl mb-6">
//                       <h3 className="text-lg font-semibold text-green-800 mb-1">
//                         What happens after payment?
//                       </h3>
//                       <p className="text-green-700 text-sm">
//                         Your event will go live immediately. You'll receive a confirmation email with instructions to manage and track your event's performance.
//                       </p>
//                     </div>

//                     <div className="flex flex-col sm:flex-row justify-center gap-4">
//                       <button
//                         onClick={closePopup}
//                         className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
//                         disabled={isProcessing}
//                       >
//                         Cancel
//                       </button>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => handlePayment(selectedPlan)}
//                         disabled={isProcessing}
//                         className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg flex items-center gap-2 ${
//                           isProcessing 
//                             ? 'bg-gray-400 cursor-not-allowed' 
//                             : 'bg-orange-600 text-white hover:bg-orange-700'
//                         }`}
//                       >
//                         {isProcessing ? (
//                           <>
//                             <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//                             Processing...
//                           </>
//                         ) : (
//                           <>
//                             <PaymentIcon />
//                             Pay {displayInfo.symbol}{displayInfo.amount?.toLocaleString()} via Paystack
//                           </>
//                         )}
//                       </motion.button>
//                     </div>
//                   </>
//                 );
//               })()}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Login Required Dialog */}
//       <Dialog open={openPopupLogin} onClose={handleClosePopup}>
//         <DialogTitle className="text-2xl font-bold text-gray-800">
//           Login Required
//         </DialogTitle>
//         <DialogContent>
//           <p className="text-gray-600">
//             Please log in to continue with the payment process and unlock all features.
//           </p>
//         </DialogContent>
//         <DialogActions className="p-4">
//           <Button onClick={handleClosePopup} variant="contained" color="primary">
//             Login Now
//           </Button>
//           <Button onClick={() => setOpenPopup(false)} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <ToastContainer position="top-right" autoClose={5000} />
//     </div>
//   );
// };

// export default AdsSub;

import { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "antd";
import banner2 from "../assets/6eb024893ca8d69c7e1ed16821b0e8bd.png";
import Partners from '../components/essentialBrand';
import { useNavigate } from "react-router-dom";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import CloseIcon from '@mui/icons-material/Close';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';

const PAYMENT_PK = import.meta.env.VITE_PAYMENT_API_KEY;
const API_EXCHANGE_RATE = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

const AdsSub = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userId, setUserID] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openPopupLogin, setOpenPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCurrencyInfo, setShowCurrencyInfo] = useState(false);

  // Currency and location state
  const [userCurrency, setUserCurrency] = useState("USD");
  const [countryName, setCountryName] = useState("United States");
  const [countryCode, setCountryCode] = useState("US");
  const [userCountryFlag, setUserCountryFlag] = useState("🇺🇸");
  
  // Plan amounts in USD (base currency)
  const BASIC_USD = 64;
  const PREMIUM_USD = 318;
  
  // Converted amounts in user's currency
  const [basicAmount, setBasicAmount] = useState(null);
  const [premiumAmount, setPremiumAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [isNGN, setIsNGN] = useState(false);

  // Currency symbols map
  const currencySymbols = {
    USD: "$",
    NGN: "₦",
    EUR: "€",
    GBP: "£",
    GHS: "GH₵",
    KES: "KSh",
    ZAR: "R",
    CAD: "CA$",
    AUD: "AU$",
    JPY: "¥",
    CNY: "¥",
    INR: "₹",
    BRL: "R$",
    MXN: "$",
    SGD: "S$",
    CHF: "Fr",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    PLN: "zł",
    RUB: "₽",
    TRY: "₺",
    AED: "د.إ",
    SAR: "﷼",
    PKR: "₨",
    EGP: "E£",
  };

  // Country to currency mapping for common countries
  const countryCurrencyMap = {
    NG: "NGN",
    GH: "GHS", 
    KE: "KES",
    ZA: "ZAR",
    US: "USD",
    GB: "GBP",
    CA: "CAD",
    AU: "AUD",
    DE: "EUR",
    FR: "EUR",
    ES: "EUR",
    IT: "EUR",
    NL: "EUR",
    BE: "EUR",
    PT: "EUR",
    AT: "EUR",
    IE: "EUR",
    FI: "EUR",
    GR: "EUR",
    JP: "JPY",
    CN: "CNY",
    IN: "INR",
    BR: "BRL",
    MX: "MXN",
    SG: "SGD",
    CH: "CHF",
    SE: "SEK",
    NO: "NOK",
    DK: "DKK",
    PL: "PLN",
    RU: "RUB",
    TR: "TRY",
    AE: "AED",
    SA: "SAR",
    PK: "PKR",
    EG: "EGP",
  };

  // Country flag emoji map
  const countryFlags = {
    NG: "🇳🇬", GH: "🇬🇭", KE: "🇰🇪", ZA: "🇿🇦",
    US: "🇺🇸", GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺",
    DE: "🇩🇪", FR: "🇫🇷", ES: "🇪🇸", IT: "🇮🇹",
    NL: "🇳🇱", BE: "🇧🇪", PT: "🇵🇹", AT: "🇦🇹",
    IE: "🇮🇪", FI: "🇫🇮", GR: "🇬🇷", JP: "🇯🇵",
    CN: "🇨🇳", IN: "🇮🇳", BR: "🇧🇷", MX: "🇲🇽",
    SG: "🇸🇬", CH: "🇨🇭", SE: "🇸🇪", NO: "🇳🇴",
    DK: "🇩🇰", PL: "🇵🇱", RU: "🇷🇺", TR: "🇹🇷",
    AE: "🇦🇪", SA: "🇸🇦", PK: "🇵🇰", EG: "🇪🇬",
  };

  // Load Paystack script
  useEffect(() => {
    const loadPaystackScript = () => {
      if (!window.PaystackPop) {
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };
    loadPaystackScript();
  }, []);

  // Format currency
  const formatCurrency = (value, currency, symbol) => {
    if (!value) return `${symbol || '$'}0.00`;
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Simple currency formatter with symbol
  const formatWithSymbol = (value, symbol, currency) => {
    if (!value) return `${symbol}0.00`;
    const formatted = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    return `${symbol}${formatted}`;
  };

  // Cache helper
  const cacheRate = (currency, rate) => {
    const cacheData = { rate, timestamp: Date.now() };
    localStorage.setItem(`rate_${currency}`, JSON.stringify(cacheData));
  };

  const getCachedRate = (currency) => {
    const cache = localStorage.getItem(`rate_${currency}`);
    if (!cache) return null;
    const { rate, timestamp } = JSON.parse(cache);
    const oneDay = 1000 * 60 * 60 * 24;
    if (Date.now() - timestamp < oneDay) return rate;
    return null;
  };

  // Fetch user info and currency conversion
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const locRes = await fetch("https://ipapi.co/json/");
        const locData = await locRes.json();

        const country = locData.country_name || "United States";
        const code = locData.country_code || "US";
        
        // Get currency based on country or fallback to USD
        let currency = countryCurrencyMap[code] || "USD";
        let symbol = currencySymbols[currency] || "$";
        let flag = countryFlags[code] || "🌍";

        setCountryName(country);
        setCountryCode(code);
        setUserCurrency(currency);
        setCurrencySymbol(symbol);
        setUserCountryFlag(flag);
        setIsNGN(currency === "NGN");

        // If currency is NGN, we already have the rate
        let rate = 1;
        if (currency !== "USD") {
          const cachedRate = getCachedRate(currency);
          if (cachedRate) {
            rate = cachedRate;
          } else {
            try {
              const rateRes = await fetch(
                `https://v6.exchangerate-api.com/v6/${API_EXCHANGE_RATE}/pair/USD/${currency}`
              );
              const rateData = await rateRes.json();
              rate = rateData.conversion_rate || 1;
              cacheRate(currency, rate);
            } catch (error) {
              console.error("Error fetching rate:", error);
              rate = 1;
            }
          }
        }
        setExchangeRate(rate);

        // Calculate amounts in user's currency
        setBasicAmount(BASIC_USD * rate);
        setPremiumAmount(PREMIUM_USD * rate);

      } catch (error) {
        console.error("Error fetching info:", error);
        // Fallback to USD
        setUserCurrency("USD");
        setCurrencySymbol("$");
        setCountryName("United States");
        setCountryCode("US");
        setUserCountryFlag("🇺🇸");
        setIsNGN(false);
        setExchangeRate(1);
        setBasicAmount(BASIC_USD);
        setPremiumAmount(PREMIUM_USD);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Check user login status
  useEffect(() => {
    const storedUserData = localStorage.getItem("user_data");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUser(parsedData);
      setUserID(parsedData.uid);
      console.log('User logged in:', parsedData.email);
    }
  }, []);

  // Get plan details
  const getPlanDetails = (plan) => {
    const plans = {
      Basic: {
        name: "Basic Plan",
        description: "Perfect for small events and local gatherings",
        usdAmount: BASIC_USD,
        localAmount: basicAmount,
        features: [
          "Featured listing for 7 days",
          "500+ targeted impressions",
          "Basic analytics dashboard",
          "Email support",
          "Social media promotion"
        ],
        bonus: "Spend within 21 days to get $20 bonus credit"
      },
      Premium: {
        name: "Premium Plan",
        description: "Ideal for large events and maximum exposure",
        usdAmount: PREMIUM_USD,
        localAmount: premiumAmount,
        features: [
          "Featured listing for 30 days",
          "5000+ targeted impressions",
          "Advanced analytics dashboard",
          "Priority support",
          "Multi-platform promotion",
          "Geo-targeted advertising",
          "Social media boost"
        ],
        bonus: "Spend within 3 months to get $100 bonus credit"
      }
    };
    return plans[plan];
  };

  const openPopup = (plan) => {
    console.log("Opening popup for plan:", plan);
    console.log("User:", user);
    
    if (!user) {
      setOpenPopup(true);
      return;
    }
    setSelectedPlan(plan);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPlan(null);
    setIsProcessing(false);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    navigate("/SignIn");
  };

  const handlePayment = (plan) => {
    console.log("Processing payment for plan:", plan);
    console.log("User currency:", userCurrency);
    
    setIsProcessing(true);
    
    const details = getPlanDetails(plan);
    
    // Pay in user's local currency
    const currency = userCurrency;
    let amountInSmallestUnit;
    
    if (currency === "NGN") {
      // NGN uses kobo (100 kobo = 1 NGN)
      amountInSmallestUnit = Math.round(details.localAmount * 100);
    } else if (currency === "USD") {
      // USD uses cents (100 cents = 1 USD)
      amountInSmallestUnit = Math.round(details.usdAmount * 100);
    } else {
      // For other currencies, use the smallest unit (usually 100 = 1)
      // Paystack accepts amount in the currency's smallest unit
      amountInSmallestUnit = Math.round(details.localAmount * 100);
    }

    // Add Paystack charge (1.5% + fixed fee)
    // For NGN: 50 NGN fixed fee, for others: $0.50 or equivalent
    const fixedFee = currency === "NGN" ? 5000 : 50; // in smallest unit
    const charge = Math.round(amountInSmallestUnit * 0.015) + fixedFee;
    const totalAmount = amountInSmallestUnit + charge;

    console.log(`Total amount: ${totalAmount} ${currency} (${totalAmount / 100} ${currency})`);

    // Check if Paystack is available
    if (!window.PaystackPop) {
      toast.error("Paystack is not loaded. Please refresh the page.");
      setIsProcessing(false);
      return;
    }

    try {
      const paystack = window.PaystackPop.setup({
        key: PAYMENT_PK,
        email: user?.email || "user@example.com",
        amount: totalAmount,
        currency: currency,
        ref: `HANG-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
        callback: function (response) {
          console.log("Payment successful:", response);
          toast.success(`Payment successful! Reference: ${response.reference}`);
          closePopup();
          setTimeout(() => {
            navigate("/CreateLiveEvent");
            window.scrollTo(0, 0);
          }, 2000);
        },
        onClose: function () {
          console.log("Payment window closed");
          toast.info("Payment window closed");
          setIsProcessing(false);
        },
      });
      paystack.openIframe();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initialize payment. Please try again.");
      setIsProcessing(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white overflow-x-hidden">
      {/* Hero Section */}
      <motion.div 
        className="relative w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
          <img
            src={banner2}
            alt="Live Streaming"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-7xl font-bold leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Reach 8M+ <br /> with Hangout Ads
            </motion.h2>
        
            <motion.p 
              className="mt-4 text-lg md:text-xl max-w-xl text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Promote your events with sponsored listings on top spots across Hangout
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollBy(0, 600)}
              className="mt-8 bg-orange-600 hover:bg-orange-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg flex items-center transition-all duration-300"
            >
              Get Started Now
              <TrendingUpIcon className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Currency Info Banner - Shows user's detected currency */}
      {!loading && (
        <motion.div 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <PublicIcon className="text-blue-200" />
              <span className="font-medium">
                {userCountryFlag} We detected you're in <strong>{countryName}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-blue-700/50 px-4 py-1 rounded-full">
              <span className="text-sm">💳 Paying in</span>
              <span className="font-bold text-lg">{currencySymbol} {userCurrency}</span>
              <span className="text-xs text-blue-200">
                (1 USD ≈ {currencySymbol}{exchangeRate.toFixed(2)})
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Info Section */}
      <motion.div 
        className="mx-auto px-6 py-16 bg-white max-w-7xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            Reach More People, Get More Bookings
          </motion.h1>
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
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            { icon: AccountTreeIcon, title: "Featured Listings", desc: "Appear at the top of search results and get discovered first by attendees looking for events like yours." },
            { icon: SendToMobileIcon, title: "Mobile + Web Visibility", desc: "Your event gets featured across Hangout's web platform and mobile apps, boosting your impressions and RSVPs." },
            { icon: OfflinePinIcon, title: "Real Results", desc: "Events promoted with Hangout Ads see up to 30% more attendance compared to unlisted ones." }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
            >
              <item.icon style={{ fontSize: 60 }} className="text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Results Section */}
      <motion.div 
        className="bg-white py-16 px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center max-w-7xl"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div>
          <motion.h2 
            className="text-4xl font-extrabold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            GET BETTER RESULTS
          </motion.h2>
          <p className="text-gray-600 mb-8 text-lg">See your ads perform better on the best event marketing platform</p>

          <div className="space-y-8">
            {[
              { title: "Drive more clicks", desc: "Boost visibility and engagement for your events with Hangout Ads. Our platform is designed to help you reach the right audience at the right time—resulting in up to 30% higher click-through rates compared to traditional Facebook Ads*." },
              { title: "Set campaign goals", desc: "Pick a goal for your ad, like maximizing your reach or driving more clicks to your event, and our platform will automatically optimize for the best results." },
              { title: "Make the most of your ad budget", desc: "The effective cost per click (eCPC) is now over 30% cheaper. Our smart ad system changes bid prices in real-time to help you get the best value for your ads." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ x: 10 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CheckCircleIcon className="text-orange-500 mr-2" />
                  {item.title}
                </h3>
                <p className="text-gray-700 ml-8">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://eventbrite-s3.s3.us-east-1.amazonaws.com/marketing/landingpages/assets/2025/rebrand/l/eventbrite-ads/a--sq-img--00.png"
            alt="Event"
            className="rounded-xl object-cover w-full h-full shadow-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div 
        className="max-w-7xl mx-auto p-6 md:p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl text-center font-extrabold text-gray-900 mb-4"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        >
          Kickstart Your Campaign with an Exclusive Offer
        </motion.h2>

        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8 text-lg">
          Select a plan that fits your goals and budget. Launch your first ad campaign and unlock bonus credits when you hit the spend target—fueling even more growth.
          <span className="text-sm block text-gray-500 mt-2 italic">*Terms and conditions apply.</span>
        </p>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading pricing information...</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {['Basic', 'Premium'].map((plan) => {
              const details = getPlanDetails(plan);
              const isPremium = plan === 'Premium';
              const localAmount = details.localAmount;
              const usdAmount = details.usdAmount;
              
              return (
                <motion.div
                  key={plan}
                  variants={fadeInUp}
                  whileHover={{ y: -15, transition: { duration: 0.3 } }}
                  className={`border-2 rounded-2xl p-8 transition-all duration-300 relative ${
                    isPremium 
                      ? 'border-orange-500 bg-gradient-to-br from-white to-orange-50 shadow-2xl' 
                      : 'border-gray-200 bg-white shadow-lg hover:shadow-2xl'
                  }`}
                >
                  {isPremium && (
                    <span className="absolute -top-3 right-8 bg-orange-500 text-white text-sm font-bold py-1 px-4 rounded-full uppercase tracking-wide shadow-lg">
                      Best Value
                    </span>
                  )}
                  
                  <div className="text-center mb-6">
                    <span className="block text-sm text-gray-500 tracking-widest uppercase mb-1">
                      {details.name}
                    </span>
                    <span className="block text-5xl font-bold text-orange-600">
                      {formatWithSymbol(localAmount, currencySymbol, userCurrency)}
                    </span>
                    <div className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      ≈ ${usdAmount} USD
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      💳 Pay in {userCurrency} ({userCountryFlag} {countryName})
                    </p>
                  </div>

                  <p className="text-gray-600 text-center text-sm mb-4">
                    {details.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <LocalOfferIcon className="text-orange-500 mr-2" />
                      What's included:
                    </h4>
                    <ul className="space-y-2">
                      {details.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-600 text-sm">
                          <CheckCircleIcon className="text-green-500 mr-2 text-sm mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg mb-6">
                    <p className="text-sm text-blue-800 flex items-start">
                      <PeopleIcon className="text-blue-600 mr-2" />
                      <span>{details.bonus}</span>
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openPopup(plan)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isPremium
                        ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-800 text-white hover:bg-gray-900'
                    }`}
                  >
                    <PaymentIcon style={{ fontSize: 20 }} />
                    {user ? `Pay ${formatWithSymbol(localAmount, currencySymbol)}` : 'Login to Proceed'}
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>

      <Partners />
      <div className="mt-10"></div>

      {/* Payment Popup */}
      <AnimatePresence>
        {isPopupOpen && selectedPlan && (
          <motion.div 
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
          >
            <motion.div 
              className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <CloseIcon />
              </button>

              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Confirm Your Payment
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {userCountryFlag} Paying in {userCurrency} ({countryName})
                </p>
              </div>

              {(() => {
                const details = getPlanDetails(selectedPlan);
                const localAmount = details.localAmount;
                const usdAmount = details.usdAmount;
                
                return (
                  <>
                    <div className="bg-orange-50 p-6 rounded-xl mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {details.name}
                      </h3>
                      <p className="text-3xl font-bold text-orange-600">
                        {formatWithSymbol(localAmount, currencySymbol)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ≈ ${usdAmount} USD
                      </p>
                      <p className="text-sm text-green-600 mt-1 font-medium">
                        ✅ Payment via Paystack ({userCurrency})
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        What's included with this payment?
                      </h3>
                      <ul className="space-y-1">
                        {details.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-gray-600">
                            <CheckCircleIcon className="text-green-500 mr-2 text-sm mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl mb-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-1">
                        💳 Payment Details
                      </h3>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Payment Gateway: <strong>Paystack</strong></li>
                        <li>• Currency: <strong>{userCurrency}</strong></li>
                        <li>• Your Location: {userCountryFlag} <strong>{countryName}</strong></li>
                        <li>• Secure SSL encrypted transaction</li>
                        <li>• Supports all major cards (Visa, Mastercard, Verve)</li>
                        {userCurrency === "NGN" && (
                          <li>• Local payment methods: Bank Transfer, USSD, QR Code</li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-xl mb-6">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                        💱 Currency Information
                      </h3>
                      <p className="text-yellow-700 text-sm">
                        You are paying in <strong>{userCurrency}</strong> at the current exchange rate:
                        <br />
                        1 USD = {currencySymbol}{exchangeRate.toFixed(2)} {userCurrency}
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl mb-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-1">
                        What happens after payment?
                      </h3>
                      <p className="text-green-700 text-sm">
                        Your event will go live immediately. You'll receive a confirmation email with instructions to manage and track your event's performance.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button
                        onClick={closePopup}
                        className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                        disabled={isProcessing}
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePayment(selectedPlan)}
                        disabled={isProcessing}
                        className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg flex items-center gap-2 ${
                          isProcessing 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-orange-600 text-white hover:bg-orange-700'
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <PaymentIcon />
                            Pay {formatWithSymbol(localAmount, currencySymbol)} via Paystack
                          </>
                        )}
                      </motion.button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Required Dialog */}
      <Dialog open={openPopupLogin} onClose={handleClosePopup}>
        <DialogTitle className="text-2xl font-bold text-gray-800">
          Login Required
        </DialogTitle>
        <DialogContent>
          <p className="text-gray-600">
            Please log in to continue with the payment process and unlock all features.
          </p>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleClosePopup} variant="contained" color="primary">
            Login Now
          </Button>
          <Button onClick={() => setOpenPopup(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default AdsSub;

