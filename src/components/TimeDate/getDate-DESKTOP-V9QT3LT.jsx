import React, { useState, useEffect } from 'react';

const GetDate = () => {
    const [currentDate, setCurrentDate] = useState('');

    const formatDate = (date) => {
        const dayName = date.toLocaleString('default', { weekday: 'short' }); // e.g., "Tue"
        const day = date.getDate(); // e.g., 31
        const month = date.toLocaleString('default', { month: 'short' }); // e.g., "Dec"

        return `${dayName} ${day} ${month}`;
    };

    const updateDate = () => {
        const date = new Date();
        setCurrentDate(formatDate(date));
    };

    useEffect(() => {
        updateDate();
        const intervalId = setInterval(updateDate, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="text-richBlack text-lg font-light">
            <span>{currentDate}</span>
        </div>
    );
};

export default GetDate;
