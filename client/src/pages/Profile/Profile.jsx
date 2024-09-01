import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PageRingLoader from '../../components/loaders/final/pageRingLoader/PageRingLoader';
import ProfileImg from './ProfileImg';
import ProfileDataBox from './ProfileDataBox';

const Profile = () => {
    const { user, session } = useAuth();
    const [loading, setLoading] = useState(true);
    const [dUser, setDUser] = useState(null);
    const [dSession, setDSession] = useState(null);

    useEffect(() => {
        if (user) setDUser(user)
    }, [user]);

    useEffect(() => {
        if (session) setDSession(session)
    }, [session]);

    useEffect(() => {
        if (dUser && dSession) {
            setLoading(false);
        }
    }, [dUser, dSession]);

    return (<>{loading
        ? (<PageRingLoader />)
        : (<div className="h-[calc(100%-3.5rem)] bg-gray-100 flex flex-col items-center p-6 rounded-b-xl overflow-y-scroll max-custom-mq-300:px-0">
            <ProfileImg dUser={dUser} />

            {dUser && Object.entries(dUser)
                .filter(([k, v], i) => k !== '_id' && k !== '__v' && k !== 'profilePic' && k !== 'username'
                    && k !== 'discordId' && k !== 'avatarId' && k !== 'provider' && k !== 'fetchedAt')
                .map(([k, v], i) => (<ProfileDataBox k={k} v={v} key={i + 'p-props'} />))}


            {dSession && (<>
                <ProfileDataBox k={'session'} />
                <ProfileDataBox k={'expires'} v={dSession.session.cookie.expires} />
                <ProfileDataBox k={'timeLeft'} v={dSession.session.cookie.expires} />
                <ProfileDataBox k={'maxAge'} v={dSession.session.cookie.originalMaxAge} />
                <ProfileDataBox k={'session-msg'} />
            </>)}

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link to="/workouts" className="bg-purple-900 text-white py-3 px-6 rounded-lg hover:bg-purple-600 active:bg-purple-500">Workouts</Link>
                <Link to="/" className="bg-purple-900 text-white py-3 px-6 rounded-lg hover:bg-purple-600 active:bg-purple-500">Home</Link>
            </div>
        </div>)}


    </>);
};

export default Profile;
