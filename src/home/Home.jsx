import React, { useRef, useEffect, useState } from 'react';
import './Home.css';
import Taskbar from '../components/Taskbar/Taskbar.jsx';
import SplashScreen from '../components/SplashScreen/SplashScreen.jsx';
import Device, { getDeviceType } from '../utitlites/Device';
import Header from '../components/Header/Header.jsx';
import videoPClndng from '../assets/animations/DesktopIntro.mp4';
import videoMBLlndng from '../assets/animations/MobilePhoneIntro.mp4';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import NCReactGridLayout from '../components/Grid/NCReactGridLayout.jsx';

import Modal from '../components/Modals/Modal.jsx';
import ExperienceModal from '../components/Modals/ExperienceModal.jsx';
import EducationCertificationModal from '../components/Modals/EducationCertificationModal.jsx';
import AffiliatesModal from '../components/Modals/AffiliatesModal.jsx';
import TechSkillsModal from '../components/Modals/TechSkillsModal.jsx';

function Home() {
    const [splashComplete, setSplashComplete] = useState(false);
    const [isEntryPoint, setIsEntryPoint] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [currentModalContent, setCurrentModalContent] = useState(null);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [pendingModal, setPendingModal] = useState(null);

    const isMobile = getDeviceType() === 'Mobile';
    const closeTimeoutRef = useRef(null);

    const handleSplashEnd = () => {
        setIsEntryPoint(false);
        setSplashComplete(true);
    };

    const handleDarkModeChange = (darkMode) => {
        setIsDarkMode(darkMode);
    };

    const clearCloseTimeout = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    const closeModalWithAnimation = (onComplete) => {
        clearCloseTimeout();
        setIsModalClosing(true);

        closeTimeoutRef.current = setTimeout(() => {
            setIsModalClosing(false);
            setActiveModal(null);
            setCurrentModalContent(null);
            if (onComplete) onComplete();
        }, 400);
    };

    const handleModalToggle = (modalName) => {
        if (isModalClosing) return;

        // If clicking the same modal that's currently open, close it
        if (activeModal === modalName) {
            closeModalWithAnimation();
            return;
        }

        // If clicking a different modal while one is open
        if (activeModal) {
            closeModalWithAnimation(() => {
                setActiveModal(modalName);
            });
        } else {
            // If no modal is open, open the new one immediately
            setActiveModal(modalName);
        }
    };

    const handleModalClose = () => {
        if (!isModalClosing) {
            closeModalWithAnimation();
        }
    };
    /*
    // Handle pending modal after closing animation completes
    useEffect(() => {
        if (!isModalClosing && pendingModal) {
            if (pendingModal !== activeModal) {
                setActiveModal(pendingModal);
            }
            setPendingModal(null);
        }
    }, [isModalClosing, pendingModal, activeModal]);

    // Clean up timeouts
    useEffect(() => {
        return () => clearCloseTimeout();
    }, []);'*/

    // Handle modal content updates
    useEffect(() => {
        if (!activeModal) {
            return;
        }

        if (!isModalClosing) {
            const newContent = (() => {
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
            })();
            setCurrentModalContent(newContent);
        }
    }, [activeModal, isModalClosing]);

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
                        <Taskbar onDarkModeChange={handleDarkModeChange} setActiveModal={handleModalToggle} activeModal={activeModal} isDarkMode={isDarkMode} />
                    </div>

                    <div className="Modals-Container">
                        <Modal isOpen={activeModal !== null} onClose={handleModalClose} title={activeModal}>
                            {currentModalContent}
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
