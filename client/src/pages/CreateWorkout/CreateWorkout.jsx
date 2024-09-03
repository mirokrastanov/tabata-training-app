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
import { useNavigate } from 'react-router-dom';
import WorkoutInterval from '../../components/workout/workoutInterval/WorkoutInterval';

function CreateWorkout() {
    const [workoutIntervals, setWorkoutIntervals] = useState(
        { nextAvailableID: 0, intervals: {} }
    );



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

            <div className="text-black" >
                {Object.values(workoutIntervals.intervals).map((x, i) => {
                    return (
                        <div key={i}>
                            {JSON.stringify(x)}
                        </div>
                    )
                })}
            </div>
            <button onClick={createWorkoutInterval}>TEST</button>

            <article className="text-gray-800 bg-purple-100 p-1 mb-4 rounded shadow-md border-gray-800 border">
                <ul className="list-disc ml-6 text-left">
                    <li>Interval duration: 0 - 120 seconds</li>
                    <hr className="h-[2px] bg-gray-800 mr-7" />
                    <li>Use (-/+)</li>
                    <li>Click the number to edit manually</li>
                    <li>Or click & use (↑/↓) on your keyboard</li>
                </ul>
            </article>

            <hr className="mx-3 my-1 mb-3" />

            <article>
                <WorkoutInterval />
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