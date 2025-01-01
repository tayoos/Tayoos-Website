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
        console.log('Initial mount effect');
        const readyTimer = setTimeout(() => {
            console.log('Ready timer fired');
            setIsReady(true);
            setTimeout(() => {
                console.log('Fade in timer fired');
                setIsFadedIn(true);
            }, 100);
        }, 1000);

        return () => clearTimeout(readyTimer);
    }, []);

    useEffect(() => {
        if (!isReady) {
            console.log('Not ready yet');
            return;
        }

        const video = videoRef.current;
        if (!video) {
            console.log('No video ref');
            return;
        }

        console.log('Setting up video');

        const handleVideoEnded = () => {
            console.log('Video ended');
            setIsTransitioning(true);
            setTimeout(() => {
                setShowSplash(false);
            }, 1000);
        };

        const startPlayback = async () => {
            try {
                console.log('Attempting to play video');
                await video.play();
                console.log('Video playing successfully');
            } catch (error) {
                console.error('Play error:', error);
                // If autoplay fails, we might want to show a play button or handle differently
                handleVideoEnded();
            }
        };

        const handleLoadedMetadata = () => {
            console.log('Video metadata loaded');
            startPlayback();
        };

        // Reset video element
        video.removeAttribute('src');
        video.load();

        // Configure video
        Object.assign(video, {
            muted: true,
            playsInline: true,
            controls: false,
            autoplay: true,
            preload: 'auto',
        });

        // Force webkit attributes
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');

        // Add event listeners
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleVideoEnded);

        // Set source last
        console.log('Setting video source:', videoSrc);
        video.src = videoSrc;
        video.load();

        return () => {
            console.log('Cleanup effect');
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleVideoEnded);
            video.pause();
            video.removeAttribute('src');
            video.load();
        };
    }, [videoSrc, isReady]);

    return (
        <div className={`splash-screen ${isTransitioning ? 'transitioning' : ''}`}>
            {showSplash && (
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
            )}
        </div>
    );
};

SplashScreen.propTypes = {
    videoSrc: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default SplashScreen;
