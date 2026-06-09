import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { ModalContext } from '../../utitlites/ModalContext';
import { getDeviceType } from '../../utitlites/Device';
import './EducationCertificationModal.css';
import {
    AUTHENTIQUAL_CYBER_DIPLOMA,
    CREDENTIAL_ASEP,
    CREDENTIAL_SYSML_MAGICGRID_CATIA,
    ORACLE_JAVA_FOUNDATIONS,
    ORACLE_FUSION_CX,
    ORACLE_FUSION_SCM,
    ORACLE_FUSION_HCM,
    ORACLE_FUSION_ERP,
    COURSERA_IOT_SOFTWARE_ARCHITECTURE,
    NEO4J_CERTIFIED_PROFESSIONAL,
    COURSERA_AWS_CLOUD_SUPPORT,
    COURSERA_AWS_CLOUD_TECHNOLOGY_CONSULTANT,
    COURSERA_AWS_FUNDAMENTALS,
    COURSERA_TOGAF_10_FOUNDATION,
    COURSERA_AZURE_MODERN_DATA_WAREHOUSE,
    COURSERA_SAP_TECHNOLOGY_CONSULTANT,
    UDEMY_TOGAF_ENTERPRISE_ARCHITECTURE,
    UDEMY_PRODUCT_DEV_SYSTEMS_ENGINEERING,
    COURSERA_DIGITAL_TWINS,
    COURSERA_REQUIREMENTS_WRITING,
    COURSERA_INTRO_SYSTEMS_ENGINEERING,
    COURSERA_SCRUM_MASTER,
    COURSERA_MBSE,
} from '../certLinks.js';

import OMBPERPCFA1 from '../../assets/badges/OMBPERPCFA1.png';
import OMBPHCMCFA1 from '../../assets/badges/OMBPHCMCFA1.png';
import OMBPSCMCFA1 from '../../assets/badges/OMBPSCMCFA1.png';
import OMBPCXCFA1 from '../../assets/badges/OMBPCXCFA1.png';
import OracleJavaExplorer from '../../assets/badges/javaexplorer.png';

