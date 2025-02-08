import React from 'react';
import './StatusCard.css';

export default function StatusCircle({ color }) {
    const circleStyle = {
        backgroundColor: color,
        boxShadow: `0 0 8px 4px ${color}`,
    };

    return <div className="status-circle" style={circleStyle}></div>;
}
