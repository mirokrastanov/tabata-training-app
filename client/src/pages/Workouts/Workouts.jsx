import React, { useEffect, useState, useRef } from 'react';
import './Workouts.css';
import { bgColors, genColor } from '../../utils/colors';
import WorkoutCard from '../../components/workout/workoutCard/WorkoutCard';
import AddBtn from '../../components/btns/addBtn/AddBtn';
import PageRingLoader from '../../components/loaders/final/pageRingLoader/PageRingLoader';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useWorkout } from '../../contexts/WorkoutContext';
import ActiveBtn from '../../components/btns/ActiveBtn';

function Workouts() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const {
        fetchAllMyWorkouts, myFetchedWorkouts,
    } = useWorkout();
    const [loading, setLoading] = useState(true);
    const [showEmpty, setShowEmpty] = useState(false);

    useEffect(() => {
        fetchAllMyWorkouts();
    }, []);

    useEffect(() => {
        if (myFetchedWorkouts == null) return;
        if (myFetchedWorkouts?.length > 0) return setLoading(false);
        setShowEmpty(true);
        setLoading(false);
    }, [myFetchedWorkouts])

    function handleReFetch(e) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            fetchAllMyWorkouts();
        }, 1000);
    }

    function beginWorkout(workoutID) {
        // start workout directly - load timers and render workout in progress view
    }

    function toggleCardMenu(workoutID) {
        // show overlay menu with item specific options
    }

    function cardClick(e, workoutID) {
        // console.log(workoutID);
        const t = e.target;
        let btn;
        switch (t.tagName) {
            case 'path': btn = t.parentElement.parentElement; break;
            case 'svg': btn = t.parentElement; break;
            default: btn = t; break;
        }
        const [isMenu, isPlay] = [btn.classList.contains('card__top-menu'), btn.classList.contains('card__top-play')];
        if (!isMenu && !isPlay) return navigate(`/workouts/details/${workoutID}`);

        if (isMenu) {
            console.log('menu');
            return; // return toggleCardMenu(workoutID);
        }
        console.log('play');
        // invoke beginWorkout(workoutID); 
    }


    return (<>{loading
        ? (<PageRingLoader />)
        : (showEmpty
            ? (<>
                <div id="workouts__wrapper" className="w-full bg-white p-4 pr-2 flex flex-wrap gap-4 h-[calc(100%-3.5rem)] overflow-y-scroll rounded-b-lg justify-center items-center">
                    <div>
                        <h2 className='text-black text-xl max-custom-mq-300:text-lg'>Use the <b className='bg-purple-600 text-white font-bold px-1.5 pb-0.5 rounded-full'>+</b> button to create a new one.</h2>

                        <hr className='mx-[20%] my-3' />

                        <h2 className='text-black text-xl max-custom-mq-300:text-lg'>Or attempt to fetch workouts again.</h2>
                        <div className='max-w-[280px] mx-auto mt-[10%]'>
                            <ActiveBtn text={'Fetch Workouts'} handler={handleReFetch} />
                        </div>
                    </div>

                </div>

                <AddBtn />
            </>)
            : (<>
                <div id="workouts__wrapper" className="w-full bg-white p-4 pr-2 flex flex-wrap gap-4 h-[calc(100%-3.5rem)] overflow-y-scroll rounded-b-lg max-custom-mq-300:p-1 max-custom-mq-300:pr-0">
                    {/* Render from DB and pass [data] through the loop */}
                    {[...myFetchedWorkouts, ...myFetchedWorkouts, ...myFetchedWorkouts].map((x, i) => (
                        <WorkoutCard color={genColor(i)} i={i} key={'card-' + i}
                            handler={cardClick} data={x} />
                    ))}
                    {/* {bgColors.map((x, i) => (
                        <WorkoutCard color={x} i={i} key={'card-' + i} handlers={[beginWorkout, toggleCardMenu, cardClick]} data={x} />
                    ))} */}
                </div>

                <AddBtn />
            </>)
        )}
    </>)
}

export default Workouts;