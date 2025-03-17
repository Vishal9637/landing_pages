import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const HeroSection = ({ onLoaded }) => {
  const [mediaUrl, setMediaUrl] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [loading, setLoading] = useState(true);

  const UNSPLASH_API_KEY = 'HdtGUfoMVitCBQPmDGIP5piwA-fGt3aXSDtVafXYFqs';
  const PEXELS_API_KEY = 'ZssroRZjwsOkAP7a25lUXwMU5PkmQJZ1KqXUYCfT3FcEQxhzSzf5TTh4';

  const fetchRandomMedia = async () => {
    setLoading(true);
    const isFetchingVideo = Math.random() < 0.5;

    try {
      if (isFetchingVideo) {
        const videoResponse = await fetch(
          'https://api.pexels.com/videos/search?query=technology&per_page=5',
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        const videoData = await videoResponse.json();
        if (videoData.videos.length > 0) {
          const randomVideo = videoData.videos[Math.floor(Math.random() * videoData.videos.length)];
          setMediaUrl(randomVideo.video_files[0].link);
          setIsVideo(true);
        } else {
          throw new Error('No videos found');
        }
      } else {
        const imageResponse = await fetch(
          `https://api.unsplash.com/photos/random?query=technology&client_id=${UNSPLASH_API_KEY}`
        );
        const imageData = await imageResponse.json();
        setMediaUrl(imageData.urls.regular);
        setIsVideo(false);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }

    setLoading(false);
    if (onLoaded) onLoaded();
  };

  useEffect(() => {
    fetchRandomMedia();
  }, []);

  const scrollToServiceSection = () => {
    const serviceSection = document.getElementById('service-section');
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden">
      <div className="absolute inset-0 transition-opacity duration-1000">
        {isVideo ? (
          <video
            key={mediaUrl}
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={mediaUrl}
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
          />
        )}
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to Our Service
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow">
          We provide the best solutions for your business.
        </p>
        <button
          onClick={scrollToServiceSection}
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out text-white font-semibold py-3 px-6 rounded-full shadow-lg"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  onLoaded: PropTypes.func,
};

export default HeroSection;
