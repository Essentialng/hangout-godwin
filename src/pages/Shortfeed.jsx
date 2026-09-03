import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, MapPin, Calendar, Clock, ChevronRight, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ROUTE } from "../ApisConf/api_config";

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoErrors, setVideoErrors] = useState({});
  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_ROUTE}/videos/all/?limit=30`);
      if (response.data) {
        setVideos(response.data.results);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleNavigateToDetail = () => {
    if (selectedVideo) {
      setIsModalOpen(false);
      document.body.style.overflow = 'auto';
      navigate(selectedVideo.link);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setSelectedVideo(null);
  };

  const handlePlayPause = (videoId, e) => {
    if (e) e.stopPropagation();
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      if (videoElement.paused) {
        Object.keys(videoRefs.current).forEach(key => {
          if (key !== videoId && videoRefs.current[key]) {
            videoRefs.current[key].pause();
          }
        });
        videoElement.play().catch(err => {
          console.log('Play error:', err);
        });
        setActiveVideo(videoId);
      } else {
        videoElement.pause();
        setActiveVideo(null);
      }
    }
  };

  const handleVideoError = (videoId, e) => {
    console.error('Video error for ID:', videoId, e);
    setVideoErrors(prev => ({ ...prev, [videoId]: true }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getThumbnail = (video) => {
    if (video.video_thumbnail) {
      if (video.video_thumbnail.startsWith('http')) {
        return video.video_thumbnail;
      }
      return `${API_ROUTE}${video.video_thumbnail}`;
    }
    if (video.image_url) {
      if (video.image_url.startsWith('http')) {
        return video.image_url;
      }
      return `${API_ROUTE}${video.image_url}`;
    }
    return null;
  };

  const getVideoUrl = (video) => {
    if (!video.video_url) return null;
    if (video.video_url.startsWith('http')) {
      return video.video_url;
    }
    return `${API_ROUTE}${video.video_url}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-20">
        <Play size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">No videos available yet</p>
        <p className="text-gray-400 text-sm">Check back later for updates!</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 mt-30">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-4xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center gap-3">
                
                Explore Short Videos
              </h2>
              <p className="text-gray-500 text-2xl">Watch short videos of amazing places and events</p>
            </div>
            
          </div>
        </div>

        {/* Video Grid - 4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => {
            const videoId = `${video.type}-${video.id}`;
            const isPlaying = activeVideo === videoId;
            const isHovered = hoveredVideo === videoId;
            const hasError = videoErrors[videoId];
            const thumbnail = getThumbnail(video);
            const videoUrl = getVideoUrl(video);
            
            return (
              <motion.div
                key={videoId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                onClick={() => handleVideoClick(video)}
                onMouseEnter={() => setHoveredVideo(videoId)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                {/* Video Container - Smaller height */}
                <div className="relative aspect-[9/14] bg-gray-900 overflow-hidden">
                  {videoUrl && !hasError ? (
                    <>
                      <video
                        ref={(el) => (videoRefs.current[videoId] = el)}
                        className="w-full h-full object-cover"
                        poster={thumbnail || undefined}
                        muted
                        playsInline
                        preload="metadata"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPause(videoId, e);
                        }}
                        onError={(e) => handleVideoError(videoId, e)}
                      >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {!isPlaying && thumbnail && (
                        <img 
                          src={thumbnail} 
                          alt={video.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <div className="text-center text-white">
                        <AlertCircle size={32} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-xs text-gray-400">Video unavailable</p>
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

                  {/* Play Button Overlay */}
                  {!hasError && (
                    <div 
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 shadow-2xl transform hover:scale-110 transition-transform">
                        {isPlaying ? (
                          <div className="w-5 h-5 bg-gray-800 rounded-sm"></div>
                        ) : (
                          <Play className="w-5 h-5 text-gray-800 ml-0.5" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Type Badge - Smaller */}
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      {video.type === 'hangout' && 'Hangout'}
                      {video.type === 'lovers' && 'Lovers'}
                      {video.type === 'event' && 'Event'}
                    </span>
                  </div>

                  {/* Views - Smaller */}
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                    <Eye size={12} />
                    {video.view_count || 0}
                  </div>

                  {/* Bottom Info - Smaller */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-bold text-sm mb-0.5 line-clamp-1">
                      {video.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-white/80">
                      <MapPin size={12} className="flex-shrink-0" />
                      <span className="truncate">{video.location}</span>
                    </div>

                    {video.category && (
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded-full mt-1">
                        {video.category}
                      </span>
                    )}
                  </div>

                  {/* Playing Indicator */}
                  {isPlaying && !hasError && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 rounded-full border-2 border-white/30 animate-ping"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        {videos.length >= 30 && (
          <div className="text-center mt-10">
            <button 
              onClick={() => fetchVideos()}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Load More Videos
            </button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeModal}
          >
            <div 
              className="relative w-full max-w-3xl mx-4 bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
              >
                <X size={24} />
              </button>

              <div className="relative aspect-[9/16] md:aspect-[16/9] bg-black">
                {selectedVideo.video_url ? (
                  <video
                    ref={modalVideoRef}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                    poster={getThumbnail(selectedVideo) || undefined}
                    onError={(e) => {
                      console.error('Modal video error:', e);
                    }}
                  >
                    <source src={getVideoUrl(selectedVideo)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <AlertCircle size={64} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-lg">Video unavailable</p>
                      <p className="text-sm text-gray-400">The video could not be loaded</p>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-xl font-bold mb-1">
                    {selectedVideo.name}
                  </h3>
                  <div className="flex items-center gap-3 text-white/80 text-sm flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {selectedVideo.location}
                    </span>
                    {selectedVideo.category && (
                      <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs">
                        {selectedVideo.category}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Eye size={14} />
                      {selectedVideo.view_count || 0} views
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleNavigateToDetail}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-5 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors duration-200 shadow-lg flex items-center gap-2"
                >
                  View Full Details
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoFeed;