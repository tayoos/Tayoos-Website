import React, { useRef, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import './TechModal.css';
import { ModalContext } from '../../utitlites/ModalContext';

import SWIcon from '../../assets/tech/SW2.jpg';
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
import ConfluenceIcon from '../../assets/tech/Confluence.jpg';
import CSSIcon from '../../assets/tech/css.png';
import DockerIcon from '../../assets/tech/Docker.png';
import GitIcon from '../../assets/tech/git.png';
import MscPatranIcon from '../../assets/tech/Python.png';
import TypeScriptIcon from '../../assets/tech/TypeScript3.png';
import TailwindCSSIcon from '../../assets/tech/tailwind.png';

const TechModal = () => {
    const { darkMode } = useContext(ModalContext);

    const techItems = [
        { name: 'SolidWorks', icon: SWIcon, certification: '', fill: '' },
        { name: 'Excel/VBA', icon: VBAIcon, certification: '', fill: 'true' },
        { name: 'CAMEO SM', icon: CameoIcon, certification: '', fill: '' },
        { name: 'Sparx EA', icon: SparxEAIcon, certification: '', fill: '' },
        { name: 'ReactJS', icon: ReactJSIcon, certification: '', fill: '' },
        { name: 'JavaScript', icon: JavaScriptIcon, certification: '', fill: 'true' },
        { name: 'Python', icon: PythonIcon, certification: '', fill: '' },
        { name: 'SysML', icon: SysMLIcon, certification: '', fill: '' },
        { name: 'UML', icon: UMLIcon, certification: '', fill: '' },
        { name: 'ANSYS', icon: AnsysIcon, certification: '', fill: 'true' },
        { name: 'MATLAB', icon: MATLABIcon, certification: '', fill: '' },
        { name: 'Simulink', icon: SimulinkIcon, certification: '', fill: '' },
        { name: 'Confluence', icon: ConfluenceIcon, certification: '', fill: '' },
        { name: 'CSS', icon: CSSIcon, certification: '', fill: '' },
        { name: 'Docker', icon: DockerIcon, certification: '', fill: '' },
        { name: 'git', icon: GitIcon, certification: '', fill: '' },
        { name: 'Msc Patran', icon: MscPatranIcon, certification: '', fill: '' },
        { name: 'TypeScript', icon: TypeScriptIcon, certification: '', fill: 'true' },
        { name: 'TailwindCSS', icon: TailwindCSSIcon, certification: '', fill: '' },
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
                    <TechItem key={index} name={item.name} icon={item.icon} certification={item.certification} fill={item.fill} darkMode={darkMode} variants={variants} />
                ))}
            </motion.div>
        </div>
    );
};

const TechItem = ({ name, icon, certification, fill, darkMode, variants }) => {
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
                className={`TechModal-squircle ${darkMode ? 'dark' : ''}`}
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
            {certification && <div className={`TechModal-certification ${darkMode ? 'dark' : ''}`}>{certification}</div>}
        </motion.div>
    );
};

export default TechModal;
