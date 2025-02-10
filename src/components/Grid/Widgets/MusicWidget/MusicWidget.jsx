import React, { useState, useEffect } from 'react';
import './MusicWidget.css';
import SpotifyIcon from '../../../../assets/icons/Spotify.png';

const MusicWidget = ({ darkMode }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [lastPlayedTrack, setLastPlayedTrack] = useState(null); // Store last played track
    const [error, setError] = useState(null);
    const [pollingInterval, setPollingInterval] = useState(60000); // Start with 60 seconds
    const [isPageActive, setIsPageActive] = useState(true);
    const [callLimitReached, setCallLimitReached] = useState(false);

    // State for real-time progress tracking
    const [currentTime, setCurrentTime] = useState(0); // Track current time of the song

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
            const response = await fetch(import.meta.env.VITE_AEP);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            if (data.message === 'No song is currently playing on either service.') {
                setCurrentTrack(null); // No song is playing
                setPollingInterval(120000); // Increase polling interval to 120 seconds
            } else {
                // Update based on the type of data received
                if (data.type === 'currentlyPlaying') {
                    setCurrentTrack(data); // Set current track if something is playing
                } else if (data.type === 'lastPlayed') {
                    setCurrentTrack(null); // No song is playing
                }

                // Always update lastPlayedTrack with the latest track info
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

    // Real-time progress tracking
    useEffect(() => {
        let intervalId;

        if (currentTrack && currentTrack.isPlaying) {
            setCurrentTime(currentTrack.songCurrentTime); // Reset currentTime when a new track starts
            intervalId = setInterval(() => {
                setCurrentTime((prevTime) => {
                    const newTime = prevTime + 1000; // Increment by 1 second (1000ms)
                    if (newTime >= currentTrack.songLength) {
                        clearInterval(intervalId); // Stop the interval when the song ends
                        fetchCurrentlyPlaying(); // Fetch again to check for updates
                        return currentTrack.songLength; // Cap the time at songLength
                    }
                    return newTime;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId); // Cleanup interval on unmount or when the track changes
    }, [currentTrack]);

    // Format time in MM:SS
    const formatTime = (timeMs) => {
        const minutes = Math.floor(timeMs / 60000);
        const seconds = ((timeMs % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds.padStart(2, '0')}`;
    };

    // Render the widget
    const renderLastPlayedInfo = () => {
        return (
            <div className={`LPContainer ${darkMode ? 'dark' : ''}`}>
                <div className="LPHeader">Last Song Played</div>
                <div className={`LPMusicWidgetContainer ${darkMode ? 'dark' : ''}`}>
                    <div className={`LPAlbumArt`}>
                        <img src={lastPlayedTrack.albumArtwork} alt="Album Artwork" className="LPAlbumImage" />
                    </div>
                    <div className={`LPMusicCoreContent`}>
                        <div className="LPAlbumNameContainer">
                            <h3 className="LPAlbumName">{lastPlayedTrack.title}</h3>
                        </div>
                        <div className="LPAlbumArtistContainer">
                            <p className="LPAlbumArtist">{lastPlayedTrack.artist}</p>
                        </div>
                    </div>
                    <div className={`LPServiceLogo`}>
                        <img
                            src={SpotifyIcon} // Choose icon based on darkMode
                            alt="Spotify Logo" // Static alt text
                            className="LPServiceImage"
                        />
                    </div>
                </div>
            </div>
        );
    };

    const renderTrackInfo = () => {
        if (error) {
            return <div className="error">{error}</div>;
        }
        if (currentTrack) {
            // If something is currently playing
            const { title, artist, albumArtwork, songLength } = currentTrack;

            return (
                <div className={`MusicWidgetContainer ${darkMode ? 'dark' : ''}`}>
                    <div className={`CPAlbumArt`}>
                        <img src={albumArtwork} alt="Album Artwork" className="AlbumImage" />
                    </div>
                    <div className={`MusicCoreContent`}>
                        <div className="AlbumNameContainer">
                            <h3 className="AlbumName">{title}</h3>
                        </div>
                        <div className="AlbumArtistContainer">
                            <p className="AlbumArtist">{artist}</p>
                        </div>
                        <div className="currentTimeContainer">
                            <div className="currentTimeProgressContainer">
                                <progress className="currentTimeProgress" value={currentTime} max={songLength}></progress>
                                <div className="progress-thumb" style={{ left: `${(currentTime / songLength) * 100}%` }}></div>
                            </div>
                            <div className="currentTimeValues">
                                <span className="CurrentTime">{formatTime(currentTime)}</span>
                                <span className="TotalTime">{formatTime(songLength)}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`CPServiceLogo`}>
                        <img
                            src={SpotifyIcon} // Choose icon based on darkMode
                            alt="Spotify Logo" // Static alt text
                            className="ServiceImage"
                        />
                    </div>
                </div>
            );
        }
        // If nothing is playing but there's a lastPlayedTrack
        if (lastPlayedTrack) {
            return renderLastPlayedInfo();
        }
        // Fallback if no song has ever been played
        return <div className="no-music">No Music Playing</div>;
    };

    return <div className={`music-widget ${darkMode ? 'dark' : ''}`}>{renderTrackInfo()}</div>;
};

export default MusicWidget;
