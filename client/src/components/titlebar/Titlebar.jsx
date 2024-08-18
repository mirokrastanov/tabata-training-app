import React, { useEffect, useState } from 'react';
import './Titlebar.css';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus, FaArrowsUpDown, FaArrowRightFromBracket, FaHouse, FaArrowRightToBracket, FaBars } from "react-icons/fa6";
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { usePage } from '../../contexts/PageContext';
import { useAuth } from '../../contexts/AuthContext';
import TitleDropdownMenu from '../titleDropdownMenu/TitleDropdownMenu';

function Titlebar() {
    const { location: { pathname: path }, pageParams: p } = usePage();
    const { user, checkUserStatus } = useAuth();

    useEffect(() => {
        // console.log('Path: ', path);
        // console.log(p);
        console.log(user);

    }, []);

    return (
        <div id="app__titlebar" className="w-full flex flex-row flex-nowrap items-center gap-x-1 h-14 text-xl">
            {/* LEFT BTN - HOME */}
            <Link className="w-14 h-full flex justify-center items-center hover:bg-purple-600 rounded-xl rounded-bl-none transition-all cursor-pointer hover:shadow-md active:bg-purple-500 text-white hover:text-white"
                to="/" >
                <FaHouse />
            </Link>

            <div className="titlebar-title h-full flex justify-center items-center px-2 w-[calc(100%-7.5rem)]">
                <h2 className="text-ellipsis line-clamp-1 font-bold text-3xl">
                    {p.title}
                </h2>
            </div>

            {/* RIGHT BTN - MENU */}
            <div className="w-14 h-full flex justify-center items-center hover:bg-purple-600 rounded-xl rounded-br-none transition-all cursor-pointer hover:shadow-md active:active:bg-purple-500 text-white hover:text-white relative">
                <TitleDropdownMenu />
            </div>
        </div>
    )
}

export default Titlebar;