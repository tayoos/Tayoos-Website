import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { ModalContext } from '../../utitlites/ModalContext';
import { getDeviceType } from '../../utitlites/Device';
import './EducationCertificationModal.css';

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
            link: 'https://authentiqual.com/v/?aq=61cc7e07-d8e1-42e5-9264-ddb04ab6e3b4',
            type: 'diploma',
        },
        {
            id: 21,
            title: 'Oracle Fusion Cloud Applications CX Certified Foundations Associate',
            graduation: 'Issued April 2025',
            link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=B837DE1CBE3B70DBBDCEB21C1758C358129EB83F5E2831A9CDA12E4EC9F3C453',
            type: 'certificate',
            badge: OMBPCXCFA1,
        },
        {
            id: 20,
            title: 'Oracle Java Foundations',
            graduation: 'Issued April 2025',
            type: 'certificate',
            badge: OracleJavaExplorer,
        },
        {
            id: 19,
            title: 'Oracle Fusion Cloud Applications SCM Certified Foundations Associate',
            graduation: 'Issued April 2025',
            link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=86FB74CF064DA5368AFCDBEBD339E0B2FD0CBA3456ED1BBC7CF4154AC8156F47',
            type: 'certificate',
            badge: OMBPSCMCFA1,
        },
        {
            id: 18,
            title: 'Oracle Fusion Cloud Applications HCM Certified Foundations Associate',
            graduation: 'Issued April 2025',
            link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=3FFFCEC3D8662FAE5797C93F85E32EF5B49E8B124DE257AF1E8AF078EB671D4E',
            type: 'certificate',
            badge: OMBPHCMCFA1,
        },
        {
            id: 17,
            title: 'Oracle Fusion Cloud Applications ERP Certified Foundations Associate',
            graduation: 'Issued April 2025',
            link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=EDB57269DC5B614872FA72525EA59F19B2ACB83EB80EED913D3795753CD69D08',
            type: 'certificate',
            badge: OMBPERPCFA1,
        },
        {
            id: 16,
            title: 'Software Architecture for the Internet of Things',
            graduation: 'Issued Feb 2025',
            link: 'https://www.coursera.org/account/accomplishments/verify/HVCEROHPE3SK',
            type: 'certificate',
        },
        {
            id: 15,
            title: 'Neo4j Certified Professional',
            graduation: 'Issued Feb 2025',
            link: 'https://graphacademy.neo4j.com/c/582bcfe6-9690-4b63-a372-f6e9d0c94924/',
            type: 'certificate',
        },
        {
            id: 14,
            title: 'AWS Cloud Support Associate',
            graduation: 'Issued Feb 2025',
            link: 'https://www.coursera.org/account/accomplishments/specialization/LCX414UM7QNJ',
            type: 'certificate',
        },
        {
            id: 13,
            title: 'AWS Cloud Technology Consultant',
            graduation: 'Issued Feb 2025',
            link: 'https://www.coursera.org/account/accomplishments/specialization/HGKM2R8D0U9M',
            type: 'certificate',
        },
        {
            id: 12,
            title: 'AWS Fundamentals',
            graduation: 'Issued Feb 2025',
            link: 'https://www.coursera.org/account/accomplishments/specialization/BWKJJ0MYYV79',
            type: 'certificate',
        },
        {
            id: 11,
            title: 'TOGAF 10 Foundation',
            graduation: 'Issued Feb 2025',
            link: 'https://www.coursera.org/account/accomplishments/verify/ZLN9DXLMJB1I',
            type: 'certificate',
        },
        {
            id: 10,
            title: 'Modern Data Warehouse Analytics in Microsoft Azure',
            graduation: 'Issued Feb 2025',
            link: 'https://www.coursera.org/account/accomplishments/records/5ZMEXTAX8IEA',
            type: 'certificate',
        },
        {
            id: 9,
            title: 'SAP Technology Consultant',
            graduation: 'Issued July 2024',
            link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/BXTG7GSFBM22',
            type: 'certificate',
        },
        {
            id: 8,
            title: 'TOGAF Enterprise Architecture',
            graduation: 'Issued April 2024',
            link: 'https://www.udemy.com/certificate/UC-252c6a20-95d5-453d-a488-b064f0e29438/',
            type: 'certificate',
        },
        {
            id: 7,
            title: 'Associate Systems Engineering Professional (ASEP)',
            graduation: 'Issued April 2023',
            link: 'https://www.credential.net/9d75f5fe-1bec-4961-be49-1bd372d9d389#acc.WCPlk9dO',
            type: 'certificate',
        },
        {
            id: 6,
            title: 'Product Development & Systems Engineering (Udemy)',
            graduation: 'Issued March 2023',
            link: 'https://www.udemy.com/certificate/UC-377dbad3-d945-497a-a2dc-d4f43ced948a/',
            type: 'certificate',
        },
        {
            id: 5,
            title: 'Digital Twins (Coursera) –  University of Michigan',
            graduation: 'Issued Jan 2023',
            link: 'https://www.coursera.org/account/accomplishments/certificate/RD7FGBJ7ND67',
            type: 'certificate',
        },
        {
            id: 4,
            title: 'Requirements Writing (Coursera) – UNSW Sydney',
            graduation: 'Issued Jan 2023',
            link: 'https://www.coursera.org/account/accomplishments/certificate/3TLF3VQE92NC',
            type: 'certificate',
        },
        {
            id: 3,
            title: 'Introduction to Systems Engineering (Coursera) – UNSW Sydney',
            graduation: 'Issued Oct 2023',
            link: 'https://www.coursera.org/account/accomplishments/certificate/G2YX9T9SQ49A',
            type: 'certificate',
        },
        {
            id: 2,
            title: 'Introduction to Scrum Master Training (Coursera)',
            graduation: 'Issued Oct 2023',
            link: 'https://www.coursera.org/account/accomplishments/certificate/FS2XABLJZJXP',
            type: 'certificate',
        },
        {
            id: 1,
            title: 'MBSE: Model-Based Systems Engieneering (Coursera) – State University of New York',
            graduation: 'Issued Oct 2023',
            link: 'https://www.coursera.org/account/accomplishments/certificate/E2HMJYHN9QN9',
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
