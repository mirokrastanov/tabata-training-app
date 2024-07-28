import './NotFound.css';
import React, { useEffect, useState } from 'react';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus, FaArrowsUpDown, FaArrowRightFromBracket } from "react-icons/fa6";
import { Navigate, Route, Routes, useLocation, Link } from 'react-router-dom';

function NotFound() {
    return (
        <div id="not-found-ctr" className="flex flex-col items-center justify-center h-screen text-center text-white bg-slate-600 rounded-b-lg">
            <h1 className="text-8xl font-bold">404</h1>
            <h2 className="text-2xl mt-4">Page Not Found</h2>
            <p className="text-lg mt-2 px-4">Sorry, the page you are looking for does not exist.</p>

            <Link to="/" className="b-rad-btn mt-6 px-12 bg-purple-800 hover:bg-purple-600 text-white w-16 h-16 flex justify-center items-center text-2xl cursor-pointer transition-all active:scale-90">
                Home
            </Link>
        </div>
    )
}

export default NotFound;