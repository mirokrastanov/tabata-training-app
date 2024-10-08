import React, { useEffect, useState, useRef } from 'react';
import './ViewWorkout.css';
import { useNavigate, useParams } from 'react-router-dom';
import WorkoutHelp from '../../components/workout/workoutInterval/WorkoutHelp/WorkoutHelp';
import WorkoutInterval from '../../components/workout/workoutInterval/WorkoutInterval';
import ServiceInterval from '../../components/workout/workoutInterval/ServiceInterval';
import BackdropLoader from '../../components/loaders/final/backdropLoader/BackdropLoader';
import ConfirmBtn from '../../components/btns/ConfirmBtn';
import ActiveBtn from '../../components/btns/ActiveBtn';
import { useWorkout } from '../../contexts/WorkoutContext';
import { FaPencil } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import IntervalSkeleton from '../../components/workout/workoutInterval/IntervalSkeleton';

function ViewWorkout() {
    // IMPORTS
    const navigate = useNavigate();
    const { workoutID } = useParams();
    const {
        workoutName, cooldown, prep, rest, setWorkoutName, setCooldown, setPrep,
        setRest, intervals, updateInterval, deleteInterval, getIntervalIndex,
        resetStateFull, addEmptyInterval, fetchWorkout, updateWorkoutInDB,
    } = useWorkout();

    // LOCAL STATES & REFS
    const [prevAmount, setPreviousAmount] = useState(null);
    const [showPencil, setShowPencil] = useState(true);
    const [createConfirm, setCreateConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shrink, setShrink] = useState({ state: true, orderIndex: null });
    const containerRef = useRef(null);

    useEffect(() => {
        setShrink((p) => ({ ...p, state: true }));
        fetchWorkout(workoutID);
        setTimeout(() => {
            if (intervals && intervals?.length > 0) {
                setShrink((p) => ({ ...p, state: false }));
            }
        }, 300);

        return () => {
            resetStateFull();
            setCreateConfirm(false);
        }
    }, []);

    useEffect(() => {
        // console.log(intervals, prevAmount);

        if (prevAmount === intervals.length) return;
        if (prevAmount === null) return setPreviousAmount(intervals.length);

        if (prevAmount < intervals.length) {
            setTimeout(() => {
                setShrink((p) => ({ ...p, state: false }));
            }, 100);
        }
    }, [intervals]);

    const handleAddExercise = (e) => {
        e.preventDefault();
        addEmptyInterval();
        setTimeout(() => {
            scrollToBottom();
        }, 200);
    };

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    const handleDeleteInterval = (e) => {
        e.preventDefault();
        let tag = e.target.tagName;
        let target;

        if (tag == 'path') target = e.target.parentElement.parentElement;
        else if (tag == 'svg') target = e.target.parentElement;
        else target = e.target;

        const orderIndex = target.dataset.orderindex;
        setShrink({ state: true, orderIndex });
        setTimeout(() => {
            deleteInterval(orderIndex);
            setTimeout(() => { setShrink({ state: false, orderIndex: null }) }, 50)
        }, 500);
    };

    const handleBtns = (e) => {
        e.preventDefault();
        const btn = e.target.textContent;
        switch (btn) {
            case ('Edit Workout'): navigate(`/workouts/edit/${workoutID}`); break;
            case ('Workouts'): navigate('/workouts'); break;
            default: break;
        }
    };

    return (<div id="edit-workout-ctr" ref={containerRef} className={`w-full h-[calc(100%-3.5rem)] flex justify-center bg-gray-100 rounded-b-xl overflow-y-scroll py-10`}>
        {(shrink.state || isSubmitting) && <BackdropLoader dark={true} />}

        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md h-fit">
            {/* TITLE SECTION */}
            <div className="relative flex justify-center items-center">
                <input className="text-3xl font-bold text-gray-800 bg-white w-full h-12 text-center max-custom-mq-500:text-2xl max-custom-mq-300:text-lg max-custom-mq-300:pt-4"
                    disabled value={workoutName} id='details-page-title--ll' />
            </div>

            {/* WORKOUT INTERVALS */}
            <div id="workout-intervals">
                {/* PREP INTERVAL */}
                <article className="rounded-lg shadow-md border-b border-gray-300 my-2 mt-6">
                    <ServiceInterval type='preparation' v={prep} setV={setPrep} isView={true} />
                </article>

                {shrink.state && Array(4).fill(0).map((x, i) => <IntervalSkeleton key={`sk-${i}-ll`} />)}

                {/* WORKOUT INTERVALS (Exercise + Break) */}
                {intervals.map((x, i) => (<article key={`i-article-${i}`} className={`rounded-lg shadow-md border-b border-gray-300 my-8 ${shrink.state && shrink.orderIndex == x.orderIndex ? 'shrink-to-hidden' : ' '} transition-all`}>
                    <WorkoutInterval orderIndex={x.orderIndex} deleteInterval={handleDeleteInterval} isView={true}
                        type='work' v={x} setV={updateInterval} i={i} slideIn={true} iFind={getIntervalIndex} />
                    <ServiceInterval orderIndex={x.orderIndex + '.5'} isView={true}
                        type='rest' v={rest} setV={setRest} i={i} slideIn={true} />
                </article>))}

                {/* COOLDOWN INTERVAL */}
                <article className="rounded-lg shadow-md border-b border-gray-300 my-2">
                    <ServiceInterval type='cooldown' v={cooldown} setV={setCooldown} isView={true} />
                </article>
            </div>

            {/* Created */}
            {/* Updated */}



            {/* NAVIGATION */}
            <article className="w-full mt-6 px-[10%] max-custom-mq-500:px-4 max-custom-mq-300:px-0">
                <hr className="mx-3 my-3.5 mt-8" />
                <ActiveBtn text={'Edit Workout'} handler={handleBtns} />
                <hr className="mx-3 mt-3.5" />
                <hr className="mx-3 my-3.5 mt-8" />
                <ActiveBtn text={'Workouts'} handler={handleBtns} />
                <hr className="mx-3 mt-3.5" />
            </article>

        </div>
    </div>)
}

export default ViewWorkout;
