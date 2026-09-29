// ModalContext.jsx
import React, { createContext, useState, useRef, useCallback } from 'react';
import { captureAnchor } from './modalMinimize.js';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCurrentModal, setIsCurrentModal] = useState(null);
    const [modalTransition, setModalTransition] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [currentModalSize, setCurrentModalSize] = useState('Normal');
    const [ListView, setListView] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalAnchor, setModalAnchor] = useState(null);
    const [closeAnchor, setCloseAnchor] = useState(null);
    const [closeSignal, setCloseSignal] = useState(0);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const cancelCloseRef = useRef(() => {});

    const registerCancelClose = useCallback((fn) => {
        cancelCloseRef.current = fn ?? (() => {});
    }, []);

    const cancelClose = useCallback(() => {
        cancelCloseRef.current();
        setIsModalClosing(false);
        setCloseSignal(0);
    }, []);

    const getModalTypeName = (content) => content?.type?.name ?? null;

    const openModal = (content, title, modalSize = 'Normal', isModalBackAction = false, anchorEl = null) => {
        const anchor = captureAnchor(anchorEl);
        const nextType = getModalTypeName(content);
        const currentType = getModalTypeName(isCurrentModal);
        const sameType = isModalOpen && nextType && nextType === currentType;

        setModalTitle(title);
        setCurrentModalSize(modalSize);

        if (isModalClosing) {
            cancelClose();
            if (sameType) {
                if (anchor) setModalAnchor(anchor);
                return;
            }
        }

        if (isModalOpen && sameType && !isModalBackAction) {
            setCloseAnchor(anchor ?? modalAnchor);
            setCloseSignal((n) => n + 1);
            return;
        }

        if (isModalOpen && nextType !== currentType) {
            setModalTransition(true);
            setCloseSignal(0);
            setModalContent(content);
            setIsModalOpen(true);
            setIsCurrentModal(content);
            if (anchor) setModalAnchor(anchor);
            setModalTransition(false);
            return;
        }

        if (anchor) setModalAnchor(anchor);
        setCloseSignal(0);
        setModalContent(content);
        setIsModalOpen(true);
        setIsCurrentModal(content);
    };

    const requestClose = (anchorEl = null) => {
        const anchor = captureAnchor(anchorEl);
        setCloseAnchor(anchor ?? modalAnchor);
        setCloseSignal((n) => n + 1);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
        setIsCurrentModal(null);
        setModalTitle('');
        setCloseAnchor(null);
        setCloseSignal(0);
        setIsModalClosing(false);
    };

    const triggerListView = () => {
        setListView(true);
    };

    const resetListView = () => {
        setListView(false);
    };

    const toggleDarkMode = (mode) => {
        setDarkMode((current) => mode !== undefined ? mode : !current);
    };

    return (
        <ModalContext.Provider
            value={{
                openModal,
                closeModal,
                requestClose,
                cancelClose,
                registerCancelClose,
                modalContent,
                isModalOpen,
                isModalClosing,
                setIsModalClosing,
                isCurrentModal,
                modalTransition,
                modalTitle,
                darkMode,
                toggleDarkMode,
                triggerListView,
                ListView,
                resetListView,
                currentModalSize,
                menuOpen,
                setMenuOpen,
                modalAnchor,
                closeAnchor,
                closeSignal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
