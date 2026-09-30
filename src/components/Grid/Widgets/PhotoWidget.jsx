import React, { useState, useEffect } from 'react';
import './Widgets.css';

// Eager URL-only glob: emits each image as an asset and inlines its URL string
// into the bundle. Cheap (just strings), and the browser lazy-loads the image
// bytes only when <img src> is set — no per-image JS module fetch.
const imageModules = import.meta.glob('/src/assets/images/PhotoWidget/*.{jpg,jpeg,png,gif}', {
    eager: true,
    query: '?url',
    import: 'default',
});
const PHOTO_URLS = Object.values(imageModules);

const PhotoWidget = ({ interval = 30000 }) => {
    const [imageUrls] = useState(PHOTO_URLS);
    const [currentIndex, setCurrentIndex] = useState(() =>
        PHOTO_URLS.length > 0 ? Math.floor(Math.random() * PHOTO_URLS.length) : 0
    );
    const [fade, setFade] = useState(false);

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
