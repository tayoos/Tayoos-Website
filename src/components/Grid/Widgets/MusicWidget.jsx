import React, { useState, useEffect } from 'react';
import SpotifyService from '../../../utitlites/Services/SpotifyService';
import AppleMusicService from '../../../utitlites/Services/AppleMusicService';

import SpotifyIcon from '../../../assets/icons/Spotify.png';
import SpotifyDarkIcon from '../../../assets/icons/Spotify-dark.png';
import AppleMusicIcon from '../../../assets/icons/AppleMusic.png';
import AppleMusicDarkIcon from '../../../assets/icons/AppleMusic-dark.png';

const MusicWidget = ({ darkMode }) => {
    const [spotifyTrack, setSpotifyTrack] = useState(null);
    const [appleTrack, setAppleTrack] = useState(null);
    const [displayTrack, setDisplayTrack] = useState('spotify');
    const [error, setError] = useState(null);
    const [isConfigured, setIsConfigured] = useState(false);

    // Check if necessary credentials are available
    useEffect(() => {
        const checkConfiguration = () => {
            const spotifyConfigured = import.meta.env.VITE_SPOTIFY_CLIENT_ID && import.meta.env.VITE_SPOTIFY_CLIENT_SECRET && import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

            const appleConfigured = import.meta.env.VITE_APPLE_TEAM_ID && import.meta.env.VITE_APPLE_KEY_ID && import.meta.env.VITE_APPLE_PRIVATE_KEY;

            setIsConfigured(spotifyConfigured || appleConfigured);

            if (!spotifyConfigured && !appleConfigured) {
                setError('Music services not configured. Please add API credentials.');
            }
        };

        checkConfiguration();
    }, []);

    const fetchSpotifyStatus = async () => {
        if (!import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN) {
            return; // Skip if not configured
        }

        try {
            const track = await SpotifyService.getCurrentlyPlaying();
            setSpotifyTrack(track);
            setError(null);
        } catch (error) {
            console.error('Spotify fetch error:', error);
            setSpotifyTrack(null);
            setError('Failed to connect to Spotify. Please check your credentials.');
        }
    };

    const fetchAppleStatus = async () => {
        if (!import.meta.env.VITE_APPLE_PRIVATE_KEY) {
            return; // Skip if not configured
        }

        try {
            const userToken = localStorage.getItem('apple_music_user_token');
            if (!userToken) {
                // Instead of setting error, just set displayTrack to spotify
                setDisplayTrack('spotify');
                return;
            }

            const track = await AppleMusicService.getCurrentlyPlaying();
            setAppleTrack(track);
            setError(null);
        } catch (error) {
            console.error('Apple Music fetch error:', error);
            setAppleTrack(null);
            // Default to Spotify on Apple Music error
            setDisplayTrack('spotify');
        }
    };

    useEffect(() => {
        if (!isConfigured) return;

        const fetchBoth = () => {
            fetchSpotifyStatus();
            fetchAppleStatus();
        };

        fetchBoth();
        const pollInterval = setInterval(fetchBoth, 30000);
        return () => clearInterval(pollInterval);
    }, [isConfigured]);

    useEffect(() => {
        // Only toggle between services if both are actually working
        if (spotifyTrack && appleTrack && displayTrack !== 'spotify') {
            const toggleInterval = setInterval(() => {
                setDisplayTrack((prev) => (prev === 'spotify' ? 'apple' : 'spotify'));
            }, 30000);
            return () => clearInterval(toggleInterval);
        }
    }, [spotifyTrack, appleTrack, displayTrack]);

    const renderTrackInfo = () => {
        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-full p-4">
                    <p className="text-red-500 text-center">{error}</p>
                </div>
            );
        }

        if (!isConfigured) {
            return (
                <div className="flex flex-col items-center justify-center h-full p-4">
                    <p className="text-gray-500 text-center">Error in Music Configuration</p>
                </div>
            );
        }

        // Show Spotify track if Apple Music isn't available or we're set to display Spotify
        const currentTrack = displayTrack === 'spotify' || !appleTrack ? spotifyTrack : appleTrack;
        const service = displayTrack === 'spotify' || !appleTrack ? 'Spotify' : 'Apple Music';

        if (!currentTrack) {
            return (
                <div className="flex flex-col items-center justify-center h-full p-4">
                    <p className="text-gray-500">No Music Playing</p>
                </div>
            );
        }

        return (
            <div className={`MusicWidgetContainer`}>
                <div className={`AlbumArt`}>
                    <img src={currentTrack.albumArtwork} alt="Album Artwork" className="AlbumImage" />
                </div>
                <div className={`MusicCoreContent`}>
                    <p className="text-sm text-gray-500">{service}</p>
                    <h3 className="font-medium text-lg mb-1">{currentTrack.title}</h3>
                    <p className="text-gray-600">{currentTrack.artist}</p>
                </div>
                <div className={`ServiceLogo`}>
                    <img
                        src={
                            service === 'Spotify'
                                ? darkMode
                                    ? SpotifyDarkIcon // version for dark mode
                                    : SpotifyIcon // version for light mode
                                : darkMode
                                ? AppleMusicDarkIcon // ersion for dark mode
                                : AppleMusicIcon // version for light mode
                        }
                        alt={`${service} Logo`}
                        className="ServiceImage"
                    />
                </div>
            </div>
        );
    };

    return <div className={`w-full h-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-sm overflow-hidden`}>{renderTrackInfo()}</div>;
};

export default MusicWidget;
