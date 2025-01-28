import React, { useState, useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../../utitlites/ModalContext.jsx';
import { Menu } from 'lucide-react';

import launchpad from '../../assets/icons/launchpad2.png';
import launchpaddark from '../../assets/icons/launchpad-dark2.png';
import './Taskbar.css';

const Taskbar = ({ onDarkModeChange, setActiveModal, activeModal }) => {
    const { openModal, isCurrentModal, modalContent, darkMode, toggleDarkMode, menuOpen, setMenuOpen } = useContext(ModalContext);

    const taskbarRef = useRef(null);

    const taskbarItems = [
        {
            image: './src/assets/icons/profile.png',
            imgdm: './src/assets/icons/profile.png',
            title: 'Experience',
            Name: 'Experience',
        },
        {
            image: './src/assets/icons/certificates.png',
            imgdm: './src/assets/icons/certificates.png',
            title: 'EducationCertification',
            Name: 'Education & Certification',
        },
        {
            image: './src/assets/icons/profile.png',
            imgdm: './src/assets/icons/profile.png',
            title: 'Tech-Skills',
            Name: 'Tech & Skills',
        },
        {
            image: './src/assets/icons/profile.png',
            imgdm: './src/assets/icons/profile.png',
            title: 'Affiliates',
            Name: 'Affiliates',
        },
        {
            image: './src/assets/icons/mail-light.png',
            imgdm: './src/assets/icons/mail-dark.png',
            title: 'Contact',
            Name: 'Contact',
        },
        {
            image: './src/assets/icons/linkedin.png',
            imgdm: './src/assets/icons/linkedin.png',
            title: 'LinkedIn',
            Name: 'LinkedIn',
        },
        {
            image: './src/assets/icons/github-light.png',
            imgdm: './src/assets/icons/github-dark.png',
            title: 'Github',
            Name: 'Github',
        },
        {
            image: './src/assets/icons/settings-light.png',
            imgdm: './src/assets/icons/settings-dark.png',
            title: 'Settings',
            Name: 'Dark Mode',
        },
    ];

    // Handle clicks outside the taskbar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (taskbarRef.current && !taskbarRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        // Handle both touch and click events
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const handleSettingsClick = (title) => {
        const itemName = taskbarItems.find((item) => item.title === title)?.Name;
        if (!itemName) return;

        switch (title) {
            case 'Experience':
                openModal(<ExperienceModal />, itemName);
                break;
            case 'EducationCertification':
                openModal(<EducationCertificationModal />, itemName, 'Small');
                break;
            case 'Tech-Skills':
                openModal(<TechModal />, itemName, 'Medium');
                break;
            case 'Affiliates':
                openModal(<AffiliatesModal />, itemName, 'Small');
                break;
            case 'Contact':
                window.location.href = 'mailto:dtoshidero@gmail.com';
                break;
            case 'LinkedIn':
                window.open('//www.linkedin.com/in/david-oshidero-10933613a/', '_blank');
                break;
            case 'Github':
                window.open('https://github.com/tayoos/Tayoos-Website', '_blank');
                break;
            case 'Settings':
                const newDarkMode = !darkMode;
                toggleDarkMode(newDarkMode);
                onDarkModeChange(newDarkMode);
                break;
            default:
                break;
        }

        // Don't automatically close menu after clicking modal items
        // This allows users to open multiple modals without re-opening the menu
        if (title === 'Contact' || title === 'LinkedIn' || title === 'Github' || title === 'Settings') {
            setMenuOpen(false);
        }
    };

    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="relative" ref={taskbarRef}>
            {isMobile && !menuOpen && (
                <button onClick={toggleMenu} className="tblaunchpad">
                    <img src={darkMode ? launchpaddark : launchpad} className="launchpad" alt="Menu" />
                </button>
            )}

            <div className={`taskbar-container ${isMobile ? 'mobile' : ''} ${isMobile && menuOpen ? 'mobile-open' : isMobile ? 'mobile-closed' : ''}`}>
                {(!isMobile || menuOpen) &&
                    taskbarItems.map((item, index) => (
                        <div
                            key={index}
                            className={`taskbar-item ${activeModal === item.title ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent closing when clicking items
                                handleSettingsClick(item.title);
                            }}
                        >
                            <div className="taskbar-content">
                                <img src={darkMode ? item.imgdm : item.image} alt={item.title} className="taskbar-icon" />
                                <span className="taskbar-name">{item.title === 'Settings' ? (darkMode ? 'Light Mode' : 'Dark Mode') : item.Name}</span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Taskbar;
