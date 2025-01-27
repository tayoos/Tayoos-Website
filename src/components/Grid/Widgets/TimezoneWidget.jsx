import React, { useState, useEffect } from 'react';
import './Widgets.css';

const TimezoneWidget = ({ darkMode }) => {
    const [currentTime, setCurrentTime] = useState('');
    const [timeZone, setTimeZone] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, hour: '2-digit', minute: '2-digit' };
            const formattedTime = new Intl.DateTimeFormat('en-GB', options).format(now);

            setCurrentTime(formattedTime);
            setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={`timezone-widget ${darkMode ? 'dark' : ''}`}>
            <div className="timezone-details">
                <div className="timezone-time">{currentTime}</div>
                <div className={`timezone-label ${darkMode ? 'dark' : ''}`}>{timeZone}</div>
            </div>
        </div>
    );
};

export default TimezoneWidget;
