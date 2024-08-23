import React, { useState } from 'react';
import './SignIn.css';
import FormInput from '../shared/formInput/FormInput';
import { Link } from 'react-router-dom';
import { FaArrowRightFromBracket, FaArrowRightToBracket, FaBars, FaBarsStaggered, FaCircleUser, FaDiscord, FaDumbbell, FaGear, FaUser, FaUserPlus } from 'react-icons/fa6';
import { MdAlternateEmail } from "react-icons/md";
import BtnLoader from '../shared/btnLoader/btnLoader';
import { useAuth } from '../../contexts/AuthContext';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
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
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        // try catch - set loading, etc
        await loginUser(form);
        // TODO: GENERATE A TOAST FOR EACH SCENARIO UPON SUBMISSION !!!

        // TODO: TRANSFER SIGN UP BUTTONS, LOADING, BTN LOADER AND THE REST >>> DO THIS 1st
    };

    return (
        <div id="login-form-ctr" className="w-full h-[calc(100%-3.5rem)] flex items-center justify-center bg-gray-100 rounded-b-xl">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
                {signInType === null
                    ? (<>
                        <button className="w-full text-lg flex justify-center items-center gap-4 bg-purple-900 text-white mt-6 mb-2 py-2 h-[46px] rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all" onClick={chooseLocalSignIn}>
                            <MdAlternateEmail className="text-3xl" /><p className="max-custom-mq-300:hidden">Use Email</p>
                        </button>
                        <div className="flex w-full justify-center items-center">
                            <hr className="border-0 ml-4 border-t-4 flex-1 z-[1]" />
                            <p className="text-black text-lg px-2">or</p>
                            <hr className="border-0 mr-4 border-t-4 flex-1 z-[1]" />
                        </div>
                        <button className="w-full text-lg flex justify-center items-center gap-4 bg-purple-900 text-white mb-6 mt-2 py-2 rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all" onClick={chooseDiscordSignIn}>
                            <FaDiscord className="text-3xl" /><p className="max-custom-mq-300:hidden">Use Discord</p>
                        </button>
                        <p className="text-black px-2">Not a member? <Link to="/user/signup"
                            className="a-left px-1 pb-1 font-bold hover:text-purple-600" >Sign Up</Link></p>
                    </>)
                    : (<>{signInType === 'local'
                        ? (<>
                            <form onSubmit={handleSubmit} autoComplete="off">

                                <FormInput name={'username'} v={form.username} handler={handleChange} />
                                <FormInput name={'password'} v={form.password} handler={handleChange} />

                                <div className="flex flex-row flex-nowrap justify-between">
                                    <button type="submit" className="w-[87%] bg-purple-900 text-white my-6 py-2 rounded-lg  hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all">
                                        {loading ? <BtnLoader /> : 'Sign In'}
                                    </button>
                                    <p className="my-6 py-2 text-gray-800">|</p>
                                    <button type="button" className="text-2xl flex justify-center items-center bg-purple-900 text-white my-6 p-2 rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all" onClick={chooseDiscordSignIn}><FaDiscord /></button>
                                </div>
                            </form>
                            <p className="text-black px-2">Not a member? <Link to="/user/signup"
                                className="a-left px-1 pb-1 font-bold hover:text-purple-600" >Sign Up</Link></p>
                        </>)
                        : (<>
                            <div className="flex flex-row flex-nowrap justify-between">
                                <button className="w-[87%] text-lg flex justify-center items-center gap-2 bg-purple-900 text-white my-6 py-2 rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all">
                                    <FaDiscord className="text-3xl" />
                                    <p className="max-custom-mq-300:hidden">Use Discord</p>
                                </button>
                                <p className="my-6 text-xl py-2 text-gray-800">|</p>
                                <button type="button" className="text-2xl flex justify-center items-center bg-purple-900 text-white my-6 p-2 rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all" onClick={chooseLocalSignIn}><MdAlternateEmail /></button>
                            </div>
                            <p className="text-black px-2">Not a member? <Link to="/user/signup"
                                className="a-left px-1 pb-1 font-bold hover:text-purple-600" >Sign Up</Link></p>
                        </>)}
                    </>)}
            </div>
        </div>
    );
};

export default SignIn;