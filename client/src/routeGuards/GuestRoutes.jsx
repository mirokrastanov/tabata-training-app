import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

export default function GuestRoutes() {
    const { user } = useAuth();

    useEffect(() => {
        // console.log('GUARD >> GuestRoutes >> User Object:\n', user);

        if (user) toast.error('Re-routing...\nYou are already signed in.');
    }, []);

    return !user
        ? (<Outlet />)
        : (<Navigate to='/' />);
}