import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PageRingLoader from '../loaders/final/pageRingLoader/PageRingLoader';
import { getDdMmYyyy, getHhMmSs } from '../../utils/dateConversions';

const Profile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [dUser, setDUser] = useState(null);
    // useEffect(() => {
    //     setLoading(true);
    // }, []);

    useEffect(() => {
        if (user) {
            // console.log(user);
            setDUser(user);
            setLoading(false);
            setTimeout(() => {
            }, 1000);
        }
    }, [user]);

    // TODO: Craft a better view. Test with both a regular and a discord user
    // Also add the date/time conversions using the util function -- ALSO extract and add time
    // MODIFY dUser and plot after. Works with state.

    return (<>{loading
        ? (<PageRingLoader />)
        : (<div className="h-[calc(100%-3.5rem)] bg-gray-100 flex flex-col items-center p-6 rounded-b-xl overflow-y-scroll">
            <div className="bg-white shadow-md rounded-lg min-w-[50%] max-w-4xl p-2 py-4 flex flex-wrap justify-center items-center gap-5" data-id={dUser?._id}>
                <div className="w-fit h-full rounded-full shadow-xl">
                    {dUser?.profilePic
                        ? <img src={dUser.profilePic} alt="profile-pic" height="70px" width="70px" className="rounded-full p-2 border max-custom-mq-500:w-[90px] max-custom-mq-500:h-[90px] max-custom-mq-300:w-[70px] max-custom-mq-300:h-[70px] max-custom-mq-300:p-0" />
                        : <img src="/src/assets/user.png" alt="discord-user-icon" height="70px" width="70px" className="rounded-full max-custom-mq-500:w-[90px] max-custom-mq-500:h-[90px] max-custom-mq-300:w-[70px] max-custom-mq-300:h-[70px] max-custom-mq-300:p-0" />
                    }
                </div>
                <div className="px-2 flex flex-col max-custom-mq-500:hidden">
                    <p className="text-gray-600 text-md">username</p>
                    <h2 className="text-gray-800 font-bold text-3xl">{dUser?.username}</h2>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg min-w-[50%] max-w-4xl p-2 py-4 mt-4 flex flex-wrap justify-center items-center gap-5 custom-mq-500:hidden max-custom-mq-500:w-full">
                <div className="px-2 flex flex-col">
                    <p className="text-gray-600 text-md">username</p>
                    <h2 className="text-gray-800 font-bold text-3xl">{dUser?.username}</h2>
                </div>
            </div>

            {dUser && Object.entries(dUser).map(([k, v], i) => (
                <div className="bg-white shadow-md rounded-lg w-full max-w-4xl mt-4" key={i + 'p-props'}>
                    <div className="my-4 px-2">
                        <div className="w-full flex flex-wrap justify-center items-center gap-x-2">
                            <span className="font-semibold text-gray-800 text-lg">
                                {/* KEYS */}
                                {k !== '_id' && k !== '__v' && k}
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
            ))}

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link to="/workouts" className="bg-purple-900 text-white py-3 px-6 rounded-lg hover:bg-purple-600 active:bg-purple-500">Workouts</Link>
                <Link to="/" className="bg-purple-900 text-white py-3 px-6 rounded-lg hover:bg-purple-600 active:bg-purple-500">Home</Link>
            </div>
        </div>)}


    </>);
};

export default Profile;








// <div className="space-y-4">
//                     <div className="flex justify-between">
//                         <span className="font-semibold text-gray-800">Full Name:</span>
//                         <span className="text-gray-600">{user.fullName}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="font-semibold text-gray-800">Username:</span>
//                         <span className="text-gray-600">{user.username}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="font-semibold text-gray-800">Email:</span>
//                         <span className="text-gray-600">{user.email}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="font-semibold text-gray-800">Created At:</span>
//                         <span className="text-gray-600">{user.createdAt}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="font-semibold text-gray-800">Updated At:</span>
//                         <span className="text-gray-600">{user.updatedAt}</span>
//                     </div>
//                 </div>
//                 <div className="flex flex-wrap justify-center gap-4 mt-8">
//                     <Link to="/workouts">
//                         <button className="bg-purple-900 text-white py-2 px-4 rounded-lg hover:bg-purple-600 active:bg-purple-500">
//                             Workouts
//                         </button>
//                     </Link>
//                     <Link to="/">
//                         <button className="bg-purple-900 text-white py-2 px-4 rounded-lg hover:bg-purple-600 active:bg-purple-500">
//                             Home
//                         </button>
//                     </Link>
//                 </div>



