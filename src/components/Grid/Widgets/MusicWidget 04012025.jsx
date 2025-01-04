import React, { useState, useEffect } from 'react';

const MusicWidget = ({ isDarkMode }) => {
    const [spotifyTrack, setSpotifyTrack] = useState(null);
    const [appleTrack, setAppleTrack] = useState(null);
    const [displayTrack, setDisplayTrack] = useState('spotify');

    // Mock API calls - replace with actual API implementations
    const fetchSpotifyStatus = async () => {
        try {
            // Replace with actual Spotify API call
            const response = await fetch('your-spotify-endpoint');
            const data = await response.json();
            setSpotifyTrack(data);
        } catch (error) {
            console.error('Spotify fetch error:', error);
            setSpotifyTrack(null);
        }
    };

    const fetchAppleStatus = async () => {
        try {
            // Replace with actual Apple Music API call
            const response = await fetch('your-apple-music-endpoint');
            const data = await response.json();
            setAppleTrack(data);
        } catch (error) {
            console.error('Apple Music fetch error:', error);
            setAppleTrack(null);
        }
    };

    // Poll both services every 30 seconds
    useEffect(() => {
        const fetchBoth = () => {
            fetchSpotifyStatus();
            fetchAppleStatus();
        };

        fetchBoth();
        const pollInterval = setInterval(fetchBoth, 30000);

        return () => clearInterval(pollInterval);
    }, []);

    // Toggle between services if both are playing
    useEffect(() => {
        if (spotifyTrack && appleTrack) {
            const toggleInterval = setInterval(() => {
                setDisplayTrack((prev) => (prev === 'spotify' ? 'apple' : 'spotify'));
            }, 30000);

            return () => clearInterval(toggleInterval);
        }
    }, [spotifyTrack, appleTrack]);

    const renderTrackInfo = () => {
        if (!spotifyTrack && !appleTrack) {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-gray-500">No Music Playing</p>
                </div>
            );
        }

        const currentTrack = displayTrack === 'spotify' ? spotifyTrack : appleTrack;
        const service = displayTrack === 'spotify' ? 'Spotify' : 'Apple Music';

        return (
            <div className="flex flex-col items-center justify-center h-full p-4">
                <div className="mb-2">
                    <p className="text-sm text-gray-500">{service}</p>
                </div>
                <div className="text-center">
                    <h3 className="font-medium text-lg mb-1">{currentTrack?.title}</h3>
                    <p className="text-gray-600">{currentTrack?.artist}</p>
                    <p className="text-gray-500 text-sm mt-1">{currentTrack?.album}</p>
                </div>
            </div>
        );
    };

    return <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden">{renderTrackInfo()}</div>;
};

export default MusicWidget;
