import React, { useEffect, useState } from 'react';
import './SignIn.css';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import ActiveBtn from '../btns/activeBtn';
import HBtnSeparator from '../btns/HBtnSeparator';
import FormChange from '../btns/FormChange';
import VBtnSeparator from '../btns/VBtnSeparator';
import { useForm } from 'react-hook-form';
import RHFInput from '../shared/formInput/RHFInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../../lib/ValidationSchemas';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(signInSchema),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [signInType, setSignInType] = useState(null);
    const { loginUser, discordLogin } = useAuth();
    const navigate = useNavigate();

    const chooseLocalSignIn = (e) => {
        e.preventDefault();
        setSignInType('local');
    }
    const chooseDiscordSignIn = (e) => {
        e.preventDefault();
        setSignInType('discord');
    }

    const onSubmit = async (validatedData) => {
        setIsSubmitting(true);
        // console.log('Form submitted:', validatedData);

        const delayedResponse = async (validatedData) => {
            // sim delay for testing
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await loginUser(validatedData);
            if (!response.ok) throw response;
            return response;
        };
        toast.promise(delayedResponse(validatedData), {
            loading: 'Loading...',
            success: (response) => {
                setIsSubmitting(false);
                // reset();
                // return response.msg || 'Request successful!';
                return navigate('/?referrer=signin');
            },
            error: (error) => {
                setIsSubmitting(false);
                return error.msg || error.error || error.message || 'Request failed';
            },
        });
        setTimeout(() => toast.dismiss(), 5000); // Manually dismisses the toast in case of issues
    };

    const handleDiscordLogin = async (e) => {
        e.preventDefault();
        await discordLogin();
    }

    return (
        <div id="login-form-ctr" className="w-full h-[calc(100%-3.5rem)] flex items-center justify-center bg-gray-100 rounded-b-xl">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>

                {/* LANDING VIEW */}
                {signInType == null && (<>
                    <ActiveBtn handler={chooseLocalSignIn} text={'Use Credentials'} />
                    <HBtnSeparator />
                    <ActiveBtn handler={chooseDiscordSignIn} text={'Use Discord'} />
                    <FormChange goTo={'signUp'} />
                </>)}

                {/* LOCAL SIGNIN VIEW */}
                {signInType === 'local' && (<>
                    <form onSubmit={handleSubmit}>
                        <RHFInput name={'username'} register={register} errors={errors} />
                        <RHFInput name={'password'} register={register} errors={errors} />

                        <VBtnSeparator check={isSubmitting} rIcon={'discord'} rHandler={chooseDiscordSignIn} />
                    </form>
                    <FormChange goTo={'signUp'} />
                </>)}

                {/* DISCORD SIGNIN VIEW */}
                {signInType === 'discord' && (<>
                    <VBtnSeparator lHandler={handleDiscordLogin} lIcon={true} rHandler={chooseLocalSignIn} />
                    <FormChange goTo={'signUp'} />
                </>)}

            </div>
        </div>
    );
};

export default SignIn;