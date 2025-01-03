import React, { useRef, useEffect, useState } from 'react';
import './Home.css';
import Taskbar from '../components/Taskbar/Taskbar.jsx';
import SplashScreen from '../components/SplashScreen/SplashScreen.jsx';
import Device, { getDeviceType } from '../utitlites/Device';
import Header from '../components/Header/Header.jsx';
import videoPClndng from '../assets/animations/DesktopIntro.mp4';
import videoMBLlndng from '../assets/animations/MobilePhoneIntro.mp4';
//import ProfileImage from '../assets/images/profilephoto.jpg';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import NCReactGridLayout from '../components/Grid/NCReactGridLayout.jsx';
//import ReactGridLayout from '../components/Grid/ReactGridLayout';

function Home() {
    const icons = ['😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵', '😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵', '😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵'];
    const taskbar = ['😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵'];

    const [splashComplete, setSplashComplete] = useState(false);
    const [isEntryPoint, setIsEntryPoint] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false); // Add state to track dark mode

    // Get Device Type
    const isMobile = getDeviceType() === 'Mobile';

    const handleSplashEnd = () => {
        setIsEntryPoint(false);
        setSplashComplete(true);
    };
    const handleDarkModeChange = (darkMode) => {
        setIsDarkMode(darkMode);
    };
    return (
        <div className="screen-container">
            {!splashComplete && isEntryPoint && <SplashScreen videoSrc={isMobile ? videoMBLlndng : videoPClndng} isMobile={isMobile} onEnd={handleSplashEnd} />}

            <div className={isDarkMode ? 'bg-dm' : 'bg-main'}>
                <div className="page-container">
                    <div className="header-container">
                        <Header isMobile={isMobile} isDarkMode={isDarkMode} />
                    </div>

                    <div className="GridContainer">
                        <NCReactGridLayout
                            cols={16}
                            isDarkMode={isDarkMode} // Add this line
                        />
                    </div>

                    <div className="taskbar">
                        <Taskbar onDarkModeChange={handleDarkModeChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
