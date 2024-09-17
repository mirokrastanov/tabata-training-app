import React from 'react';
import DotSpinner from '../../base/dotSpinner/DotSpinner';

function BackdropLoader({ dark = false }) {
    return (<>
        <div className="backdrop absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20"></div>
        <div className="on-top absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md z-30 flex justify-center items-center">
            <DotSpinner dark={dark} />
        </div>
    </>)
}

export default BackdropLoader;