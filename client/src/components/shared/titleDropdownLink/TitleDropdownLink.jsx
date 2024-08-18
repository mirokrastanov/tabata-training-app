import React from 'react';
import './TitleDropdownLink.css';
import { Link } from 'react-router-dom';

function TitleDropdownLink({ text, to, icon }) {



    return (
        <Link to={to}
            className="px-4 py-3 hover:bg-purple-200 active:bg-purple-400 cursor-pointer flex flex-nowrap gap-4 items-center even:bg-gray-100">
            {icon}
            {text}
        </Link>
    )
}

export default TitleDropdownLink;