import React, { useState } from 'react';
import './Widgets.css';

const CVWidget = ({ darkMode }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Define paths directly in the component
    const iconsrc = './src/assets/icons/wordicon.png'; // Update this path to your image
    const cvFileUrl = './src/assets/Files/Curriculum Vitae-DavidOshidero.docx'; // Update this path to your CV

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = cvFileUrl;
        link.download = 'CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`cv-widget ${darkMode ? 'dark' : ''} ${isHovered ? 'hovered' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onDoubleClick={handleDownload}>
            <div className="cv-image-container">
                <img src={iconsrc} alt="CV" className="cv-image" />
            </div>
            <h3 className="cv-title">CV</h3>
        </div>
    );
};

export default CVWidget;
