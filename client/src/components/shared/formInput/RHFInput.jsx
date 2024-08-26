import React from 'react';

function RHFInput({ name, register, errors, values }) {
    const info = {
        fullName: ['text', 'fullName', 'Full Name', null, 20], // max 20
        username: ['text', 'username', 'Username', 3, 10], // min 3 max 10
        email: ['email', 'email', 'Email', null, null], // valid email
        password: ['password', 'password', 'Password', 6, null], // min 6
        confirmPassword: ['password', 'confirmPassword', 'Confirm Password', null, null], // match password
    };
    const data = info[name];
    const [min, max] = [data[3], data[4]];

    let placeholder;
    if (min & max) placeholder = `Between ${min} and ${max} characters`;
    else if (min) placeholder = `Minimum ${min} characters`;
    else if (max) placeholder = `Maximum ${max} characters`;
    else if (data[1] == 'email') placeholder = 'Valid email address';
    else if (data[1] == 'confirmPassword') placeholder = 'Match password';

    const validations = { required: ` is required` };
    if (min) validations.minLength = { value: min, message: ` must be ${min} or more characters` };
    if (max) validations.maxLength = { value: max, message: ` must be ${max} or fewer characters` };
    if (data[1] == 'confirmPassword') validations.validate = (value) => value === values.password || ' must match';

    return (
        <div className="mb-2">
            <label htmlFor={data[1]} className="block text-gray-700">
                {errors[data[1]]
                    ? (<p className="font-bold text-red-600">{data[2] + errors[data[1]].message}</p>)
                    : (data[2])}
            </label>
            <input className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-sm placeholder:tracking-wider`}
                type={data[0]} id={data[1]} name={data[1]} autoComplete="on" placeholder={placeholder}
                {...register(data[1], validations)}
            />
        </div>
    )
}

export default RHFInput;