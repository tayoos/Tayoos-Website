// ModalContext.jsx
import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children, currentModal }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCurrentModal, setIsCurrentModal] = useState(null); // Tracks the currently active modal

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
        setCurrentModal(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsCurrentModal(false);
    };

    return <ModalContext.Provider value={{ openModal, closeModal, modalContent, isModalOpen, isCurrentModal }}>{children}</ModalContext.Provider>;
};
