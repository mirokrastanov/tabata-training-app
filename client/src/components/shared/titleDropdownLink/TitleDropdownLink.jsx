import React from 'react';
import './TitleDropdownLink.css';
import { Link } from 'react-router-dom';

function TitleDropdownLink({ text, to, icon }) {



    return (
        <Link to={to}
            className="px-4 py-2 hover:bg-purple-200 active:bg-purple-400 cursor-pointer flex flex-nowrap gap-4 items-center">
            {icon}
            {text}
        </Link>
    )
}

export default TitleDropdownLink;