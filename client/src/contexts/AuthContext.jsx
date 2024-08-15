import { createContext, useState, useEffect, useContext } from 'react';
import AppLoader from '../components/shared/appLoader/AppLoader';
import * as api from '../api/api.js';

const AuthContext = createContext();

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
        // console.log(userInfo);
        try {
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
        const { fullName, username, password } = userInfo;
        // console.log(userInfo);
        try {
            // send req to register with the data provided
            // get response with token, session, cookie whatever
            // save to local storage
            // set user
            // return accountDetails -- in case I need it
        } catch (error) {
            // console.log(error, '-- on register');
            return error;
        }
    };

    const logoutUser = () => {
        // setUser(null);
        // clear local storage
        // clear session / cookie whatever
    };

    const checkUserStatus = async () => {
        // executes on initial loading
        setLoading(true);
        try {
            const address = api.urlBuilder.auth.get.status();
            const requestData = await api.get(address);
            // console.log('req data: \n ', requestData);

            if (requestData?.user) {
                localStorage.setItem('tabata-user', requestData.user);
                localStorage.setItem('tabata-session', requestData);
                // get user token either from express jwt or local storage
                setUser(requestData.user);
            } else {
                localStorage.removeItem('tabata-user');
                localStorage.removeItem('tabata-session');
                // nullify token
                setUser(null);
            }

            setLoading(false);
            return requestData;
        } catch (error) {
            // setUser(null);
            // remove cookie from local storage
            // setLoading(false);
            // return error;
        }
    };

    const contextData = {
        user,
        loginUser,
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