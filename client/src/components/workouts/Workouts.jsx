import React from 'react';
import './Workouts.css';
import { bgColors } from '../../utils/colors';
import WorkoutCard from '../workoutCard/WorkoutCard';
import PageLoader from '../shared/PageLoader/PageLoader';


function Home() {



    return (
        <div id="workouts__wrapper" className="w-full bg-white p-3 pt-2 pr-1 flex flex-col gap-2 h-[calc(100%-3.5rem)] overflow-y-scroll rounded-b-lg">
            {/* When DB is added - map from DB and figure out how to add color  
                so contrast between sequential items is kept */}
            {/* {bgColors.map((x, i) => (
                <WorkoutCard color={x} i={i} key={'card-' + i} />
            ))} */}
            <PageLoader />
        </div>
    )
}

export default Home;