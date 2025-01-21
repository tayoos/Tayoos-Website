import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, title }) => {
    const modalRef = useRef(null);
    const modalContentRef = useRef(null);
    if (!isOpen) return null;

    return (
        <div ref={modalRef} className="modal-overlay">
            <div ref={modalContentRef} className={`modal-content`}>
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
