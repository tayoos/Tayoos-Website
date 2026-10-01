import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './SplashScreen.css';

const PLAYBACK_WAIT_MS = 4000;

const SplashScreen = ({ videoSrc, isMobile, onEnd, onTransitionStart }) => {
    const videoRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [isFadedIn, setIsFadedIn] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            onEnd();
            return;
        }
        const video = videoRef.current;
        if (!video) return;

        let endTimer;
        let waitTimer;
        let finished = false;
        let disposed = false;
        const handleVideoEnded = () => {
            if (finished || disposed) return;
            finished = true;
            clearTimeout(waitTimer);
            video.pause();
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
                await video.play();
            } catch {
                handleVideoEnded();
            }
        };

        const handlePlaying = () => {
            if (finished || disposed) return;
            clearTimeout(waitTimer);
            waitTimer = null;
            setIsFadedIn(true);
        };

        // Bound both startup and subsequent buffering without cutting off playback.
        const handleWaiting = () => {
            if (finished || disposed || waitTimer != null) return;
            waitTimer = setTimeout(handleVideoEnded, PLAYBACK_WAIT_MS);
        };

        Object.assign(video, {
            muted: true,
            playsInline: true,
            controls: false,
            autoplay: true,
            preload: 'auto',
        });

        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');

        video.addEventListener('playing', handlePlaying);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('ended', handleVideoEnded);
        video.addEventListener('error', handleVideoEnded);

        setIsFadedIn(false);
        video.src = videoSrc;
        handleWaiting();
        startPlayback();

        return () => {
            disposed = true;
            clearTimeout(endTimer);
            clearTimeout(waitTimer);
            video.removeEventListener('error', handleVideoEnded);
            video.removeEventListener('playing', handlePlaying);
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('ended', handleVideoEnded);
            video.pause();
            video.removeAttribute('src');
            video.load();
        };
    }, [videoSrc, onEnd, onTransitionStart]);

    if (!showSplash) return null;

    return (
        <div className={`splash-screen ${isTransitioning ? 'transitioning' : ''} ${isMobile ? 'Mobile' : ''}`}>
            <div className="video-container">
                    <video
                        ref={videoRef}
                        className={`splash-video ${isFadedIn ? 'fade-in' : ''}`}
                        muted
                        playsInline
                        autoPlay
                        preload="auto"
                        style={{
                            pointerEvents: 'none',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                        }}
                    />
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
