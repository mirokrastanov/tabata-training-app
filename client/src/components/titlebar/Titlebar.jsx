import React, { useEffect, useState } from 'react';
import './Titlebar.css';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus, FaArrowsUpDown, FaArrowRightFromBracket } from "react-icons/fa6";
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

function Titlebar() {
    const location = useLocation();
    
    // TODO: Different states for different paths
    const path = location.pathname;

    // TODO: Store workouts in a state and access them here + do real time updates when it changes


    useEffect(() => {
        console.log(location);

    }, []);

    return (
        <div id="app__titlebar" className="w-full flex flex-row flex-nowrap items-center gap-x-1 h-14 text-xl">
            {/* TODO --> Change content inside based on page requirements */}
            <div className="w-14 h-full flex justify-center items-center hover:bg-purple-600 rounded-xl rounded-bl-none transition-all cursor-pointer hover:shadow-md active:scale-90 active:rounded-bl-xl">

                {/* Conditional rendering based on param passed */}
                <FaArrowRightFromBracket className="rotate-180" />
                {/* <FaArrowLeft /> */}
            </div>
            <div className="titlebar-title h-full flex justify-center items-center px-2 w-[calc(100%-7.5rem)]">
                <h2 className="text-ellipsis line-clamp-1 font-bold">Workouts: 2</h2>
            </div>
            <div className="w-14 h-full flex justify-center items-center hover:bg-purple-600 rounded-xl rounded-br-none transition-all cursor-pointer hover:shadow-md active:scale-90 active:rounded-br-xl"><FaGear /></div>
        </div>
    )
}

export default Titlebar;