import React, { useState, useContext, useEffect } from 'react';
import Device, { getDeviceType } from '../../utitlites/Device';
import { motion, AnimatePresence } from 'framer-motion';

import './ExperienceModal.css';

import { ModalContext } from '../../utitlites/ModalContext';

import logoCapgem from '../../assets/images/logos/Capgem.png';
import logoJacobs from '../../assets/images/logos/Jacobs.png';
import logoAlten from '../../assets/images/logos/Alten.png';
import logoRollsRoyce from '../../assets/images/logos/RollsRoyce.png';

const ExperienceModal = () => {
    const { darkMode, ListView, resetListView, triggerListView } = useContext(ModalContext);

    const [isMobileView, setIsMobileView] = useState(false);

    const experiences = [
        {
            id: 1,
            title: 'Capgemini – Consultant Engineer (Senior MB Systems and Software Engineer)',
            location: 'Birmingham, England, United Kingdom',
            shortdesc: 'Successfully implemented MBSE into the ITER project, conducted requirement change analysis for defense projects, and contributed to AIRBUS NextWing and OneHeart development.',
            longdesc: `
            <p>Successfully implemented MBSE into the ITER project with Fusion4Energy, developing a pilot model and providing comprehensive training on its benefits and proper implementation.</p>
            <p>Conducted requirement change analysis for a defence project, including initial change impact assessment, enhancing project adaptability and risk management.</p>
            <p>Contributed to AIRBUS NextWing and OneHeart development:</p>
            <ul>
                <li>Programmed a robust interface between Cameo and Delmia using Java for end-to-end functionality.</li>
                <li>Developed a user-friendly Java plugin, enhancing accessibility and implemented efficient XML marshalling using a developed ontology, improving data handling, using kanban boards to task track completion.</li>
                <li>Conducted architecture development using AIRBUS’ proprietary language, MOFLT, modelling functional, logical, and technical layers for levels 1-4, streamlining project design.</li>
                <li>Developed an ontology and owned the adapter interface between Sparx EA and a Data Warehouse for XML data transfer using JavaScript, leading a team of 4 using an Agile Approach, managing workload and delivery, ensuring timely and high-quality outputs. Developed models for testing adapter using Sparx EA and NAF. Developed tool documentation.</li>
            </ul>
            <p>Developed training packs for MBDA to train both external clients and internal employees.</p>
        `,

            skills: 'Software Design · Software Development · JavaScript · Java · System Architecture · SysML · Requirements',
            Tools: 'Cameo · Sparx EA · MOFLT · JavaScript',
            logo: logoCapgem,
        },
        {
            id: 2,
            title: 'Jacobs – Consultant Engineer (Enterprise Architect/Systems Engineer)',
            location: 'Birmingham, England, United Kingdom',
            shortdesc: 'Developed Enterprise Architecture for Network Rail, using SWOT and PESTLE analysis for project design and risk management.',
            longdesc: `
            <p>Engineering consultant contracted as a Systems/Enterprise Architect to Network Rail for the Transpennine Route Upgrade project in the railway industry.</p>
            <p>Developed Enterprise Architecture for the whole project, individual systems, and at various key outputs in the design process as well as a WBS for the project based on business and systems requirements available:</p>
            <ul>
                <li>Developed Architecture Plan baselining with “As Is” architecture and “To-be” Architecture.</li>
                <li>Used SWOT Analysis to find the strengths and weaknesses of the business and PESTLE to find areas that could affect the project moving forward.</li>
                <li>Developed business architecture and aligning with business requirements set by NR.</li>
                <li>Carried out requirements analysis on the business requirements.</li>
            </ul>
            <p>Addressed interfacing risks and applied mitigation strategies between components in architecture diagrams, reducing potential issues.</p>
            <p>Ensured comprehensive system definition for architecture designs, facilitating accessibility of essential information.</p>
        `,
            skills: 'Enterprise Architecture · Systems Architecture · Requirements Analysis · SWOT Analysis · PESTLE · Risk Management',
            Tools: 'Architecture Design · WBS · Systems Modeling',
            logo: logoJacobs,
        },
        {
            id: 3,
            title: 'Alten Engineering – Consultant Engineer (Systems and Software Engineer)',
            location: 'Derby, England, United Kingdom',
            shortdesc: 'Worked as a Systems and Software Verification Engineer for Rolls-Royce, utilizing Python and .ROBOT framework for engine maintenance projects.',
            longdesc: `
            <p>Engineering consultant contracted to Rolls-Royce as a Systems and Software Verification Engineer for the ECOSIStem project, aimed at streamlining code testing and development for engine maintenance and enhancement.</p>
            <p>Utilized Python and .ROBOT framework to develop and analyse test cases, ensuring easy testing of new code implementations.</p>
            <p>Reviewed, revised and verified test cases, improving quality and ensuring compliance, facilitating necessary reworks for approval.</p>
            <p>Initiated and developed a knowledge-sharing database, aiding integration of new consultants and enhancing information exchange among colleagues.</p>
        `,
            skills: 'Systems Verification · Python · .ROBOT Framework · Test Case Development · Knowledge Management · Software Testing',
            Tools: 'Python · .ROBOT · Knowledge Sharing Systems',
            logo: logoAlten,
        },
        {
            id: 5,
            title: 'Rolls-Royce – Performance Engineer',
            location: 'Bristol, England, United Kingdom',
            shortdesc: 'Worked in the combat aftermarket division, improving data accuracy with MATLAB tools,managing multiple projects and carrying out data anyslsi and reporting on them.',
            longdesc: `
            <p>Performance Engineer in the combat aftermarket division, gaining hands-on experience in engineering and management tasks.</p>
            <p>Reformed and implemented a MATLAB trending tool to analyse and present data, incorporating advanced analytical processes (using VBA for data storage), and validated the tool, significantly enhancing data accuracy and decision-making. Presented analysed data.</p>
            <p>Managed two projects, including leading a team of two and also managing a larger project:</p>
            <ul>
                <li>Responsibilities included tracking project charters, managing resources, and ensuring deliverables were met, identifying and managing risks.</li>
            </ul>
            <p>Wrote Pass-off trending reports and conducted analysis for Rolls-Royce-manufactured jet engines.</p>
        `,
            skills: 'MATLAB · VBA · Data Analysis · Project Management · Risk Management · Engineering Reporting',
            Tools: 'MATLAB · VBA · Engineering Tools',
            logo: logoRollsRoyce,
        },
        {
            id: 6,
            title: 'Rolls-Royce – E-Fan X Development Engineer',
            location: 'Bristol, England, United Kingdom',
            shortdesc: 'Developed verification strategies for the Electric Propulsion Unit system and led key sub-systems in the E-Fan X project.',
            longdesc: `
            <p>Defined verification strategies aligning with customer, business, and aviation authority (EASA) requirements for the Electric Propulsion Unit system.</p>
            <p>Hosted workshops with system designers to define verification methods for various sub-systems.</p>
            <p>Developed and sequenced the verification strategy.</p>
            <p>Took ownership of delivering key sub-systems including Fan Systems, Structures & Flow paths, and Bypass & Exhausts:</p>
            <ul>
                <li>Led working groups and conducted meetings to ensure project delivery.</li>
            </ul>
            <p>Acquired technical knowledge and capabilities, establishing standardized baselines for program and project management in a global, multifaceted company.</p>
        `,
            skills: 'Verification Strategies · Systems Engineering · Client Interaction · Workshop Facilitation · Sub-system Management',
            Tools: 'IBM DOORS · MATLAB · Excel · VBA',
            logo: logoRollsRoyce,
        },
    ];

    const [selectedExperience, setSelectedExperience] = useState(experiences[0]);

    useEffect(() => {
        const checkMobileView = () => {
            const isMobile = getDeviceType() === 'Mobile' || window.innerWidth < 700;
            setIsMobileView(isMobile);
        };

        checkMobileView();
        window.addEventListener('resize', checkMobileView);
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    const handleExperienceClick = (experience) => {
        setSelectedExperience(experience);
        resetListView();
        console.log('triggerListView', ListView);
    };

    const handleBackToList = () => {
        if (modalContent) {
            console.log('shouldBackToList', shouldBackToList);

            if (shouldBackToList) {
                setSelectedExperience(null);

                // Reset the content to the list view
            }
        }
    };

    useEffect(() => {
        // When shouldBackToList is true and ListView is true, reset the selected experience
        if (ListView) {
            setSelectedExperience(null);
            setTimeout(() => resetBackToList(), 100); // Delay reset
        }
    }, [ListView, resetListView]);

    useEffect(() => {
        // Only set initial experience when first opening the modal or switching to mobile view
        if (isMobileView) {
            setSelectedExperience(null);
        } else {
            setSelectedExperience(experiences[0]);
        }
    }, [isMobileView]); // This ensures it runs when mobile view changes

    // Animation variants for desktop view
    const desktopVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
            },
        },
        exit: {
            opacity: 0,
            x: 50,
            transition: {
                duration: 0.2,
            },
        },
    };

    // Animation variants for mobile view
    const mobileVariants = {
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

    const renderMobileView = () => {
        if (selectedExperience) {
            return (
                <motion.div key="mobile-detail" initial="hidden" animate="visible" exit="exit" variants={mobileVariants} className={`experience-detail-modal-mobile ${darkMode ? 'dark' : ''}`}>
                    <div className="experience-modal-header">
                        <img src={selectedExperience.logo} alt={`${selectedExperience.title} logo`} className="company-logo" />
                        <div className={`experience-modal-text ${darkMode ? 'dark' : ''}`}>
                            <h2>{selectedExperience.title}</h2>
                            <h3>{selectedExperience.location}</h3>
                        </div>
                    </div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`ExperienceLongDesc ${darkMode ? 'dark' : ''}`} dangerouslySetInnerHTML={{ __html: selectedExperience.longdesc }} />
                </motion.div>
            );
        }

        return (
            <motion.div initial="hidden" animate="visible" exit="exit" variants={mobileVariants} className={`experience-list-modal-mobile ${darkMode ? 'dark' : ''}`}>
                {experiences.map((experience) => (
                    <motion.div key={experience.id} className={`experience-item-modal-mobile ${darkMode ? 'dark' : ''}`} onClick={() => handleExperienceClick(experience)}>
                        <h3 className={`experience-modal-mobile-title ${darkMode ? 'dark' : ''}`}>{experience.title}</h3>
                        <p className={`short-description ${darkMode ? 'dark' : ''}`}>{experience.shortdesc}</p>
                        <p className={`location ${darkMode ? 'dark' : ''}`}>{experience.location}</p>
                    </motion.div>
                ))}
            </motion.div>
        );
    };

    const renderDesktopView = () => {
        return (
            <>
                <div className={`experience-list-modal ${darkMode ? 'dark' : ''}`}>
                    {experiences.map((experience) => (
                        <motion.div key={experience.id} className={`experience-item-modal ${selectedExperience?.id === experience.id ? 'active' : ''} ${darkMode ? 'dark' : ''}`} onClick={() => handleExperienceClick(experience)}>
                            {experience.title}
                        </motion.div>
                    ))}
                </div>
                <AnimatePresence>
                    {selectedExperience && (
                        <motion.div key="desktop-detail" initial="hidden" animate="visible" exit="exit" variants={desktopVariants} className="experience-detail-modal">
                            <div className="experience-modal-header">
                                <img src={selectedExperience.logo} alt={`${selectedExperience.title} logo`} className="company-logo" />
                                <div className={`experience-modal-text ${darkMode ? 'dark' : ''}`}>
                                    <h2 className="experience-title">{selectedExperience.title}</h2>
                                    <h3 className="experience-location">{selectedExperience.location}</h3>
                                </div>
                            </div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`skills ${darkMode ? 'dark' : ''}`} dangerouslySetInnerHTML={{ __html: selectedExperience.skills }} />
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className={`ExperienceLongDesc ${darkMode ? 'dark' : ''}`} dangerouslySetInnerHTML={{ __html: selectedExperience.longdesc }} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
    };

    return <div className="ExperienceContainer">{isMobileView ? renderMobileView() : renderDesktopView()}</div>;
};

export default ExperienceModal;
