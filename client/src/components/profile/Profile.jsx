import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    // TODO: Replace with API fetched data
    const user = {
        full_Name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        created_At: '2022-01-01',
        updated_At: '2023-01-01',
    };

    return (<>
        <div className="h-[calc(100%-3.5rem)] bg-gray-100 flex flex-col items-center p-6 rounded-b-xl">
            <div className="bg-white shadow-md rounded-lg w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-gray-800 my-6">Profile</h1>
            </div>

            {Object.entries(user).map(([k, value], i) => (
                <div className="bg-white shadow-md rounded-lg w-full max-w-4xl mt-4" key={i + 'p-props'}>
                    <div className="my-4 px-2">
                        <div className="w-full flex flex-wrap justify-center items-center gap-x-2">
                            <span className="font-semibold text-gray-800 text-lg">
                                {k[0].toUpperCase() + k.slice(1).replaceAll('_', ' ') + ':'}
                            </span>
                            <span className="text-gray-600 text-lg">{value.replace('@', ' @ ')}</span>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link to="/workouts" className="bg-purple-900 text-white py-3 px-6 rounded-lg hover:bg-purple-600 active:bg-purple-500">Workouts</Link>
                <Link to="/" className="bg-purple-900 text-white py-3 px-6 rounded-lg hover:bg-purple-600 active:bg-purple-500">Home</Link>
            </div>
        </div>

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


