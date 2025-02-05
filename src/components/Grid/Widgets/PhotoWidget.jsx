import React, { useState, useEffect } from 'react';
import './Widgets.css';

const PhotoWidget = ({ interval = 30000 }) => {
    const [imageUrls, setImageUrls] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        // Dynamically import images using Vite's import.meta.glob
        const loadImages = async () => {
            const images = import.meta.glob('/src/assets/images/PhotoWidget/*.{jpg,jpeg,png,gif}', { eager: true });
            // Get the actual URLs from the imported modules
            const urls = Object.values(images).map((module) => module.default);
            setImageUrls(urls);

            // Set a random initial index after loading images
            if (urls.length > 0) {
                setCurrentIndex(Math.floor(Math.random() * urls.length));
            }
        };
        loadImages();
    }, []);

    useEffect(() => {
        if (imageUrls.length > 0) {
            const timer = setInterval(() => {
                setFade(true);
                setTimeout(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
                    setFade(false);
                }, 1000);
            }, interval);
            return () => clearInterval(timer);
        }
    }, [imageUrls, interval]);

    if (imageUrls.length === 0) {
        return <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">Loading images...</div>;
    }

    return (
        <div className="PhotoWidgetContainer">
            <img src={imageUrls[currentIndex]} alt="Widget Photo" className={`PhotoWidgetImages ${fade ? 'hidden' : 'visible'}`} style={{ margin: 0, padding: 0 }} />
        </div>
    );
};

export default PhotoWidget;
