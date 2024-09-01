import React from 'react';
import { getDate, getRemainingTime, getTime, getZone } from '../../utils/dateConversions';

function ProfileDataBox({ k, v }) {
    return (
        <div className="bg-white shadow-md rounded-lg min-w-[50%] max-w-4xl mt-4 max-md:w-full"
            data-id={`${k.trim()}=${v?.toString().trim()}`}>
            <div className="my-4 px-6 max-custom-mq-500:px-2 max-custom-mq-300:p-0">
                <div className={`w-full flex flex-wrap justify-center items-center gap-x-2 ${k == 'session' ? 'flex-col' : ''}`}>
                    <span className="font-semibold text-gray-800 text-lg max-custom-mq-300:w-full max-custom-mq-300:text-sm">
                        {/* KEYS */}
                        {k == 'fullName' && 'Full Name: '}
                        {k == 'email' && 'Email: '}
                        {k == 'discordVerified' && 'Discord verified: '}
                        {k == 'createdAt' && 'Created: '}
                        {k == 'updatedAt' && 'Updated: '}
                        {k == 'expires' && 'Expires: '}
                        {k == 'timeLeft' && 'Time remaining: '}
                        {k == 'maxAge' && 'Original duration: '}
                        {k == 'session' && <p className="text-xl max-custom-mq-300:text-lg">Session information</p>}
                    </span>
                    <span className={`text-gray-600 text-lg max-custom-mq-300:w-full`}>
                        {/* VALUES */}
                        {k == 'fullName' && v}
                        {k == 'email' && (<p className="max-custom-mq-300:flex max-custom-mq-300:flex-col">
                            <span className="max-custom-mq-300:font-bold">{v.split('@').slice(0, 1).join('')}</span>
                            <span>{('@').concat(v.split('@').slice(1).join(''))}</span>
                        </p>)}
                        {(k == 'createdAt' || k == 'updatedAt') && `${getDate(v)}, ${getTime(v)}, ${getZone(v).str}`}
                        {k == 'discordVerified' && <>{v ? 'Yes' : 'No'}</>}
                        {k == 'expires' && `${getDate(v)}, ${getTime(v)}, ${getZone(v).str}`}
                        {k == 'maxAge' && ((v / 1000 / 60 / 60 / 24).toString()).concat(' days')}
                        {k == 'timeLeft' && getRemainingTime(v)}
                        {k == 'session-msg' && (<ul className="ml-4 flex flex-col text-[16px] list-disc text-left max-custom-mq-500:list-none max-custom-mq-500:text-center max-custom-mq-500:gap-y-4 max-custom-mq-500:leading-5 max-custom-mq-300:ml-0 max-custom-mq-300:px-2">
                            <li>You will be signed out when the session expires.</li>
                            <li>Please sign in again to refresh your token.</li>
                            <li>This is done for security reasons.</li>
                        </ul>)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProfileDataBox;