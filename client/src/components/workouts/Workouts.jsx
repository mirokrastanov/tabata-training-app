import React from 'react';
import './Workouts.css';
import { bgColors } from '../../utils/colors';
import WorkoutCard from '../workoutCard/WorkoutCard';
import PageLoader from '../shared/pageLoader/PageLoader';


function Workouts() {
    function playClick(e) { 
        // start workout directly - load timers and render workout in progress view
    }
    function dotsClick(e) {
        // show overlay menu with item specific options
     }
    function cardClick(e) {
        // open workout showcase view
    }


    return (
        <div id="workouts__wrapper" className="w-full bg-white p-4 pr-1 flex flex-wrap gap-4 h-[calc(100%-3.5rem)] overflow-y-scroll rounded-b-lg">
            {/* <PageLoader /> */}
            
            {/* Render from DB and pass [data] through the loop */}
            {bgColors.map((x, i) => (
                <WorkoutCard color={x} i={i} key={'card-' + i} handlers={[playClick, dotsClick, cardClick]} data={x} />
            ))}
        </div>
    )
}

export default Workouts;