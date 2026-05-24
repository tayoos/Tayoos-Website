import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { getDeviceType } from '../../utitlites/Device';
import { motion } from 'framer-motion';
import './ExperienceModal.css';

import { ModalContext } from '../../utitlites/ModalContext';
import { getExperiences, getExperienceHeaderMeta } from '../../content/experiences.js';

const experiences = getExperiences();

const renderExperienceHeaderTitles = (experience) => {
    const { company, role, secondaryRole, secondaryRoleFirst, contractTitle, programmeLabel } =
        getExperienceHeaderMeta(experience);
    const leadRole = secondaryRoleFirst && secondaryRole ? secondaryRole : role;
    const trailRole = secondaryRoleFirst && secondaryRole ? role : secondaryRole;

    return (
        <>
            {company && <p className="experience-company-name">{company}</p>}
            <h2 className="experience-role-line">
                <span className="experience-primary-role">{leadRole}</span>
                {trailRole && (
                    <>
                        <span className="experience-role-separator" aria-hidden="true">
                            {' '}
                            ·{' '}
                        </span>
                        <span className="experience-secondary-role">{trailRole}</span>
                    </>
                )}
                {contractTitle && <span className="experience-contract-title"> ({contractTitle})</span>}
            </h2>
            {programmeLabel && (
                <p className="experience-key-project">
                    <span className="experience-programme-label">{programmeLabel}</span>
                </p>
            )}
        </>
    );
};

const getExperienceCompany = (experience) => getExperienceHeaderMeta(experience).company;

/**
 * Groups consecutive experiences that share the same `company` into one nav block.
 * Add multiple roles at one employer as separate array entries with the same company — order matters.
 */
const buildExperienceNavSections = (items) => {
    const sections = [];
    items.forEach((experience) => {
        const company = getExperienceCompany(experience);
        const last = sections[sections.length - 1];
        if (last && last.company && last.company === company) {
            last.items.push(experience);
        } else {
            sections.push({ company, items: [experience] });
        }
    });
    return sections;
};

const renderExperienceNavRoleLine = (experience) => {
    const { role, secondaryRole, secondaryRoleFirst } = getExperienceHeaderMeta(experience);
    const leadRole = secondaryRoleFirst && secondaryRole ? secondaryRole : role;
    const trailRole = secondaryRoleFirst && secondaryRole ? role : secondaryRole;

    if (!trailRole) {
        return <span className="experience-tab-role">{leadRole}</span>;
    }

    return (
        <span className="experience-tab-roles-stacked">
            <span className="experience-tab-role-line experience-tab-role-line--lead">{leadRole}</span>
            <span className="experience-tab-role-line experience-tab-role-line--trail">{trailRole}</span>
        </span>
    );
};

const experienceHasDualNavRole = (experience) => Boolean(getExperienceHeaderMeta(experience).secondaryRole);

const renderExperienceNavLabels = (experience, { showCompany = true } = {}) => {
    const { company } = getExperienceHeaderMeta(experience);

    return (
        <>
            {showCompany && company && <span className="experience-tab-company">{company}</span>}
            {renderExperienceNavRoleLine(experience)}
            {experience.dates && <span className="experience-tab-dates">{experience.dates}</span>}
        </>
    );
};

const renderExperienceNavItem = (experience, { showCompany = true, grouped = false, darkMode, selectedId, onSelect, as = 'button' }) => {
    const isActive = selectedId === experience.id;
    const className = [
        grouped ? 'experience-item-modal experience-item-modal--grouped' : 'experience-item-modal',
        experienceHasDualNavRole(experience) ? 'has-dual-role' : '',
        isActive ? 'active' : '',
        darkMode ? 'dark' : '',
    ]
        .filter(Boolean)
        .join(' ');

    const content = renderExperienceNavLabels(experience, { showCompany });

    if (as === 'div') {
        return (
            <div key={experience.id} className={className} onClick={() => onSelect(experience)} role="button" tabIndex={0}>
                {content}
            </div>
        );
    }

    return (
        <button
            key={experience.id}
            type="button"
            className={className}
            onClick={() => onSelect(experience)}
            aria-current={isActive ? 'true' : undefined}
        >
            {content}
        </button>
    );
};

/**
 * detail formats (Full details toggle appears when any has content):
 * - HTML string
 * - { html: string } — legacy raw HTML
 * - { lead?: string, sections: [{ tone?: string, heading?: string, body: string }] }
 *   lead = intro text (no tint). sections get automatic hue bands (tone: iter | defence | aerospace | training | default)
 */
const hasExperienceDetail = (experience) => {
    const d = experience?.detail;
    if (!d) return false;
    if (typeof d === 'string') return d.trim().length > 0;
    if (typeof d === 'object') {
        if (d.html?.trim()) return true;
        if (Array.isArray(d.sections) && d.sections.length > 0) return true;
    }
    return false;
};

const getDetailHtml = (experience) => {
    if (!experience?.detail) return '';
    if (typeof experience.detail === 'string') return experience.detail.trim();
    if (experience.detail.html) return experience.detail.html.trim();
    return '';
};

