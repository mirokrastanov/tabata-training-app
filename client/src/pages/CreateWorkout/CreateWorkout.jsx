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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showPencil, setShowPencil] = useState(true);
    const {
        workoutName, cooldown, prep, rest,
        setWorkoutName, setCooldown, setPrep, setRest,
        intervals,
    } = useWorkout();

    useEffect(() => {
        console.log(intervals);
    }, [intervals]);

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
            <article id="workout-intervals">
                {/* PREP INTERVAL */}
                <ServiceInterval type='preparation' v={prep} setV={setPrep} />


                {/* MAP the intervals */}
                {/* DURING MAPPING - auto-generate a rest period after each work period  */}

                <WorkoutInterval type='work' />
                <ServiceInterval type='rest' />


                {/* COOLDOWN INTERVAL */}
                <ServiceInterval type='cooldown' v={cooldown} setV={setCooldown} />
            </article>


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