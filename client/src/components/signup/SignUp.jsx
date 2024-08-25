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

const SignUp = () => {
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        // TODO: PULL ALL THE LOGIC INTO A HOOK - useSignIn

        // TODO: perform validation
        // TODO: GENERATE A TOAST FOR EACH SCENARIO UPON SUBMISSION !!!
        await registerUser(form);

        // TODO: manually dismiss the toast in case of issues
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
                    <form onSubmit={handleSubmit}>
                        <FormInput name={'fullName'} v={form.fullName} handler={handleChange} />
                        <FormInput name={'username'} v={form.username} handler={handleChange} />
                        <FormInput name={'email'} v={form.email} handler={handleChange} />
                        <FormInput name={'password'} v={form.password} handler={handleChange} />
                        <FormInput name={'confirmPassword'} v={form.confirmPassword} handler={handleChange} />

                        <VBtnSeparator check={false} rIcon={'discord'} rHandler={chooseDiscordSignUp} />
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