import React, { useEffect, useRef, useState } from 'react';
import { ModalContext } from '../../utitlites/ModalContext';
import { X } from 'lucide-react';
import './Modal.css';

const Modal = ({ onClose, children, title }) => {
    const { closeModal, modalContent, isModalOpen, isCurrentModal } = useContext(ModalContext);
    const [modalOpen, setModalOpen] = useState(false);

    //Backdrop Click
    const handleBackdropClick = useCallback(
        (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                closeModal();
            }
        },
        [closeModal]
    );

    const handleCloseClick = useCallback(() => {
        closeModal();
    }, [closeModal]);

    const handleModalTransition = useCallback(
        (targetModal) => {
            if (isModalOpen) {
                // Close the currently open modal
                closeModal();

                // Use a slight delay to ensure a smooth transition before opening the new modal
                setTimeout(() => {
                    openModal(targetModal);
                }, 100); // Adjust the delay (in milliseconds) as needed
            }
        },
        [isModalOpen, closeModal, openModal]
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
    }, [isModalOpen, handleBackdropClick]); // Now handleBackdropClick can be safely added as a dependency

    if (!modalOpen) return null;

    return (
        <div className={`modal-backlay ${modalOpen ? 'open' : ''}`}>
            <div className={`modals-content ${modalOpen ? 'open' : ''}`}>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button onClick={onClose} className="modal-close-button" aria-label="Close modal">
                        <X className="modal-close-icon" />
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
