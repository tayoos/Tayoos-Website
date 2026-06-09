import React, { useContext } from 'react';
import './StatusCard.css';
import StatusCircle from './StatusCircle';
import { ModalContext } from '../../../../utitlites/ModalContext';
import siteConfig from '../../../../siteConfig.js';

const { roleShort, roleSecondaryShort, roleFull, roleSecondaryFull, company } = siteConfig.status;

const TextCardWidget = ({ title = 'Title', body = 'Content goes here', isDarkMode, status = 'Online', statusLightColor = 'purple', isMobile }) => {
    const { darkMode } = useContext(ModalContext);

    return (
        <div className={`SCwidget-container ${darkMode ? 'dark' : ''}`}>
            <div className={`SCwidget-header ${darkMode ? 'dark' : ''}`}>
                <span className={`SCwidget-status-label ${darkMode ? 'dark' : ''}`}>Status</span>
                <StatusCircle color={statusLightColor} />
            </div>
            <div className="Stext-card">
                <div
                    className={`Stext-card-role${roleSecondaryShort ? ' has-dual-role' : ''}`}
                    tabIndex={0}
                    aria-label={roleSecondaryFull ? `${roleFull}, ${roleSecondaryFull}` : roleFull}
                >
                    <div className={`Stext-card-title Stext-card-title-short ${isMobile ? 'mobile' : ''}`}>
                        <span className="Stext-card-role-primary">{roleShort}</span>
                        {roleSecondaryShort && (
                            <span className={`Stext-card-role-secondary ${darkMode ? 'dark' : ''}`}>{roleSecondaryShort}</span>
                        )}
                    </div>
                    <div className={`Stext-card-title Stext-card-title-full ${isMobile ? 'mobile' : ''}`} aria-hidden="true">
                        <span className="Stext-card-role-primary">{roleFull}</span>
                        {roleSecondaryFull && (
                            <span className={`Stext-card-role-secondary ${darkMode ? 'dark' : ''}`}>{roleSecondaryFull}</span>
                        )}
                    </div>
                </div>
                <p className={`Stext-card-at ${isMobile ? 'mobile' : ''}`}>at</p>
                <p className={`Stext-card-company ${isMobile ? 'mobile' : ''}`}>{company}</p>
            </div>
        </div>
    );
};

export default TextCardWidget;
