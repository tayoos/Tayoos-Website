import React, { useState, useEffect } from 'react';
import './Widgets.css';

const TextCardWidget = ({ title = 'Title', body = 'Content goes here', isDarkMode }) => {
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [displayedBody, setDisplayedBody] = useState('');
    const [titleDone, setTitleDone] = useState(false);

    useEffect(() => {
        let titleIndex = 0;
        const titleInterval = setInterval(() => {
            if (titleIndex <= title.length) {
                setDisplayedTitle(title.slice(0, titleIndex));
                titleIndex++;
            } else {
                clearInterval(titleInterval);
                setTitleDone(true);
            }
        }, 100);
        return () => clearInterval(titleInterval);
    }, [title]);

    useEffect(() => {
        if (titleDone) {
            let bodyIndex = 0;
            const bodyInterval = setInterval(() => {
                if (bodyIndex <= body.length) {
                    setDisplayedBody(body.slice(0, bodyIndex));
                    bodyIndex++;
                } else {
                    clearInterval(bodyInterval);
                }
            }, 50);
            return () => clearInterval(bodyInterval);
        }
    }, [body, titleDone]);

    return (
        <div className={`text-card ${isDarkMode ? 'dark' : ''}`}>
            <h3 className="text-card-title">{displayedTitle}</h3>

            <p className="text-card-content">{displayedBody}</p>
        </div>
    );
};

export default TextCardWidget;
