import React, { useRef, useState, useContext } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './TechModal.css';
import { ModalContext } from '../../utitlites/ModalContext';
import VerifiedIcon from '@mui/icons-material/Verified';

import SWIcon from '../../assets/tech/SW2.png';
import VBAIcon from '../../assets/tech/VBA.png';
import CameoIcon from '../../assets/tech/Cameo_smm.png';
import SparxEAIcon from '../../assets/tech/SparxEA.png';
import RhapsodyIcon from '../../assets/tech/Rhapsody.png';
import CapellaIcon from '../../assets/tech/Capella.png';
import ReactJSIcon from '../../assets/tech/ReactJS.png';
import JavaScriptIcon from '../../assets/tech/Javascript.png';
import PythonIcon from '../../assets/tech/Python.png';
import SysMLIcon from '../../assets/tech/SysML.png';
import UMLIcon from '../../assets/tech/UML2.png';
import AnsysIcon from '../../assets/tech/ANSYS.png';
import MATLABIcon from '../../assets/tech/MATLAB.png';
import SimulinkIcon from '../../assets/tech/Simulink2.png';
import ConfluenceIcon from '../../assets/tech/Confluence2.png';
import CSSIcon from '../../assets/tech/CSS.png';
import DockerIcon from '../../assets/tech/Docker.png';
import GitIcon from '../../assets/tech/git.png';
import MscPatranIcon from '../../assets/tech/MSCPatran2.png';
import TypeScriptIcon from '../../assets/tech/TypeScript3.png';
import TailwindCSSIcon from '../../assets/tech/Tailwind.png';
import CEAIcon from '../../assets/tech/CEA.png';
import SAPIcon from '../../assets/tech/SAP.png';
import TOGAFIcon from '../../assets/tech/TOGAF.png';
import AzureIcon from '../../assets/tech/Azure.png';
import AWSIcon from '../../assets/tech/AWSIcon.png';
import Neo4jIcon from '../../assets/tech/Neo4jIcon.png';
import JavaIcon from '../../assets/tech/java.png';
import MySQL from '../../assets/tech/mysql.png';

const EASE_SMOOTH = [0.22, 1, 0.36, 1];

const gridVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.016,
            delayChildren: 0.06,
        },
    },
};

const itemVariantsReduced = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
};

const itemVariantsFull = {
    hidden: { opacity: 0, y: 10, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.28, ease: EASE_SMOOTH },
    },
};

