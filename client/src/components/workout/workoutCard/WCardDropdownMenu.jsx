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
                <div className="tb_link absolute top-full right-0 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-10 mt-[1px] text-lg max-custom-mq-300:text-sm max-custom-mq-300:w-32" ref={dropdownRef}>
                    <ul className="flex flex-col text-center">
                        <WCardDropdownLink text="Preview" icon={<FaInfoCircle className='max-custom-mq-300:text-lg' />} />
                        <WCardDropdownLink text="Edit" icon={<FaEdit className='max-custom-mq-300:text-lg' />} />
                        <WCardDropdownLink text="Delete" icon={<RiDeleteBin2Fill className='max-custom-mq-300:text-lg' />} />
                        <WCardDropdownLink text="Close" icon={<RiCloseCircleFill className='max-custom-mq-300:text-lg' />} />
                    </ul>
                </div>
            )}
        </div>
    );
}

export default WCardDropdownMenu;
