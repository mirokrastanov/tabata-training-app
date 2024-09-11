import React, { useEffect, useState } from 'react';
import './CreateWorkout.css';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import ActiveBtn from '../../components/btns/ActiveBtn';
import HBtnSeparator from '../../components/btns/HBtnSeparator';
import FormChange from '../../components/btns/FormChange';
import VBtnSeparator from '../../components/btns/VBtnSeparator';
import { useForm } from 'react-hook-form';
import RHFInput from '../../components/formInputs/RHFInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../../lib/ValidationSchemas';
import { useLocation, useNavigate } from 'react-router-dom';
import WorkoutHelp from '../../components/workout/workoutInterval/WorkoutHelp/WorkoutHelp';
import WorkoutInterval from '../../components/workout/workoutInterval/WorkoutInterval';
import ServiceInterval from '../../components/workout/workoutInterval/ServiceInterval';
import IntervalSkeleton from '../../components/workout/workoutInterval/IntervalSkeleton';
import { useWorkout } from '../../contexts/WorkoutContext';
import { FaPencil } from 'react-icons/fa6';

function CreateWorkout() {
    // GENERIC STATES & IMPORTS
    const navigate = useNavigate();
    const { user } = useAuth();

    // SUBMISSION FORM STATES & IMPORTS
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ACTIVE STATES & IMPORTS
    const [loading, setLoading] = useState(true);
    const [prevAmount, setPreviousAmount] = useState(null);
    const [showPencil, setShowPencil] = useState(true);

    const {
        workoutName, cooldown, prep, rest,
        setWorkoutName, setCooldown, setPrep, setRest,
        intervals, loadWorkoutPreset, updateInterval,

    } = useWorkout();

    // useEffect(() => {
    //     loadWorkoutPreset();
    // }, []);

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
        

    };

    return (<div id="create-workout-ctr" className="w-full h-[calc(100%-3.5rem)] flex justify-center bg-gray-100 rounded-b-xl overflow-y-scroll py-10">
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
                <ServiceInterval type='preparation' v={prep} setV={setPrep} />


                {/* MAP the intervals */}
                {intervals.map((x, i) => (<article key={`i-article-${i}`}>
                    <WorkoutInterval data-orderIndex={x.orderIndex}
                        type='work' v={x} setV={updateInterval} i={i} slideIn={true} />
                    <ServiceInterval data-orderIndex={x.orderIndex + '.5'}
                        type='rest' v={rest} setV={setRest} i={i} slideIn={true} />
                </article>))}


                {/* ADD EXERCISE BUTTON */}
                <article className="w-full my-6 px-[10%] max-custom-mq-500:px-4 max-custom-mq-300:px-0">
                    <hr className="mx-3 my-3.5 mt-8" />
                    <ActiveBtn text={'Add Exercise'} handler={handleAddExercise} />
                    <hr className="mx-3 my-3.5 mb-8" />
                </article>

                {/* COOLDOWN INTERVAL */}
                <ServiceInterval type='cooldown' v={cooldown} setV={setCooldown} />
            </div>


            {/* SUBMIT WORKOUT */}
            {/* Use activeBtn - SET btnType='submit' */}
        </div>
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