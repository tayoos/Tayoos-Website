import React, { useState, useEffect } from 'react';
import getLocation from '../../TimeDate/getLocation';
import './Widgets.css';

const WeatherWidget = ({ isDarkMode }) => {
    const [weatherData, setWeatherData] = useState(null);
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

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&appid=${API_KEY}&units=metric`);

            if (!response.ok) {
                throw new Error('Weather data fetch failed');
            }

            const data = await response.json();
            setWeatherData({
                temperature: Math.round(data.main.temp),
                condition: data.weather[0].main, // E.g., "Rain", "Clear", "Clouds"
                icon: data.weather[0].icon, // Weather icon code
                description: data.weather[0].description, // E.g., "light rain"
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching weather:', error);
            setWeatherData(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    if (loading) {
        return (
            <div className={`weather-widget-horizontal ${isDarkMode ? 'dark' : ''}`}>
                <span>Loading...</span>
            </div>
        );
    }

    if (!weatherData) {
        return (
            <div className={`weather-widget-horizontal ${isDarkMode ? 'dark' : ''}`}>
                <span>Weather unavailable</span>
            </div>
        );
    }

    const { temperature, condition, icon, description } = weatherData;

    return (
        <div className={`weather-widget-horizontal ${isDarkMode ? 'dark' : ''}`}>
            <div className="weather-icon-section">
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={condition} className="weather-icon-large" />
            </div>
            <div className="weather-details-section">
                <div className="weather-temperature">{temperature}°C</div>
                <div className="weather-condition">{condition}</div>
                <div className="weather-description">{description}</div>
            </div>
        </div>
    );
};

export default WeatherWidget;
