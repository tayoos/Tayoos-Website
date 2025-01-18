import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onStateChange, title, children }) => {
    const modalRef = useRef(null);
    const modalContentRef = useRef(null);
    const [closing, setClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(isOpen);

    // Update visibility when isOpen changes
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            onStateChange?.(true);
        }
    }, [isOpen, onStateChange]);

    const closeModal = () => {
        if (!isVisible || closing) return;
        setClosing(true);
        onStateChange?.(false);
        setTimeout(() => {
            setClosing(false);
            setIsVisible(false);
            onClose();
        }, 400);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalContentRef.current?.contains(event.target)) {
                onClose();
                //closeModal();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                //closeModal();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isVisible, closing]);

    if (!isVisible) return null;

    return (
        <div ref={modalRef} className="modal-overlay">
            <div ref={modalContentRef} className={`modal-content ${closing ? 'close' : ''}`}>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button type="button" onClick={closeModal} className="modal-close-button" aria-label="Close modal">
                        <X className="modal-close-icon" />
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
