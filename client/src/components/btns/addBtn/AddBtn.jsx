import './AddBtn.css';
import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { usePage } from '../../../contexts/PageContext';

function AddBtn() {
    const { location } = usePage();
    const [targetURL, setTargetURL] = useState('');

    useEffect(() => {
        if (location.pathname == '/workouts') setTargetURL('/workouts/create');
    }, []);

    return (
        <Link to={targetURL} className="app__bottom-overlay w-full absolute bottom-0 z-10 bg-black/50">
            <div className="overlay-btn w-full">
                <div id="o-tip-anchor" className="bg-purple-800 hover:bg-purple-600 text-white w-16 h-16 absolute bottom-8 right-8 flex justify-center items-center text-2xl cursor-pointer transition-all active:scale-90">
                    <FaPlus />
                    {/* <div id="o-tip">Create</div> */}
                </div>
            </div>
        </Link>
    )
}

export default AddBtn;