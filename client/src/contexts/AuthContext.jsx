import { createContext, useState, useEffect, useContext } from 'react';
import AppLoader from '../components/loaders/final/appLoader/AppLoader.jsx';
import * as api from '../api/api.js';

/**
 * @typedef AuthContextData
 * @property {null | Object} user
 * @property {function} loginUser
 * @property {function} logoutUser
 * @property {function} registerUser
 * @property {function} checkUserStatus
 */



const AuthContext = createContext();

/**
 * @returns {AuthContextData}
 */
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkUserStatus();
    }, []);

    // useEffect(() => {
    //     console.log(loading);
    // }, [loading]);

    const loginUser = async (userInfo) => {
        const { username, password } = userInfo;
        try {
            const address = api.urlBuilder.auth.post.login();
            const requestData = await api.post(address, userInfo);
            if (!requestData.ok) throw requestData;

            console.log('Signed in. Response: \n', requestData);
            localStorage.setItem('tabata-user', JSON.stringify(requestData.user));
            localStorage.setItem('tabata-session', JSON.stringify(requestData));
            setUser(requestData.user);

            requestData.ok = true;
            requestData.msg = `User ${username} signed in successfully!`;
            return requestData;
        } catch (error) {
            return error;
        }
    };

    const discordLogin = async () => {
        try {
            const address = api.urlBuilder.auth.get.discordLogin();
            return window.location.href = address;


            const requestData = await api.get(address);
            console.log(requestData);
            return requestData;

            // send req to login endpoint with the data provided
            // get response with token, session, cookie whatever
            // save to local storage
            // set user
            // return accountDetails -- in case I need it
        } catch (error) {
            return error;
        }
    };

    const registerUser = async (userInfo) => {
        const { fullName, username, email, password, confirmPassword } = userInfo;
        try {
            const address = api.urlBuilder.auth.post.signup();
            const requestData = await api.post(address, userInfo);
            if (!requestData.ok) throw requestData;

            console.log('Signed up. Response: \n', requestData, requestData.ok);
            localStorage.setItem('tabata-user', JSON.stringify(requestData.user));
            localStorage.setItem('tabata-session', JSON.stringify(requestData));
            setUser(requestData.user);

            requestData.ok = true;
            requestData.msg = `User ${username} created successfully!`;
            return requestData;
        } catch (error) {
            return error;
        }
    };

    const logoutUser = async () => {
        try {
            const address = api.urlBuilder.auth.post.logout();
            const requestData = await api.post(address);
            if (!requestData.ok) throw requestData;

            console.log('Signed out. Response: \n ', requestData);
            localStorage.removeItem('tabata-user');
            localStorage.removeItem('tabata-session');
            setUser(null);

            return requestData;
        } catch (error) {
            return error;
        }
    };

    const checkUserStatus = async () => {
        // executes on initial loading
        setLoading(true);
        try {
            const address = api.urlBuilder.auth.get.status();
            const requestData = await api.get(address);
            if (!requestData.ok) throw requestData;
            console.log('User and Session data: \n ', requestData);
            if (requestData?.user) {
                localStorage.setItem('tabata-user', JSON.stringify(requestData.user));
                localStorage.setItem('tabata-session', JSON.stringify(requestData));
                setUser(requestData.user);
                setLoading(false);
            } else {
                localStorage.removeItem('tabata-user');
                localStorage.removeItem('tabata-session');
                setUser(null);
                setLoading(false);
            }
            return requestData;
        } catch (error) {
            console.log('User and Session data: \n ', error);
            localStorage.removeItem('tabata-user');
            localStorage.removeItem('tabata-session');
            setUser(null);
            setLoading(false);
            return { msg: error.message, err: error };
        }
    };

    const contextData = {
        user,
        loginUser,
        discordLogin,
        logoutUser,
        registerUser,
        checkUserStatus,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading
                ? (<AppLoader />)
                : (children)}
        </AuthContext.Provider>
    );
};