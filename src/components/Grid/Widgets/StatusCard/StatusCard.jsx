import React, { useState, useEffect, useContext } from 'react';
import './StatusCard.css';
import StatusCircle from './StatusCircle';
import { ModalContext } from '../../../../utitlites/ModalContext';

const TextCardWidget = ({ title = 'Title', body = 'Content goes here', isDarkMode, status = 'Online', statusLightColor = 'purple' }) => {
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [displayedBody, setDisplayedBody] = useState('');
    const [titleDone, setTitleDone] = useState(false);
    const { darkMode } = useContext(ModalContext);

    // Detect dark mode on component mount
    useEffect(() => {
        // Check the current system dark mode preference
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log('Dark mode is', darkMode ? 'enabled' : 'disabled');
    }, []); // Empty dependency array to run this effect once when the component mounts

    return (
        <div className={`SCwidget-container ${darkMode ? 'dark' : ''}`}>
            <div className={`SCwidget-header ${darkMode ? 'dark' : ''}`}>
                <span className={`SCwidget-status-label ${darkMode ? 'dark' : ''}`}>Status</span>
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
