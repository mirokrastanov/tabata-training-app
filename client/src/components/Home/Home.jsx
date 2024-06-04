import React from 'react';
import './Home.css';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus, FaArrowsUpDown } from "react-icons/fa6";
import { bgColors } from '../../utils/colors';
import WorkoutCard from '../workoutCard/WorkoutCard';


function Home() {

    return (
        <div id="app__wrapper" className="bg-purple-900 text-white min-w-full max-w-[23rem] max-h-[46rem] flex flex-nowrap flex-col justify-start items-stretch rounded-xl relative">
            {/* Change with views */}
            <div id="app__titlebar" className="w-full flex flex-row flex-nowrap items-center gap-x-1 h-14 text-xl">
                <div className="w-14 h-full flex justify-center items-center hover:bg-purple-600 rounded-xl rounded-bl-none transition-all cursor-pointer hover:shadow-md active:scale-90 active:rounded-bl-xl"><FaArrowLeft /></div>
                <div className="titlebar-title h-full flex justify-center items-center px-2 w-[calc(100%-7.5rem)]">
                    <h2 className="text-ellipsis line-clamp-1 font-bold">Workouts: 2</h2>
                </div>
                <div className="w-14 h-full flex justify-center items-center hover:bg-purple-600 rounded-xl rounded-br-none transition-all cursor-pointer hover:shadow-md active:scale-90 active:rounded-br-xl"><FaGear /></div>
            </div>

            <div id="workouts__wrapper" className="w-full bg-white p-3 pt-2 pr-1 flex flex-col gap-2 h-[calc(100%-3.5rem)] overflow-y-scroll rounded-b-lg"> 
                {/* hide-scrollbar --> add above if needed */}
                {/* When DB is added - map from DB and figure out how to add color  
                so contrast between sequential items is kept */}
                {bgColors.map((x, i) => (
                    <WorkoutCard color={x} i={i} key={'card-' + i} />
                ))}
            </div>

            <div className="app__bottom-overlay w-full absolute bottom-0 z-10 bg-black/50">
                {/* <div className="overlay-info">
                    <p>Tap triangle to start</p>
                    <p>Three dots to edit or delete</p>
                    <p>Tap and hold to reorder</p>
                </div> */}
                <div className="overlay-btn w-full">
                    <div className="bg-purple-900 hover:bg-purple-600 text-white w-14 h-14 absolute bottom-5 right-5 flex justify-center items-center text-xl cursor-pointer transition-all rounded-full hover:rounded-2xl active:scale-90"><FaPlus /></div>
                </div>
            </div>

        </div>
    )
}

export default Home;