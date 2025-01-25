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
    const [darkMode, setDarkMode] = useState(false); // Tracks darkMode state
    const [currentModalSize, setCurrentModalSize] = useState('Normal'); // Track the current modal size
    const [ListView, setListView] = useState(true); // track whether back to list should be triggered

    const openModal = (content, title, modalSize = 'Normal', isModalBackAction = false) => {
        console.log('content', content);
        console.log('triggerListView', ListView);
        setModalTitle(title);
        setCurrentModalSize(modalSize); // Store the current modal size
        // If the same modal type is clicked, close it
        if (isModalOpen && content.type.name === isCurrentModal?.type?.name && !isModalBackAction) {
            setModalActiveClose(true);
            setTimeout(() => {
                closeModal();
                setModalActiveClose(false);
            }, 200);
            return;
        }

        // If a different modal type is open
        if (isModalOpen && content.type.name !== isCurrentModal?.type?.name) {
            setModalTransition(true);

            setTimeout(() => {
                setModalContent(content);
                setIsModalOpen(true);
                setIsCurrentModal(content);
                setModalTransition(false);
            }, 100);
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

    //trigger back to list
    const triggerListView = () => {
        console.log('triggerListView called', ListView);
        setListView(true);
    };

    //  reset back to list trigger
    const resetListView = () => {
        console.log('resetListView called', ListView);
        setListView(false);
    };

    // Add a method to update darkMode
    const toggleDarkMode = (mode) => {
        setDarkMode(mode !== undefined ? mode : !darkMode);
    };

    return <ModalContext.Provider value={{ openModal, closeModal, modalContent, isModalOpen, isCurrentModal, modalTransition, modalActiveClose, modalTitle, darkMode, toggleDarkMode, triggerListView, ListView, resetListView, currentModalSize }}>{children}</ModalContext.Provider>;
};
