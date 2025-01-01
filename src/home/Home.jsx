import React, { useRef, useEffect, useState } from 'react';
import './Home.css';

//import ReactGridLayout from '../components/Grid/ReactGridLayout';
import Taskbar from '../components/Taskbar/Taskbar.jsx';
import SplashScreen from '../components/SplashScreen/SplashScreen.jsx';
import Device, { getDeviceType } from '../utitlites/Device';
import Header from '../components/Header/Header.jsx';

import videoPClndng from '../assets/animations/DesktopIntro.mp4';
import videoMBLlndng from '../assets/animations/MobilePhoneIntro.mp4';
import ProfileImage from '../assets/images/profilephoto.jpg';

function Home() {
    const icons = ['😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵', '😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵', '😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵']; // Replace with your icons
    const taskbar = ['😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵', '😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵'];

    const [showSplash, setShowSplash] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Get Device Type
    const isMobile = getDeviceType() === 'Mobile';

    return (
        <div className="screen-container ">
            {showSplash && (
                <div>
                    <SplashScreen videoSrc={isMobile ? videoMBLlndng : videoPClndng} isMobile={isMobile} />
                </div>
            )}
            <div className="bg-main">
                <div className="page-container">
                    {/* Video container on top */}

                    <div className="hero">
                        <div className="header">
                            <Header isMobile={isMobile} />
                        </div>
                    </div>

                    <div className="taskbar">
                        <Taskbar items={taskbar} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
