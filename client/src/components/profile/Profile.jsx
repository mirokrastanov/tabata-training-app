import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PageRingLoader from '../loaders/final/pageRingLoader/PageRingLoader';
import ProfileImg from './ProfileImg';
import ProfileDataBox from './ProfileDataBox';

const Profile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [dUser, setDUser] = useState(null);

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
        : (<div className="h-[calc(100%-3.5rem)] bg-gray-100 flex flex-col items-center p-6 rounded-b-xl overflow-y-scroll max-custom-mq-300:px-0">
            <ProfileImg dUser={dUser} />

            {dUser && Object.entries(dUser)
                .filter(([k, v], i) => k !== '_id' && k !== '__v' && k !== 'profilePic' && k !== 'username'
                    && k !== 'discordId' && k !== 'avatarId' && k !== 'provider' && k !== 'fetchedAt')
                .map(([k, v], i) => (<ProfileDataBox k={k} v={v} i={i} key={i + 'p-props'} />))}

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



