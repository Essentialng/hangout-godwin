import { Facebook, Instagram, LinkedIn, Close } from "@mui/icons-material";
import logo from '../assets/hangout.png';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleRedirect =()=>{navigate('AboutUs')}
  const handleSignin2 =()=>{navigate('/')}
  
  return (
    <footer className="bg-orange-800 text-white p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <img onClick={handleSignin2} className="w-60 h-40 cursor-pointer" src={logo} alt="" />
          {/* <h3 className="text-3xl font-semibold">ABOUT</h3> */}
          <p className="text-sm mt-2">
          Providing an all-in-one platform to find and attend events that match your interests. From concerts and social gatherings to corporate networking and adventure trips, we bring people together.
          </p>
          <button onClick={handleRedirect} className="bg-white cursor-pointer text-bold font-bold text-orange-800 px-4 py-2 mt-4 rounded">Learn More About Us</button>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-3xl font-semibold">SERVICES</h3>
          <ul className="text-sm mt-2 space-y-1">
            {['Events', 'Hangout Place', 'Lovers Place', 'Services Provider', 'Go-Live', 'Entertainment', 'e-Ads',].map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="text-3xl font-semibold">POLICIES</h3>
          <ul onClick={() =>navigate('/TermsOfService')} className="text-sm mt-2 space-y-1 cursor-pointer">
            {['Privacy Policy', 'Terms and Conditions', 'FAQs', 'Contact Us'].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-3xl font-semibold">FOLLOW US</h3>
          <div className="flex space-x-4 mt-4">
            <div className="bg-white text-orange-800 p-2 rounded-full">
              <Facebook fontSize="small" />
            </div>
            <div className="bg-white text-orange-800 p-2 rounded-full">
              <Instagram fontSize="small" />
            </div>
            <div className="bg-white text-orange-800 p-2 rounded-full">
              <LinkedIn fontSize="small" />
            </div>
            <div className="bg-white text-orange-800 p-2 rounded-full">
              <Close fontSize="small" />
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4 mt-5" />
      <div className="text-white py-4 mt-7 text-center">
        <p>&copy; {new Date().getFullYear()} E-Hangout. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
