import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

const PageContext = createContext();

export function PageProvider({ children }) {
    const [pageParams, setPageParams] = useState({ test: '1' });
    const location = useLocation();

    useEffect(() => {
        updatePageParams();
    }, []);

    useEffect(() => {
        console.log('Current pathname:', location.pathname);
        updatePageParams();
    }, [location]);

    const updatePageParams = () => {
        // Set params based on current location

    };

    const ContextData = { pageParams, updatePageParams };

    return (
        <PageContext.Provider value={ContextData}>
            {children}
        </PageContext.Provider>
    );
};