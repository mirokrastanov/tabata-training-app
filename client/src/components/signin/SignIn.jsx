import React, { useState } from 'react';
import './SignIn.css';
import FormInput from '../shared/formInput/FormInput';
import { Link } from 'react-router-dom';


const SignIn = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', form);
    };

    return (
        <div id="login-form-ctr" className="w-full h-[calc(100%-3.5rem)] flex items-center justify-center bg-gray-100 rounded-b-xl">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
                <form onSubmit={handleSubmit} autoComplete="off">

                    <FormInput name={'username'} v={form.username} handler={handleChange} />
                    <FormInput name={'password'} v={form.password} handler={handleChange} />

                    <button type="submit" className="w-full bg-purple-900 text-white my-6 py-2 rounded-lg  hover:bg-purple-600 focus:outline-none border-none active:bg-purple-500 transition-all">Sign In</button>
                </form>
                <p className="text-black px-2">Not a member? <Link to="/user/signup"
                    className="a-left px-1 pb-1 font-bold hover:text-purple-600" >Sign Up</Link></p>
            </div>
        </div>
    );
};

export default SignIn;