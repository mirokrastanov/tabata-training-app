import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function UserRoutes() {
    const { user } = useAuth();
    return user
        ? (<Outlet />)
        : (<Navigate to='/user/signup' />);
}