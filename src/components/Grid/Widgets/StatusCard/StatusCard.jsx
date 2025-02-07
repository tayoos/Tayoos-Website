import React, { useState, useEffect, useContext } from 'react';
import './StatusCard.css';
import StatusCircle from './StatusCircle';
import { ModalContext } from '../../../../utitlites/ModalContext';

const TextCardWidget = ({ title = 'Title', body = 'Content goes here', isDarkMode, status = 'Online', statusLightColor = 'purple', isMobile }) => {
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [displayedBody, setDisplayedBody] = useState('');
    const [titleDone, setTitleDone] = useState(false);
    const { darkMode } = useContext(ModalContext);

    return (
        <div className={`SCwidget-container ${darkMode ? 'dark' : ''}`}>
            <div className={`SCwidget-header ${darkMode ? 'dark' : ''}`}>
                <span className={`SCwidget-status-label ${darkMode ? 'dark' : ''}`}>Status</span>
                <StatusCircle color={statusLightColor} />
            </div>
            <div className="Stext-card">
                <p className={`Stext-card-title ${isMobile ? 'mobile' : ''}`}>Advanced MBSE&S Engineer</p>
                <p className={`Stext-card-content ${isMobile ? 'mobile' : ''}`}>Capgemini</p>
            </div>
        </div>
    );
};

export default TextCardWidget;
