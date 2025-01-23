import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './home/Home.jsx';

import './App.css';

import { ModalProvider } from '././utitlites/ModalContext.jsx';
import Modal from './components/Modals/Modal.jsx';

//import { ModalProvider } from './utils/modalContext';
//import Modal from './components/modal/Modal';

function App() {
    return (
        <ModalProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>

            <Modal />
        </ModalProvider>
    );
}

export default App;
