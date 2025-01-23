// ModalContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCurrentModal, setIsCurrentModal] = useState(null); // Tracks the currently active modal
    const [modalTransition, setModalTransition] = useState(false); // Tracks the currently active modal

    const openModal = (content) => {
        // If the same modal is clicked, close it
        if (isModalOpen && content.type.name === isCurrentModal.type.name) {
            closeModal();
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
    };

    return <ModalContext.Provider value={{ openModal, closeModal, modalContent, isModalOpen, isCurrentModal }}>{children}</ModalContext.Provider>;
};
