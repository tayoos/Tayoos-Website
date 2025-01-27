import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ModalContext } from '../../utitlites/ModalContext';

const AffiliatesModal = () => {
    const { darkMode } = useContext(ModalContext);
    const Affiliates = [
        // Volunteering & Community Engagement
        {
            id: 101,
            title: 'Flying Start Challenge',
            affiliationType: 'STEM Project Mentor',
            type: 'Volunteering & Community Engagement',
        },
        {
            id: 100,
            title: 'Bristol MS Therapy Centre',
            affiliationType: 'Community Volunteer',
            type: 'Volunteering & Community Engagement',
        },
        // Education & Research Affiliations
        {
            id: 50,
            title: 'Swansea University',
            AffiliationType: 'Alumni - Aerospace Engineering',
            type: 'Education & Research Affiliations',
        },
        // Operating Businesses & Partner Organisations
        /* {
        id: 10,
        title: 'Comapny XXX',
        CompanyPurpose: 'XXXX',
        type: 'Operating Businesses & Partner Organisations',
    },*/
        // Professional Memberships
        {
            id: 2,
            title: 'International Council on Systems Engineering (INCOSE)',
            MembershipType: 'Associate Member (AMIncose)',
            type: 'Professional Memberships',
        },
        {
            id: 1,
            title: 'Institute of Mechanical Engineers (iMechE)',
            MembershipType: 'Associate Member (AMIMechE)',
            type: 'Professional Memberships',
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
        <div className={`affiliates-modal-container ${darkMode ? 'dark' : ''}`}>
            <motion.ul initial="hidden" animate="visible" variants={variants} className="education-modal-list"></motion.ul>
        </div>
    );
};

export default AffiliatesModal;
