import React, { useState, useEffect } from 'react';

// Utility function to check if the device is mobile
const checkDeviceType = () => {
    return /Android|iPhone|iPod/i.test(navigator.userAgent);
};

function Device({ onDeviceChange }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Initial check for device type
        const mobileStatus = checkDeviceType();
        setIsMobile(mobileStatus);

        // Pass device type to parent if callback provided
        if (onDeviceChange) onDeviceChange(mobileStatus);
    }, [onDeviceChange]);

    // Return device type (Mobile/Desktop) without checking screen size
    return <div>Device Type: {isMobile ? 'Mobile' : 'Desktop'}</div>;
}

// Function to get device type directly without rendering component
const getDeviceType = () => {
    return checkDeviceType() ? 'Mobile' : 'Desktop';
};

export { getDeviceType };
export default Device;
