import React from 'react';
import { getDate, getTime, getZone } from '../../utils/dateConversions';

function ProfileDataBox({ k, v, i }) {
    return (
        <div className="bg-white shadow-md rounded-lg min-w-[50%] max-w-4xl mt-4 max-md:w-full"
            data-id={`${k.trim()}=${v.toString().trim()}`}>
            <div className="my-4 px-6 max-custom-mq-500:px-2 max-custom-mq-300:p-0">
                <div className="w-full flex flex-wrap justify-center items-center gap-x-2">
                    <span className="font-semibold text-gray-800 text-lg max-custom-mq-300:w-full max-custom-mq-300:text-sm">
                        {/* KEYS */}
                        {k == 'fullName' && 'Full Name: '}
                        {k == 'email' && 'Email: '}
                        {k == 'discordVerified' && 'Discord verified: '}
                        {k == 'createdAt' && 'Created: '}
                        {k == 'updatedAt' && 'Updated: '}
                    </span>
                    <span className="text-gray-600 text-lg max-custom-mq-300:w-full">
                        {/* VALUES */}
                        {k == 'fullName' && v}
                        {k == 'email' && v.split('@').join(' @')}
                        {(k == 'createdAt' || k == 'updatedAt') && `${getDate(v)}, ${getTime(v)}, ${getZone(v).str}`}
                        {k == 'discordVerified' && <>{v ? 'Yes' : 'No'}</>}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProfileDataBox;