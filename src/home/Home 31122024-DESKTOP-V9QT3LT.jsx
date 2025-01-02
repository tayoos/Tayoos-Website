import React, { useRef, useEffect, useState } from 'react';
import './Home.css';

import GridLayout from '../components/Grid/GridLayout.jsx';
import Taskbar from '../components/Taskbar/Taskbar.jsx';
import SplashScreen from '../components/SplashScreen/SplashScreen.jsx';
import Device, { getDeviceType } from '../utitlites/Device.jsx';
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
                        <div className="oswidgets">
                            <img src={ProfileImage} alt="ProfileImage" className="osProfileImage" />
                            <div className={'osIntroduction'}>
                                <h1 className={`osWelcome`}>Welcome,</h1>
                                <div className="w-full sm:w-[500px] md:w-[600px] lg:w-[600px]">
                                    <p className={` mt-2 text-neutral-500`}>
                                        This is my workspace. I'm a MBS&S Engineering Consultant with a wide range of experience. <br className="sm:block hidden" />I did this mostly for fun but also to get some traction for future job and business opportunities!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GridLayout items={icons} />
                    <div className="taskbar">
                        <Taskbar items={taskbar} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
