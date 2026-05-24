import React, { useContext } from 'react';
import './StatusCard.css';
import StatusCircle from './StatusCircle';
import { ModalContext } from '../../../../utitlites/ModalContext';
import siteConfig from '../../../../siteConfig.js';

const { roleShort, roleFull, company } = siteConfig.status;

const TextCardWidget = ({ title = 'Title', body = 'Content goes here', isDarkMode, status = 'Online', statusLightColor = 'purple', isMobile }) => {
    const { darkMode } = useContext(ModalContext);

    return (
        <div className={`SCwidget-container ${darkMode ? 'dark' : ''}`}>
            <div className={`SCwidget-header ${darkMode ? 'dark' : ''}`}>
                <span className={`SCwidget-status-label ${darkMode ? 'dark' : ''}`}>Status</span>
                <StatusCircle color={statusLightColor} />
            </div>
            <div className="Stext-card">
                <div className="Stext-card-role" tabIndex={0} title={roleFull}>
                    <p className={`Stext-card-title ${isMobile ? 'mobile' : ''}`}>
                        <span className="Stext-card-title-short">{roleShort}</span>
                        <span className="Stext-card-title-full" aria-hidden="true">
                            {roleFull}
                        </span>
                    </p>
                </div>
                <p className={`Stext-card-at ${isMobile ? 'mobile' : ''}`}>at</p>
                <p className={`Stext-card-company ${isMobile ? 'mobile' : ''}`}>{company}</p>
            </div>
        </div>
    );
};

export default TextCardWidget;
