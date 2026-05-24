import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { ModalContext } from '../../utitlites/ModalContext.jsx';
import { X, ArrowLeft } from 'lucide-react';
import Device, { getDeviceType } from '../../utitlites/Device.jsx';
import { applyMinimizeVars, clearMinimizeVars, captureAnchor, getActiveTaskbarAnchor } from '../../utitlites/modalMinimize.js';

import './Modal.css';

/** Must match Modal.css `--modal-exit-duration` */
const MODAL_CLOSE_MS = 700;

const Modal = () => {
    const {
        closeModal,
        modalContent,
        isModalOpen,
        modalTransition,
        modalTitle,
        darkMode,
        ListView,
        triggerListView,
        currentModalSize,
        modalAnchor,
        closeAnchor,
        closeSignal,
        requestClose,
        registerCancelClose,
        setIsModalClosing,
    } = useContext(ModalContext);

    const [modalOpen, setModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const panelRef = useRef(null);
    const closeButtonRef = useRef(null);
    const closeTimerRef = useRef(null);
    const isClosingRef = useRef(false);

    useEffect(() => {
        const checkMobileView = () => {
            const isMobile = getDeviceType() === 'Mobile' || window.innerWidth < 700;
            setIsMobileView(isMobile);
        };

        checkMobileView();
        window.addEventListener('resize', checkMobileView);
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    const cancelCloseAnimation = useCallback(() => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        clearMinimizeVars(panelRef.current);
        isClosingRef.current = false;
        setIsClosing(false);
        setIsModalClosing(false);
    }, [setIsModalClosing]);

    useEffect(() => {
        registerCancelClose(cancelCloseAnimation);
        return () => registerCancelClose(() => {});
    }, [registerCancelClose, cancelCloseAnimation]);

    const beginClose = useCallback(
        (anchor) => {
            if (isClosingRef.current) return;

            const target =
                anchor ??
                closeAnchor ??
                modalAnchor ??
                getActiveTaskbarAnchor() ?? {
                    x: window.innerWidth / 2,
                    y: window.innerHeight - 48,
                };

            const panel = panelRef.current;
            applyMinimizeVars(panel, target);
            if (panel) void panel.offsetWidth;

            isClosingRef.current = true;
            setIsClosing(true);
            setIsModalClosing(true);

            closeTimerRef.current = window.setTimeout(() => {
                closeTimerRef.current = null;
                clearMinimizeVars(panelRef.current);
                isClosingRef.current = false;
                setIsClosing(false);
                setIsModalClosing(false);
                closeModal();
            }, MODAL_CLOSE_MS);
        },
        [closeAnchor, modalAnchor, closeModal, setIsModalClosing]
    );

    useEffect(() => {
        if (closeSignal > 0 && modalOpen && !isClosingRef.current) {
            beginClose(closeAnchor ?? modalAnchor);
        }
    }, [closeSignal, modalOpen, beginClose, closeAnchor, modalAnchor]);

    const handleClose = useCallback(() => {
        requestClose();
    }, [requestClose]);

    useEffect(() => {
        if (isModalOpen) {
            setModalOpen(true);
        } else {
            setModalOpen(false);
        }

        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }
        };
    }, [isModalOpen]);

    const handleDismissClick = useCallback(() => {
        requestClose();
    }, [requestClose]);

    const handeBackClick = useCallback(() => {
        triggerListView();
    }, [triggerListView]);

    if (!modalOpen) return null;

    const isExperienceModal = modalTitle === 'Experience';
    const overlayOpen = modalOpen && !isClosing;
    const overlayClose = isClosing;

    return (
        <>
            <button
                type="button"
                className={`modal-dismiss-layer modal-header-dismiss ${overlayOpen ? 'open' : ''} ${overlayClose ? 'close' : ''}`}
                onClick={handleDismissClick}
                aria-label="Close modal"
                tabIndex={-1}
            />
            <button
                type="button"
                className={`modal-dismiss-layer modal-footer-dismiss ${overlayOpen ? 'open' : ''} ${overlayClose ? 'close' : ''}`}
                onClick={handleDismissClick}
                aria-label="Close modal"
                tabIndex={-1}
            />
            <button
                type="button"
                className={`modal-dismiss-layer modal-backdrop-dismiss ${overlayOpen ? 'open' : ''} ${overlayClose ? 'close' : ''}`}
                onClick={handleDismissClick}
                aria-label="Close modal"
                tabIndex={-1}
            />
            <div className={`modal-backlay ${overlayOpen ? 'open' : ''}`} role="presentation">
                <div
                    ref={panelRef}
                    className={`modals-content ${overlayOpen ? 'open' : ''} ${overlayClose ? 'close minimize' : ''} ${modalTransition ? 'transition' : ''} ${darkMode ? 'dark' : ''} ${currentModalSize === 'Small' ? 'small' : ''} ${currentModalSize === 'Medium' ? 'medium' : ''} ${isExperienceModal ? 'experience-modal' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={`modal-header ${darkMode ? 'dark' : ''}`}>
                        <h2 className={`modal-title ${darkMode ? 'dark' : ''}`}>{modalTitle}</h2>
                        <div className="modal-nav-buttons">
                            {isMobileView && !ListView && (
                                <button
                                    type="button"
                                    onClick={handeBackClick}
                                    className={`modal-back-button ${darkMode ? 'dark' : ''}`}
                                    aria-label="Go back to experience list"
                                >
                                    <ArrowLeft className="modal-back-icon" aria-hidden="true" />
                                </button>
                            )}

                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={handleClose}
                                className={`modal-close-button ${darkMode ? 'dark' : ''}`}
                                aria-label="Close modal"
                            >
                                <X className="modal-close-icon" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className={`modals-content-body ${darkMode ? 'dark' : ''} ${isExperienceModal ? 'experience-modal-body' : ''}`}>{modalContent}</div>
                </div>
            </div>
        </>
    );
};

export default Modal;
