import React, { useState } from 'react';
import './SignUp.css';
import FormInput from '../shared/formInput/FormInput';
import { Link } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa6';
import { MdAlternateEmail } from "react-icons/md";
import BtnLoader from '../loaders/final/btnLoader/btnLoader';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import InactiveBtn from '../btns/inactiveBtn';
import ActiveBtn from '../btns/activeBtn';
import HBtnSeparator from '../btns/HBtnSeparator';
import FormChange from '../btns/FormChange';

const SignUp = () => {
    const [loading, setLoading] = useState(false);
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
        // setSignUpType('discord');
        toast.error(`Hey, line 1 \n line 2 \n line 3...`);
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

    return (
        <div id="reg-form-ctr" className="w-full h-[calc(100%-3.5rem)] flex items-center justify-center bg-gray-100 rounded-b-xl">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
                {signUpType === null
                    ? (<>
                        <ActiveBtn handler={chooseLocalSignUp} text={'Use Email'} />
                        <HBtnSeparator />
                        <ActiveBtn handler={chooseDiscordSignUp} text={'Use Discord'} />

                        <InactiveBtn /> {/* FOR Submitting state */}

                        <FormChange goTo={'signIn'} />
                    </>)
                    : (<>{signUpType === 'local'
                        ? (<>
                            <form onSubmit={handleSubmit} autoComplete="off">

                                <FormInput name={'fullName'} v={form.fullName} handler={handleChange} />
                                <FormInput name={'username'} v={form.username} handler={handleChange} />
                                <FormInput name={'email'} v={form.email} handler={handleChange} />
                                <FormInput name={'password'} v={form.password} handler={handleChange} />
                                <FormInput name={'confirmPassword'} v={form.confirmPassword} handler={handleChange} />

                                <div className="flex flex-row flex-nowrap justify-between my-6 bg-red-400">
                                    <button type="submit" className="w-[87%] bg-purple-900 text-white py-2 rounded-lg  hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all">
                                        {loading ? <BtnLoader /> : 'Sign Up'}
                                    </button>
                                    <p className="py-2 text-xl text-gray-800">|</p>
                                    <button type="button" className="text-2xl flex justify-center items-center bg-purple-900 text-white p-2 w-11 h-11 rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all" onClick={chooseDiscordSignUp}>
                                        <FaDiscord />
                                    </button>
                                    {/* <InactiveBtn square={true} /> */}
                                </div>
                            </form>
                            <FormChange goTo={'signIn'} />
                        </>)
                        : (<>
                            <div className="flex flex-row flex-nowrap justify-between">
                                <button className="w-[87%] text-lg flex justify-center items-center gap-2 bg-purple-900 text-white my-6 py-2 rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all">
                                    <FaDiscord className="text-3xl" />
                                    <p className="max-custom-mq-300:hidden">Use Discord</p>
                                </button>
                                <p className="my-6 text-xl py-2 text-gray-800">|</p>
                                <button type="button" className="text-2xl flex justify-center items-center bg-purple-900 text-white my-6 p-2 rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all" onClick={chooseLocalSignUp}><MdAlternateEmail /></button>
                            </div>
                            <p className="text-black px-2">Have an Account? <Link to="/user/signin"
                                className="a-left px-1 pb-1 font-bold hover:text-purple-600" >Sign In</Link></p>
                        </>)}
                    </>)}
            </div>
        </div>
    );
};

export default SignUp;