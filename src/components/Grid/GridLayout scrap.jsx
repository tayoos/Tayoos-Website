import React from 'react';
import './GridLayout.css';

function GridLayout({ items }) {
    return (
        <div className="grid-container">
            {items.map((item, index) => (
                <div key={index} className="grid-item">
                    {item}
                </div>
            ))}
        </div>
    );
}

export default GridLayout;
