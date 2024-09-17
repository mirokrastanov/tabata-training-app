import { createContext, useState, useEffect, useContext } from 'react';
import AppLoader from '../components/loaders/final/appLoader/AppLoader.jsx';
import * as api from '../api/api.js';

/**
 * @typedef AuthContextData
 * @property {null | Object} user
 * @property {null | Object} session
 * @property {function} loginUser
 * @property {function} discordLogin
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
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true); // MUST START AS TRUE! It ONLY clears... 
    // ...after 1st fetch to ensure accurate user data. Otherwise it registers initial (null) value BEFORE 1st fetch...
    // ...causing route guards to work unexpectedly. Could lead to other potential issues. 

    useEffect(() => {
        checkUserStatus(true);

        const interval = setInterval(() => {
            checkUserStatus(false);
        }, 1000 * 60 * 5);

        return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

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
            setSession(requestData);
            return requestData;
        } catch (error) {
            return error;
        }
    };

    const discordLogin = async () => {
        try {
            const address = api.urlBuilder.auth.get.discordLogin();
            return window.location.href = address;
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
            setSession(requestData);
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
            localStorage.setItem('tabata-session', JSON.stringify(requestData));
            setUser(null);
            setSession(requestData);

            return requestData;
        } catch (error) {
            return error;
        }
    };

    const checkUserStatus = async (toggleLoading = false) => {
        // executes on initial loading
        if (toggleLoading) setLoading(true);
        try {
            const address = api.urlBuilder.auth.get.status();
            const requestData = await api.get(address);
            if (!requestData.ok) throw requestData;
            if (toggleLoading) console.log('User and Session data: \n ', requestData);
            if (requestData?.user) {
                localStorage.setItem('tabata-user', JSON.stringify(requestData.user));
                localStorage.setItem('tabata-session', JSON.stringify(requestData));
                setUser(requestData.user);
                setSession(requestData);
                if (toggleLoading) setLoading(false);
            } else {
                localStorage.removeItem('tabata-user');
                localStorage.setItem('tabata-session', JSON.stringify(requestData));
                setUser(null);
                setSession(requestData);
                if (toggleLoading) setLoading(false);
            }
            return requestData;
        } catch (error) {
            console.log('User and Session data: \n ', error);
            localStorage.removeItem('tabata-user');
            setUser(null);
            if (error?.session && error?.sessionID) {
                setSession(error);
                localStorage.setItem('tabata-session', JSON.stringify(error));
            } else {
                setSession(null);
                localStorage.removeItem('tabata-session');
            }
            if (toggleLoading) setLoading(false);
            return { msg: error.message, err: error };
        }
    };

    const contextData = {
        user,
        session,
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