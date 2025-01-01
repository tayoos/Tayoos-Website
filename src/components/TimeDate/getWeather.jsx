import React, { useState, useEffect } from 'react';
import getLocation from './getLocation';

const GetWeather = () => {
    const [temperature, setTemperature] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWeather = async () => {
        try {
            const locationData = await getLocation();
            if (!locationData) {
                throw new Error('Could not get location');
            }

            const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

            if (!API_KEY) {
                throw new Error('Weather API key not found');
            }
            console.log('API Key:', API_KEY);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&appid=${API_KEY}&units=metric`);

            if (!response.ok) {
                throw new Error('Weather data fetch failed');
            }

            const weatherData = await response.json();
            setTemperature(Math.round(weatherData.main.temp));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching weather:', error);
            setTemperature(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
        const intervalId = setInterval(fetchWeather, 1800000);
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <span>Loading...</span>;
    }
    console.log(`Temperature ${temperature}`);
    return (
        <div className="text-richBlack text-lg font-light">
            <span>{temperature ? `${temperature}°C` : 'Weather unavailable'}</span>
        </div>
    );
};

export default GetWeather;
