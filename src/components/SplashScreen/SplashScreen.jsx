import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './SplashScreen.css';

const SplashScreen = ({ videoSrc, isMobile, onEnd, onTransitionStart }) => {
    const videoRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const [isFadedIn, setIsFadedIn] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            onEnd();
            return;
        }
        let innerTimer;
        const readyTimer = setTimeout(() => {
            setIsReady(true);
            innerTimer = setTimeout(() => setIsFadedIn(true), 200);
        }, 1000);

        return () => {
            clearTimeout(readyTimer);
            clearTimeout(innerTimer);
        };
    }, [onEnd]);

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

        let endTimer;
        let finished = false;
        let disposed = false;
        const handleVideoEnded = () => {
            if (finished || disposed) return;
            finished = true;
            setIsTransitioning(true);
            if (onTransitionStart) onTransitionStart();
            // Match the shared reveal duration, including reduced-motion overrides.
            const fadeMs = parseFloat(getComputedStyle(video.closest('.splash-screen')).transitionDuration) * 1000;
            endTimer = setTimeout(() => {
                setShowSplash(false);
                onEnd();
            }, fadeMs);
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
            preload: 'auto',
        });

        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleVideoEnded);
        video.addEventListener('error', handleVideoEnded);

        //console.log('Setting video source:', videoSrc);
        video.src = videoSrc;
        video.load();

        return () => {
            // console.log('Cleanup effect');
            disposed = true;
            clearTimeout(endTimer);
            video.removeEventListener('error', handleVideoEnded);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleVideoEnded);
            video.pause();
            video.removeAttribute('src');
            video.load();
        };
    }, [videoSrc, isReady, onEnd, onTransitionStart]);

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
    onTransitionStart: PropTypes.func,
};

export default SplashScreen;
