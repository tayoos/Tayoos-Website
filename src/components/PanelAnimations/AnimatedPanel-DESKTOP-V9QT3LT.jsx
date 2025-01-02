import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedPanel = ({ isOpen, onClose, title, children, maxHeight = 'calc(100vh - 200px)' }) => {
    const panelRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 z-30" />

                    <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
                        <motion.div ref={panelRef} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-hidden" style={{ maxHeight }}>
                            {/* Rest of the component remains the same */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="text-lg font-semibold">{title}</h2>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-4 overflow-y-auto">{children}</div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AnimatedPanel;
