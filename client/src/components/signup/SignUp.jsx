import React, { useEffect, useState } from 'react';
import './SignUp.css';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import ActiveBtn from '../btns/activeBtn';
import HBtnSeparator from '../btns/HBtnSeparator';
import FormChange from '../btns/FormChange';
import VBtnSeparator from '../btns/VBtnSeparator';
import { useForm } from 'react-hook-form';
import RHFInput from '../shared/formInput/RHFInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../../lib/ValidationSchemas';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(signUpSchema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [signUpType, setSignUpType] = useState(null);
    const { registerUser, discordLogin } = useAuth();
    const navigate = useNavigate();

    const chooseLocalSignUp = (e) => {
        e.preventDefault();
        setSignUpType('local');
    }
    const chooseDiscordSignUp = (e) => {
        e.preventDefault();
        setSignUpType('discord');
    }

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

    const handleDiscordLogin = async (e) => {
        e.preventDefault();
        await discordLogin();
    }

    return (
        <div id="reg-form-ctr" className="w-full h-[calc(100%-3.5rem)] flex items-center justify-center bg-gray-100 rounded-b-xl">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

                {/* LANDING VIEW */}
                {signUpType == null && (<>
                    <ActiveBtn handler={chooseLocalSignUp} text={'Create Account'} />
                    <HBtnSeparator />
                    <ActiveBtn handler={chooseDiscordSignUp} text={'Use Discord'} />
                    <FormChange goTo={'signIn'} />
                </>)}

                {/* LOCAL SIGNUP VIEW */}
                {signUpType === 'local' && (<>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <RHFInput name={'fullName'} register={register} errors={errors} />
                        <RHFInput name={'username'} register={register} errors={errors} />
                        <RHFInput name={'email'} register={register} errors={errors} />
                        <RHFInput name={'password'} register={register} errors={errors} />
                        <RHFInput name={'confirmPassword'} register={register} errors={errors} />

                        <VBtnSeparator check={isSubmitting} rIcon={'discord'} rHandler={chooseDiscordSignUp} />
                    </form>
                    <FormChange goTo={'signIn'} />
                </>)}

                {/* DISCORD SIGNUP VIEW */}
                {signUpType === 'discord' && (<>
                    <VBtnSeparator lHandler={handleDiscordLogin} lIcon={true} rHandler={chooseLocalSignUp} />
                    <FormChange goTo={'signIn'} />
                </>)}

            </div>
        </div>
    );
};

export default SignUp;