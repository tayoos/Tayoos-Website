import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './SplashScreen.css';

const SplashScreen = ({ videoSrc, isMobile, onEnd }) => {
    const videoRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const [isFadedIn, setIsFadedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        // Initial delay to simulate readiness (can be adjusted or removed)
        const readyTimer = setTimeout(() => {
            setIsReady(true);
            setTimeout(() => {
                setIsFadedIn(true); // Fade in after a short delay
            }, 150);
        }, 1000);

        return () => clearTimeout(readyTimer);
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const video = videoRef.current;
        if (!video) return;

        const handleVideoEnded = () => {
            setIsTransitioning(true);
            setTimeout(() => {
                setShowSplash(false);
                setTimeout(() => {
                    onEnd(); // Call onEnd after transition completes
                }, 1000);
            }, 1000);
        };

        const startPlayback = async () => {
            try {
                await video.play();
            } catch (error) {
                console.error('Play error:', error);
                handleVideoEnded(); // Fallback if playback fails
            }
        };

        const handleLoadedMetadata = () => {
            setIsLoading(false); // Mark video as loaded
            startPlayback(); // Start playback once metadata is loaded
        };

        // Configure video attributes
        Object.assign(video, {
            muted: true,
            playsInline: true,
            controls: false,
            autoplay: true,
            preload: 'auto',
        });
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');

        // Attach event listeners
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleVideoEnded);

        // Set video source
        video.src = videoSrc;
        video.load();

        return () => {
            // Cleanup event listeners and pause video
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleVideoEnded);
            video.pause();
            video.removeAttribute('src');
            video.load();
        };
    }, [videoSrc, isReady, onEnd]);

    if (!showSplash) return null;

    return (
        <div className={`splash-screen ${isTransitioning ? 'transitioning' : ''} ${isMobile ? 'Mobile' : ''}`}>
            {/* Show loading spinner until video is ready */}
            {isLoading && <div className="loading-spinner">Loading...</div>}

            <div className="video-container">
                {isReady && (
                    <video
                        ref={videoRef}
                        className={`splash-video ${isFadedIn ? 'fade-in' : ''}`}
                        muted
                        playsInline
                        webkit-playsinline=""
                        autoPlay
                        preload="auto"
                        style={{
                            pointerEvents: 'none',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                        }}
                    />
                )}
            </div>
        </div>
    );
};

SplashScreen.propTypes = {
    videoSrc: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
    onEnd: PropTypes.func.isRequired,
};

export default SplashScreen;
