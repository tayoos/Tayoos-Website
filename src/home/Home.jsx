import React, { useRef, useEffect, useState, useContext, useCallback, lazy, Suspense } from 'react';
import './Home.css';

import Taskbar from '../components/Taskbar/Taskbar.jsx';
import TaskbarMobile from '../components/Taskbar/TaskbarMobile.jsx';
import SplashScreen from '../components/SplashScreen/SplashScreen.jsx';
import Device, { getDeviceType } from '../utitlites/Device';
import Header from '../components/Header/Header.jsx';
import wallpaperLight from '../assets/backgrounds/white_layers.jpg';
import wallpaperDark from '../assets/backgrounds/white_layers_darkmode.jpg';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { ModalContext } from '../utitlites/ModalContext.jsx';

const videoPClndng = '/animations/DesktopIntro.mp4';
const videoMBLlndng = '/animations/MobilePhoneIntro2.mp4';

const NCReactGridLayout = lazy(() => import('../components/Grid/NCReactGridLayout.jsx'));
const NCReactGridLayoutMobile = lazy(() => import('../components/Grid/NCReactGridLayoutMobile.jsx'));

function Home() {
    const [splashComplete, setSplashComplete] = useState(false);
    const [isEntryPoint, setIsEntryPoint] = useState(true);
    const [contentRevealing, setContentRevealing] = useState(false);
    const { darkMode, toggleDarkMode, menuOpen } = useContext(ModalContext);
    const [activeModal, setActiveModal] = useState(null);
    const [currentModalContent, setCurrentModalContent] = useState(null);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [pendingModal, setPendingModal] = useState(null);
    const closeTimeoutRef = useRef(null);

    // Get Device Type
    const isMobile = getDeviceType() === 'Mobile';
    //const isMobile = true;

    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setVH();
        window.addEventListener('resize', setVH);
        return () => window.removeEventListener('resize', setVH);
    }, []);

    // Preload wallpapers so theme toggle doesn't wait on network/decode
    useEffect(() => {
        [wallpaperLight, wallpaperDark].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const handleSplashEnd = useCallback(() => {
        setIsEntryPoint(false);
        setSplashComplete(true);
    }, []);

    const handleTransitionStart = useCallback(() => {
        setContentRevealing(true);
    }, []);

    const handleDarkModeChange = (darkMode) => {
        toggleDarkMode(darkMode);
    };

    return (
        <div className={`screen-container ${isMobile ? 'Mobile' : ''}`}>
            {!splashComplete && isEntryPoint && <SplashScreen videoSrc={isMobile ? videoMBLlndng : videoPClndng} isMobile={isMobile} onEnd={handleSplashEnd} onTransitionStart={handleTransitionStart} />}

            <div className={`theme-viewport ${darkMode ? 'is-dark' : ''} ${isMobile ? 'Mobile' : ''} ${isEntryPoint && !contentRevealing ? 'splash-hidden' : ''} ${isEntryPoint && contentRevealing ? 'splash-revealing' : ''}`}>
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
                            <Suspense fallback={<div className="grid-loading" aria-hidden="true" />}>
                                {isMobile ? (
                                    <NCReactGridLayoutMobile darkMode={darkMode} isMobile={isMobile} />
                                ) : (
                                    <NCReactGridLayout darkMode={darkMode} />
                                )}
                            </Suspense>
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
