import React, { useEffect, useRef, useState } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { RiCloseCircleFill, RiDeleteBin2Fill } from "react-icons/ri";
import { usePage } from '../../../contexts/PageContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import WCardDropdownLink from './WCardDropdownLink';

function WCardDropdownMenu({ isOpen, setIsOpen }) {
    const { location } = usePage();
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


    useEffect(() => {
        setIsOpen(false);
    }, [location]);


    return (
        <div onClick={() => setIsOpen(!isOpen)} ref={buttonRef}
            className={`card__top-menu card__top-btn h-full w-10 flex justify-center items-center text-xl hover:bg-slate-50/25 rounded-md hover:shadow-md ${isOpen ? '' : 'active:scale-90'} relative`}>
            <FaEllipsisVertical />

            {isOpen && (
                <div className="tb_link absolute top-full right-0 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-10 mt-[1px]" ref={dropdownRef}>
                    <ul className="flex flex-col text-center">
                        <WCardDropdownLink text="Details" icon={<FaInfoCircle />} />
                        {/* 
                        -- Title, created, updates
                        -- All workout intervals
                        */}
                        <WCardDropdownLink text="Edit" icon={<FaEdit />} />
                        <WCardDropdownLink text="Delete" icon={<RiDeleteBin2Fill />} />
                        {/* ADD a confirm btn for before deletion */}
                        <WCardDropdownLink text="Close" icon={<RiCloseCircleFill />} />
                    </ul>
                </div>
            )}
        </div>
    );
}

export default WCardDropdownMenu;
