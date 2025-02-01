import React, { useState } from 'react';
import './Widgets.css';

const CVWidget = ({ darkMode }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Define paths directly in the component
    const iconsrc = '/icons/wordicon.png'; // Update this path to your image
    const cvFileUrl = '/Curriculum Vitae-DavidOshidero.docx'; // Update this path to your CV

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = cvFileUrl;
        link.download = 'CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`cv-widget ${darkMode ? 'dark' : ''} ${isHovered ? 'hovered' : ''} ${darkMode ? 'dark' : ''} `} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onDoubleClick={handleDownload}>
            <div className="cv-image-container">
                <img src={iconsrc} alt="CV" className="cv-image" />
            </div>
            <h3 className={`cv-title ${darkMode ? 'dark' : ''} `}>CV</h3>
        </div>
    );
};

export default CVWidget;
