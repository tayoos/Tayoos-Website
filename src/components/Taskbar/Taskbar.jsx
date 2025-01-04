import React, { useState } from 'react';
import './Taskbar.css';

const Taskbar = ({ onDarkModeChange, setActiveModal }) => {
    const [darkMode, setDarkMode] = useState(false);

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

    return (
        <div className="taskbar-container">
            {taskbarItems.map((item, index) => (
                <div key={index} className="taskbar-item" onClick={() => handleSettingsClick(item.title)}>
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
