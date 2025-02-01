import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './SplashScreen.css';

const SplashScreen = ({ videoSrc, isMobile, onEnd }) => {
    const videoRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const [isFadedIn, setIsFadedIn] = useState(false);

    useEffect(() => {
        //console.log('Initial mount effect');
        const readyTimer = setTimeout(() => {
            //console.log('Ready timer fired');
            setIsReady(true);
            setTimeout(() => {
                // console.log('Fade in timer fired');
                setIsFadedIn(true);
            }, 150);
        }, 1000);

        return () => clearTimeout(readyTimer);
    }, []);

    useEffect(() => {
        if (!isReady) {
            //console.log('Not ready yet');
            return;
        }

        const video = videoRef.current;
        if (!video) {
            //console.log('No video ref');
            return;
        }

        //console.log('Setting up video');

        const handleVideoEnded = () => {
            //console.log('Video ended');
            setIsTransitioning(true);
            setTimeout(() => {
                setShowSplash(false);
                // Call onEnd after transition completes
                setTimeout(() => {
                    onEnd();
                }, 1000);
            }, 1000);
        };

        const startPlayback = async () => {
            try {
                // console.log('Attempting to play video');
                await video.play();
                //console.log('Video playing successfully');
            } catch (error) {
                //console.error('Play error:', error);
                handleVideoEnded();
            }
        };

        const handleLoadedMetadata = () => {
            //console.log('Video metadata loaded');
            startPlayback();
        };

        video.removeAttribute('src');
        video.load();

        Object.assign(video, {
            muted: true,
            playsInline: true,
            controls: false,
            autoplay: true,
            preload: 'true',
        });

        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleVideoEnded);

        //console.log('Setting video source:', videoSrc);
        video.src = videoSrc;
        video.load();

        return () => {
            // console.log('Cleanup effect');
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
