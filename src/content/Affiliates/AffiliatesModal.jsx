import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ModalContext } from '../../utitlites/ModalContext';
import './AffiliatesModal.css';

const AffiliatesModal = ({ isMobile }) => {
    const { darkMode } = useContext(ModalContext);
    const Affiliates = [
        // Professional Memberships
        {
            id: 1,
            title: 'Institute of Mechanical Engineers (iMechE)',
            MembershipType: 'Associate Member (AMIMechE)',
            type: 'Professional Memberships',
        },
        {
            id: 2,
            title: 'International Council on Systems Engineering (INCOSE)',
            MembershipType: 'Associate Member (MINCOSE)',
            type: 'Professional Memberships',
        },

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
            affiliationType: 'Alumni - Aerospace Engineering',
            type: 'Education & Research Affiliations',
        },
        // Operating Businesses & Partner Organisations
        /*
        {
            id: 10,
            title: 'EF - Example',
            companyPurpose: 'A forward-thinking technology consultancy dedicated to driving innovation and contributing to the development of the next generation of transformative solutions, empowering businesses and shaping the future through cutting-edge expertise and collaboration.',
            affiliationType: 'Strategic Partner',
            type: 'Operating Businesses & Partner Organisations',
        },*/
    ];

    const affiliationTypes = [...new Set(Affiliates.map((affiliate) => affiliate.type))];

    const variants = {};

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
            },
        },
    };

    const renderAffiliateContent = (affiliate) => {
        switch (affiliate.type) {
            case 'Education & Research Affiliations':
            case 'Volunteering & Community Engagement':
                return (
                    <div className="affiliates-list-item-content">
                        <div className="affiliates-list-item-main">
                            <div className={`affiliates-list-item-title ${darkMode ? 'dark' : ''}`}>{affiliate.title}</div>
                            <div className={`affiliates-list-item-type ${darkMode ? 'dark' : ''}`}>{affiliate.affiliationType}</div>
                        </div>
                    </div>
                );
            case 'Professional Memberships':
                return (
                    <div className="affiliates-list-item-content">
                        <div className="affiliates-list-item-main">
                            <div className={`affiliates-list-item-title ${darkMode ? 'dark' : ''}`}>{affiliate.title}</div>
                            <div className={`affiliates-list-item-type ${darkMode ? 'dark' : ''}`}>{affiliate.MembershipType}</div>
                        </div>
                    </div>
                );
            case 'Operating Businesses & Partner Organisations':
                return (
                    <div className="affiliates-list-item-content">
                        <div className="affiliates-list-item-header">
                            {' '}
                            <div className={`affiliates-list-item-title-OB ${darkMode ? 'dark' : ''}`}>{affiliate.title}</div>
                            <div className={`affiliates-list-item-type-OB ${darkMode ? 'dark' : ''}`}>{affiliate.affiliationType}</div>
                        </div>
                        <div className={`affiliates-list-item-purpose ${darkMode ? 'dark' : ''}`}>{affiliate.companyPurpose}</div>
                    </div>
                );
            default:
                return (
                    <div className="affiliates-list-item-content">
                        <div className={`affiliates-list-item-title ${darkMode ? 'dark' : ''}`}>{affiliate.title}</div>
                    </div>
                );
        }
    };

    return (
        <motion.div className={`affiliates-modal-container ${darkMode ? 'dark' : ''} ${isMobile ? 'Mobile' : ''}`} initial="hidden" animate="visible" variants={variants}>
            {affiliationTypes.map((type) => {
                const affiliatesInType = Affiliates.filter((affiliate) => affiliate.type === type);

                return (
                    <motion.div key={type} className="affiliates-section" variants={sectionVariants}>
                        <motion.h2 className={`affiliates-section-title ${darkMode ? 'dark' : ''}`} variants={itemVariants}>
                            {type}
                        </motion.h2>
                        <motion.ul className={`affiliates-list ${darkMode ? 'dark' : ''}`} variants={sectionVariants}>
                            {affiliatesInType.map((affiliate) => (
                                <motion.li key={affiliate.id} className={`affiliates-list-item ${darkMode ? 'dark' : ''} ${isMobile ? 'Mobile' : ''}`} variants={itemVariants}>
                                    {renderAffiliateContent(affiliate)}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default AffiliatesModal;