const TechModal = () => {
    const { darkMode } = useContext(ModalContext);
    const reduceMotion = useReducedMotion();
    const itemVariants = reduceMotion ? itemVariantsReduced : itemVariantsFull;
    const [filters, setFilters] = useState({ certified: false, course: false });

    const techItems = [
        { name: 'AWS', icon: AWSIcon, certification: 'true', fill: '', bcolor: '', link: 'https://www.coursera.org/account/accomplishments/specialization/HGKM2R8D0U9M' },
        { name: 'ReactJS', icon: ReactJSIcon, certification: '', fill: '', bcolor: '' },
        { name: 'JavaScript', icon: JavaScriptIcon, certification: '', fill: 'true', bcolor: 'jsyellow', ccourse: 'true' },
        { name: 'TypeScript', icon: TypeScriptIcon, certification: '', fill: 'true', bcolor: 'tsblue' },
        { name: 'Python', icon: PythonIcon, certification: '', fill: '', bcolor: '' },
        { name: 'Java', icon: JavaIcon, certification: '', fill: '', bcolor: '', ccourse: 'true' },
        { name: 'Neo4j', icon: Neo4jIcon, certification: 'true', fill: '', bcolor: '', link: 'https://www.coursera.org/account/accomplishments/specialization/HGKM2R8D0U9M' },
        { name: 'MySQL', icon: MySQL, certification: '', fill: '', bcolor: '' },
        { name: 'CSS', icon: CSSIcon, certification: '', fill: '', bcolor: '', ccourse: '' },
        { name: 'Azure', icon: AzureIcon, ccourse: 'true', fill: '', bcolor: '', link: 'https://www.coursera.org/account/accomplishments/records/5ZMEXTAX8IEA' },
        { name: 'SAP', icon: SAPIcon, certification: 'true', fill: '', bcolor: '', link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/BXTG7GSFBM22' },
        { name: 'CAMEO SM', icon: CameoIcon, certification: '', fill: '', bcolor: '' },
        { name: 'Cameo EA', icon: CEAIcon, certification: '', fill: '', bcolor: '', ccourse: 'true' },
        { name: 'Sparx EA', icon: SparxEAIcon, certification: '', fill: '', bcolor: '', ccourse: 'true' },
        { name: 'IBM Rhapsody', icon: RhapsodyIcon, certification: '', fill: '', bcolor: '', ccourse: 'true' },
        { name: 'Capella', icon: CapellaIcon, certification: '', fill: '', bcolor: '' },
        { name: 'SysML', icon: SysMLIcon, certification: '', fill: '', bcolor: '', ccourse: 'true' },
        { name: 'UML', icon: UMLIcon, certification: '', fill: '', bcolor: '', ccourse: 'true' },
        { name: 'TOGAF', icon: TOGAFIcon, ccourse: 'true', fill: '', bcolor: '', link: 'https://www.udemy.com/certificate/UC-252c6a20-95d5-453d-a488-b064f0e29438/' },
        { name: 'ANSYS', icon: AnsysIcon, certification: '', fill: 'true', bcolor: 'ansysblack', ccourse: '' },
        { name: 'MATLAB', icon: MATLABIcon, certification: '', fill: '', bcolor: '' },
        { name: 'Simulink', icon: SimulinkIcon, certification: '', fill: '', bcolor: '' },
        { name: 'Confluence', icon: ConfluenceIcon, certification: '', fill: '', bcolor: '' },
        { name: 'Docker', icon: DockerIcon, certification: '', fill: '', bcolor: '' },
        { name: 'git', icon: GitIcon, certification: '', fill: '', bcolor: '' },
        { name: 'Msc Patran', icon: MscPatranIcon, certification: '', fill: '', bcolor: '' },
        { name: 'TailwindCSS', icon: TailwindCSSIcon, certification: '', fill: '', bcolor: '' },
        { name: 'SolidWorks', icon: SWIcon, certification: '', fill: '', bcolor: '', ccourse: '' },
        { name: 'Excel/VBA', icon: VBAIcon, certification: '', fill: 'true', bcolor: 'vbagreen' },
    ];

    const toggleFilter = (key) => {
        setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const isCertified = (item) => item.certification === 'true';
    const isCourse = (item) => item.ccourse === 'true';

    const filteredItems = techItems.filter((item) => {
        if (!filters.certified && !filters.course) return true;
        if (filters.certified && isCertified(item)) return true;
        if (filters.course && isCourse(item)) return true;
        return false;
    });

    const filterActive = filters.certified || filters.course;

    return (
        <div className={`TechModal-container ${darkMode ? 'dark' : ''}`}>
            <div className={`TechModal-filter-bar ${darkMode ? 'dark' : ''}`}>
                <div className="TechModal-filters" role="group" aria-label="Filter skills by credential type">
                    <span className="TechModal-filter-label">Filter</span>
                    <button
                        type="button"
                        className={`TechModal-filter-toggle certified ${filters.certified ? 'active' : ''}`}
                        onClick={() => toggleFilter('certified')}
                        aria-pressed={filters.certified}
                        aria-label="Certified"
                        title="Certified"
                    >
                        <VerifiedIcon className="TechModal-filter-icon" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className={`TechModal-filter-toggle course ${filters.course ? 'active' : ''}`}
                        onClick={() => toggleFilter('course')}
                        aria-pressed={filters.course}
                        aria-label="Course"
                        title="Course"
                    >
                        <VerifiedIcon className="TechModal-filter-icon" aria-hidden="true" />
                    </button>
                </div>
            </div>
            {filterActive && filteredItems.length === 0 ? (
                <p className={`TechModal-filter-empty ${darkMode ? 'dark' : ''}`}>No skills match the selected filters.</p>
            ) : (
                <motion.div
                    className="TechModal-grid"
                    initial="hidden"
                    animate="visible"
                    variants={gridVariants}
                    key={`${filters.certified}-${filters.course}`}
                >
                    {filteredItems.map((item) => (
                    <TechItem
                        key={item.name}
                        name={item.name}
                        icon={item.icon}
                        certification={item.certification || ''}
                        fill={item.fill || ''}
                        bcolor={item.bcolor}
                        link={item.link || ''}
                        ccourse={item.ccourse || ''}
                        darkMode={darkMode}
                        itemVariants={itemVariants}
                    />
                    ))}
                </motion.div>
            )}
        </div>
    );
};

const TechItem = ({ name, icon, certification, fill, bcolor, darkMode, itemVariants, link, ccourse }) => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const circleRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!circleRef.current) return;

        const rect = circleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const tiltX = (mouseY / (rect.height / 2)) * 25;
        const tiltY = (-mouseX / (rect.width / 2)) * 25;

        setTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <motion.div
            className={`TechModal-item ${darkMode ? 'dark' : ''}`}
            variants={itemVariants}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
        >
            <motion.div
                ref={circleRef}
                className={`TechModal-squircle ${darkMode ? 'dark' : ''} ${bcolor ? bcolor : ''}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 24,
                }}
            >
                <div className={`TechModal-icon-wrapper ${fill === 'true' ? 'fill' : ''}`}>
                    <img src={icon} alt={name} className="TechModal-image" loading="lazy" decoding="async" />
                </div>
            </motion.div>
            <p className={`TechModal-name ${darkMode ? 'dark' : ''}`}>{name}</p>
            <div className={`TechModal-attibutes-container ${darkMode ? 'dark' : ''}`}>
                {certification && link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="TechModal-certification">
                        <span className="certified-label">CERTIFIED</span>
                        <VerifiedIcon className="certified-icon" />
                    </a>
                )}

                {certification && !link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="TechModal-certification non-clickable">
                        <span className="certified-label">CERTIFIED</span>
                        <VerifiedIcon className="certified-icon" />
                    </a>
                )}

                {ccourse && link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="TechModal-ccourse">
                        <span className="completed-label">COURSE</span>
                        <VerifiedIcon className="completed-icon" />
                    </a>
                )}

                {ccourse && !link && (
                    <div className="TechModal-ccourse non-clickable">
                        <span className="completed-label">COURSE</span>
                        <VerifiedIcon className="completed-icon" />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default TechModal;
