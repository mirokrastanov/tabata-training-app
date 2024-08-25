import React, { useState } from 'react';
import './SignIn.css';
import FormInput from '../shared/formInput/FormInput';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import ActiveBtn from '../btns/activeBtn';
import HBtnSeparator from '../btns/HBtnSeparator';
import FormChange from '../btns/FormChange';
import VBtnSeparator from '../btns/VBtnSeparator';

const SignIn = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [signInType, setSignInType] = useState(null);
    const { loginUser, discordLogin } = useAuth();

    const chooseLocalSignIn = (e) => {
        e.preventDefault();
        setSignInType('local');
    }
    const chooseDiscordSignIn = (e) => {
        e.preventDefault();
        setSignInType('discord');
        // toast.error(`Hey, line 1 \n line 2 \n line 3...`);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        // try catch - set loading, etc
        // TODO: PULL ALL THE LOGIC INTO A HOOK - useSignIn
        // TODO: perform validation
        // TODO: GENERATE A TOAST FOR EACH SCENARIO UPON SUBMISSION !!!
        await loginUser(form);
        // TODO: manually dismiss the toast in case of issues
    };

    const handleDiscordLogin = async (e) => {
        e.preventDefault();
        console.log('Discord login attempted...');

        // await discordLogin();
    }

    return (
        <div id="login-form-ctr" className="w-full h-[calc(100%-3.5rem)] flex items-center justify-center bg-gray-100 rounded-b-xl">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>

                {/* LANDING VIEW */}
                {signInType == null && (<>
                    <ActiveBtn handler={chooseLocalSignIn} text={'Use Email'} />
                    <HBtnSeparator />
                    <ActiveBtn handler={chooseDiscordSignIn} text={'Use Discord'} />
                    <FormChange goTo={'signUp'} />
                </>)}

                {/* EMAIL SIGNIN VIEW */}
                {signInType === 'local' && (<>
                    <form onSubmit={handleSubmit}>
                        <FormInput name={'username'} v={form.username} handler={handleChange} />
                        <FormInput name={'password'} v={form.password} handler={handleChange} />

                        <VBtnSeparator check={false} rIcon={'discord'} rHandler={chooseDiscordSignIn} />
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