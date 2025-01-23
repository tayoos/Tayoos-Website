import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ModalContext } from '../../utitlites/ModalContext.jsx';
import { X } from 'lucide-react';

import './Modal.css';

const Modal = () => {
    const { openModal, closeModal, modalContent, isModalOpen, isCurrentModal, modalTransition, modalActiveClose, modalTitle } = useContext(ModalContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            closeModal();
            setIsClosing(false);
        }, 200); // Match this with CSS animation duration
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

    if (!modalOpen) return null;

    return (
        <div className={`modal-backlay ${modalOpen ? 'open' : ''} ${isClosing ? 'close' : ''} `}>
            <div className={`modals-content ${modalOpen ? 'open' : ''} ${isClosing ? 'close' : ''} ${modalActiveClose ? 'close' : ''}  ${modalTransition ? 'transition' : ''}`}>
                <div className="modal-header">
                    <h2 className="modal-title">{modalTitle}</h2>
                    <button onClick={handleClose} className="modal-close-button" aria-label="Close modal">
                        <X className="modal-close-icon" />
                    </button>
                </div>
                <div className="modal-body">{modalContent}</div>
            </div>
        </div>
    );
};

export default Modal;
