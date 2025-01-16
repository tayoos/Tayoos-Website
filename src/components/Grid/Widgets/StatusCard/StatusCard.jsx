import React, { useState, useEffect } from 'react';
import './StatusCard.css';
import StatusCircle from './StatusCircle';

const TextCardWidget = ({ title = 'Title', body = 'Content goes here', isDarkMode, status = 'Online', statusLightColor = 'purple' }) => {
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [displayedBody, setDisplayedBody] = useState('');
    const [titleDone, setTitleDone] = useState(false);

    return (
        <div className={`SCwidget-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="SCwidget-header">
                <span className="SCwidget-status-label">Status</span>
                <StatusCircle color={statusLightColor} />
            </div>
            <div className="Stext-card">
                <p className="Stext-card-content">Advanced MBSE&S Engineer</p>
                <p className="Stext-card-content">Capgemini</p>
            </div>
        </div>
    );
};

export default TextCardWidget;
