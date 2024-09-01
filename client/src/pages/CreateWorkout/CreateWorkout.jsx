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

function CreateWorkout() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(signUpSchema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

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

    return (<div id="create-workout-ctr" className="w-full h-[calc(100%-3.5rem)] flex items-center justify-center bg-gray-100 rounded-b-xl">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Title</h2>

            <form>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <RHFInput name={'fullName'} register={register} errors={errors} />
                <RHFInput name={'username'} register={register} errors={errors} />
                <RHFInput name={'email'} register={register} errors={errors} />
                <RHFInput name={'password'} register={register} errors={errors} />
                <RHFInput name={'confirmPassword'} register={register} errors={errors} />

                <VBtnSeparator check={isSubmitting} rIcon={'discord'} />
            </form>
            <FormChange goTo={'signIn'} />

        </div>
    </div>)
}

export default CreateWorkout;