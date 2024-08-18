import React, { useEffect } from 'react';
import './AddBtn.css';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus, FaArrowsUpDown, FaArrowRightFromBracket } from "react-icons/fa6";
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

function AddBtn() {
    const location = useLocation();
    const path = location.pathname;


    // TODO: Render conditionally only on certain pages

    useEffect(() => {
        // console.log(location);

    }, []);

    return (
        <div className="app__bottom-overlay w-full absolute bottom-0 z-10 bg-black/50">
            <div className="overlay-btn w-full">
                <div id="o-tip-anchor" className="bg-purple-800 hover:bg-purple-600 text-white w-16 h-16 absolute bottom-8 right-8 flex justify-center items-center text-2xl cursor-pointer transition-all active:scale-90">
                    <FaPlus />
                    {/* <div id="o-tip">Create</div> */}
                </div>
            </div>
        </div>
    )
}

export default AddBtn;