import React, { useEffect, useState } from 'react';
import './Workouts.css';
import { bgColors } from '../../utils/colors';
import WorkoutCard from '../../components/workout/workoutCard/WorkoutCard';
import AddBtn from '../../components/btns/addBtn/AddBtn';
import PageRingLoader from '../../components/loaders/final/pageRingLoader/PageRingLoader';


function Workouts() {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        // Fetch workouts from DB
        // setWorkouts(workoutsData)
        setTimeout(() => {
            setWorkouts(true);
        }, 1000);
    }, []);

    function playClick(e) {
        // start workout directly - load timers and render workout in progress view
    }
    function dotsClick(e) {
        // show overlay menu with item specific options
    }
    function cardClick(e) {
        // open workout showcase view
    }


    return (<>{!workouts
        ? (<PageRingLoader />)
        : (<>
            <div id="workouts__wrapper" className="w-full bg-white p-4 pr-2 flex flex-wrap gap-4 h-[calc(100%-3.5rem)] overflow-y-scroll rounded-b-lg">
                {/* Render from DB and pass [data] through the loop */}
                {bgColors.map((x, i) => (
                    <WorkoutCard color={x} i={i} key={'card-' + i} handlers={[playClick, dotsClick, cardClick]} data={x} />
                ))}
            </div>

            <AddBtn />
        </>)}
    </>)
}

export default Workouts;