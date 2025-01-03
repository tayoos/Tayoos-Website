import React, { useState } from 'react';
import './Taskbar.css';

const Taskbar = ({ onDarkModeChange }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [activeModal, setActiveModal] = useState(null);

    const taskbarItems = [
        {
            image: './src/assets/icons/profile.png',
            imgdm: './src/assets/icons/profile.png',
            title: 'Experience',
        },
        {
            image: './src/assets/icons/certificates.png',
            imgdm: './src/assets/icons/certificates.png',
            title: 'EducationCertification',
        },
        {
            image: './src/assets/icons/profile.png',
            imgdm: './src/assets/icons/profile.png',
            title: 'Tech-Skills',
        },
        {
            image: './src/assets/icons/profile.png',
            imgdm: './src/assets/icons/profile.png',
            title: 'Affiliates',
        },
        {
            image: './src/assets/icons/mail-light.png',
            imgdm: './src/assets/icons/mail-dark.png',
            title: 'Contact',
        },
        {
            image: './src/assets/icons/linkedin.png',
            imgdm: './src/assets/icons/linkedin.png',
            title: 'LinkedIn',
        },
        {
            image: './src/assets/icons/github-light.png',
            imgdm: './src/assets/icons/github-dark.png',
            title: 'Github',
        },
        {
            image: './src/assets/icons/settings-light.png',
            imgdm: './src/assets/icons/settings-dark.png',
            title: 'Settings',
        },
    ];

    const handleSettingsClick = (title) => {
        switch (title) {
            case 'Experience':
            case 'EducationCertification':
            case 'Tech-Skills':
            case 'Affiliates':
                setActiveModal(title);
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
                setDarkMode(newDarkMode);
                onDarkModeChange(newDarkMode);
                break;
            default:
                break;
        }
    };

    const getModalContent = () => {
        switch (activeModal) {
            case 'Experience':
                return <ExperienceModal />;
            case 'EducationCertification':
                return <EducationModal />;
            case 'Tech-Skills':
                return <TechSkillsModal />;
            case 'Affiliates':
                return <AffiliatesModal />;
            default:
                return null;
        }
    };

    return (
        <div className="taskbar-container">
            {taskbarItems.map((item, index) => (
                <div key={index} className="taskbar-item" onClick={() => handleSettingsClick(item.title)}>
                    <img src={darkMode ? item.imgdm : item.image} alt={item.title} className="taskbar-icon" />
                </div>
            ))}
        </div>
    );
};

export default Taskbar;
