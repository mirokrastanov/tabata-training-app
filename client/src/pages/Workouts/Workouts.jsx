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
import TextAndBtnOverlay from '../../components/overlays/textAndBtnOverlay/TextAndBtnOverlay';
import { getDate, getTime } from '../../utils/dateConversions';

function Workouts() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const {
        fetchAllMyWorkouts, myFetchedWorkouts,
    } = useWorkout();
    const [loading, setLoading] = useState(true);
    const [showEmpty, setShowEmpty] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [preview, setPreview] = useState(null);

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
        // TODO: start workout directly - load timers and render workout in progress view
    }

    function closePreview(e) {
        e.preventDefault();
        setBackdrop(false);
        setPreview(null);
    }

    function onPreview(workoutID) {
        const thisWorkout = myFetchedWorkouts.find(x => String(x._id) === String(workoutID));

        const finalHTML = <>{thisWorkout.exercises.map((x, i) => (
            <section key={`preview--${i}-ex`} className='w-full text-left'>
                <p>{i + 1}. {x.exercise}</p>
            </section>
        ))}
            <p className='text-center mt-4 text-sm font-bold'>Created:
                {` ${getDate(thisWorkout.createdAt)}, ${getTime(thisWorkout.createdAt)} `}
            </p>
            <p className='text-center mb-2 text-sm font-bold'>Updated:
                {` ${getDate(thisWorkout.updatedAt)}, ${getTime(thisWorkout.updatedAt)} `}
            </p>
        </>;

        setPreview({ text: finalHTML, title: thisWorkout.workoutName });
        setBackdrop(true);
    }

    function onEdit(workoutID) {
        console.log('Navigating to Edit Workout...', workoutID.substring(20));
        return navigate(`/workouts/edit/${workoutID}`);
    }

    function onDelete(workoutID) {
        // ADD a confirm btn for before deletion
    }

    function onBodyClick(workoutID) {
        console.log('Navigating to View Workout...', workoutID.substring(20));
        // return navigate(`/workouts/details/${workoutID}`);
    }

    function handleBackdropClick(e) {
        e.preventDefault();
        console.log('backdrop main clicked');

    }

    // Handles all card buttons
    function cardClicks(e, workoutID) {
        const t = e.target;
        let btn;
        switch (t.tagName) {
            case 'path': btn = t.parentElement.parentElement; break;
            case 'svg': btn = t.parentElement; break;
            default: btn = t; break;
        }
        const [isMenu, isPlay] = [btn.classList.contains('card__top-menu'), btn.classList.contains('card__top-play')];

        // Card Body & Dropdown
        if (!isMenu && !isPlay) {
            const dataText = btn.dataset.text;
            switch (dataText) {
                case 'Preview': return onPreview(workoutID);
                case 'Edit': return onEdit(workoutID);
                case 'Delete': return onDelete(workoutID);
                case 'Close': return; // Handled inside DropdownMenu
                default: return onBodyClick(workoutID);
            }
        }

        if (isMenu) return; // Handled inside WorkoutCard

        // Play
        beginWorkout(workoutID);
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
                {backdrop && <TextAndBtnOverlay
                    btnText={'Detailed View'} handleMainBtn={handleBackdropClick}
                    text={preview.text} title={preview.title} handleClose={closePreview}
                />}
                <div id="workouts__wrapper" className="w-full bg-white p-4 pr-2 flex flex-wrap content-start gap-4 h-[calc(100%-3.5rem)] overflow-y-scroll rounded-b-lg max-custom-mq-300:p-1 max-custom-mq-300:pr-0">

                    {/* Render from DB and pass [data] through the loop */}
                    {myFetchedWorkouts.map((x, i) => (
                        <WorkoutCard color={genColor(i)} i={i} key={'card-' + i}
                            handler={cardClicks} data={x} />
                    ))}
                </div>

                <AddBtn />
            </>)
        )}
    </>)
}

export default Workouts;