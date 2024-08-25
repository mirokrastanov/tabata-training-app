import React from 'react';
import { Link } from 'react-router-dom';

function FormChange({ goTo }) {
    const presets = {
        signIn: ['/user/signin', 'Have an Account? ', ' Sign In'],
        signUp: ['/user/signup', 'Not a Member? ', ' Sign Up'],
    };

    let data;

    switch (goTo) {
        case 'signIn': data = presets.signIn; break;
        case 'signUp': data = presets.signUp; break;
        default: data = presets.signIn; break;
    }

    return (
        <p className="text-black px-2 mt-6">{data[1]}
            <Link to={data[0]} className="a-left px-1 pb-1 font-bold hover:text-purple-600">
                {data[2]}
            </Link>
        </p>
    )
}

export default FormChange;