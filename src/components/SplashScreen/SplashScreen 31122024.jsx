import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './SplashScreen.css';

const SplashScreen = ({ videoSrc, isMobile }) => {
    const videoRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const [isFadedIn, setIsFadedIn] = useState(false);

    useEffect(() => {
        // Add initial delay to ensure CSS is loaded
        const readyTimer = setTimeout(() => {
            setIsReady(true);
            // Start fade in after a brief delay
            setTimeout(() => {
                setIsFadedIn(true);
            }, 100); // Small delay to ensure transition happens
        }, 1000);

        return () => clearTimeout(readyTimer);
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const video = videoRef.current;
        if (!video) return;

        const handleVideoEnded = () => {
            console.log('Video ended, transitioning...');
            setIsTransitioning(true);

            setTimeout(() => {
                setShowSplash(false);
            }, 1000);
        };

        const handleCanPlay = () => {
            console.log('Video can play');
            video.play().catch((error) => {
                console.error('Error playing video:', error);
                handleVideoEnded();
            });
        };

        video.src = videoSrc;
        video.load();
        video.muted = true;
        video.autoplay = true;

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('ended', handleVideoEnded);
        video.load();

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('ended', handleVideoEnded);
            video.pause();
            video.src = '';
        };
    }, [videoSrc, isReady]);

    return <div className={`splash-screen ${isTransitioning ? 'transitioning' : ''}`}>{showSplash && <div className="video-container">{isReady && <video ref={videoRef} className={`splash-video ${isFadedIn ? 'fade-in' : ''}`} muted autoPlay />}</div>}</div>;
};

SplashScreen.propTypes = {
    videoSrc: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default SplashScreen;
