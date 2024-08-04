import { useState } from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus, FaArrowsUpDown, FaArrowRightFromBracket } from "react-icons/fa6";
import { Navigate, Route, Routes } from 'react-router-dom';
import Workouts from './components/workouts/Workouts';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Titlebar from './components/titlebar/Titlebar';
import AddBtn from './components/shared/addBtn/AddBtn';
import NotFound from './components/notFound/NotFound';
import SignIn from './components/signin/SignIn';

function App() {

    return (
        <>
            <Toaster />

            <div id="app__wrapper" className="bg-purple-900 text-white w-full h-[calc(100vh-4rem)] flex flex-nowrap flex-col justify-start items-stretch rounded-xl relative">
                <Titlebar />

                <Routes>
                    <Route exact path="/" element={<Workouts />} />
                    <Route path="home" element={<Navigate to="/" />} />
                    <Route path="index" element={<Navigate to="/" />} />
                    <Route path="user/login" element={<Login />} />
                    <Route path="user/signup" element={<SignUp />} />
                    <Route path="user/signin" element={<SignIn />} />
                    


                    <Route path="*" element={<NotFound />} />
                </Routes>

                <AddBtn />
            </div>
        </>
    )
}

export default App;