const EducationCertificationModal = () => {
    const { darkMode } = useContext(ModalContext);
    const isMobile = getDeviceType() === 'Mobile';
    const [selectedBadge, setSelectedBadge] = useState(null); // Store the selected badge

    const educations = [
        {
            id: 1000,
            title: 'Master of Engineering with Honours (MEng Hons) – Aerospace Engineering',
            location: 'Swansea, UK',
            school: 'Swansea University',
            achieved: 'First Class Honours',
            type: 'degree',
        },
        {
            id: 500,
            title: 'Level 3 Diploma in Networking and Cyber Security',
            graduation: 'Issued Sept 2024',
            link: AUTHENTIQUAL_CYBER_DIPLOMA,
            type: 'diploma',
        },
        {
            id: 22,
            title: 'SysML with MagicGrid and CATIA Magic',
            graduation: 'Issued April 2026',
            link: CREDENTIAL_SYSML_MAGICGRID_CATIA,
            type: 'certificate',
        },
        {
            id: 21,
            title: 'Oracle Fusion Cloud Applications CX Certified Foundations Associate',
            graduation: 'Issued April 2025',
            link: ORACLE_FUSION_CX,
            type: 'certificate',
            badge: OMBPCXCFA1,
        },
        {
            id: 20,
            title: 'Oracle Java Foundations',
            graduation: 'Issued April 2025',
            link: ORACLE_JAVA_FOUNDATIONS,
            type: 'certificate',
            badge: OracleJavaExplorer,
        },
        {
            id: 19,
            title: 'Oracle Fusion Cloud Applications SCM Certified Foundations Associate',
            graduation: 'Issued April 2025',
            link: ORACLE_FUSION_SCM,
            type: 'certificate',
            badge: OMBPSCMCFA1,
        },
        {
            id: 18,
            title: 'Oracle Fusion Cloud Applications HCM Certified Foundations Associate',
            graduation: 'Issued April 2025',
            link: ORACLE_FUSION_HCM,
            type: 'certificate',
            badge: OMBPHCMCFA1,
        },
        {
            id: 17,
            title: 'Oracle Fusion Cloud Applications ERP Certified Foundations Associate',
            graduation: 'Issued April 2025',
            link: ORACLE_FUSION_ERP,
            type: 'certificate',
            badge: OMBPERPCFA1,
        },
        {
            id: 16,
            title: 'Software Architecture for the Internet of Things',
            graduation: 'Issued Feb 2025',
            link: COURSERA_IOT_SOFTWARE_ARCHITECTURE,
            type: 'certificate',
        },
        {
            id: 15,
            title: 'Neo4j Certified Professional',
            graduation: 'Issued Feb 2025',
            link: NEO4J_CERTIFIED_PROFESSIONAL,
            type: 'certificate',
        },
        {
            id: 14,
            title: 'AWS Cloud Support Associate',
            graduation: 'Issued Feb 2025',
            link: COURSERA_AWS_CLOUD_SUPPORT,
            type: 'certificate',
        },
        {
            id: 13,
            title: 'AWS Cloud Technology Consultant',
            graduation: 'Issued Feb 2025',
            link: COURSERA_AWS_CLOUD_TECHNOLOGY_CONSULTANT,
            type: 'certificate',
        },
        {
            id: 12,
            title: 'AWS Fundamentals',
            graduation: 'Issued Feb 2025',
            link: COURSERA_AWS_FUNDAMENTALS,
            type: 'certificate',
        },
        {
            id: 11,
            title: 'TOGAF 10 Foundation',
            graduation: 'Issued Feb 2025',
            link: COURSERA_TOGAF_10_FOUNDATION,
            type: 'certificate',
        },
        {
            id: 10,
            title: 'Modern Data Warehouse Analytics in Microsoft Azure',
            graduation: 'Issued Feb 2025',
            link: COURSERA_AZURE_MODERN_DATA_WAREHOUSE,
            type: 'certificate',
        },
        {
            id: 9,
            title: 'SAP Technology Consultant',
            graduation: 'Issued July 2024',
            link: COURSERA_SAP_TECHNOLOGY_CONSULTANT,
            type: 'certificate',
        },
        {
            id: 8,
            title: 'TOGAF Enterprise Architecture',
            graduation: 'Issued April 2024',
            link: UDEMY_TOGAF_ENTERPRISE_ARCHITECTURE,
            type: 'certificate',
        },
        {
            id: 7,
            title: 'Associate Systems Engineering Professional (ASEP)',
            graduation: 'Issued April 2023',
            link: CREDENTIAL_ASEP,
            type: 'certificate',
        },
        {
            id: 6,
            title: 'Product Development & Systems Engineering (Udemy)',
            graduation: 'Issued March 2023',
            link: UDEMY_PRODUCT_DEV_SYSTEMS_ENGINEERING,
            type: 'certificate',
        },
        {
            id: 5,
            title: 'Digital Twins (Coursera) –  University of Michigan',
            graduation: 'Issued Jan 2023',
            link: COURSERA_DIGITAL_TWINS,
            type: 'certificate',
        },
        {
            id: 4,
            title: 'Requirements Writing (Coursera) – UNSW Sydney',
            graduation: 'Issued Jan 2023',
            link: COURSERA_REQUIREMENTS_WRITING,
            type: 'certificate',
        },
        {
            id: 3,
            title: 'Introduction to Systems Engineering (Coursera) – UNSW Sydney',
            graduation: 'Issued Jan 2023',
            link: COURSERA_INTRO_SYSTEMS_ENGINEERING,
            type: 'certificate',
        },
        {
            id: 2,
            title: 'Introduction to Scrum Master Training (Coursera)',
            graduation: 'Issued Dec 2022',
            link: COURSERA_SCRUM_MASTER,
            type: 'certificate',
        },
        {
            id: 1,
            title: 'MBSE: Model-Based Systems Engieneering (Coursera) – State University of New York',
            graduation: 'Issued Nov 2022',
            link: COURSERA_MBSE,
            type: 'certificate',
        },
    ];

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
            },
        },
        exit: {
            opacity: 0,
            y: 50,
            transition: {
                duration: 0.2,
            },
        },
    };

    function useWindowWidth() {
        const [width, setWidth] = useState(window.innerWidth);

        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return width;
    }

    const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

    const handleBadgeClick = (badge) => {
        if (badge && !isBadgeModalOpen) {
            console.log('Opening modal for badge:', badge);
            setSelectedBadge(badge); // Store the clicked badge
            setIsBadgeModalOpen(true); // Open the modal
        }
    };

    // Close the modal when clicking on the background (outside the modal content)
    const closeBadge = () => {
        console.log('Closing modal');
        setIsBadgeModalOpen(false); // Close the modal
        setSelectedBadge(null); // Clear the selected badge
    };

    const width = useWindowWidth();

    return (
        <div className={`education-modal-container ${darkMode ? 'dark' : ''}`}>
            <motion.ul initial="hidden" animate="visible" variants={variants} className="education-modal-list">
                {/* Modal shown when modal is open */}
                {isBadgeModalOpen && selectedBadge && (
                    <div className={`modalBadge ${isBadgeModalOpen ? 'open' : ''}`} onClick={closeBadge}>
                        <div className="modal-contentBadge" onClick={(e) => e.stopPropagation()}>
                            <img src={selectedBadge} alt="Enlarged Badge" />
                        </div>
                    </div>
                )}
                {educations.map((ed) => (
                    <motion.li
                        key={ed.id}
                        className={`
                            education-modal-item 
                            ${ed.type === 'degree' ? 'degree-item' : ''} 
                            ${ed.type === 'diploma' ? 'diploma-item' : ''}
                            ${ed.type === 'certificate' ? 'certificate-item' : ''}
                             ${darkMode ? 'dark' : ''}
                        `}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Render badge if width > 810 and not on mobile */}
                        {width > 810 && !isMobile && (
                            <div className="education-badge" onClick={() => handleBadgeClick(ed.badge)}>
                                {ed.badge && <img src={ed.badge} alt="Badge" />}
                            </div>
                        )}

                        <div className={`education-modal-info-container ${darkMode ? 'dark' : ''}`}>
                            <div className={`education-modal-title  ${darkMode ? 'dark' : ''}`}>{ed.title}</div>
                            <div className="graduation-and-button">
                                <div className={`education-modal-grad ${darkMode ? 'dark' : ''}`}>
                                    {ed.school && !ed.location && <span className={`education-location ${darkMode ? 'dark' : ''}`}>{ed.school} | </span>}
                                    {ed.graduation}
                                </div>
                                {ed.link && (
                                    <button className={`education-certification-button ${darkMode ? 'dark' : ''}`} onClick={() => window.open(ed.link, '_blank', 'noopener,noreferrer')}>
                                        <span className="button-content">
                                            View <ArrowOutwardIcon fontSize="inherit" className={`button-icon ${darkMode ? 'dark' : ''}`} />
                                        </span>
                                    </button>
                                )}
                            </div>
                            {ed.school && ed.location && (
                                <div className={`education-location ${darkMode ? 'dark' : ''}`}>
                                    {ed.school} | {ed.location}
                                </div>
                            )}
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
};

export default EducationCertificationModal;
