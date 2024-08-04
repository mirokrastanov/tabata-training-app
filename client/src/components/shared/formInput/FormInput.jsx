import React from 'react';

function FormInput({ iValue, onChange, lText, iName, iType }) {


    return (
        <div className="mb-4">
            <label className="block text-gray-700">{lText}</label>
            <input
                type={iType}
                name={iName}
                value={iValue}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
        </div>
    )
}

export default FormInput;