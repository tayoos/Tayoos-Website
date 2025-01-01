import React, { useRef, useEffect, useState } from 'react';
import './Home.css';

import Taskbar from '../components/Taskbar/Taskbar.jsx';
import SplashScreen from '../components/SplashScreen/SplashScreen.jsx';
import Device, { getDeviceType } from '../utitlites/Device';
import Header from '../components/Header/Header.jsx';

import videoPClndng from '../assets/animations/DesktopIntro.mp4';
import videoMBLlndng from '../assets/animations/MobilePhoneIntro.mp4';
import ProfileImage from '../assets/images/profilephoto.jpg';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import NCReactGridLayout from '../components/Grid/NCReactGridLayout.jsx';

//import ReactGridLayout from '../components/Grid/ReactGridLayout';

function Home() {
    const icons = ['😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵', '😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵', '😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵']; // Replace with your icons
    const taskbar = ['😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵', '😀', '🚀', '🌟', '🎉', '📚', '💻', '🎨', '🎵'];

    const [showSplash, setShowSplash] = useState(true);

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
                    {/* Add the grid layout here */}
                    <div className="GridContainer">
                        <NCReactGridLayout items={10} cols={6} rowHeight={40} />
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