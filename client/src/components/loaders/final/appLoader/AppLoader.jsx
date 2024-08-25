import React from 'react';
import './AppLoader.css';

function AppLoader() {
    return (
        <div id="app-loader-ctr" className="flex justify-center items-center h-[calc(100vh-4rem)] w-full">
            <div className="app-loader"></div>
        </div>
    )
}

export default AppLoader;