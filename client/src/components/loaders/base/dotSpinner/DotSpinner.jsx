import React from 'react';
import './DotSpinner.css';

function DotSpinner({ dark = false }) {
    const styles = dark ? 'dot-spinner dot-spinner-dark' : 'dot-spinner';
    return (
        <span className={`${styles} `}></span>
    )
}

export default DotSpinner;