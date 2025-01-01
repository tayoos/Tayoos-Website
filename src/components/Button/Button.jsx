import React from 'react';
import './Button.css'; // Optional: For styling

function Button({ label, onClick, style, className, disabled }) {
    return (
        <button
            className={`button ${className}`} // For additional styling or class names
            onClick={onClick}
            style={style} // Inline styling (optional)
            disabled={disabled} // Disable button functionality
        >
            {label}
        </button>
    );
}

export default Button;
