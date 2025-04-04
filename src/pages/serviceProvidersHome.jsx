import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField, CircularProgress } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ROUTE } from '../ApisConf/api_config';

const ServiceProviders = () => {
  const navigate = useNavigate();
  const [providersDetails, setProviders] = useState([]);
  const [noFarmersFound, setNoFarmersFound] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const fetchProviders = async () => {
      setIsLoading(true); // Start loading when component is mounted
      try {
        const response = await axios.get(`${API_ROUTE}/service-providers/`);
        setProviders(response.data);
        console.log('fetch provider result', response.data)
      } catch (error) {
        console.log('Fetching error', error);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchProviders();
  }, []);
  

  

  // const handleProfileNavigate = (slug) => {
  //   navigate(`/ServiceProviderDetails/${slug}`);
  //   window.scrollTo(0,0);
  // };

  return (
    <div className="bg-black">
      <style>
        {` 
          .loader {
            width: 58px;
            height: 58px;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            border: 3px solid;
            border-color: #FFF #FFF transparent transparent;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
          }
          .loader::after,
          .loader::before {
            content: '';  
            box-sizing: border-box;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            border: 3px solid;
            border-color: transparent transparent #FF3D00 #FF3D00;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-sizing: border-box;
            animation: rotationBack 0.5s linear infinite;
            transform-origin: center center;
          }
          .loader::before {
            width: 32px;
            height: 32px;
            border-color: #FFF #FFF transparent transparent;
            animation: rotation 1.5s linear infinite;
          }

          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          } 
          @keyframes rotationBack {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
              
        `}
      </style>
      {/* Product Page Layout */}
      <div className="bg-[#dee3ed] py-12 px-6 flex flex-wrap justify-center">
        {isLoading ? (
          <div className="text-center text-white">
            <span className="loader"></span>
          </div>
        ) : noFarmersFound ? (
          <div style={{ backgroundColor: 'red', color: '#fff', width: '100%', maxWidth: '400px', padding: '10px' }} className="text-center text-white font-bold text-xl">
            No farmers found
          </div>
        ) : (
         providersDetails.map((profile, index) => (
            <div
              key={index}
              className="mx-4 my-6 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              style={{ width: '100%', maxWidth: '300px' }}
            >
              <div className="relative">
             
                <img
                  className="w-full h-48 object-cover object-center"
                  src={`${profile.images?.[0]?.image}`}
                  alt={profile.fullname}
                  style={{
                    objectPosition: 'center center',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className="p-4 mx-auto text-center">
                <Typography variant="h6" className="font-bold text-gray-900 mt-2">
                  {profile.name}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-3">
                  {profile.profession}
                </Typography>
                <div className="mx-auto text-center item-center mt-2 gap-1 mb-4">
                  <div className=" gap-0.5">
                    {[...Array(5)].map((_, index) => (
                      <StarRateIcon key={index} style={{ fontSize: 15 }} className="text-orange-500" />
                    ))}
                  </div>
                  <Typography style={{ fontSize: 15 }}>{profile.work_experience}</Typography>
                </div>
                <Button
                  onClick={() => navigate(`/ServiceProviderDetails/${profile.slug}`)}
                  variant="contained"
                  fullWidth
                  style={{
                    backgroundColor: '#f58631',
                    color: '#000',
                    fontWeight: '600',
                  }}
                  className="mt-4 hover:bg-orange-300 py-2 rounded-lg"
                  
                >
                  Connect
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceProviders;
