import React, { useRef, useEffect, useState, useContext } from 'react';
import './Home.css';

import Taskbar from '../components/Taskbar/Taskbar.jsx';
import TaskbarMobile from '../components/Taskbar/TaskbarMobile.jsx';
import SplashScreen from '../components/SplashScreen/SplashScreen.jsx';
import Device, { getDeviceType } from '../utitlites/Device';
import Header from '../components/Header/Header.jsx';
import videoPClndng from '../assets/animations/DesktopIntro.mp4';
import videoMBLlndng from '../assets/animations/MobilePhoneIntro2.mp4';
import wallpaperLight from '../assets/backgrounds/white_layers.jpg';
import wallpaperDark from '../assets/backgrounds/white_layers_darkmode.jpg';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import NCReactGridLayout from '../components/Grid/NCReactGridLayout.jsx';
import NCReactGridLayoutMobile from '../components/Grid/NCReactGridLayoutMobile.jsx';

import { ModalContext } from '../utitlites/ModalContext.jsx';

function Home() {
    const [splashComplete, setSplashComplete] = useState(false);
    const [isEntryPoint, setIsEntryPoint] = useState(true);
    const { darkMode, toggleDarkMode, menuOpen } = useContext(ModalContext);
    const [activeModal, setActiveModal] = useState(null);
    const [currentModalContent, setCurrentModalContent] = useState(null);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [pendingModal, setPendingModal] = useState(null);
    const closeTimeoutRef = useRef(null);

    // Get Device Type
    const isMobile = getDeviceType() === 'Mobile';
    //const isMobile = true;

    // First, create a function to set the --vh property
    function setVH() {
        // Get the actual viewport height
        const vh = window.innerHeight * 0.01;
        // Set the value in the --vh custom property
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Set the height initially
    setVH();

    // Update the height whenever the window is resized
    window.addEventListener('resize', setVH);

    // Preload wallpapers so theme toggle doesn't wait on network/decode
    useEffect(() => {
        [wallpaperLight, wallpaperDark].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const handleSplashEnd = () => {
        setIsEntryPoint(false);
        setSplashComplete(true);
    };

    const handleDarkModeChange = (darkMode) => {
        toggleDarkMode(darkMode);
    };

    return (
        <div className={`screen-container ${isMobile ? 'Mobile' : ''}`}>
            {!splashComplete && isEntryPoint && <SplashScreen videoSrc={isMobile ? videoMBLlndng : videoPClndng} isMobile={isMobile} onEnd={handleSplashEnd} />}

            <div className={`theme-viewport ${darkMode ? 'is-dark' : ''} ${isMobile ? 'Mobile' : ''}`}>
                <div
                    className="theme-bg theme-bg-light"
                    style={{ backgroundImage: `url(${wallpaperLight})` }}
                    aria-hidden="true"
                />
                <div
                    className="theme-bg theme-bg-dark"
                    style={{ backgroundImage: `url(${wallpaperDark})` }}
                    aria-hidden="true"
                />
                <div className="theme-content">
                    <div className={`page-container ${isMobile ? 'Mobile' : ''}`}>
                        <div className={`header-container ${isMobile ? 'Mobile' : ''} ${darkMode ? 'dark' : ''} `}>
                            <Header isMobile={isMobile} darkMode={darkMode} />
                        </div>
                        <div className={`GridContainer ${isMobile ? 'GridContainer-mobile' : ''}`}>
                            {isMobile ? (
                                <NCReactGridLayoutMobile darkMode={darkMode} isMobile={isMobile} />
                            ) : (
                                <NCReactGridLayout darkMode={darkMode} />
                            )}
                        </div>

                        <div className={`taskbar ${isMobile ? 'taskbarmb' : ''}`}>
                            {isMobile ? (
                                <TaskbarMobile
                                    onDarkModeChange={handleDarkModeChange}
                                    setActiveModal={setActiveModal}
                                    activeModal={activeModal}
                                    isMobile={isMobile}
                                />
                            ) : (
                                <Taskbar
                                    onDarkModeChange={handleDarkModeChange}
                                    setActiveModal={setActiveModal}
                                    activeModal={activeModal}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
