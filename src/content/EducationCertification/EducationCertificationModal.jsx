import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { ModalContext } from '../../utitlites/ModalContext';
import './EducationCertificationModal.css';

const EducationCertificationModal = () => {
    const { darkMode } = useContext(ModalContext);

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
            title: 'AWS Cloud Technology Consultant',
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

    return (
        <div className={`education-modal-container ${darkMode ? 'dark' : ''}`}>
            <motion.ul initial="hidden" animate="visible" variants={variants} className="education-modal-list">
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
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
};

export default EducationCertificationModal;
