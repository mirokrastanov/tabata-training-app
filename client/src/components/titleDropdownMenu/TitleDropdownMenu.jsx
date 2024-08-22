import React, { useEffect, useRef, useState } from 'react';
import './TitleDropdownMenu.css';
import { FaArrowRightFromBracket, FaArrowRightToBracket, FaBars, FaBarsStaggered, FaCircleUser, FaDumbbell, FaGear, FaUser, FaUserPlus } from 'react-icons/fa6';
import TitleDropdownLink from '../shared/titleDropdownLink/TitleDropdownLink';
import { usePage } from '../../contexts/PageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TitleDropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { location } = usePage();
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
        await logoutUser();
        navigate('/');
    };

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <div className="w-14 h-full rounded-xl rounded-br-none transition-all active:rounded-br-xl">
            <div onClick={() => setIsOpen(!isOpen)} ref={buttonRef}
                className="w-14 h-full flex justify-center items-center hover:bg-purple-600 rounded-xl rounded-br-none transition-all cursor-pointer hover:shadow-md text-white hover:text-white active:bg-purple-500">
                {isOpen
                    ? (<FaBarsStaggered />)
                    : (<FaBars />)}
            </div>

            {isOpen && (
                <div className="absolute top-full right-0 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-10" ref={dropdownRef}>
                    <ul className="flex flex-col text-center">
                        <TitleDropdownLink to="/settings" text="Settings" icon={<FaGear />} />
                        {user
                            ? (<>
                                <TitleDropdownLink to="/workouts" text="Workouts" icon={<FaDumbbell />} />
                                <TitleDropdownLink to="/user/profile" text="Profile" icon={<FaCircleUser />} />
                                <TitleDropdownLink to="/user/logout" text="Sign Out" icon={<FaArrowRightFromBracket />}
                                    signOut={handleLogout} />

                            </>)
                            : (<>
                                <TitleDropdownLink to="/user/signin" text="Sign In" icon={<FaArrowRightToBracket />} />
                                <TitleDropdownLink to="/user/signup" text="Sign Up" icon={<FaUserPlus />} />

                            </>)}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TitleDropdownMenu;
