import React, { useState, useContext } from 'react';
import { ModalContext } from '../../utitlites/ModalContext.jsx';

import './Taskbar.css';

import ExperienceModal from '../../content/Experiences/ExperienceModal.jsx';
import EducationCertificationModal from '../../content/EducationCertification/EducationCertificationModal.jsx';
import TechSkillsModal from '../../content/TechSkills/TechSkillsModal.jsx';
import AffiliatesModal from '../../content/Affiliates/AffiliatesModal.jsx';

const Taskbar = ({ onDarkModeChange, setActiveModal, activeModal }) => {
    const { openModal, isCurrentModal, modalContent, darkMode, toggleDarkMode } = useContext(ModalContext);

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

    const handleSettingsClick = (title) => {
        const itemName = taskbarItems.find((item) => item.title === title)?.Name; // Get the Name based on the title
        if (!itemName) return; // Exit if no matching item is found
        switch (title) {
            case 'Experience':
                console.log('itemName', itemName);
                openModal(<ExperienceModal />, itemName);

                break;
            case 'EducationCertification':
                openModal(<EducationCertificationModal />, itemName, 'Small');

                break;
            case 'Tech-Skills':
                openModal(<TechSkillsModal />, itemName);

                break;
            case 'Affiliates':
                openModal(<AffiliatesModal />, itemName);

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
    };

    return (
        <div className="taskbar-container">
            {taskbarItems.map((item, index) => (
                <div key={index} className={`taskbar-item ${activeModal === item.title ? 'active' : ''}`} onClick={() => handleSettingsClick(item.title)}>
                    <div className="taskbar-content">
                        <img src={darkMode ? item.imgdm : item.image} alt={item.title} className="taskbar-icon" />
                        <span className="taskbar-name">{item.title === 'Settings' ? (darkMode ? 'Light Mode' : 'Dark Mode') : item.Name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Taskbar;
