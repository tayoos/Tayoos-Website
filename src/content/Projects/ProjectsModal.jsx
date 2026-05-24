import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ModalContext } from '../../utitlites/ModalContext';
import { projectsConfig } from '../projects.js';
import './ProjectsModal.css';

const GITHUB_ICON_LIGHT = '/icons/github-light.png';
const GITHUB_ICON_DARK = '/icons/github-dark.png';

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
};

const rowVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 320, damping: 26 },
    },
};

const ProjectsModal = ({ isMobile }) => {
    const { darkMode } = useContext(ModalContext);
    const { github, projects } = projectsConfig;
    const githubIcon = darkMode ? GITHUB_ICON_DARK : GITHUB_ICON_LIGHT;

    return (
        <motion.div
            className={`projects-modal-container ${darkMode ? 'dark' : ''} ${isMobile ? 'mobile' : ''}`}
            initial="hidden"
            animate="visible"
            variants={listVariants}
        >
            <div className={`projects-github-header ${darkMode ? 'dark' : ''}`}>
                <a
                    className={`projects-github-button ${darkMode ? 'dark' : ''}`}
                    href={github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={githubIcon} alt="" className="projects-github-button-icon" aria-hidden="true" />
                    <span className="projects-github-button-label">{github.label}</span>
                    <OpenInNewIcon className="projects-github-button-external" aria-hidden="true" />
                </a>
                {github.hint && <p className={`projects-github-hint ${darkMode ? 'dark' : ''}`}>{github.hint}</p>}
            </div>

            <motion.ul className="projects-list" variants={listVariants}>
                {projects.map((project) => {
                    const RowTag = project.href ? 'a' : 'div';
                    const stack = project.stack ?? project.tags ?? [];
                    const rowProps = project.href
                        ? {
                              href: project.href,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                          }
                        : {};

                    return (
                        <motion.li key={project.id} variants={rowVariants}>
                            <RowTag
                                className={`projects-row ${darkMode ? 'dark' : ''} ${project.href ? 'is-link' : ''}`}
                                {...rowProps}
                            >
                                <h3 className={`projects-row-title ${darkMode ? 'dark' : ''}`}>{project.title}</h3>
                                {project.description && (
                                    <p className={`projects-row-description ${darkMode ? 'dark' : ''}`}>{project.description}</p>
                                )}
                                {stack.length > 0 && (
                                    <div className={`projects-stack ${darkMode ? 'dark' : ''}`}>
                                        <span className={`projects-stack-label ${darkMode ? 'dark' : ''}`}>Stack:</span>
                                        <div className="projects-stack-tags">
                                            {stack.map((item) => (
                                                <span key={item} className={`projects-tag ${darkMode ? 'dark' : ''}`}>
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </RowTag>
                        </motion.li>
                    );
                })}
            </motion.ul>

            {projects.length === 0 && (
                <p className={`projects-empty ${darkMode ? 'dark' : ''}`}>No projects listed yet — add entries in src/content/projects.js.</p>
            )}
        </motion.div>
    );
};

export default ProjectsModal;
