

import { useState, useEffect } from "react";
import {
  Avatar,
  IconButton,
  Dialog,
  TextField,
} from "@mui/material";
import { Mic, Videocam, ScreenShare, CallEnd, Chat } from "@mui/icons-material";
import SensorsIcon from "@mui/icons-material/Sensors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ROUTE } from "../ApisConf/api_config";
import { Divider } from "antd";
import banner2 from "../assets/2aa50969261209.5b7d16b296b51.jpg";

const GoLivePage = () => {
  const [channelId, setChannelId] = useState("");
  const [channelId2, setChannelIdIput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserID] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchChannelId = async () => {
      const userId = localStorage.getItem("user_id");
      setUserID(userId);
      try {
        const response = await fetch(`${API_ROUTE}user_channel/${userId}/`);
        const data = await response.json();
        if (data.channel_id) {
          setChannelId(data.channel_id);
        }
      } catch (error) {
        console.error("Error fetching channel ID:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannelId();
  }, [userId]);

  const handleSaveChannelId = async () => {
    if (!channelId2) {
      toast.error("Please enter your Channel ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch(`${API_ROUTE}user_channel/${userId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channel_id: channelId2 }),
      });

      if (response.ok) {
        setChannelId(channelId2);
        toast.success("Channel ID saved successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Error saving Channel ID. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error saving channel ID:", error);
    }
  };

  const handleGoLive = async () => {
    if (channelId) {
      window.open(
        `https://www.youtube.com/live_dashboard?nv=1&channel=${channelId}`,
        "_blank"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-300">
      {/* Live Streaming Area */}
      <div className="relative w-full">
        <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
          {/* Background Image */}
          <img
            src={banner2}
            alt="Live Streaming"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55"></div>

          {/* Main Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-10">
  <h2 className="text-3xl mt-3 md:text-6xl font-bold leading-tight">
    Bring Your Event to Life!
  </h2>
  <p className="mt-2 text-lg md:text-xl max-w-xl">
    Stream your bar, event, or venue live on Hangout and attract more visitors.
  </p>


  <button
    className="mt-6 bg-orange-600 cursor-pointer hover:bg-orange-700 px-5 md:px-8 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105"
    onClick={() => setOpen(true)}
  >
    <SensorsIcon style={{ fontSize: 40 }} className="mr-3" /> Go Live Now
  </button>
</div>

        </div>

        {/* Participants (Hidden on Small Screens) */}
        <div className="absolute top-4 right-4 hidden md:flex space-x-2">
          {[
            "https://i.pravatar.cc/40",
            "https://i.pravatar.cc/41",
            "https://i.pravatar.cc/42",
          ].map((src, index) => (
            <Avatar key={index} src={src} className="border-2 border-white" />
          ))}
        </div>

        {/* "Live" Badge */}
        <div className="absolute top-4 left-4 flex bg-red-600 items-center shadow-md p-2 text-white rounded-lg">
          <SensorsIcon className="mr-1" /> Live
        </div>

        {/* Control Bar (Responsive) */}
<div className="relative bottom-4 mx-auto flex flex-wrap items-center justify-center gap-2 bg-white p-3 rounded-full shadow-lg backdrop-blur-lg max-w-[80%] overflow-x-scroll md:overflow-visible">
  <IconButton className="bg-white shadow-md rounded-full p-2 hover:bg-gray-200">
    <Mic className="text-gray-700" />
  </IconButton>
  <IconButton className="bg-white shadow-md rounded-full p-2 hover:bg-gray-200">
    <Videocam className="text-gray-700" />
  </IconButton>
  <IconButton className="bg-white shadow-md rounded-full p-2 hover:bg-gray-200">
    <ScreenShare className="text-gray-700" />
  </IconButton>
  <IconButton className="bg-red-600 shadow-md rounded-full p-2 hover:bg-red-700">
    <CallEnd className="text-gray-700" />
  </IconButton>
  <IconButton className="bg-white shadow-md rounded-full p-2 hover:bg-gray-200">
    <Chat className="text-gray-700" />
  </IconButton>
</div>

      </div>

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
          
            <a
              href="https://www.youtube.com/account_advanced"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mb-3 inline-block hover:underline"
            >
               Find Your Channel ID
            </a>
           
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

      <ToastContainer />
    </div>
  );
};

export default GoLivePage;






// import React, { useRef, useState, useEffect } from "react";
// import SimplePeer from "simple-peer";
// import axios from "axios";

// const Broadcaster = () => {
//   const videoRef = useRef(null);
//   const peerRef = useRef(null);
//   const wsRef = useRef(null);
//   const [streamKey, setStreamKey] = useState("");
//   const [status, setStatus] = useState("Initializing...");
//   const [isLive, setIsLive] = useState(false);
//   const [stream, setStream] = useState(null);

//   // useEffect(() => {
//   //   const initialize = async () => {
//   //     try {
//   //       const token = localStorage.getItem("auth_token");
//   //       if (!token) throw new Error("Not authenticated");

//   //       const response = await axios.get("http://127.0.0.1:8000/get-stream-key/", {
//   //         headers: { Authorization: `Token ${token}` },
//   //       });

//   //       setStreamKey(response.data.streamKey);
//   //       setStatus("Ready to broadcast");
//   //     } catch (error) {
//   //       console.error("Initialization error:", error);
//   //       setStatus("Initialization failed");
//   //     }
//   //   };

//   //   initialize();

//   //   return () => {
//   //     stopBroadcast();
//   //   };
//   // }, []);

//   const startBroadcast = async () => {
//     try {
//       setStatus("Starting broadcast...");
      
//       // Get user media stream
//       const mediaStream = await navigator.mediaDevices.getUserMedia({ 
//         video: true, 
//         audio: true 
//       });
//       videoRef.current.srcObject = mediaStream;
//       setStream(mediaStream);

//       // Connect WebSocket
//       const socket = new WebSocket(`ws://localhost:8001/ws/live/${streamKey}/`);
//       wsRef.current = socket;

//       socket.onopen = () => {
//         console.log("✅ WebSocket connected for broadcasting");
//         setStatus("Connected, waiting for viewers...");
//         setIsLive(true);

//         // Create new peer connection
//         const peer = new SimplePeer({ 
//           initiator: true, 
//           trickle: true, 
//           stream: mediaStream,
//           config: {
//             iceServers: [
//               { urls: 'stun:stun.l.google.com:19302' },
//               { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }
//             ]
//           }
//         });
//         peerRef.current = peer;

      
// peer.on('connectionstatechange', () => {
//   console.log('Peer connection state:', peer.connectionState);
//   setStatus(`Peer state: ${peer.connectionState}`);
// });

// peer.on('iceconnectionstatechange', () => {
//   console.log('ICE connection state:', peer.iceConnectionState);
//   setStatus(`ICE state: ${peer.iceConnectionState}`);
// });

// // Add ICE candidate handling:
// peer.on('icecandidate', (candidate) => {
//   if (candidate.candidate && wsRef.current?.readyState === WebSocket.OPEN) {
//     wsRef.current.send(JSON.stringify({
//       type: "ice_candidate",
//       candidate: candidate.candidate
//     }));
//   }
// });
// peer.on("signal", (data) => {
//   setTimeout(() => {
//     if (wsRef.current?.readyState === WebSocket.OPEN) {
//       wsRef.current.send(JSON.stringify({
//         type: "offer", 
//         signal: data,
//         streamKey
//       }));
//     }
//   }, 500);
// });



//         peer.on("connect", () => {
//           setStatus("LIVE - Streaming to viewers");
//           console.log("✅ Peer connection established.");
//         });

//         peer.on("error", (err) => {
//           console.error("❌ Peer connection error:", err);
//           setStatus("Connection error");
//           stopBroadcast();
//         });

//         peer.on("close", () => {
//           console.log("Peer connection closed");
//           setStatus("Connection closed");
//           stopBroadcast();
//         });
//       };

//       socket.onmessage = (event) => {
//         try {
//           const message = JSON.parse(event.data);
//           console.log("📩 Received from WebSocket:", message);

//           if (message.type === "answer" && peerRef.current) {
//             console.log("📡 Received answer from viewer:", message.signal);
//             peerRef.current.signal(message.signal);
//           }
//         } catch (error) {
//           console.error("Error processing WebSocket message:", error);
//         }
//       };

//       socket.onerror = (error) => {
//         console.error("❌ WebSocket error:", error);
//         setStatus("WebSocket error");
//         stopBroadcast();
//       };

//       socket.onclose = () => {
//         console.warn("⚠️ WebSocket closed.");
//         setStatus("Connection lost");
//         stopBroadcast();
//       };

//     } catch (error) {
//       console.error("❌ Broadcast start failed:", error);
//       setStatus("Error: " + error.message);
//       stopBroadcast();
//     }
//   };

//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     console.log("Peer connection state:", 
//   //       peerRef.current?.connectionState,
//   //       "ICE state:", 
//   //       peerRef.current?.iceConnectionState
//   //     );
//   //   }, 2000);
//   //   return () => clearInterval(interval);
//   // }, []);

//   const stopBroadcast = () => {
//     setIsLive(false);
//     setStatus("Broadcast ended");
    
//     // Close peer connection
//     if (peerRef.current) {
//       peerRef.current.destroy();
//       peerRef.current = null;
//     }
    
//     // Close WebSocket
//     if (wsRef.current) {
//       if (wsRef.current.readyState === WebSocket.OPEN) {
//         wsRef.current.send(JSON.stringify({ type: "end", streamKey }));
//       }
//       wsRef.current.close();
//       wsRef.current = null;
//     }
    
//     // Stop media stream
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//       setStream(null);
//     }
    
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
    
//   };

//   fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC2iO9eQxw1lfNmV2XLYBACA&type=video&eventType=live&key=AIzaSyA9OK9gtXQrggzVwmBzXnVUq3ab1x9xTmM')
//   .then(response => response.json())
//   .then(data => {
//     if (data.items.length > 0) {
//       const videoId = data.items[0].id.videoId;
//       document.getElementById("liveVideo").src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
//     }
//   });


//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
//       <h1>Live Broadcaster</h1>

//       <iframe 
//     width="560" height="315" 
//     src="https://www.youtube.com/embed/MwXdYnTBct4?autoplay=1" 
//     frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
//     allowfullscreen>
// </iframe>



//       <div style={{ margin: "10px 0", fontWeight: "bold" }}>
//         Status: <span style={{ color: isLive ? "green" : "inherit" }}>{status}</span>
//       </div>
//       {/* {streamKey && <div style={{ margin: "10px 0" }}>Stream Key: {streamKey}</div>} */}
      
//       {/* <video 
//         ref={videoRef} 
//         autoPlay 
//         playsInline 
//         muted 
//         style={{ 
//           width: "100%", 
//           backgroundColor: "#000",
//           borderRadius: "8px",
//           margin: "10px 0"
//         }} 
//       />

//       <div style={{ margin: "20px 0" }}>
//         {!isLive ? (
//           <button 
//             onClick={startBroadcast} 
//             disabled={!streamKey || status.includes("Starting")}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#4CAF50",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer"
//             }}
//           >
//             {status.includes("Starting") ? "Starting..." : "Go Live"}
//           </button>
//         ) : (
//           <button 
//             onClick={stopBroadcast} 
//             disabled={status.includes("Stopping")}
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#f44336",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer"
//             }}
//           >
//             {status.includes("Stopping") ? "Stopping..." : "End Broadcast"}
//           </button>
//         )}
//       </div> */}
//     </div>
//   );
// };

// export default Broadcaster;


