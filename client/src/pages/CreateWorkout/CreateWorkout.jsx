import React, { useEffect, useState, useRef } from 'react';
import './CreateWorkout.css';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import ActiveBtn from '../../components/btns/ActiveBtn';
import HBtnSeparator from '../../components/btns/HBtnSeparator';
import { useLocation, useNavigate } from 'react-router-dom';
import WorkoutHelp from '../../components/workout/workoutInterval/WorkoutHelp/WorkoutHelp';
import WorkoutInterval from '../../components/workout/workoutInterval/WorkoutInterval';
import ServiceInterval from '../../components/workout/workoutInterval/ServiceInterval';
import { useWorkout } from '../../contexts/WorkoutContext';
import { FaPencil } from 'react-icons/fa6';
import BackdropLoader from '../../components/loaders/final/backdropLoader/BackdropLoader';
import CreateLobby from './CreateLobby';
import ConfirmBtn from '../../components/btns/ConfirmBtn';

function CreateWorkout() {
    // Imports
    const navigate = useNavigate();
    const { user } = useAuth();

    // WORKOUT IMPORTS
    const {
        workoutName, cooldown, prep, rest,
        setWorkoutName, setCooldown, setPrep, setRest,
        intervals, loadWorkoutPreset, updateInterval, addRandomInterval,
        deleteInterval, getIntervalIndex, resetStateFull, addEmptyInterval,

    } = useWorkout();

    // LOCAL STATES & REFS
    const [loading, setLoading] = useState(true);
    const [prevAmount, setPreviousAmount] = useState(null);
    const [showPencil, setShowPencil] = useState(true);
    const [shrink, setShrink] = useState({ state: false, orderIndex: null });
    const [lobby, setLobby] = useState(true);
    const containerRef = useRef(null);
    const [createConfirm, setCreateConfirm] = useState(false);
    const [presetConfirm, setPresetConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (prevAmount === null) setPreviousAmount(intervals.length);
        if (prevAmount < intervals.length) {
            if (!loading && intervals.length > 0) {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        }
        console.log(intervals);
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

    const loadCreateView = (e) => {
        e.preventDefault();
        setShrink((p) => ({ ...p, state: true }));
        setTimeout(() => {
            setLobby(false);
            setShrink((p) => ({ ...p, state: false }));
        }, 300);
    };

    const handleLoadPreset = (e) => {
        e.preventDefault();
        setShrink((p) => ({ ...p, state: true }));

        const preset = e.target.dataset.preset;
        if (preset) loadWorkoutPreset(preset);

        setTimeout(() => {
            setLobby(false);
            setShrink((p) => ({ ...p, state: false }));
            setTimeout(() => {
                scrollToBottom();
            }, 200);
        }, 300);
    };

    const loadPresetOnConfirm = (e) => {
        e.preventDefault();
        setLobby(true);
        resetStateFull();
        setCreateConfirm(false);
        setPresetConfirm(false);
    };

    const createWorkoutOnConfirm = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        


        return;
        resetStateFull();
        setCreateConfirm(false);
        setPresetConfirm(false);
    };

    // HANDLE SUBMIT - add a toast to display and prevent the user from submitting a workout with less then 3 execises


    return (<div id="create-workout-ctr" ref={containerRef} className={`w-full h-[calc(100%-3.5rem)] flex justify-center bg-gray-100 rounded-b-xl ${!lobby ? 'overflow-y-scroll' : 'overflow-hidden'} py-10`}>
        {/* Adds BackdropLoader during deletion to improove UX */}
        {shrink.state && <BackdropLoader dark={true} />}

        {lobby ? (<CreateLobby create={loadCreateView} load={handleLoadPreset} />) : (<div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md h-fit">
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
                {/* <ActiveBtn btnType={'submit'} text={'Create Workout'} /> */}
                <ConfirmBtn
                    text={'Create Workout'} rHandler={createWorkoutOnConfirm} scroll={scrollToBottom}
                    btnType={'submit'} v={createConfirm} setV={setCreateConfirm} setW={setPresetConfirm}
                />
                <HBtnSeparator />
                <ConfirmBtn
                    text={'Load Preset'} rHandler={loadPresetOnConfirm} scroll={scrollToBottom}
                    v={presetConfirm} setV={setPresetConfirm} setW={setCreateConfirm}
                />
                <hr className="mx-3 mt-3.5" />
            </article>

        </div>)}
    </div>)
}

export default CreateWorkout;



{/* <form onSubmit={handleSubmit(onSubmit)}>
    <RHFInput name={'fullName'} register={register} errors={errors} />
    <RHFInput name={'username'} register={register} errors={errors} />
    <RHFInput name={'email'} register={register} errors={errors} />
    <RHFInput name={'password'} register={register} errors={errors} />
    <RHFInput name={'confirmPassword'} register={register} errors={errors} />

    <VBtnSeparator check={isSubmitting} rIcon={'discord'} />
</form>
<FormChange goTo={'signIn'} /> */}