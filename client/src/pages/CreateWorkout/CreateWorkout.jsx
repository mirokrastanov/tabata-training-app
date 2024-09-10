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
import WorkoutHelp from '../../components/workout/workoutInterval/WorkoutHelp';
import WorkoutInterval from '../../components/workout/workoutInterval/WorkoutInterval';
import ServiceInterval from '../../components/workout/workoutInterval/ServiceInterval';
import IntervalSkeleton from '../../components/workout/workoutInterval/IntervalSkeleton';

function CreateWorkout() {
    const [workoutIntervals, setWorkoutIntervals] = useState(
        { nextAvailableID: 0, intervals: {} }
    );

    const sampleWorkout = {
        creatorId: 'creatorId',
        workoutName: 'HIIT 2.0',
        preparation: 30,
        break: 15,
        cooldown: 60,
        exercises: [
            { exercise: 'Jumping Jacks', duration: 45, orderIndex: 1 },
        ],
    };
    // PREP and COOLDOWN cannot be deleted - make it TRUE!!!
    // Add a break after each interval
    // Make sure the breaks cannot be deleted either

    // assign them the same ORDER ID as their previous interval so 
    // ORDER IDs are stored in the DB object - THUS DO NOT UPDATE ANY single exercise object
    // and save it on the DB, BEFORE the whole workout has been saved
    // applicable for both create and edit workout

    // figure out whether view workout should be different and make sure it's locked for editing
    // and just displays the workout WITH EDIT and PLAY buttons at the bottom and top of the view


    // that when it's deleted the corresponding break is deleted too
    // maybe also attach them as dataset order ids 

    // also because of the sampleWorkout structure
    // add after each interval a break code that does not change (maybe with a param for WorkoutInterval)
    // do a separate one with no params for PREP and COOLDOWN with their icons, and without na input
    // figure out a way to keep the cooldown LAST without constantly updating order ids (unless I figure out a way
    // to not keep them in a state)



    const { register, handleSubmit, formState: { errors }, reset }
        = useForm({ resolver: zodResolver(signUpSchema) });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();


    const sampleWorkoutInterval = {
        // id, 
    };
    const createWorkoutInterval = (e) => {
        e.preventDefault();
        setWorkoutIntervals(prev => ({
            ...prev,
            intervals: { ...prev.intervals, [workoutIntervals.nextAvailableID]: ['item 1', 'item 2', { d: workoutIntervals.nextAvailableID }] }
        }))
        setWorkoutIntervals(prev => ({ ...prev, nextAvailableID: Number(prev.nextAvailableID) + 1 }));
    };

    useEffect(() => {
        console.log(workoutIntervals);
    }, [workoutIntervals]);

    const onSubmit = async (validatedData) => {
        setIsSubmitting(true);
        // console.log('Form submitted:', validatedData);

        const delayedResponse = async (validatedData) => {
            // sim delay for testing
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await registerUser(validatedData);
            if (!response.ok) throw response;
            return response;
        };
        await toast.promise(delayedResponse(validatedData), {
            loading: 'Loading...',
            success: (response) => {
                setIsSubmitting(false);
                // reset();
                return response.msg || 'Request successful!';
                // return navigate('/?referrer=signup');
            },
            error: (error) => {
                setIsSubmitting(false);
                return error.msg || error.error || error.message || 'Request failed';
            },
        });
        setTimeout(() => toast.dismiss(), 5000); // Manually dismisses the toast in case of issues
        navigate('/');
    };


    return (<div id="create-workout-ctr" className="w-full h-[calc(100%-3.5rem)] flex justify-center bg-gray-100 rounded-b-xl overflow-y-scroll py-10">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md h-fit">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Current Workout Title</h2>

            <WorkoutHelp />

            <article id="workout-intervals">
                {/* MAP the intervals and display them with their corresponding interval type */}

                {/* DURING MAPPING - auto-generate a rest period after each work period  */}

                <ServiceInterval type='preparation' />
                <WorkoutInterval type='work' />
                <ServiceInterval type='rest' />
                <ServiceInterval type='cooldown' />
                <IntervalSkeleton />
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