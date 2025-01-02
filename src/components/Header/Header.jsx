import React from 'react';
import './Header.css';
import { styles } from '../../styles';

import GetTime from '../TimeDate/getTime';
import Button from '../Button/Button'; // Import the Button component
import GetDate from '../TimeDate/getDate';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function Header({ isMobile }) {
    return (
        <div className="header-subcontainer">
            {/* Logo on the left */}
            <div className="logo-container">
                <img src={'/logo2mcv4.svg'} alt="Web Logo" className="logomain" />
            </div>
            {/*<a href="mailto:dtoshidero@gmail.com" className="contact-button">
                <span className="button-text">Contact </span>
                <ArrowOutwardIcon fontSize="inherit" className="button-icon" />
            </a>*/}
            {/* Time on the right, only show when not on mobile */}
            <div className="timedate-container">
                {!isMobile && (
                    <>
                        <GetTime />
                        <GetDate />
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
