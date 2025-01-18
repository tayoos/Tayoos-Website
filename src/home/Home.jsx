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

import Modal from '../components/Modals/Modal.jsx';
import ExperienceModal from '../components/Modals/ExperienceModal.jsx';
import EducationCertificationModal from '../components/Modals/EducationCertificationModal.jsx';
import AffiliatesModal from '../components/Modals/AffiliatesModal.jsx';
import TechSkillsModal from '../components/Modals/TechSkillsModal.jsx';

function Home() {
    const [splashComplete, setSplashComplete] = useState(false);
    const [isEntryPoint, setIsEntryPoint] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false); // Add state to track dark mode
    const [activeModal, setActiveModal] = useState(null);

    // Get Device Type
    const isMobile = getDeviceType() === 'Mobile';

    const handleSplashEnd = () => {
        setIsEntryPoint(false);
        setSplashComplete(true);
    };

    const handleDarkModeChange = (darkMode) => {
        setIsDarkMode(darkMode);
    };

    const handleModalToggle = (modalName) => {
        if (activeModal === modalName) {
            setActiveModal(null);
        } else {
            setActiveModal(modalName);
        }
    };

    const getModalContent = () => {
        switch (activeModal) {
            case 'Experience':
                return <ExperienceModal />;
            case 'EducationCertification':
                return <EducationCertificationModal />;
            case 'Tech-Skills':
                return <TechSkillsModal />;
            case 'Affiliates':
                return <AffiliatesModal />;
            default:
                return null;
        }
    };
    return (
        <div className="screen-container">
            {!splashComplete && isEntryPoint && <SplashScreen videoSrc={isMobile ? videoMBLlndng : videoPClndng} isMobile={isMobile} onEnd={handleSplashEnd} />}

            <div className={isDarkMode ? 'bg-dm' : 'bg-main'}>
                <div className="page-container">
                    <div className="header-container">
                        <Header isMobile={isMobile} isDarkMode={isDarkMode} />
                    </div>
                    <div className={`GridContainer ${isMobile ? 'GridContainer-mobile' : ''}`}>
                        <NCReactGridLayout isDarkMode={isDarkMode} />
                    </div>

                    <div className="taskbar">
                        <Taskbar onDarkModeChange={handleDarkModeChange} setActiveModal={setActiveModal} activeModal={activeModal} isDarkMode={isDarkMode} />
                    </div>
                    <div className="Modals">
                        <Modal isOpen={activeModal !== null} onClose={() => setActiveModal(null)} title={activeModal}>
                            {getModalContent()}
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
