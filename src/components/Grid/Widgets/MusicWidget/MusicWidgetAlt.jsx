import React, { useState, useEffect } from 'react';
import './MusicWidget.css';

import SpotifyIcon from '../../../../assets/icons/Spotify.png';
import SpotifyDarkIcon from '../../../../assets/icons/Spotify-dark.png';

// TEMP
const TBC = import.meta.env.VITE_TBC;

const MusicWidget = ({ darkMode }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [lastPlayedTrack, setLastPlayedTrack] = useState(null); // Store last played track
    const [error, setError] = useState(null);
    const [pollingInterval, setPollingInterval] = useState(60000); // Start with 60 seconds
    const [isPageActive, setIsPageActive] = useState(true);
    const [callLimitReached, setCallLimitReached] = useState(false);

    // Load lastPlayedTrack from localStorage on component mount
    useEffect(() => {
        const storedLastPlayedTrack = localStorage.getItem('lastPlayedTrack');
        if (storedLastPlayedTrack) {
            setLastPlayedTrack(JSON.parse(storedLastPlayedTrack));
        }
    }, []);

    // Function to fetch data from your AWS REST API
    const fetchCurrentlyPlaying = async () => {
        try {
            const response = await fetch(TBC);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            if (data.message === 'No song is currently playing on either service.') {
                setCurrentTrack(null);
                setPollingInterval(120000); // Increase polling interval to 120 seconds
            } else {
                setCurrentTrack(data);

                // Update lastPlayedTrack and save it to localStorage
                setLastPlayedTrack(data);
                localStorage.setItem('lastPlayedTrack', JSON.stringify(data));

                setPollingInterval(60000); // Reset polling interval to 60 seconds
            }
            setError(null);
        } catch (error) {
            console.error('Error fetching currently playing track:', error);
            setError('Failed to connect to the music service.');
        }
    };

    // Polling logic
    useEffect(() => {
        let intervalId;
        const startPolling = () => {
            intervalId = setInterval(() => {
                if (isPageActive && !callLimitReached) {
                    fetchCurrentlyPlaying();
                }
            }, pollingInterval);
        };
        if (isPageActive && !callLimitReached) {
            fetchCurrentlyPlaying(); // Initial call
            startPolling();
        }
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [isPageActive, callLimitReached, pollingInterval]);

    // Detect page visibility
    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsPageActive(document.visibilityState === 'visible');
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    // IP-based call limit (simplified implementation)
    useEffect(() => {
        let callCount = 0;
        const callLimit = 30; // Example: 30 calls per 30 minutes
        const resetTime = 30 * 60 * 1000; // 30 minutes
        const incrementCallCount = () => {
            callCount++;
            if (callCount >= callLimit) {
                setCallLimitReached(true);
                setTimeout(() => {
                    setCallLimitReached(false);
                    callCount = 0; // Reset call count after 30 minutes
                }, resetTime);
            }
        };
        // Increment call count on each API call
        fetchCurrentlyPlaying();
        incrementCallCount();
    }, []);

    // Render the widget
    const renderTrackInfo = () => {
        if (error) {
            return <div className="error">{error}</div>;
        }

        if (currentTrack) {
            return (
                <div className={`MusicWidgetContainer ${darkMode ? 'dark' : ''}`}>
                    <div className={`AlbumArt`}>
                        <img src={currentTrack.albumArtwork} alt="Album Artwork" className="AlbumImage" />
                    </div>
                    <div className={`MusicCoreContent`}>
                        <div className="AlbumNameContainer">
                            <h3 className="AlbumName">{currentTrack.title}</h3>
                        </div>
                        <div className="AlbumArtistContainer">
                            <p className="AlbumArtist">{currentTrack.artist}</p>
                        </div>
                    </div>
                    <div className={`ServiceLogo`}>
                        <img
                            src={darkMode ? SpotifyDarkIcon : SpotifyIcon} // Choose icon based on darkMode
                            alt="Spotify Logo" // Static alt text
                            className="ServiceImage"
                        />
                    </div>
                </div>
            );
        }

        // Show "Last Song Played" layout if no song is playing
        if (lastPlayedTrack) {
            return (
                <div className={`MusicWidgetContainer ${darkMode ? 'dark' : ''}`}>
                    <div className="LPHeader">Last Song Played</div>
                    <div className={`LPAlbumArt`}>
                        <img src={lastPlayedTrack.albumArtwork} alt="Album Artwork" className="AlbumImage" />
                    </div>
                    <div className={`MusicCoreContent`}>
                        <div className="AlbumNameContainer">
                            <h3 className="AlbumName">{lastPlayedTrack.title}</h3>
                        </div>
                        <div className="AlbumArtistContainer">
                            <p className="AlbumArtist">{lastPlayedTrack.artist}</p>
                        </div>
                    </div>
                    <div className={`ServiceLogo`}>
                        <img
                            src={darkMode ? SpotifyDarkIcon : SpotifyIcon} // Choose icon based on darkMode
                            alt="Spotify Logo" // Static alt text
                            className="ServiceImage"
                        />
                    </div>
                </div>
            );
        }

        // Fallback if no song has ever been played
        return <div className="no-music">No Music Playing</div>;
    };

    return <div className={`music-widget ${darkMode ? 'dark' : ''}`}>{renderTrackInfo()}</div>;
};

export default MusicWidget;
