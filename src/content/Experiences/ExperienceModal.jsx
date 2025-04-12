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
            title: 'Capgemini – Consultant Engineer (Senior MB Software and Systems Engineer)',
            location: 'Birmingham, England, United Kingdom',
            shortdesc:
                'Successfully implemented MBSE into the ITER Project with Fusion4Energy, developing a pilot model using MagicGrid in Cameo to create a digital twin of the Tokamak Building. Providing comprehensive training on its benefits and proper implementation, building MBSE understanding within Fusion4Energy and bring attention to its implementation within the company and executives.',
            longdesc: `
            <p>Successfully implemented MBSE into the ITER project with Fusion4Energy, developing a pilot model and providing comprehensive training on its benefits and proper implementation.</p>
            <p>Conducted requirement change analysis for a defence project, including initial impact assessment to identify risks and improve risk management by understanding the effects of proposed changes.</p>
            <p>Contributed to the development of AIRBUS NextWing, an Airbus-led initiative using digital tools to accelerate wing design through semantic integration, and OneHeart architecture models development:</p>
            <ul>
                <li>Designed and implemented an end-to-end Java interface between Cameo and Delmia, reducing manual effort in model updates, this allowed for faster transferring and updating of data between tools.</li>
                <li>Developed a user-friendly Java plugin, enhancing accessibility by implemented efficient XML marshalling using a developed ontology, improving data handling, and improved processing times by 15% between initial version and completed version – carried out using kanban boards to track task completion.</li>
                    <ul>
                        <li>Java front end plugin development improving the ease of access.</li>
                        <li>Use of JAXB package for XML marshalling using a developed ontology.</li>
                    </ul> 
                <li>Conducted architecture development using AIRBUS’ proprietary language, MOFLT, modelling functional, logical, and technical layers for ontological levels 1-4, to assist in realising their system design.</li>
                <li>Developed an ontology for use between the different tools as a template for both of them to understand each other. </li>
                <li>Led the development of an ontology-driven adapter interface between Sparx EA and a Neo4j Data Warehouse for XML data transfer using JavaScript, managing a team of 4 engineers using an Agile approach. Oversaw workload distribution, sprint planning, and delivery, ensuring high-quality outputs and improving data processing speed upon completion.</li>
                    <ul>
                        <li>Developed Architecture Models to give an understanding of what is being developed to the team and allow for quantifiable measures of success.</li>
                        <li>Developed base code that could be used by the team to carry out key functions.</li>
                        <li>Extracting information from the model using MySQL.</li>
                        <li>Carried out code reviews to ensure quality.</li>
                        <li>Developed models for testing adapter using Sparx EA and NAF.</li>
                        <li>Developed tool documentation.</li>
                        <li>Developed a graph database in Neo4j for use as a data warehouse for transferring data between the various tools.</li>
                    </ul> 
                </li>
            </ul>
            <p>Developed and delivered MBSE training packs for MBDA, training internal teams and external clients, improving MBSE competency across 5+ engineering departments.</p>
            <p>Developed an ontology for nuclear waste services designed to facilitate digital safety case integration.</p>
            <ul>
                <li>Developed integration strategies for the digital safety case</li>
                <li>Ensured interoperability with other parts of the organization</li>
                <li>Provided a strategy for configuration management</li>
            </ul>


            `,

            skills: 'Software Design · Software Architecture · Software Development · System Architecture · JavaScript · Java · MySQL · SysML ·  UML · NAF · Requirements',
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
            <p>Developed Enterprise Architecture for whole project, individual systems and at various key outputs in the design process as well as a WBS for the project based on business and systems requirements available, using TraK and TOGAF.</p>
            <ul>
                <li>Established an Architecture Plan, baselining the "As-Is" and "To-Be" architectures to guide system evolution.</li>
                <li>Conducted SWOT and PESTLE analyses to assess business strengths, weaknesses, and external factors impacting project success, identifying key risks and opportunities that informed strategic time and integration decisions and mitigated project delays. Developed business architecture including architecture roadmaps that aligned with Network Rail’s business requirements, ensuring consistency across project objectives.</li>
                <li>Developed business architecture and aligning with business requirements set by NR.</li>
                <li>Carried out requirements analysis on the business requirements.</li>
                <li>Addressed interfacing risks and applied mitigation strategies between components in architecture diagrams, reducing potential issues.</li>
            </ul>
            <p>Ensured comprehensive system definitions for architecture designs, enhancing the accessibility of essential information in turn improving team collaboration.</p>
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
            <p>Utilized Python and .ROBOT framework to develop and analyse test cases as well as creating integration tests, ensuring easy testing of new code implementations.</p>
            <p>Reviewed, revised and verified test cases, improving quality and ensuring compliance, facilitating necessary reworks for approval.</p>
            <p>Created a knowledge-sharing database, improving onboarding efficiency for new consultants and enhancing collaborative information exchange, reducing onboarding time and improving knowledge retention.</p>
        `,
            skills: 'Software Development · Software Design · Software Testing · Integration Tests · Systems Verification · Python · .ROBOT Framework · Test Case Development',
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
