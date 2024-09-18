import React, { useEffect, useState, useRef } from 'react';
import './EditWorkout.css';
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

function EditWorkout() {
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
                setTimeout(() => scrollToBottom(), 200);
            }
        }, 2000);

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
                setTimeout(() => scrollToBottom(), 200);
            }, 300);
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

    const updateWorkoutOnConfirm = async (e) => {
        e.preventDefault();
        if (workoutName == '') return toast.error('Workout name is required');
        if (intervals.length < 3) return toast.error('A workout must contain at least 3 exercises');
        if (intervals.find(e => e.exercise == '')) return toast.error('Each interval must have an exercise name in');

        setIsSubmitting(true);
        const delayedResponse = async () => {
            // sim delay for testing
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await updateWorkoutInDB(workoutID);
            if (!response.ok) throw response;
            return response;
        };
        await toast.promise(delayedResponse(), {
            loading: 'Loading...',
            success: (response) => {
                setIsSubmitting(false);
                return response.msg || 'Workout updated!';
            },
            error: (error) => {
                setIsSubmitting(false);
                return error.msg || error.error || error.message || 'Request failed';
            },
        });

        setTimeout(() => toast.dismiss(), 5000);
        setTimeout(() => setIsSubmitting(false), 5000);
        navigate('/workouts'); // TODO: change to updated workout's details page
    };

    return (<div id="edit-workout-ctr" ref={containerRef} className={`w-full h-[calc(100%-3.5rem)] flex justify-center bg-gray-100 rounded-b-xl overflow-y-scroll py-10`}>
        {(shrink.state || isSubmitting) && <BackdropLoader dark={true} />}

        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md h-fit">
            {/* TITLE SECTION */}
            <div className="relative flex justify-center items-center">
                <input className="text-3xl font-bold text-gray-800 bg-white w-full h-12 text-center max-custom-mq-500:text-2xl max-custom-mq-300:text-lg max-custom-mq-300:pt-4"
                    onFocus={() => setShowPencil(false)} onBlur={() => setShowPencil(true)}
                    value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} placeholder="Add a title" />
                <FaPencil className={`${showPencil ? '' : 'hidden'} text-purple-900 absolute right-0 w-12 h-full p-3 pointer-events-none max-custom-mq-300:pb-8 max-custom-mq-300:pl-5 max-custom-mq-300:pt-0 max-custom-mq-300:pr-1`} />
            </div>

            {/* HELP SECTION */}
            <WorkoutHelp />

            {/* WORKOUT INTERVALS */}
            <div id="workout-intervals">
                {/* PREP INTERVAL */}
                <article className="rounded-lg shadow-md border-b border-gray-300 my-2 mt-6">
                    <ServiceInterval type='preparation' v={prep} setV={setPrep} />
                </article>

                {/* WORKOUT INTERVALS (Exercise + Break) */}
                {intervals.map((x, i) => (<article key={`i-article-${i}`} className={`rounded-lg shadow-md border-b border-gray-300 my-2 ${shrink.state && shrink.orderIndex == x.orderIndex ? 'shrink-to-hidden' : ' '} transition-all`}>
                    <WorkoutInterval orderIndex={x.orderIndex} deleteInterval={handleDeleteInterval}
                        type='work' v={x} setV={updateInterval} i={i} slideIn={true} iFind={getIntervalIndex} />
                    <ServiceInterval orderIndex={x.orderIndex + '.5'}
                        type='rest' v={rest} setV={setRest} i={i} slideIn={true} />
                </article>))}

                {/* ADD EXERCISE BUTTON */}
                <article className="w-full my-6 px-[10%] max-custom-mq-500:px-4 max-custom-mq-300:px-0">
                    <hr className="mx-3 my-3.5 mt-8" />
                    <ActiveBtn text={'Add Exercise'} handler={handleAddExercise} />
                    <hr className="mx-3 my-3.5 mb-8" />
                </article>

                {/* COOLDOWN INTERVAL */}
                <article className="rounded-lg shadow-md border-b border-gray-300 my-2">
                    <ServiceInterval type='cooldown' v={cooldown} setV={setCooldown} />
                </article>
            </div>

            {/* SUBMIT WORKOUT */}
            <article className="w-full mt-6 px-[10%] max-custom-mq-500:px-4 max-custom-mq-300:px-0">
                <hr className="mx-3 my-3.5 mt-8" />
                <ConfirmBtn
                    text={'Save Changes'} rHandler={updateWorkoutOnConfirm} scroll={scrollToBottom}
                    btnType={'submit'} v={createConfirm} setV={setCreateConfirm}
                />
                <hr className="mx-3 mt-3.5" />
            </article>

        </div>
    </div>)
}

export default EditWorkout;
