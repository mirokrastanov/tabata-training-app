import React from 'react';

function FormInput({ name, v, handler }) {
    const info = {
        fullName: ['text', 'fullName', 'Full Name'],
        username: ['text', 'username', 'Username'],
        email: ['email', 'email', 'Email'],
        password: ['password', 'password', 'Password'],
        confirmPassword: ['password', 'confirmPassword', 'Confirm Password']

    };

    const data = info[name];
    

    return (
        <div className="mb-2">
            <label htmlFor={data[1]} className="block text-gray-700">{data[2]}</label>
            <input type={data[0]} name={data[1]} value={v} onChange={handler}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
        </div>
    )
}

export default FormInput;