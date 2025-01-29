import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ModalContext } from '../../utitlites/ModalContext.jsx';
import { X, ArrowLeft } from 'lucide-react';
import Device, { getDeviceType } from '../../utitlites/Device.jsx';

import './Modal.css';

const Modal = () => {
    const { openModal, closeModal, modalContent, isModalOpen, isCurrentModal, modalTransition, modalActiveClose, modalTitle, darkMode, ListView, resetListView, triggerListView, currentModalSize } = useContext(ModalContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    // Check for mobile view
    useEffect(() => {
        const checkMobileView = () => {
            const isMobile = getDeviceType() === 'Mobile' || window.innerWidth < 700;
            setIsMobileView(isMobile);
        };

        checkMobileView();
        window.addEventListener('resize', checkMobileView);
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            closeModal();
            setIsClosing(false);
        }, 200);
    }, [closeModal]);

    const handleBackdropClick = useCallback(
        (e) => {
            if (e.target.classList.contains('modal-backlay')) {
                handleClose();
            }
        },
        [handleClose]
    );

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('click', handleBackdropClick);
            setModalOpen(true);
        } else {
            document.removeEventListener('click', handleBackdropClick);
            setModalOpen(false);
        }

        return () => {
            document.removeEventListener('click', handleBackdropClick);
        };
    }, [isModalOpen, handleBackdropClick]);

    const handeBackClick = useCallback(() => {
        console.log('back click', ListView);
        triggerListView();
        console.log('handle back click done', ListView);
    }, [closeModal]);

    if (!modalOpen) return null;

    return (
        <div className={`modal-backlay ${modalOpen ? 'open' : ''} ${isClosing ? 'close' : ''} `}>
            <div className={`modals-content ${modalOpen ? 'open' : ''} ${isClosing ? 'close' : ''} ${modalActiveClose ? 'close' : ''}  ${modalTransition ? 'transition' : ''} ${darkMode ? 'dark' : ''} ${currentModalSize === 'Small' ? 'small' : ''} ${currentModalSize === 'Medium' ? 'medium' : ''}`}>
                <div className={`modal-header ${darkMode ? 'dark' : ''}`}>
                    <h2 className={`modal-title ${darkMode ? 'dark' : ''}`}>{modalTitle}</h2>
                    <div className="modal-nav-buttons">
                        {isMobileView && !ListView && (
                            <button onClick={handeBackClick} className="modal-back-button" aria-label="Go back">
                                <ArrowLeft className={`modal-back-icon ${darkMode ? 'dark' : ''}`} />
                            </button>
                        )}

                        <button onClick={handleClose} className="modal-close-button" aria-label="Close modal">
                            <X className={`modal-close-icon ${darkMode ? 'dark' : ''}`} />
                        </button>
                    </div>
                </div>
                <div className={`modals-content-body ${darkMode ? 'dark' : ''}`}>{modalContent}</div>
            </div>
        </div>
    );
};

export default Modal;