const renderExperienceDetail = (experience) => {
    const d = experience.detail;
    if (typeof d === 'object' && Array.isArray(d.sections) && d.sections.length > 0) {
        return (
            <>
                {d.lead && <div className="experience-detail-lead" dangerouslySetInnerHTML={{ __html: d.lead }} />}
                {d.sections.map((section, index) => (
                    <section key={index} className={`experience-detail-section experience-detail-section--${section.tone || 'default'}`}>
                        <div className="experience-detail-section-inner">
                            {section.heading && <h3>{section.heading}</h3>}
                            <div dangerouslySetInnerHTML={{ __html: section.body }} />
                        </div>
                    </section>
                ))}
            </>
        );
    }
    return <div dangerouslySetInnerHTML={{ __html: getDetailHtml(experience) }} />;
};

const ExperienceModal = () => {
    const { darkMode, ListView, resetListView } = useContext(ModalContext);

    const [isMobileView, setIsMobileView] = useState(false);

    const [selectedExperience, setSelectedExperience] = useState(experiences[0]);
    const [detailExpanded, setDetailExpanded] = useState(false);
    const [displayDetail, setDisplayDetail] = useState(false);
    const [contentFading, setContentFading] = useState(false);
    const [detailLayoutActive, setDetailLayoutActive] = useState(false);
    const experienceScrollRef = useRef(null);
    const contentFadeTimeoutRef = useRef(null);

    const CONTENT_FADE_MS = 180;

    const resetExperienceView = useCallback(() => {
        if (contentFadeTimeoutRef.current) {
            clearTimeout(contentFadeTimeoutRef.current);
            contentFadeTimeoutRef.current = null;
        }
        setDetailExpanded(false);
        setDisplayDetail(false);
        setContentFading(false);
        setDetailLayoutActive(false);
    }, []);

    const setExperienceView = useCallback(
        (view) => {
            const wantDetail = view === 'detail';
            if (wantDetail === detailExpanded && !contentFading) return;

            if (contentFadeTimeoutRef.current) {
                clearTimeout(contentFadeTimeoutRef.current);
                contentFadeTimeoutRef.current = null;
            }

            setDetailExpanded(wantDetail);
            if (!wantDetail) setDetailLayoutActive(false);

            const reducedMotion =
                typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (reducedMotion) {
                setDisplayDetail(wantDetail);
                setContentFading(false);
                if (wantDetail) setDetailLayoutActive(true);
                experienceScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
                return;
            }

            setContentFading(true);
            contentFadeTimeoutRef.current = window.setTimeout(() => {
                setDisplayDetail(wantDetail);
                setContentFading(false);
                if (wantDetail) setDetailLayoutActive(true);
                experienceScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
                contentFadeTimeoutRef.current = null;
            }, CONTENT_FADE_MS);
        },
        [detailExpanded, contentFading]
    );

    useEffect(() => () => {
        if (contentFadeTimeoutRef.current) clearTimeout(contentFadeTimeoutRef.current);
    }, []);

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
        if (experience?.id === selectedExperience?.id) return;
        setSelectedExperience(experience);
        resetListView();
    };

    useEffect(() => {
        resetExperienceView();
    }, [selectedExperience?.id, resetExperienceView]);

    useEffect(() => {
        if (ListView && isMobileView) {
            setSelectedExperience(null);
        }
    }, [ListView, isMobileView]);

    useEffect(() => {
        // Only set initial experience when first opening the modal or switching to mobile view
        if (isMobileView) {
            setSelectedExperience(null);
        } else {
            setSelectedExperience(experiences[0]);
        }
    }, [isMobileView]); // This ensures it runs when mobile view changes

    const experienceSwitchTransition = { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] };

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

    const renderExperienceContent = (experience) => {
        const showDetailToggle = hasExperienceDetail(experience);

        return (
            <>
                <div className={`experience-modal-chrome ${darkMode ? 'dark' : ''}`}>
                    <div className="experience-modal-header">
                        <img src={experience.logo} alt="" className="company-logo" aria-hidden="true" />
                        <div className={`experience-modal-text ${darkMode ? 'dark' : ''}`}>
                            {renderExperienceHeaderTitles(experience)}
                            {experience.dates && <p className="experience-dates">{experience.dates}</p>}
                            <h3 className="experience-location">{experience.location}</h3>
                            {showDetailToggle && (
                                <div className={`experience-view-switch ${darkMode ? 'dark' : ''}`} role="tablist" aria-label="Experience view">
                                    <button
                                        type="button"
                                        role="tab"
                                        className={`experience-view-tab ${!detailExpanded ? 'active' : ''}`}
                                        aria-selected={!detailExpanded}
                                        onClick={() => setExperienceView('summary')}
                                    >
                                        Summary
                                    </button>
                                    <button
                                        type="button"
                                        role="tab"
                                        className={`experience-view-tab ${detailExpanded ? 'active' : ''}`}
                                        aria-selected={detailExpanded}
                                        onClick={() => setExperienceView('detail')}
                                    >
                                        Full details
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`skills ${darkMode ? 'dark' : ''}`} dangerouslySetInnerHTML={{ __html: experience.skills }} />
                </div>
                <div className={`experience-body-swap ${contentFading ? 'is-content-fading' : ''}`}>
                    {!showDetailToggle || !displayDetail ? (
                        <div
                            key={`${experience.id}-summary`}
                            className={`ExperienceLongDesc ${darkMode ? 'dark' : ''}`}
                            dangerouslySetInnerHTML={{ __html: experience.longdesc }}
                        />
                    ) : (
                        <div key={`${experience.id}-detail`} className={`experience-detail-extra ${darkMode ? 'dark' : ''}`}>
                            {renderExperienceDetail(experience)}
                        </div>
                    )}
                </div>
            </>
        );
    };

    const renderMobileView = () => {
        if (selectedExperience) {
            return (
                <motion.div
                    key="mobile-detail"
                    ref={experienceScrollRef}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={mobileVariants}
                    className={`experience-detail-modal-mobile ${darkMode ? 'dark' : ''} ${detailLayoutActive && hasExperienceDetail(selectedExperience) ? 'is-detail-view' : ''}`}
                >
                    {renderExperienceContent(selectedExperience)}
                </motion.div>
            );
        }

        return (
            <motion.div initial="hidden" animate="visible" exit="exit" variants={mobileVariants} className={`experience-list-modal-mobile ${darkMode ? 'dark' : ''}`}>
                {buildExperienceNavSections(experiences).map((section) =>
                    section.items.length > 1 ? (
                        <div key={`nav-group-${section.company}-${section.items[0].id}`} className={`experience-nav-group ${darkMode ? 'dark' : ''}`}>
                            <div className="experience-nav-group-header">
                                <span className="experience-tab-company">{section.company}</span>
                                <span className="experience-nav-group-count">{section.items.length} roles</span>
                            </div>
                            {section.items.map((experience) => (
                                <motion.div
                                    key={experience.id}
                                    className={`experience-item-modal-mobile experience-item-modal-mobile--grouped ${experienceHasDualNavRole(experience) ? 'has-dual-role' : ''} ${selectedExperience?.id === experience.id ? 'active' : ''} ${darkMode ? 'dark' : ''}`}
                                    onClick={() => handleExperienceClick(experience)}
                                >
                                    {renderExperienceNavLabels(experience, { showCompany: false })}
                                    <p className={`short-description ${darkMode ? 'dark' : ''}`}>{experience.shortdesc}</p>
                                    <p className={`location ${darkMode ? 'dark' : ''}`}>{experience.location}</p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            key={section.items[0].id}
                            className={`experience-item-modal-mobile ${experienceHasDualNavRole(section.items[0]) ? 'has-dual-role' : ''} ${darkMode ? 'dark' : ''}`}
                            onClick={() => handleExperienceClick(section.items[0])}
                        >
                            {renderExperienceNavLabels(section.items[0])}
                            <p className={`short-description ${darkMode ? 'dark' : ''}`}>{section.items[0].shortdesc}</p>
                            <p className={`location ${darkMode ? 'dark' : ''}`}>{section.items[0].location}</p>
                        </motion.div>
                    )
                )}
            </motion.div>
        );
    };

    const renderDesktopView = () => {
        return (
            <>
                <nav className={`experience-list-modal ${darkMode ? 'dark' : ''}`} aria-label="Experience list">
                    {buildExperienceNavSections(experiences).map((section) =>
                        section.items.length > 1 ? (
                            <div
                                key={`nav-group-${section.company}-${section.items[0].id}`}
                                className={`experience-nav-group ${darkMode ? 'dark' : ''}`}
                            >
                                <div className="experience-nav-group-header">
                                    <span className="experience-tab-company">{section.company}</span>
                                    <span className="experience-nav-group-count">{section.items.length} roles</span>
                                </div>
                                {section.items.map((experience) =>
                                    renderExperienceNavItem(experience, {
                                        showCompany: false,
                                        grouped: true,
                                        darkMode,
                                        selectedId: selectedExperience?.id,
                                        onSelect: handleExperienceClick,
                                    })
                                )}
                            </div>
                        ) : (
                            renderExperienceNavItem(section.items[0], {
                                darkMode,
                                selectedId: selectedExperience?.id,
                                onSelect: handleExperienceClick,
                            })
                        )
                    )}
                </nav>
                {selectedExperience && (
                    <div className={`experience-detail-modal ${darkMode ? 'dark' : ''}`}>
                        <div
                            className={`experience-detail-scroll ${detailLayoutActive && hasExperienceDetail(selectedExperience) ? 'is-detail-view' : ''}`}
                            ref={experienceScrollRef}
                        >
                            <motion.div
                                key={selectedExperience.id}
                                className="experience-detail-content"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={experienceSwitchTransition}
                            >
                                {renderExperienceContent(selectedExperience)}
                            </motion.div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className={`ExperienceContainer ${darkMode ? 'dark' : ''}`}>
            {isMobileView ? renderMobileView() : renderDesktopView()}
        </div>
    );
};

export default ExperienceModal;
