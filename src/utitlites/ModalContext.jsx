// ModalContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCurrentModal, setIsCurrentModal] = useState(null); // Tracks the currently active modal
    const [modalTransition, setModalTransition] = useState(false); // Tracks the currently active modal
    const [modalActiveClose, setModalActiveClose] = useState(false); // Tracks the currently active modal
    const [modalTitle, setModalTitle] = useState(''); // Tracks the modal title

    const openModal = (content, title) => {
        setModalTitle(title); // Set the modal title dynamically
        // If the same modal is clicked, close it
        if (isModalOpen && content.type.name === isCurrentModal.type.name) {
            setModalActiveClose(true);
            setTimeout(() => {
                closeModal();
                setModalActiveClose(false);
            }, 200); // Match this with CSS animation duration
            return;
        }
        // If the alternative modal was clicked but modal open
        if (isModalOpen && content.type.name !== isCurrentModal.type.name) {
            setModalTransition(true);
            setTimeout(() => {
                setModalContent(content);
                setIsModalOpen(true);
                setIsCurrentModal(content);
                setModalTransition(false);
            }, 200); // Match this with CSS animation duration
            return;
        }
        // Open new modal
        setModalContent(content);
        setIsModalOpen(true);
        setIsCurrentModal(content);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
        setIsCurrentModal(null);
        setModalTitle(''); // Reset the modal title
    };

    return <ModalContext.Provider value={{ openModal, closeModal, modalContent, isModalOpen, isCurrentModal, modalTransition, modalActiveClose, modalTitle }}>{children}</ModalContext.Provider>;
};
