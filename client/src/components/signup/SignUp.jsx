import React, { useState } from 'react';
import './SignUp.css';
import FormInput from '../shared/formInput/FormInput';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import ActiveBtn from '../btns/activeBtn';
import HBtnSeparator from '../btns/HBtnSeparator';
import FormChange from '../btns/FormChange';
import VBtnSeparator from '../btns/VBtnSeparator';
import { useForm } from 'react-hook-form';
import RHFInput from '../shared/formInput/RHFInput';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm();

    const [signUpType, setSignUpType] = useState(null);
    const { registerUser, discordLogin } = useAuth();

    const chooseLocalSignUp = (e) => {
        e.preventDefault();
        setSignUpType('local');
    }
    const chooseDiscordSignUp = (e) => {
        e.preventDefault();
        setSignUpType('discord');
        // toast.error(`Hey, line 1 \n line 2 \n line 3...`);
    }

    const onSubmit = async (validatedData) => {
        console.log('Form submitted:', validatedData);




        // await registerUser(form);


        // const simSubmit = async () => await new Promise((resolve) => setTimeout(resolve, 1000));
        const simSubmit = async () => {
            return await new Promise((resolve, reject) => {
                if (Math.random() * 100 >= 51) setTimeout(resolve, 1000);
                else setTimeout(reject, 1000);
            });
        };
        const toastId = toast.promise(simSubmit(), {
            loading: 'Loading...',
            success: 'Request successful!',
            error: 'Request failed',
        });
        // Manually dismisses the toast in case of issues
        setTimeout(() => {
            toast.dismiss(toastId);
        }, 5000);


        // reset();
    };

    const handleDiscordLogin = async (e) => {
        e.preventDefault();
        console.log('Discord login attempted...');

        // await discordLogin();
    }

    return (
        <div id="reg-form-ctr" className="w-full h-[calc(100%-3.5rem)] flex items-center justify-center bg-gray-100 rounded-b-xl">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

                {/* LANDING VIEW */}
                {signUpType == null && (<>
                    <ActiveBtn handler={chooseLocalSignUp} text={'Use Email'} />
                    <HBtnSeparator />
                    <ActiveBtn handler={chooseDiscordSignUp} text={'Use Discord'} />
                    <FormChange goTo={'signIn'} />
                </>)}

                {/* EMAIL SIGNUP VIEW */}
                {signUpType === 'local' && (<>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <RHFInput name={'fullName'} register={register} errors={errors} values={getValues()} />
                        <RHFInput name={'username'} register={register} errors={errors} values={getValues()} />
                        <RHFInput name={'email'} register={register} errors={errors} values={getValues()} />
                        <RHFInput name={'password'} register={register} errors={errors} values={getValues()} />
                        <RHFInput name={'confirmPassword'} register={register} errors={errors} values={getValues()} />

                        <VBtnSeparator check={false} rIcon={'discord'} rHandler={chooseDiscordSignUp}
                            isSubmitting={isSubmitting} />
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