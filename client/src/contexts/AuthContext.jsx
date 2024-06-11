import { createContext, useState, useEffect, useContext } from "react";
import AppLoader from "../components/shared/appLoader/AppLoader";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); // TODO: CHANGE to TRUE once logging is implemented !!!

    useEffect(() => {
        checkUserStatus();
    }, []);

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
        try {
            // get user token either from express jwt or local storage
            // check and save to local storage if not present (as JSON)
            // setUser(accountDetails) -- the obj received
            // setLoading(false)
            // return accountDetails -- in case I need it
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