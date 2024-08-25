import './AddBtn.css';
import React, { useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { usePage } from '../../contexts/PageContext';

function AddBtn() {
    const { location } = usePage();

    // TODO: Alter functionality based on location
    // From /workouts to /workouts/create
    // Within the create workout component - add/generate a new component - open an overlay menu with
    // a form with inputs - type: workout/rest/etc , duration: 30, and so on
    // upon confirming by clicking the submit button - generate and add a new html element underneat the current ones
    // part of the workout already -- check examples on mobile res for inspiration
    // be able to remove added field -- also be able to move/drag and replace ones -- put in between already present
    // elements

    // TODO: GENERATE A TOAST FOR EACH SCENARIO - on element creation, on workout creation, etc...


    useEffect(() => {
        console.log(location);

    }, []);

    return (
        <Link to={'/'} className="app__bottom-overlay w-full absolute bottom-0 z-10 bg-black/50">
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