import React from 'react';
import { getDdMmYyyy, getHhMmSs } from '../../utils/dateConversions';

function ProfileDataBox({ k, v, i }) {
    return (
        <div className="bg-white shadow-md rounded-lg min-w-[50%] max-w-4xl mt-4">
            <div className="my-4 px-2">
                <div className="w-full flex flex-wrap justify-center items-center gap-x-2">
                    <span className="font-semibold text-gray-800 text-lg">
                        {/* KEYS */}
                        {k == 'fullName' && 'Full Name: '}
                        {k == 'email' && 'Email: '}
                        {k == 'createdAt' && 'Created: '}
                        {k == 'updatedAt' && 'Updated: '}
                    </span>
                    <span className="text-gray-600 text-lg">
                        {/* VALUES */}
                        {k == 'createdAt' || k == 'updatedAt'
                            ? getHhMmSs(v) + ' | ' + getDdMmYyyy(v)
                            : v}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProfileDataBox;