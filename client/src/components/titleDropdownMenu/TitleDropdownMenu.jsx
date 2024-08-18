import React, { useEffect, useState } from 'react';
import './TitleDropdownMenu.css';
import { FaArrowRightFromBracket, FaArrowRightToBracket, FaBars, FaBarsStaggered, FaCircleUser, FaGear, FaUser, FaUserPlus } from 'react-icons/fa6';
import TitleDropdownLink from '../shared/titleDropdownLink/TitleDropdownLink';
import { usePage } from '../../contexts/PageContext';

const TitleDropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { location } = usePage();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <div className="w-14 h-full rounded-xl rounded-br-none transition-all active:rounded-br-xl">
            <div onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-full flex justify-center items-center hover:bg-purple-600 rounded-xl rounded-br-none transition-all cursor-pointer hover:shadow-md text-white hover:text-white active:bg-purple-500">
                {isOpen
                    ? (<FaBarsStaggered />)
                    : (<FaBars />)}
            </div>

            {isOpen && (
                <div className="absolute top-full right-0 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-10">
                    <ul className="flex flex-col text-center">
                        <TitleDropdownLink to="/settings" text="Settings" icon={<FaGear />} />
                        <TitleDropdownLink to="/user/signin" text="Sign In" icon={<FaArrowRightToBracket />} />
                        <TitleDropdownLink to="/user/signup" text="Sign Up" icon={<FaUserPlus />} />
                        {/* <TitleDropdownLink to="/user/profile" text="Profile" icon={<FaCircleUser />} /> */}
                        {/* <TitleDropdownLink to="/user/logout" text="Sign Out" icon={<FaArrowRightFromBracket />} /> */}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TitleDropdownMenu;
