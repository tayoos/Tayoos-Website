import React from 'react';
import './Taskbar.css';

function Taskbar({ items }) {
    return (
        <div className="taskbar-container">
            {items.map((item, index) => (
                <div key={index} className="taskbar-item">
                    {item}
                </div>
            ))}
        </div>
    );
}

export default Taskbar;
