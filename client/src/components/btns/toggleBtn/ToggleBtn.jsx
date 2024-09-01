import React from 'react';
import './ToggleBtn.css';

function ToggleBtn() {
    return (
        <label className="switch">
            <input type="checkbox" className="checkbox" />
            <div className="slider"></div>
        </label>
    )
}

export default ToggleBtn;