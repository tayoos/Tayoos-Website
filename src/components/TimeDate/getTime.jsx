import React, { useState, useEffect } from 'react';

const GetTime = (isDarkMode) => {
    const [currentTime, setCurrentTime] = useState('');

    const updateTime = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;
        const minuteFormatted = minutes < 10 ? `0${minutes}` : minutes;
        setCurrentTime(`${hour12}:${minuteFormatted} ${ampm}`);
    };

    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="text-richBlack text-lg font-light">
            <span>{currentTime}</span>
        </div>
    );
};

export default GetTime;
