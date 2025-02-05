import React, { useState, useEffect } from 'react';
import getLocation from '../../../TimeDate/getLocation';
import './WeatherWidget.css';
import { MapPin } from 'lucide-react'; // Add this import at the top

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const WeatherWidget = ({ darkMode, isMobile }) => {
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
                location: data.name,
                temperature: Math.round(data.main.temp),
                condition: data.weather[0].main,
                icon: data.weather[0].icon,
                description: capitalizeFirstLetter(data.weather[0].description), // Capitalize the first letter
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
            <div className={`weather-widget-horizontal ${darkMode ? 'dark' : ''}`}>
                <span>Loading...</span>
            </div>
        );
    }

    if (!weatherData) {
        return (
            <div className={`weather-widget-horizontal ${darkMode ? 'dark' : ''}`}>
                <span className="weather-unavailable">Weather unavailable</span>
            </div>
        );
    }

    const { location, temperature, condition, icon, description } = weatherData;

    return (
        <div className={`weather-widget-horizontal ${darkMode ? 'dark' : ''}`}>
            <div className={`weather-icon-section ${isMobile ? 'mobile' : ''}`}>
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={condition} className={`weather-icon-large ${isMobile ? 'mobile' : ''}`} />
            </div>
            <div className={`weather-details-section ${isMobile ? 'mobile' : ''}`}>
                <div className="weather-location">
                    <span className="location-text">{location}</span>
                    <svg className="location-symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M12 2L4 20L12 17L20 20L12 2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="weather-temperature">{temperature}°C</div>
                <div className="weather-condition">{description}</div>
            </div>
        </div>
    );
};

export default WeatherWidget;
