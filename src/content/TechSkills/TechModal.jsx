import React, { useRef, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import './TechModal.css';
import { ModalContext } from '../../utitlites/ModalContext';
import VerifiedIcon from '@mui/icons-material/Verified';

import SWIcon from '../../assets/tech/SW2.png';
import VBAIcon from '../../assets/tech/VBA.png';
import CameoIcon from '../../assets/tech/Cameo_sm-m.png';
import SparxEAIcon from '../../assets/tech/SparxEA.png';
import ReactJSIcon from '../../assets/tech/reactjs.png';
import JavaScriptIcon from '../../assets/tech/Javascript.png';
import PythonIcon from '../../assets/tech/Python.png';
import SysMLIcon from '../../assets/tech/SysML.png';
import UMLIcon from '../../assets/tech/UML2.png';
import AnsysIcon from '../../assets/tech/Ansys.png';
import MATLABIcon from '../../assets/tech/MATLAB.png';
import SimulinkIcon from '../../assets/tech/Simulink2.png';
import ConfluenceIcon from '../../assets/tech/Confluence2.png';
import CSSIcon from '../../assets/tech/css.png';
import DockerIcon from '../../assets/tech/Docker.png';
import GitIcon from '../../assets/tech/git.png';
import MscPatranIcon from '../../assets/tech/MSCPatran2.png';
import TypeScriptIcon from '../../assets/tech/TypeScript3.png';
import TailwindCSSIcon from '../../assets/tech/tailwind.png';
import CEAIcon from '../../assets/tech/CEA.png';
import SAPIcon from '../../assets/tech/SAP.png';

const TechModal = () => {
    const { darkMode } = useContext(ModalContext);

    const techItems = [
        { name: 'SolidWorks', icon: SWIcon, certification: '', fill: '', bcolor: '', ccourse: 'true' },
        { name: 'Excel/VBA', icon: VBAIcon, certification: '', fill: 'true', bcolor: 'vbagreen' },
        { name: 'CAMEO SM', icon: CameoIcon, certification: '', fill: '', bcolor: '' },
        { name: 'Cameo EA', icon: CEAIcon, certification: '', fill: '', bcolor: '' },
        { name: 'Sparx EA', icon: SparxEAIcon, certification: '', fill: '', bcolor: '' },
        { name: 'ReactJS', icon: ReactJSIcon, certification: '', fill: '', bcolor: '' },
        { name: 'JavaScript', icon: JavaScriptIcon, certification: '', fill: 'true', bcolor: 'jsyellow', ccourse: 'true' },
        { name: 'Python', icon: PythonIcon, certification: '', fill: '', bcolor: '' },
        { name: 'SysML', icon: SysMLIcon, certification: '', fill: '', bcolor: '' },
        { name: 'UML', icon: UMLIcon, certification: '', fill: '', bcolor: '' },
        { name: 'ANSYS', icon: AnsysIcon, certification: '', fill: 'true', bcolor: 'ansysblack' },
        { name: 'MATLAB', icon: MATLABIcon, certification: '', fill: '', bcolor: '' },
        { name: 'Simulink', icon: SimulinkIcon, certification: '', fill: '', bcolor: '' },
        { name: 'Confluence', icon: ConfluenceIcon, certification: '', fill: '', bcolor: '' },
        { name: 'CSS', icon: CSSIcon, certification: '', fill: '', bcolor: '', ccourse: 'true' },
        { name: 'Docker', icon: DockerIcon, certification: '', fill: '', bcolor: '' },
        { name: 'git', icon: GitIcon, certification: '', fill: '', bcolor: '' },
        { name: 'Msc Patran', icon: MscPatranIcon, certification: '', fill: '', bcolor: '' },
        { name: 'TypeScript', icon: TypeScriptIcon, certification: '', fill: 'true', bcolor: 'tsblue' },
        { name: 'TailwindCSS', icon: TailwindCSSIcon, certification: '', fill: '', bcolor: '' },
        { name: 'SAP', icon: SAPIcon, certification: 'true', fill: '', bcolor: '', link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/BXTG7GSFBM22' },
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
        <div className={`TechModal-container ${darkMode ? 'dark' : ''}`}>
            <motion.div className="TechModal-grid" initial="hidden" animate="visible" variants={variants} exit="exit">
                {techItems.map((item, index) => (
                    <TechItem key={index} name={item.name} icon={item.icon} certification={item.certification || ''} fill={item.fill || ''} bcolor={item.bcolor} link={item.link || ''} ccourse={item.ccourse || ''} darkMode={darkMode} variants={variants} />
                ))}
            </motion.div>
        </div>
    );
};

const TechItem = ({ name, icon, certification, fill, bcolor, darkMode, variants, link, ccourse }) => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const itemRef = useRef(null);
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
        <motion.div ref={itemRef} className={`TechModal-item ${darkMode ? 'dark' : ''}`} variants={variants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                    stiffness: 300,
                    damping: 20,
                }}
            >
                <div className={`TechModal-icon-wrapper ${fill === 'true' ? 'fill' : ''}`}>
                    <img src={icon} alt={name} className="TechModal-image" />
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
