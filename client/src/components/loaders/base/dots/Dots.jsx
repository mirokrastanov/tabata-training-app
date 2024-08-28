import React from 'react';
import './Dots.css';

function Dots({ color }) {
    return (
        <span className={`horizontal-loader ${color}`}></span>
    )
}

export default Dots;