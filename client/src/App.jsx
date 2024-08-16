import { useState } from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus, FaArrowsUpDown, FaArrowRightFromBracket } from "react-icons/fa6";
import { Navigate, Route, Routes } from 'react-router-dom';
import Workouts from './components/workouts/Workouts';
import SignUp from './components/signup/SignUp';
import Titlebar from './components/titlebar/Titlebar';
import AddBtn from './components/shared/addBtn/AddBtn';
import NotFound from './components/notFound/NotFound';
import SignIn from './components/signin/SignIn';
import Settings from './components/settings/Settings';
import UserRoutes from './routeGuards/UserRoutes';
import GuestRoutes from './routeGuards/GuestRoutes';
import Home from './components/home/Home';

function App() {

    return (
        <>
            <Toaster />

            <div id="app__wrapper" className="bg-purple-900 text-white w-full h-[calc(100vh-4rem)] flex flex-nowrap flex-col justify-start items-stretch rounded-xl relative">
                <Titlebar />
                {/* TODO (in title bar) */}
                {/* ==> Create CONTEXT for current view. Update the below based on that: */}
                {/* ==> Update title based on view. Accept param for home view. */}
                {/* ==> Update signin/logout btn based on view */}
                {/* ==> Update settings/back btn based on view */}

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="home" element={<Navigate to="/" />} />
                    <Route path="index" element={<Navigate to="/" />} />
                    <Route path="settings" element={<Settings />} />

                    <Route element={<UserRoutes />}>
                        <Route path="workouts" element={<Workouts />} />
                    </Route>

                    <Route element={<GuestRoutes />}>
                        <Route path="user/signup" element={<SignUp />} />
                        <Route path="user/signin" element={<SignIn />} />
                    </Route>


                    {/* TODO */}
                    {/* Create Workout */}
                    {/* Edit Workout */}
                    {/* View Workout */}

                    {/* View User Profile */}

                    {/* Workout in progress | Action View | Timers | Main */}



                    <Route path="*" element={<NotFound />} />
                </Routes>

                <AddBtn />
            </div>
        </>
    )
}

export default App;
