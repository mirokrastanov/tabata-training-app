import { useState } from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus, FaArrowsUpDown, FaArrowRightFromBracket } from "react-icons/fa6";
import { Navigate, Route, Routes } from 'react-router-dom';
import Workouts from './components/workouts/Workouts';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {

    return (
        <>
            <Toaster />

            <div id="app__wrapper" className="bg-purple-900 text-white w-full h-[calc(100vh-4rem)] flex flex-nowrap flex-col justify-start items-stretch rounded-xl relative">

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

                <Routes>
                    <Route exact path="/" element={<Workouts />} />
                    <Route path="home" element={<Navigate to="/" />} />
                    <Route path="index" element={<Navigate to="/" />} />

                    <Route path="user/login" element={<Login />} />
                    <Route path="user/signup" element={<Register />} />

                    {/* ADD More routes and finish with a wildcard route */}
                </Routes>

                {/* TODO --> Render conditionally only on certain pages */}
                <div className="app__bottom-overlay w-full absolute bottom-0 z-10 bg-black/50">
                    <div className="overlay-btn w-full">
                        <div className="bg-purple-800 hover:bg-purple-600 text-white w-16 h-16 absolute bottom-8 right-8 flex justify-center items-center text-2xl cursor-pointer transition-all active:scale-90"><FaPlus /></div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default App;
