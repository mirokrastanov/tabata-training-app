import React, { useState } from 'react';
import './SignUp.css';
import FormInput from '../shared/formInput/FormInput';


const SignUp = () => {
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        <div id="reg-form-ctr" className="w-full h-full flex items-center justify-center bg-slate-300 rounded-b-xl">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
                <form onSubmit={handleSubmit} autoComplete="off">

                    <FormInput name={'fullName'} v={form.fullName} handler={handleChange} />
                    <FormInput name={'username'} v={form.username} handler={handleChange} />
                    <FormInput name={'email'} v={form.email} handler={handleChange} />
                    <FormInput name={'password'} v={form.password} handler={handleChange} />
                    <FormInput name={'confirmPassword'} v={form.confirmPassword} handler={handleChange} />

                    <button type="submit" className="w-full bg-purple-900 text-white my-6 py-2 rounded-lg  hover:bg-purple-600 focus:outline-none border-none active:scale-90 transition-all">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;