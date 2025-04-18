import React from 'react';
import './Header.css';
import { styles } from '../../styles';
import GetTime from '../TimeDate/getTime';
import Button from '../Button/Button';
import GetDate from '../TimeDate/getDate';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function Header({ isMobile, darkMode }) {
    return (
        <div className={`header-subcontainer ${darkMode ? 'dark' : ''}`}>
            {/* Logo on the left */}
            <div className="logo-container">
                <img src={'/logo2mcv4.svg'} alt="Web Logo" className="logomain" />
            </div>

            {/* Time on the right, only show when not on mobile */}
            <div className={`timedate-container ${darkMode ? 'dark' : ''}`}>
                {!isMobile && (
                    <>
                        <GetTime />
                    </>
                )}
                <GetDate isMobile={isMobile} />
            </div>
        </div>
    );
}

export default Header;
