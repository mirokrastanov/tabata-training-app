import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

export default function UserRoutes() {
    const { user } = useAuth();

    useEffect(() => {
        // console.log('GUARD >> UserRoutes >> User Object:\n', user);

        if (!user) toast.error('Re-routing...\nYou need to sign in to access this page.');
    }, []);

    return user
        ? (<Outlet />)
        : (<Navigate to='/user/signup' />);
}