import React from 'react';
import './ToggleBtn.css';

function ToggleBtn() {
    return (
        <label className="switch" htmlFor="checkbox">
            <input id="checkbox" name="checkbox" type="checkbox" className="checkbox" />
            <div className="slider"></div>
        </label>
    )
}

export default ToggleBtn;